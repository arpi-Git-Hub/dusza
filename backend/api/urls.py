from django.urls import path
from .views import TeamData

urlpatterns = [
    path('team-data/', TeamData.as_view(), name='team-data'),
]
