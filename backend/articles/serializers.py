from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'slug', 'author', 'updated_on', 'content', 'created_on', 'status')