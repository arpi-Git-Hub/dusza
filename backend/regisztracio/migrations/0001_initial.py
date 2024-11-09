# Generated by Django 5.1.3 on 2024-11-08 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CsapatRegisztracio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('felhasznalonev', models.CharField(max_length=50)),
                ('jelszo', models.CharField(max_length=50)),
                ('csapat_nev', models.CharField(max_length=100)),
                ('iskola_nev', models.CharField(max_length=100)),
                ('csapattag1_nev', models.CharField(max_length=100)),
                ('csapattag1_evfolyam', models.IntegerField()),
                ('csapattag2_nev', models.CharField(max_length=100)),
                ('csapattag2_evfolyam', models.IntegerField()),
                ('csapattag3_nev', models.CharField(max_length=100)),
                ('csapattag3_evfolyam', models.IntegerField()),
                ('pot_tag_nev', models.CharField(blank=True, max_length=100, null=True)),
                ('pot_tag_evfolyam', models.IntegerField(blank=True, null=True)),
                ('felkeszito_tanar', models.CharField(max_length=100)),
                ('kategoria', models.CharField(choices=[('junior', 'Junior'), ('senior', 'Senior'), ('open', 'Nyílt')], max_length=20)),
                ('programnyelv', models.CharField(choices=[('python', 'Python'), ('java', 'Java'), ('c++', 'C++'), ('javascript', 'JavaScript')], max_length=20)),
                ('jelentkezesi_hatarido', models.DateTimeField()),
            ],
        ),
    ]
