from django.urls import path
from . import views

urlpatterns = [
    # ... (other URL patterns)
    path('saveSelfReview/', views.save_self_review, name='save_self_review'),
]