from cloudinary.models import CloudinaryField
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class BaseModel(models.Model):
    created_date = models.DateField(auto_now=True)
    updated_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


# User Models
class User(AbstractUser):
    ROLES = (
        ('Student', 'Sinh Viên'),
        ('Lecture', 'Giảng Viên'),
        ('Dean', 'Giáo vụ khoa'),
        ('Manager', 'manager')
    )
    role = models.CharField(max_length=255, choices=ROLES, null=False)
    avatar = CloudinaryField(default='https://res.cloudinary.com/dnjupjumj/image/upload/v1707144420/sv8psa19dfauktio31is.jpg')

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.role + ' ' + self.last_name + ' ' + self.first_name


@receiver(post_save, sender=User)
def add_email_to_user(sender, instance, created, **kwargs):
    if created:
        email = 'kietnguyen2226@gmail.com'
        instance.email = email
        instance.save()


class Student(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': 'Student'})

    def __str__(self):
        return f'{self.student.role} {self.student.last_name} {self.student.first_name}'


class Lecture(models.Model):
    lecture = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': 'Lecture'})

    def __str__(self):
        return f'{self.lecture.role} {self.lecture.last_name} {self.lecture.first_name}'


class Dean(models.Model):
    dean = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': 'Dean'})

    def __str__(self):
        return f'{self.dean.role} {self.dean.last_name} {self.dean.first_name}'


class CouncilMember(models.Model):
    ROLES = [
        ('Chairman', 'Chủ tịch'),
        ('Secretary', 'Thư ký'),
        ('Reviewer', 'Phản biện'),
        ('Member', 'Thành viên'),
    ]
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, null=False)
    council = models.ForeignKey('Council', on_delete=models.CASCADE, related_name='members_council', blank=True, null=True)
    council_role = models.CharField(max_length=255, choices=ROLES, null=False)

    def __str__(self):
        return f'{self.council_role} {self.lecture.lecture}'


class Council(BaseModel):
    name = models.CharField(max_length=255, null=False)
    members = models.ManyToManyField(CouncilMember, related_name='council_members')

    def __str__(self):
        return f'{self.name}'


class ThesisRequest(BaseModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    year = models.IntegerField()

    def __str__(self):
        return f'Yêu cầu khóa luận {self.year} của {self.student.student}'


class ScoringRubric(BaseModel):
    name = models.CharField(max_length=50, null=False)

    def __str__(self):
        return self.name


class Thesis(BaseModel):
    title = models.CharField(max_length=255, null=False)
    year = models.IntegerField(null=False)
    files = models.FileField(upload_to='theses/%Y/%m', blank=True)
    advisors = models.ManyToManyField(Lecture, related_name='advisors_theses')
    students = models.ManyToManyField(Student, related_name='students_theses', blank=True)
    is_defend = models.BooleanField(null=False, default=False)

    def __str__(self):
        return f'{self.title} {self.year}'


class Score(BaseModel):
    presentation = models.FloatField(null=True, blank=True)
    content = models.FloatField(null=True, blank=True)
    attitude = models.FloatField(null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    council_member = models.ForeignKey(CouncilMember, on_delete=models.CASCADE, related_name='review_thesis')
    thesis = models.ForeignKey(Thesis, on_delete=models.CASCADE, related_name='thesis_score')
    score = models.FloatField(null=True)

    def final_score(self):
        self.score = (self.presentation * 0.3) + (self.content * 0.3) + (self.attitude * 0.4)

    def update_score(self, *args, **kwargs):
        self.final_score()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.council_member.user}'