from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Tag(models.Model):
    title = models.CharField(
        max_length=250,
        blank=True,
        default=""
    )
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.title

    def __repr__(self):
        return self.title if self.title else self.id
    

class Post(models.Model):
    image = models.ImageField(
        blank=True,
        null=True,
        upload_to='post-imgs/'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )    
    title = models.CharField(
        max_length=250,
        blank=True,
    )
    slug = models.CharField(
        max_length=250,
        blank=True,
    )
    description = models.CharField(
        max_length=1250,
        blank=True,
    )
    content = models.TextField(
        max_length=20000,
        default=""
    )
    tags = models.ManyToManyField(
        Tag,
    )
    created_on = models.DateTimeField(
        blank=True,
        default=timezone.now,
    )
    expires_on = models.DateTimeField(
        blank=True,
        null=True,
    )

    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)
