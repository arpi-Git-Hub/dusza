from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone


class CsapatRegisztracio(models.Model):
    KATEGORIAK = [
        ('junior', 'Junior'),
        ('senior', 'Senior'),
        ('open', 'Nyílt'),
    ]

    PROGRAMNYELVEK = [
        ('python', 'Python'),
        ('java', 'Java'),
        ('c++', 'C++'),
        ('javascript', 'JavaScript'),
    ]

    felhasznalonev = models.CharField(max_length=50)
    jelszo = models.CharField(max_length=50)  # Valós alkalmazásban használjunk erősebb titkosítást!
    csapat_nev = models.CharField(max_length=100)
    iskola_nev = models.CharField(max_length=100)
    csapattag1_nev = models.CharField(max_length=100)
    csapattag1_evfolyam = models.IntegerField()
    csapattag2_nev = models.CharField(max_length=100)
    csapattag2_evfolyam = models.IntegerField()
    csapattag3_nev = models.CharField(max_length=100)
    csapattag3_evfolyam = models.IntegerField()
    pot_tag_nev = models.CharField(max_length=100, blank=True, null=True)  # Opcionális mező
    pot_tag_evfolyam = models.IntegerField(blank=True, null=True)  # Opcionális mező
    felkeszito_tanar = models.CharField(max_length=100)
    kategoria = models.CharField(max_length=20, choices=KATEGORIAK)
    programnyelv = models.CharField(max_length=20, choices=PROGRAMNYELVEK)
    jelentkezesi_hatarido = models.DateTimeField()  # Jelentkezési határidő dátuma

    def clean(self):
        """Ellenőrzi, hogy a jelentkezés a határidő előtt történjen."""
        if timezone.now() > self.jelentkezesi_hatarido:
            raise ValidationError("A jelentkezési határidő lejárt.")

    def __str__(self):
        return f"Csapat {self.csapat_nev} - {self.kategoria}"
