from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('admin-dashboard/', views.AdminDashboard.as_view(), name='admin-dashboard'),
    path('admin-dashboard/<str:username>/', views.EditTeam.as_view(), name='edit-team'),
]