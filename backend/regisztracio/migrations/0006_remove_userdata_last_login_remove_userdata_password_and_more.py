# Generated by Django 5.1.3 on 2024-11-08 20:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regisztracio', '0005_remove_userdata_registration_deadline_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdata',
            name='last_login',
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='password',
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='username',
        ),
        migrations.AddField(
            model_name='userdata',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='member1_grade',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='member1_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='member2_grade',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='member2_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='member3_grade',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='member3_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='substitute_grade',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
