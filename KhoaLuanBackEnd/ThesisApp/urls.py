from django.urls import path, include
from . import views, admin
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('user', views.UserViewSet, basename='user')
routers.register('thesis', views.ThesisViewSet, basename='thesis')
routers.register('council', views.CouncilViewSet, basename='council')
routers.register('score', views.ScoreViewSet, basename='score')
routers.register('criteria', views.CriteriaViewSet, basename='criteria')

urlpatterns = [
    path('', include(routers.urls)),
    path('admin/', admin.admin_site.urls),
]
