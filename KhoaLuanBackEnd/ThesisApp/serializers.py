from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'avatar', 'username', 'password', 'email', 'first_name', 'last_name', 'role', 'major']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()

        u = User(**data)
        u.set_password(data['password'])
        u.save()

        return u


class UserChangePasswordSerializer(ModelSerializer):
    old_pass = serializers.CharField(required=True)
    new_pass = serializers.CharField(required=True)
    confirm_new_pass = serializers.CharField(required=True)

    def validate(self, data):
        new_pass = data.get('new_pass')
        confirm_new_pass = data.get('confirm_new_pass')

        if new_pass != confirm_new_pass:
            raise serializers.ValidationError("Mật khẩu xác nhận không khớp")

        return data


class StudentListSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'image_url']


class EmployeeSerializer(ModelSerializer):
    user_info = UserSerializer()

    class Meta:
        model = Employee
        fields = ['user_info']


class EmployeeListSerializer(ModelSerializer):
    user_info = EmployeeSerializer()

    class Meta:
        model = Employee
        fields = ['user_info']


class ThesisSerializer(ModelSerializer):
    date_defend = serializers.DateField(format='%d-%m-%Y')
    is_defend = serializers.BooleanField(default=False)

    class Meta:
        model = Thesis
        fields = '__all__'


class ThesisListSerializer(ModelSerializer):
    date_defend = serializers.DateField(format='%d-%m-%Y')
    is_defend = serializers.BooleanField(default=False)

    class Meta:
        model = Thesis
        fields = '__all__'


class CouncilSerializer(ModelSerializer):
    class Meta:
        model = Council
        fields = '__all__'


class CouncilListSerializer(ModelSerializer):
    class Meta:
        model = Council
        fields = '__all__'


class CriteriaSerializer(ModelSerializer):
    class Meta:
        model = Criteria
        fields = '__all__'


class CriteriaListSerializer(ModelSerializer):
    class Meta:
        model = Criteria
        fields = '__all__'


class ScoreSerializer(ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'


class ScoreListSerializer(ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'
