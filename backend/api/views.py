from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from regisztracio.models import UserData
from .models import Category, ProgrammingLanguage

class TeamData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            team_data = UserData.objects.get(user=user)
            return Response({
                'team_name': team_data.team_name,
                'school_name': team_data.school_name,
                'members': [
                    {'name': team_data.member1_name, 'grade': team_data.member1_grade},
                    {'name': team_data.member2_name, 'grade': team_data.member2_grade},
                    {'name': team_data.member3_name, 'grade': team_data.member3_grade}
                ],
                'substitute': {'name': team_data.substitute_name, 'grade': team_data.substitute_grade},
                'teacher_name': team_data.teacher_name,
                'category': team_data.category.name,
                'programming_language': team_data.programming_language.name,
            })
        except UserData.DoesNotExist:
            return Response({'error': 'Team data not found'}, status=404)

    # PUT vagy PATCH metódus hozzáadása a csapatadatok frissítésére
    def put(self, request):
        user = request.user
        try:
            # Frissítjük a csapatadatokat
            team_data = UserData.objects.get(user=user)
            team_data.team_name = request.data.get('team_name', team_data.team_name)
            team_data.school_name = request.data.get('school_name', team_data.school_name)
            team_data.member1_name = request.data.get('members', [{}])[0].get('name', team_data.member1_name)
            team_data.member1_grade = request.data.get('members', [{}])[0].get('grade', team_data.member1_grade)
            team_data.member2_name = request.data.get('members', [{}])[1].get('name', team_data.member2_name)
            team_data.member2_grade = request.data.get('members', [{}])[1].get('grade', team_data.member2_grade)
            team_data.member3_name = request.data.get('members', [{}])[2].get('name', team_data.member3_name)
            team_data.member3_grade = request.data.get('members', [{}])[2].get('grade', team_data.member3_grade)
            team_data.substitute_name = request.data.get('substitute', {}).get('name', team_data.substitute_name)
            team_data.substitute_grade = request.data.get('substitute', {}).get('grade', team_data.substitute_grade)
            team_data.teacher_name = request.data.get('teacher_name', team_data.teacher_name)
            team_data.category.name = request.data.get('category', team_data.category.name)
            team_data.programming_language.name = request.data.get('programming_language', team_data.programming_language.name)

            team_data.save()  # Mentsük el az új adatokat

            return Response({"message": "Team data updated successfully!"}, status=status.HTTP_200_OK)

        except UserData.DoesNotExist:
            return Response({'error': 'Team data not found'}, status=404)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Category, ProgrammingLanguage
from django.http import JsonResponse

# Kategóriák lekérése
class CategoryList(APIView):
    permission_classes = [AllowAny]  # Bárki hozzáférhet

    def get(self, request):
        categories = Category.objects.all()
        categories_list = [{"id": category.id, "name": category.name} for category in categories]
        return JsonResponse({
            "status": "Ok",
            "categories": categories_list
        }, status=200)

# Programozási nyelvek lekérése
class ProgrammingLanguageList(APIView):
    permission_classes = [AllowAny]  # Bárki hozzáférhet

    def get(self, request):
        languages = ProgrammingLanguage.objects.all()
        languages_list = [{"id": language.id, "name": language.name} for language in languages]
        return JsonResponse({
            "status": "Ok",
            "programmingLanguages": languages_list
        }, status=200)
    
# Kategóriák hozzáadása
class AddCategory(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_staff:
            return JsonResponse({
                "status": "Error",
                "error": "Unauthorized access",
            }, status=403)

        data = request.data
        category_name = data.get('name')

        if not category_name:
            return JsonResponse({
                "status": "Error",
                "error": "Category name is required",
            }, status=400)

        # Ellenőrizzük, hogy már létezik-e a kategória
        if Category.objects.filter(name=category_name).exists():
            return JsonResponse({
                "status": "Error",
                "error": "Category already exists",
            }, status=400)

        # Hozzáadjuk az új kategóriát
        category = Category.objects.create(name=category_name)
        return JsonResponse({
            "status": "Ok",
            "message": f"Category '{category_name}' added successfully",
        }, status=201)

# Programozási nyelvek hozzáadása
class AddProgrammingLanguage(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_staff:
            return JsonResponse({
                "status": "Error",
                "error": "Unauthorized access",
            }, status=403)

        data = request.data
        language_name = data.get('name')

        if not language_name:
            return JsonResponse({
                "status": "Error",
                "error": "Programming language name is required",
            }, status=400)

        # Ellenőrizzük, hogy már létezik-e a programnyelv
        if ProgrammingLanguage.objects.filter(name=language_name).exists():
            return JsonResponse({
                "status": "Error",
                "error": "Programming language already exists",
            }, status=400)

        # Hozzáadjuk az új programozási nyelvet
        language = ProgrammingLanguage.objects.create(name=language_name)
        return JsonResponse({
            "status": "Ok",
            "message": f"Programming language '{language_name}' added successfully",
        }, status=201)