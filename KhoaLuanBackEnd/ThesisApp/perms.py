from django.db import IntegrityError
from rest_framework import permissions
from django.contrib.auth.models import Group


class OwnerAuthenticated(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        print(obj.student)
        return self.has_permission(request, view) and request.user in obj.student


class IsStudentOfThesis(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.students.all()


class RolePermissions(permissions.IsAuthenticated):
    def __init__(self, role):
        self.role = role

        try:
            group, _ = Group.objects.get_or_create(name=role)
        except IntegrityError:
            pass

    def has_permission(self, request, view):
        # Group permissions
        group = Group.objects.get(name=self.role)
        group_permissions = {permission.codename for permission in group.permissions.all()}
        user_permissions = request.user.get_all_permissions()
        user_perms_normalization = {permission_codename.split('.')[1] for permission_codename in user_permissions}

        for perm in group_permissions:
            if perm not in user_perms_normalization:
                return False

        # User permissions
        user_permissions = request.user.get_all_permissions()
        user_permissions_normalization = {permission_codename.split(
            '.')[1] for permission_codename in user_permissions}

        for perm in group_permissions:
            if perm not in user_permissions_normalization:
                return False

        return True


class DeanPermissions(RolePermissions):
    def __init__(self):
        super().__init__('Dean')


class StudentPermissions(RolePermissions):
    def __init__(self):
        super().__init__('Student')


class LecturePermissions(RolePermissions):
    def __init__(self):
        super().__init__('Lecture')
