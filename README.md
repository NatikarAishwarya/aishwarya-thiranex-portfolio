# Aishwarya Natikar — Professional Portfolio

A professional, accessible portfolio built as a small Django full-stack project.

## Stack
- Semantic HTML5 templates
- Modern responsive CSS3
- Vanilla JavaScript
- Django 5.1+
- SQLite (easy to switch to MySQL)

## Features
- Multi-page portfolio: Home, About, Projects, Skills, Contact
- Semantic landmarks and accessible navigation
- Skip link, visible keyboard focus, ARIA menu state and reduced-motion support
- SEO-friendly title and description
- Responsive mobile navigation
- Scroll progress and subtle reveal animations
- Contact form with Django backend, CSRF protection and database persistence
- Django admin for reviewing submitted contact messages

## Run locally
```bash
python -m venv venv
# Windows: venv\\Scripts\\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Open `http://127.0.0.1:8000/`.

To use the admin, create an account with `python manage.py createsuperuser` and open `/admin/`.

## Thiranex Task 1
The project keeps the required focus on semantic HTML5, accessibility, responsive design, SEO and an accessible contact form. The Django layer makes the form functional rather than purely visual.
