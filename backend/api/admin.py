from django.contrib import admin
from .models import Category, ProgrammingLanguage

# Register your models here.

admin.site.register(Category)
admin.site.register(ProgrammingLanguage)