from io import BytesIO
from re import search
import base64
import matplotlib
from matplotlib import pyplot as plt

from django.db.models import Avg
from django.shortcuts import render, get_object_or_404
from rest_framework import status, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet, generics
from rest_framework.response import Response

from Thesis import settings
from .perms import *
from .models import *
from .serializers import *
from django.core.mail import send_mail


class UserViewSet(ViewSet, generics.CreateAPIView, generics.UpdateAPIView, generics.ListAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser]

    def get_permissions(self):
        if self.action.__eq__('current_user') or self.request.method == 'PATCH':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    @action(methods=['get'], url_path='current-user', url_name='current-user', detail=False)
    def current_user(self, request):
        return Response(UserSerializer(request.user).data)

    @action(methods=['patch'], detail=True, url_path='change-password')
    def change_password(self, request, pk):
        user = request.user
        serializer = UserChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.validated_data['old_pass']):
                return Response({'old_password': 'Mật khẩu không đúng.'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_pass'])
            user.save()

            return Response({'message': 'Mật khẩu đã được thay đổi.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CouncilViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.RetrieveUpdateAPIView):
    serializer_class = CouncilSerializer
    queryset = Council.objects.all()

    def get_permissions(self):
        if self.action in ['lecture_thesis', 'lecture_council']:
            return [LecturePermissions()]
        return [DeanPermissions()]

    @action(methods=['patch'], detail=True, url_path='change-status')
    def change_status(self, request, pk):
        council = self.get_object()
        council.is_active = not council.is_active
        council.save()
        thesis = Thesis.objects.filter(council=council)
        for thesis in thesis:
            score = Score.objects.filter(thesis=thesis)
            average_score = score.aggregate(
                avg_score=Avg('score'))['avg_score']

            for student in thesis.students.all():
                subject = 'KẾT QUẢ KHÓA LUẬN TỐT NGHIỆP'
                message = f'Chào {student.first_name}, kết quả khóa luận tốt nghiệp: {round(average_score, 2)}'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [student.email]
                send_mail(subject, message, email_from, recipient_list)
        return Response(council.is_active)

    @action(methods=['get'], detail=True, url_path='member-council')
    def member_council(self, request, pk):
        members = CouncilMember.objects.filter(council=pk)
        serializer = CouncilMemberSerializer(members, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='update-members')
    def update_members(self, request, pk):
        council_instance = get_object_or_404(Council, pk=pk)
        update_members = set(request.data.get('members', []))
        old_members = set(CouncilMember.objects.filter(council=council_instance).values_list('lecture', flat=True))

        if old_members == update_members:
            return Response({'message': ''})

        remove_member = old_members - update_members
        add_member = update_members - old_members

        if remove_member:
            CouncilMember.objects.filter(council=council_instance, lecture__in=remove_member).delete()

        new_members = [
            CouncilMember(council=council_instance, lecture=Lecture.objects.get(pk=user_id), council_role='Member')
            for user_id in add_member]

        CouncilMember.objects.bulk_create(new_members)
        return Response({'message': 'Thành viên đã được cập nhật'}, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path='update-role')
    def update_role(self, request, pk):
        council_instance = get_object_or_404(Council, pk=pk)
        council_role = request.data.get('council_role', None)
        lecture_id = request.data.get('user_id', None)
        lecture = Lecture.objects.get(pk=lecture_id)
        member = CouncilMember.objects.filter(council=council_instance, lecture=lecture).first()
        member.council_role = council_role
        member.save()

        if (council_role == 'Reviewer'):
            subject = council_instance.name
            message = f'Chào {lecture.name}, bạn đã được trở thành phản biện của hội đồng {council_instance.name}'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [lecture.email]
            send_mail(subject, message, email_from, recipient_list)

        return Response({'message': 'Thành viên đã được cập nhật thành công'}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='lecture-council')
    def lecture_council(self, request):
        my_councils = request.user.councils.all()
        councils = self.queryset.filter(id__in=my_councils)
        if search:
            councils = councils.filter(name__icontains=search)

        paginator = self.pagination_class()
        paginated_council = paginator.paginate_queryset(councils, request)
        serializer = CouncilSerializer(paginated_council, many=True)

        return paginator.get_paginated_response(serializer.data)

    @action(methods=['get'], detail=True, url_path='lecture-thesis')
    def lecture_thesis(self, request, pk):
        council = self.get_object()
        if council.is_active:
            thesis = Thesis.objects.filter(council=pk)
            serializer = ThesisSerializer(thesis, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Hội đồng đã khóa'}, status=status.HTTP_423_LOCKED)

    @action(methods=['get'], detail=True, url_path='thesis')
    def council_thesis(self, request, pk):
        thesis = Thesis.objects.filter(advisors=pk)
        serializer = ThesisSerializer(thesis, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path='council-thesis')
    def update_council_thesis(self, request, pk):
        council_instance = get_object_or_404(Council, pk=pk)
        new_thesis = set(request.data.get('theses', []))
        old_thesis = council_instance.theses.all()

        if new_thesis == set(old_thesis.values_list('id', flat=True)):
            return Response({'message': 'Không có gì thay đổi'})

        remove_thesis = old_thesis.exclude(id__in=new_thesis)
        add_thesis = Thesis.objects.filter(id__in=new_thesis)

        remove_thesis.update(council=None)
        add_thesis.update(council=council_instance)

        return Response({'message': 'Khóa luận đã được cập nhật thành công cho hội đồng'}, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path='add-thesis')
    def add_thesis(self, request, pk):
        council_instance = get_object_or_404(Council, pk)
        thesis_id = request.data.get('thesis_id')

        if council_instance.theses.filter(id=thesis_id).exists():
            return Response({'message': 'Khóa luận đã có trong hội đồng'}, status=status.HTTP_400_BAD_REQUEST)

        thesis = get_object_or_404(Thesis, id=thesis_id)
        council_instance.theses.add(thesis)

        return Response({'message': 'Khóa luận đã được thêm vào thành công.'}, status=status.HTTP_200_OK)


class ThesisRequestViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = ThesisRequest.objects.all()
    serializer_class = ThesisRequestSerializer
    parser_classes = [MultiPartParser]


class ThesisViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Thesis.objects.all()
    serializer_class = ThesisSerializer

    def get_permissions(self):
        if self.action in ['add_score', 'update_score']:
            return [LecturePermissions()]
        elif self.action.__eq__('get_score') or self.request.method in ['GET', 'PATCH']:
            return [permissions.IsAuthenticated()]
        elif self.request.method in 'POST':
            return [StudentPermissions()]
        return [DeanPermissions()]

    @action(methods=['post'], detail=False, url_path='add-thesis')
    def add_thesis(self, request):
        title = request.data.get('title')
        year = request.data.get('year')
        advisors_id = request.data.get('advisors', [])
        students_id = request.data.get('students', [])

        try:
            advisors = Lecture.objects.filter(pk__in=advisors_id)
            students = Student.objects.filter(pk__in=students_id)

            new_thesis = Thesis.objects.create(
                title=title,
                year=year,
            )

            new_thesis.advisors.set(advisors)
            new_thesis.students.set(students)

            data = ThesisSerializer(new_thesis).data

            return Response(data, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({'error': str(ex)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], url_path='update-thesis', detail=True)
    def update_thesis(self, request, pk):
        thesis = self.get_object()
        fields_to_update = ['title', 'description', 'students', 'advisors']
        try:
            for field in fields_to_update:
                if field in request.data:
                    data = request.data[field]
                    if isinstance(data, list):
                        users = User.objects.filter(pk__in=data)
                        getattr(thesis, field).set(users)
                    else:
                        setattr(thesis, field, data)
            thesis.save()

            serializer = ThesisSerializer(thesis)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False, url_path='my-thesis')
    def my_thesis(self, request):
        my_thesis = request.user.thesis.all()
        if my_thesis.exists():
            serializer = ThesisSerializer(my_thesis[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message', 'Bạn không có khóa luận nào'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=False, url_path='not-active')
    def not_active(self, request):
        theses = Thesis.objects.filter(is_active=False)
        data = ThesisSerializer(theses, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='active')
    def active(self, request):
        theses = Thesis.objects.filter(is_active=True)
        data = ThesisSerializer(theses, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True, url_path='change-status')
    def change_status(self, request, pk):
        thesis = Thesis.objects.filter(is_active=False).get(pk=pk)
        thesis.is_active = not thesis.is_active
        thesis.save()
        data = ThesisSerializer(thesis).data
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='add-score')
    def add_score(self, request, pk):
        thesis_instance = self.get_object()
        presentation = request.data.get('presentation')
        content = request.data.get('content')
        attitude = request.data.get('attitude')
        comment = request.data.get('comment')
        council_member = request.user

        if not council_member in thesis_instance.council.members.all():
            return Response({'error': 'Bạn không phải thành viên trong hội đồng'},
                            status=status.HTTP_403_FORBIDDEN)

        if not thesis_instance.council.is_active:
            return Response({'error': 'Hội đồng đã khóa'}, status=status.HTTP_403_FORBIDDEN)

        final_score = (float(presentation) * 0.3) + (float(content) * 0.3) + (float(attitude) * 0.4)
        score = Score.objects.create(
            presentation=presentation,
            content=content,
            attitude=attitude,
            comment=comment,
            council_member=council_member,
            thesis=thesis_instance,
            score=final_score
        )

        serializer = ScoreSerializer(score)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['patch'], detail=True, url_path='update-score')
    def update_score(self, request, pk):
        thesis_instance = self.get_object()
        presentation_score = request.data.get('presentation')
        content_score = request.data.get('content')
        attitude_score = request.data.get('attitude')
        comment = request.data.get('comment')
        reviewer = request.user

        if not thesis_instance.council_member.user == reviewer:
            return Response({'error': 'Người dùng không phải là thành viên hội đồng chấm khóa luận'},
                            status=status.HTTP_403_FORBIDDEN)

        if not thesis_instance.council.is_active:
            return Response({'error': 'Hội đồng đã khóa'}, status=status.HTTP_403_FORBIDDEN)

        score = Score.objects.get(thesis=thesis_instance)
        score.presentation = float(presentation_score)
        score.content = float(content_score)
        score.attitude = float(attitude_score)
        score.comment = comment

        score.final_score()
        score.save()

        thesis_instance.is_defend = True
        thesis_instance.save()

        serializer = ScoreSerializer(score)
        serialized_data = serializer.data
        serialized_data['is_defend'] = thesis_instance.is_defend

        return Response(serializer, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='get-score')
    def get_score(self, request, pk):
        thesis = self.get_object()
        scores = Score.objects.filter(thesis=thesis)
        if scores:
            serializer = ScoreSerializer(scores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'Khóa luận chưa được chấm điểm'}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True, url_path='my-score')
    def my_score(self, request, pk):
        thesis = self.get_object()
        myScore = request.user.scores.filter(thesis=thesis)
        if myScore:
            serializer = ScoreSerializer(myScore[0])
            return Response(serializer.data, status=status.HTTP_302_FOUND)
        return Response({'message': 'Bạn không có khóa luận nào được chấm điểm'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['patch'], detail=True, url_path='upload-files')
    def upload_files(self, request, pk):
        thesis = self.get_object()
        files_data = request.data.get('files')
        if files_data is None:
            return Response({'error': 'Missing files field in request data.'}, status=status.HTTP_400_BAD_REQUEST)

        thesis.files = files_data
        thesis.save()

        serializer = ThesisSerializer(thesis)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ScoreViewSet(ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    parser_classes = [MultiPartParser]


matplotlib.use('Agg')


class PlotAPIView(APIView):
    def get(self, request, format=None):
        grade_range = ["0.0 - 1.9", "2.0 - 3.9",
                      "4.0 - 5.9", "6.0 - 7.9", "8.0 - 9.9", "10"]
        quantity = [236, 420, 600, 50, 29, 1]

        plt.bar(grade_range, quantity)

        plt.xlabel("thang điểm")
        plt.ylabel("Số lượng thí sinh")
        plt.title("Phổ điểm khóa luận theo thang điểm")

        image_stream = BytesIO()
        plt.savefig(image_stream, format='png')
        plt.close()

        image_base64 = base64.b64encode(
            image_stream.getvalue()).decode('utf-8')

        return Response({'image': f'data:image/png;base64,{image_base64}'})
