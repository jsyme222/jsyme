"""jsyme URL Configuration
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from . import settings, views

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin...
    path('authorize/', views.LoginView.as_view(), name='authorize'),  # username and passwd to get token
    path('menu-items/<str:menu>/view/', views.MenuItems.as_view()),  # view menu items [GET]
    path('blog/', include('blog.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + \
              static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
