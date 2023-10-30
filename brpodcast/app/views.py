from django.shortcuts import render

from .models import Episode
from django.http import HttpResponse
# Create your views here.

def about_page(request):
    return render(request,"about_page.html")




def landing_page(request):
    episodes = Episode.objects.all()
    return render(request,"testing_spiral.html",{'episodes': episodes })

def episode_list(request,episode_id=1):
    episodes = Episode.objects.all()
    return render(request,"episode_list.html",{'episodes': episodes })

