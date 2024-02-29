from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import Group


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'avatar', 'username', 'email', 'first_name', 'last_name', 'role', 'password', 'is_active']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()

        user = User(**data)
        user.set_password(data['password'])
        user.save()

        return user


class UserChangePasswordSerializer(ModelSerializer):
    old_pass = serializers.CharField(required=True)
    new_pass = serializers.CharField(required=True)
    confirm_new_pass = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['password', 'old_pass', 'new_pass', 'confirm_new_pass']

    def validate(self, data):
        new_pass = data.get('new_pass')
        confirm_new_pass = data.get('confirm_new_pass')

        if new_pass != confirm_new_pass:
            raise serializers.ValidationError("Mật khẩu xác nhận không khớp")

        return data


class StudentSerializer(serializers.ModelSerializer):
    student = UserSerializer()

    class Meta:
        model = Student
        fields = ['student']


class LectureSerializer(serializers.ModelSerializer):
    lecture = UserSerializer()

    class Meta:
        model = Lecture
        fields = ['lecture']


class DeanSerializer(serializers.ModelSerializer):
    dean = UserSerializer()

    class Meta:
        model = Dean
        fields = ['dean']


class CouncilMemberSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(read_only=True)

    class Meta:
        model = CouncilMember
        fields = ['id', 'lecture', 'council_role']


class CouncilSerializer(serializers.ModelSerializer):
    members = CouncilMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Council
        fields = ['id', 'created_date', 'updated_date', 'name', 'members']


class ThesisRequestSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = ThesisRequest
        fields = ['id', 'student', 'year']


class ScoringRubricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoringRubric
        fields = '__all__'


class ThesisSerializer(serializers.ModelSerializer):
    advisors = LectureSerializer(many=True)
    students = StudentSerializer(many=True)

    class Meta:
        model = Thesis
        fields = ['id', 'title', 'year', 'files', 'advisors', 'students', 'is_defend']


class ScoreSerializer(serializers.ModelSerializer):
    council_member = CouncilMemberSerializer()
    scoring_rubric = ScoringRubricSerializer()

    class Meta:
        model = Score
        fields = ['id', 'comment', 'council_member', 'scoring_rubric', 'thesis', 'score']
