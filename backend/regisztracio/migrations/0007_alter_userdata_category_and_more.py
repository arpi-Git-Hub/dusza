# Generated by Django 5.1.3 on 2024-11-09 12:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        ('regisztracio', '0006_remove_userdata_last_login_remove_userdata_password_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.category'),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='programming_language',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.programminglanguage'),
        ),
    ]
