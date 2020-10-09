from rest_framework import serializers

from .models import Tag, Post


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    created_on = serializers.SerializerMethodField()
    tags = TagSerializer(many=True)

    def get_created_on(self, post):
        created = post.created_on.strftime('%Y-%m-%d')
        return created
