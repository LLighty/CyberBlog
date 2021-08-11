from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment, Tags

# Create your views here.

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

@api_view(['GET'])
@permission_classes([AllowAny])
def find_tag_posts(request, slug):
    try:
        tag = get_object_or_404(Tags, slug=slug)
    except Tags.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    articles = Post.objects.filter(tags=tag)
    serializer= PostSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def comment_post_api(request, slug):
    try:
        post = get_object_or_404(Post, slug=slug)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)