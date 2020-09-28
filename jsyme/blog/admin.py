from django.contrib import admin
from .models import Post, Tag


@admin.register(Post, Tag)
class PostAdmin(admin.ModelAdmin):
    pass
