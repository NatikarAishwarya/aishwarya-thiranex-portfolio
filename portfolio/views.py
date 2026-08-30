from django.contrib import messages
from django.shortcuts import render, redirect
from .models import ContactMessage

def home(request): return render(request,'portfolio/index.html')
def about(request): return render(request,'portfolio/about.html')
def projects(request): return render(request,'portfolio/projects.html')
def skills(request): return render(request,'portfolio/skills.html')
def contact(request):
    if request.method=='POST':
        name=request.POST.get('name','').strip(); email=request.POST.get('email','').strip(); subject=request.POST.get('subject','').strip(); message=request.POST.get('message','').strip()
        if not all([name,email,subject,message]):
            messages.error(request,'Please complete all fields before sending your message.')
        else:
            ContactMessage.objects.create(name=name,email=email,subject=subject,message=message)
            messages.success(request,'Thanks! Your message has been received successfully.')
            return redirect('contact')
    return render(request,'portfolio/contact.html')
