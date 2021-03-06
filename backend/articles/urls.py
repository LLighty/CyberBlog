from django.urls import path, include
from rest_framework.routers import DefaultRouter
from articles import views


router = DefaultRouter()
router.register(r'articles', views.PostView, 'article')
router.register(r'tags', views.TagView, 'tags')
router.register(r'comments', views.CommentView, 'comments')

urlpatterns = [
    path('', include(router.urls)),
    path('<slug>/comment/', views.comment_post_api),
    path('tags/<slug>/', views.find_tag_posts)
]