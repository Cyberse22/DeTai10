from django.contrib import admin
from django.contrib.auth.models import Permission, Group, User

from .models import *
from django.urls import path


class ThesisAppAdminSite(admin.AdminSite):
    site_header = 'Quản lý khóa luận'


admin_site = ThesisAppAdminSite(name='admin_site')


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'date_joined', 'role', 'is_active']
    list_filter = ['role']
    search_fields = ['id', 'first_name', 'last_name']
    readonly_fields = ['avatar']


class CouncilMembershipAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'council', 'council_role']


class ScoreAdmin(admin.ModelAdmin):
    list_display = ['reviewer', 'thesis']
    readonly_fields = ['score']


class LectureAdmin(admin.ModelAdmin):
    list_display = ['id', 'lecture']


class CouncilAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'get_members_count', 'created_date']

    def get_members_count(self, obj):
        return obj.members.count()

    get_members_count.short_description = 'Members Count'


admin_site.register(User, UserAdmin)
admin_site.register(Student)
admin_site.register(Lecture, LectureAdmin)
admin_site.register(Dean)
admin_site.register(CouncilMember)
admin_site.register(Council, CouncilAdmin)
admin_site.register(ThesisRequest)
admin_site.register(Thesis)
admin_site.register(ScoringRubric)
admin_site.register(Score)
admin_site.register(Group)
admin_site.register(Permission)
