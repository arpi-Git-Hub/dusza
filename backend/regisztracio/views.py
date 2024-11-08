from json import JSONDecodeError
from django.views.decorators.http import require_http_methods
from django.core.handlers.wsgi import WSGIRequest
import json
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserData
from django.forms import model_to_dict
from django.contrib.auth.models import User
from django.db import IntegrityError

@require_http_methods(["POST"])
def register(request: WSGIRequest):
    try:
        data = json.loads(request.body)
        new_user = User.objects.create_user(
            username=data["username"],
            password=data["password"],
            is_staff=False
        )
    except IntegrityError:
        return JsonResponse({"error": "User with this username already exists"}, status=403)

    UserData.objects.create(
        user=new_user,
        team_name=data["team_name"],
        school_name=data["school_name"],
        member1_name=data["member1_name"],
        member1_grade=data["member1_grade"],
        member2_name=data["member2_name"],
        member2_grade=data["member2_grade"],
        member3_name=data["member3_name"],
        member3_grade=data["member3_grade"],
        substitute_name=data.get("substitute_name"),
        substitute_grade=data.get("substitute_grade"),
        teacher_name=data["teacher_name"],
        category=data["category"],
        programming_language=data["programming_language"],
    )

    return JsonResponse({"status": "Ok"}, status=200)


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

    # Válaszban küldd vissza az access és refresh tokeneket, valamint a felhasználói adatokat
    return JsonResponse({
        "status": "Ok",
        "error": None,
        "access": access_token,  # Az access token
        "refresh": str(refresh),  # A refresh token
        "user_data": model_to_dict(UserData.objects.get(user=user)),
    }, status=200)


