from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.viewsets import ModelViewSet, ViewSet, generics
from rest_framework.response import Response

from .models import *
from .serializers import *
from django.core.mail import send_mail

# MESSAGE
success = {"status": "success", "message": "Thanh cong"}
failed = {"status": "failed", "message": "That Bai"}

Limit_student = 2
Limit_advisor = 2


class UserViewSet(ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['put'], detail=True)
    def change_password(self, request):
        user = self.get_object()
        serializer = UserChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.validated_data['old_pass']):
                return Response({'old_password': 'Mật khẩu không đúng.'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_pass'])
            user.save()

            return Response({'message': 'Mật khẩu đã được thay đổi.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentViewSet(ViewSet, generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentListSerializer

    def list(self, request, *args, **kwargs):
        students = Student.objects.all()
        return Response(StudentListSerializer(students, many=True, context={'request': request}).data)


class ThesisViewSet(ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Thesis.objects.filter(active=True)
    serializer_class = ThesisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        theses = Thesis.objects.all()
        return Response(ThesisListSerializer(theses, many=True, context={'request': request}).data)
