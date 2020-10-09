from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tag, Post
from .serializers import TagSerializer, PostSerializer
from jsyme import settings


class TagView(APIView):
    def get(self, request, *args, **kwargs):
        all_tags = Tag.objects.filter(is_active=True)
        serialized_tags = TagSerializer(all_tags, many=True)
        if all_tags.exists():
            return Response(serialized_tags.data, status=status.HTTP_200_OK)
        return Response({"error": "no tags"}, status=status.HTTP_202_ACCEPTED)


class PostCreate(APIView):
    authentication_classes = settings.AUTH_CLASSES
    permission_classes = settings.PERM_CLASSES

    def post(self, request, *args, **kwargs):
        blog_post = request.data
        try:
            p = Post.objects.create(
                author=blog_post['author'],
                title=blog_post['title'],
                description=blog_post['description'],
                content=blog_post['content'],
                is_active=blog_post['publish'],
            )
            if 'tags' in blog_post.keys():
                for tag in blog_post['tags']:
                    p.tags.add(tag['id'])
        except KeyError:
            return Response({"error": "missing data for post"}, status=status.HTTP_400_BAD_REQUEST)
        serialized_post = PostSerializer(p)
        return Response(serialized_post.data, status=status.HTTP_200_OK)


class PostView(APIView):
    def get(self, request, *args, **kwargs):
        params = request.GET.keys()
        if 'category' in params:
            cats = request.GET['category'].split(',')
            p = Post.objects.filter(tags__title__in=cats)
            serialized_posts = PostSerializer(p, many=True)
        elif 'slug' in params:
            p = Post.objects.get(slug=request.GET['slug'])
            serialized_posts = PostSerializer(p)
        else:
            p = Post.objects.all()
            serialized_posts = PostSerializer(p, many=True)
        return Response(serialized_posts.data, status=status.HTTP_200_OK)

