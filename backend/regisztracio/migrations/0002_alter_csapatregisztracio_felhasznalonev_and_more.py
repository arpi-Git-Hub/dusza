# Generated by Django 5.1.3 on 2024-11-08 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regisztracio', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='csapatregisztracio',
            name='felhasznalonev',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='csapatregisztracio',
            name='jelszo',
            field=models.CharField(max_length=100),
        ),
    ]