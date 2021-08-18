from django.db import models
from rest_framework import serializers, status
from rest_framework.fields import CurrentUserDefault
from .models import Post, Comment, Tags

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'updated_on', 'content', 'created_on', 'status', 'tags')
        read_only_fields = ('author', 'updated_on', 'created_on', 'tags')

    def create(self, validated_data):
        post = Post()
        post.title = validated_data['title']
        post.slug = validated_data['slug']
        post.author = self.context['request'].user
        post.content = validated_data['content']
        post.status = validated_data['status']

        post.save()
        return post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'post','author','content', 'created_on')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'