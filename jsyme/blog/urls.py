from django.urls import path
from . import views

urlpatterns = [
    path('tags/view/', views.TagView.as_view(), name="tags"),
    path('post/view/', views.PostView.as_view(), name="view_post"),
    path('post/create/', views.PostCreate.as_view(), name="create_post"),
]