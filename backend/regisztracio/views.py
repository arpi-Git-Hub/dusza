from json import JSONDecodeError
from django.views.decorators.http import require_http_methods
from django.core.handlers.wsgi import WSGIRequest
import json
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.forms import model_to_dict
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import UserData
from api.models import Category, ProgrammingLanguage
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

# Regisztrációs funkció
@require_http_methods(["POST"])
def register(request: WSGIRequest):
    try:
        data = json.loads(request.body)

        # Kategória és programozási nyelv validálása
        category = Category.objects.get(id=data["category_id"])
        programming_language = ProgrammingLanguage.objects.get(id=data["programming_language_id"])

        new_user = User.objects.create_user(
            username=data["username"],
            password=data["password"],
            is_staff=False
        )
    except IntegrityError:
        return JsonResponse({"status": "Error", "error": "User already exists."}, status=400)
    except Exception as e:
        return JsonResponse({"status": "Error", "error": str(e)}, status=400)

    # UserData modell mentése
    user_data = UserData.objects.create(
        user=new_user,
        team_name=data["team_name"],
        school_name=data["school_name"],
        member1_name=data["member1_name"],
        member1_grade=data["member1_grade"],
        member2_name=data["member2_name"],
        member2_grade=data["member2_grade"],
        member3_name=data["member3_name"],
        member3_grade=data["member3_grade"],
        substitute_name=data.get("substitute_name", ""),
        substitute_grade=data.get("substitute_grade", ""),
        teacher_name=data["teacher_name"],
        category=category,
        programming_language=programming_language
    )

    return JsonResponse({"status": "Ok", "message": "User registered successfully"}, status=201)


# Bejelentkezési funkció
@require_http_methods(["POST"])
def login(request: WSGIRequest):
    request.session.clear_expired()
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({
            "status": "Error",
            "error": "Invalid request body",
        }, status=400)
    
    user = authenticate(request, username=data["username"], password=data["password"])
    if user is None:
        return JsonResponse({
            "status": "Error",
            "error": "Invalid username or password",
        }, status=403)

    auth_login(request, user)

    # JWT tokenek generálása
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # Admin felhasználó esetén ne kérjük le a saját UserData-t
    if user.is_staff:  # Admin felhasználó
        user_data = None
    else:
        # Ha nem admin, akkor kérjük le a UserData rekordot
        try:
            user_data = model_to_dict(UserData.objects.get(user=user))
        except UserData.DoesNotExist:
            user_data = None

    return JsonResponse({
        "status": "Ok",
        "error": None,
        "access": access_token,
        "refresh": str(refresh),
        "user_data": user_data if user_data else {
            "username": user.username,
            "isAdmin": user.is_staff,
        },
    }, status=200)

class AdminDashboard(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: WSGIRequest):
        if not request.user.is_staff:
            return JsonResponse({
                "status": "Error",
                "error": "Unauthorized access",
            }, status=403)

        all_user_data = UserData.objects.all()

        # Összekapcsoljuk a UserData rekordot a User username-jével
        user_data_list = []
        for user_data in all_user_data:
            user_dict = model_to_dict(user_data)
            user_dict["username"] = user_data.user.username  # hozzáadjuk a username-t
            user_data_list.append(user_dict)

        return JsonResponse({
            "status": "Ok",
            "user_data": user_data_list
        }, status=200)
    
class EditTeam(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        """
        Lekéri a csapat adatokat a csapat neve (username) alapján.
        """
        try:
            user_data = UserData.objects.get(user__username=username)
            user_dict = model_to_dict(user_data)
            user_dict["username"] = user_data.user.username  # hozzáadjuk a username-t
            return JsonResponse({
                "status": "Ok",
                "user_data": user_dict
            }, status=200)
        except UserData.DoesNotExist:
            return JsonResponse({
                "status": "Error",
                "error": "User not found"
            }, status=404)

    def put(self, request, username):
        """
        Frissíti a csapat adatokat a csapat neve (username) alapján.
        """
        try:
            user_data = UserData.objects.get(user__username=username)
            # Frissítjük a csapat adatokat az érkező adatokkal
            for key, value in request.data.items():
                setattr(user_data, key, value)
            user_data.save()
            return JsonResponse({
                "status": "Ok",
                "message": "Team data updated successfully"
            }, status=200)
        except UserData.DoesNotExist:
            return JsonResponse({
                "status": "Error",
                "error": "User not found"
            }, status=404)