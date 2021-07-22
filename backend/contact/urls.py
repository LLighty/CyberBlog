from django.urls import path
from contact import views

urlpatterns = [
    path('contact/', views.api_create_contact_view),
]