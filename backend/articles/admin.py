from django.contrib import admin
from .models import Post, Comment

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'content', 'created_on')
    list_filter = ('post', )
    search_fields = ['post', 'created_on']

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)