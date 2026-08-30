from django.contrib import admin
from django.urls import path
from portfolio import views
urlpatterns = [path('admin/', admin.site.urls), path('', views.home, name='home'), path('about/', views.about, name='about'), path('projects/', views.projects, name='projects'), path('skills/', views.skills, name='skills'), path('contact/', views.contact, name='contact')]
