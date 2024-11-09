from django.urls import path
from .views import TeamData, CategoryList, ProgrammingLanguageList, AddCategory, AddProgrammingLanguage

urlpatterns = [
    path('team-data/', TeamData.as_view(), name='team-data'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('programming-languages/', ProgrammingLanguageList.as_view(), name='programming-language-list'),
    path('categories/add/', AddCategory.as_view(), name='add-category'),
    path('programming-languages/add/', AddProgrammingLanguage.as_view(), name='add-programming-language'),
]
