from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('regisztracio.urls')),
    path('api/', include('api.urls')),
]
