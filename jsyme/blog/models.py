from django.contrib.auth.models import User
from django.db import models


class Tag(models.Model):
    title = models.CharField(
        max_length=250,
        blank=True,
        default=""
    )
    
    def __str__(self):
        return self.title
    

class Post(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
    )    
    title = models.CharField(
        max_length=250,
        blank=True,
    )
    content = models.TextField(
        max_length=20000,
        default=""
    )
    tags = models.ManyToManyField(
        Tag,
    )
