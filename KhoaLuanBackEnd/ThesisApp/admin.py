from django.contrib import admin
from django.utils.safestring import mark_safe
from django.contrib.auth.models import Permission, Group

from .models import *
from django.urls import path


class ThesisAppAdminSite(admin.AdminSite):
    site_header = 'Quản lý khóa luận'


admin_site = ThesisAppAdminSite(name='admin_site')


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'date_joined', 'role', 'major', 'is_active']
    list_filter = ['role', 'major']
    search_fields = ['id', 'first_name', 'last_name']
    readonly_fields = ['avatar']

    def avatar_image(self, obj):
        return mark_safe(
            '<img src="static/{url}" width="120" />'.format(url=obj.image.name)
        )


class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'date_joined', 'role', 'major', 'is_active']
    list_filter = ['role', 'major']
    search_fields = ['id', 'first_name', 'last_name']
    readonly_fields = ['avatar']

    def avatar_image(self, obj):
        return mark_safe(
            '<img src="static/{url}" width="120" />'.format(url=obj.image.name)
        )


class LectureAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'date_joined', 'role', 'major', 'is_active']
    list_filter = ['role', 'major']
    search_fields = ['id', 'first_name', 'last_name']
    readonly_fields = ['avatar']

    def avatar_image(self, obj):
        return mark_safe(
            '<img src="static/{url}" width="120" />'.format(url=obj.image.name)
        )


class FacultyAdminSite(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'date_joined', 'role', 'major', 'is_active']
    list_filter = ['role', 'major']
    search_fields = ['id', 'first_name', 'last_name']
    readonly_fields = ['avatar']

    def avatar_image(self, obj):
        return mark_safe(
            '<img src="static/{url}" width="120" />'.format(url=obj.image.name)
        )


class ThesisAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'active']
    list_filter = ['id', 'students']


admin_site.register(User, UserAdmin)
admin_site.register(Employee)
admin_site.register(Student)
admin_site.register(Lecture)
admin_site.register(FacultyAdmin)
admin_site.register(Thesis)
admin_site.register(Score)
admin_site.register(Criteria)
admin_site.register(Permission)
