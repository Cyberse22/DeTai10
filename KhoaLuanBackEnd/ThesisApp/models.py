from cloudinary.models import CloudinaryField
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from django.db.models.signals import post_save
from django.dispatch import receiver


# TextChoice
class Role(models.TextChoices):
    SINHVIEN = 'sinhvien', 'Sinh Viên'
    GIANGVIEN = 'giangvien', 'Giảng Viên'
    GIAOVUKHOA = 'giaovukhoa', 'Giáo Vụ Khoa'


class Major(models.TextChoices):
    IT = 'cntt', 'Công Nghệ Thông Tin',
    BT = 'cnsh', 'Công Nghệ Sinh Học',
    BA = 'kdqt', 'Kinh Doanh Quốc Tế'


class BaseModel(models.Model):
    id = models.AutoField(primary_key=True)
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    role = models.CharField(max_length=255, choices=Role.choices, default=Role.SINHVIEN)
    major = models.CharField(max_length=255, choices=Major.choices, default=Major.IT)
    avatar = CloudinaryField('image',
                             default='https://res.cloudinary.com/dnjupjumj/image/upload/v1707144420/sv8psa19dfauktio31is.jpg')

    class Meta:
        ordering = ['id']
        unique_together = ['username']

    @property
    def name(self):
        return self.last_name + ' ' + self.first_name

    @property
    def image_url(self):
        return self.avatar.url


@receiver(post_save, sender=User)
def add_email_to_user(sender, instance, created, **kwargs):
    if created:
        email = 'kietnguyen2226@gmail.com'
        instance.email = email
        instance.save()


class Student(models.Model):
    user_info = models.OneToOneField(User, related_name='student_info', on_delete=models.CASCADE, null=False,
                                     primary_key=True)

    def __str__(self):
        return self.user_info


class Employee(models.Model):
    user_info = models.OneToOneField(User, related_name='employee_info', on_delete=models.CASCADE, null=False,
                                     primary_key=True)

    def __str__(self):
        user = self.user_info
        role = user.role
        r = ''
        match role:
            case Role.GIANGVIEN:
                r = 'Giảng viên'
            case Role.GIAOVUKHOA:
                r = 'Giáo vụ khoa'
        return r + ' ' + self.user_info.name


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


class Council(BaseModel):
    name = models.CharField(max_length=255)
    president = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='president_council')
    secretary = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='secretary_council')
    reviewer = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='reviewer_council')
    members = models.ManyToManyField(Employee, related_name='members_council')
    thesis = models.ManyToManyField('Thesis', related_name='thesis_council')

    def __str__(self):
        return self.name


class Thesis(BaseModel):
    title = models.CharField(max_length=255)
    students = models.ManyToManyField(Student, related_name='students_thesis')
    advisors = models.ManyToManyField(Lecture, related_name='advisors_thesis')
    reviewer = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='reviewer_thesis')
    council = models.ForeignKey(Council, on_delete=models.CASCADE, related_name='council_thesis')
    file_thesis = models.FileField(upload_to='static/file_thesis', blank=True)
    date_defend = models.DateField()
    is_defend = models.BooleanField(default=False)


class Criteria(BaseModel):
    name = models.CharField(max_length=255)
    criteria1 = RichTextField()
    criteria2 = RichTextField()
    criteria3 = RichTextField()


class Score(BaseModel):
    thesis = models.ForeignKey(Thesis, on_delete=models.CASCADE, related_name='thesis_score')
    council = models.ForeignKey(Council, on_delete=models.CASCADE, related_name='council_score')
    score = models.DecimalField(max_digits=5, decimal_places=2)
    criteria = models.JSONField(default=dict)
