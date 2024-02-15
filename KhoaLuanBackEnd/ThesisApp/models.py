from cloudinary.models import CloudinaryField
from django.db import models
from django.contrib.auth.models import AbstractUser
from django_enumfield import enum


# Enum
class Role(enum.Enum):
    SINHVIEN = 0
    GIANGVIEN = 1
    GIAOVUKHOA = 2


class Major(enum.Enum):
    IT = 0
    BA = 1
    BT = 2


class BaseModel(models.Model):
    id = models.AutoField(primary_key=True)
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    role = enum.EnumField(Role, default=Role.SINHVIEN)
    major = enum.EnumField(Major, default=Major.IT)
    avatar = CloudinaryField('image',
                             default='https://res.cloudinary.com/dnjupjumj/image/upload/f_auto,q_auto/sv8psa19dfauktio31is')

    class Meta:
        ordering = ['id']
        unique_together = ['username']

    @property
    def name(self):
        return self.last_name + ' ' + self.first_name

    @property
    def image_url(self):
        return self.avatar.url


class Student(models.Model):
    user_info = models.OneToOneField(User, related_name='student_info', on_delete=models.CASCADE, null=False,
                                     primary_key=True)

    def __str__(self):
        return self.user_info


class Employee(models.Model):
    user_info = models.OneToOneField(User, related_name='employee_info', on_delete=models.CASCADE, null=False,
                                     primary_key=True)

    def __str__(self):
        role = self.user_info.role
        R = ''
        match role:
            case Role.GIANGVIEN:
                R = 'Giảng viên'
            case Role.GIAOVUKHOA:
                R = 'Giáo vụ khoa'
        return R + ' ' + self.user_info.name


class Lecture(models.Model):
    employee_info = models.OneToOneField(User, related_name='lecture_info', on_delete=models.CASCADE, null=False,
                                         primary_key=True)

    def __str__(self):
        return self.employee_info.name


class FacultyAdmin(models.Model):
    employee_info = models.OneToOneField(User, related_name='faculty_admin_info', on_delete=models.CASCADE, null=False,
                                         primary_key=True)

    def __str__(self):
        return self.employee_info.name

