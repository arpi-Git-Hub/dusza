from django import forms
from .models import CsapatRegisztracio


class CsapatRegisztracioForm(forms.ModelForm):
    class Meta:
        model = CsapatRegisztracio
        fields = [
            'felhasznalonev', 'jelszo', 'csapat_nev', 'iskola_nev',
            'csapattag1_nev', 'csapattag1_evfolyam', 'csapattag2_nev', 'csapattag2_evfolyam',
            'csapattag3_nev', 'csapattag3_evfolyam', 'pot_tag_nev', 'pot_tag_evfolyam',
            'felkeszito_tanar', 'kategoria', 'programnyelv'
        ]
        widgets = {
            'jelszo': forms.PasswordInput(),
        }

    def clean(self):
        cleaned_data = super().clean()
        # Itt lehet további validálási logikát hozzáadni
        return cleaned_data
