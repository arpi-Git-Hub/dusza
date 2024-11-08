from django.shortcuts import render, redirect
from .forms import CsapatRegisztracioForm
from django.utils import timezone

def regisztral_csapat(request):
    if request.method == 'POST':
        form = CsapatRegisztracioForm(request.POST)
        if form.is_valid():
            csapat_regisztracio = form.save(commit=False)
            csapat_regisztracio.jelentkezesi_hatarido = timezone.make_aware(timezone.datetime(2024, 12, 31))  # Példa határidő
            csapat_regisztracio.save()
            return redirect('sikeres_regisztracio')
    else:
        form = CsapatRegisztracioForm()
    return render(request, 'regisztracio/regisztral_csapat.html', {'form': form})
