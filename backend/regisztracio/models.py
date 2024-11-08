from django.contrib.auth.models import User
from django.db import models

class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    team_name = models.CharField(max_length=100)
    school_name = models.CharField(max_length=100)
    member1_name = models.CharField(max_length=100)
    member1_grade = models.CharField(max_length=20)
    member2_name = models.CharField(max_length=100)
    member2_grade = models.CharField(max_length=20)
    member3_name = models.CharField(max_length=100)
    member3_grade = models.CharField(max_length=20)
    substitute_name = models.CharField(max_length=100, blank=True, null=True)
    substitute_grade = models.CharField(max_length=20, blank=True, null=True)
    teacher_name = models.CharField(max_length=100)
    category = models.CharField(max_length=20)
    programming_language = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.username}'s team data"
    

