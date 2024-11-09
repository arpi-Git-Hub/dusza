from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from regisztracio.models import UserData

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
                'category': team_data.category,
                'programming_language': team_data.programming_language,
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
            team_data.category = request.data.get('category', team_data.category)
            team_data.programming_language = request.data.get('programming_language', team_data.programming_language)

            team_data.save()  # Mentsük el az új adatokat

            return Response({"message": "Team data updated successfully!"}, status=status.HTTP_200_OK)

        except UserData.DoesNotExist:
            return Response({'error': 'Team data not found'}, status=404)

