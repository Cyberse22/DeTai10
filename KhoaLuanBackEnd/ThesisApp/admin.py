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


class CouncilAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'is_active', 'created_date', 'updated_date']


class CouncilMembershipAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'council', 'council_role']


class ScoreAdmin(admin.ModelAdmin):
    list_display = ['reviewer', 'thesis']
    readonly_fields = ['score']


admin_site.register(User, UserAdmin)
admin_site.register(Student)
admin_site.register(Lecture)
admin_site.register(Dean)
admin_site.register(CouncilMember)
admin_site.register(Council, CouncilAdmin)
admin_site.register(ThesisRequest)
admin_site.register(Thesis)
admin_site.register(ScoringRubric)
admin_site.register(Score)
admin_site.register(Group)
admin_site.register(Permission)
