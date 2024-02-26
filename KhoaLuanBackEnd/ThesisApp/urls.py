from django.urls import path, include
from . import views, admin
from rest_framework import routers

from .views import PlotAPIView, UserViewSet, ThesisViewSet, CouncilViewSet

routers = routers.DefaultRouter()
routers.register('user', UserViewSet, basename='user')
routers.register('council', CouncilViewSet, basename='council')
routers.register('thesis', ThesisViewSet, basename='thesis')

urlpatterns = [
    path('', include(routers.urls)),
    path('admin/', admin.admin_site.urls),
    path('plot/', PlotAPIView.as_view(), name='plot-api'),
]
