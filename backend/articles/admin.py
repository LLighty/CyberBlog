from django.contrib import admin
from .models import Post, Comment, Tags

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'content', 'created_on')
    list_filter = ('post', )
    search_fields = ['post', 'created_on']

class TagAdmin(admin.ModelAdmin):
    list_display= ('tag', 'slug')
    prepopulated_fields = {'slug': ('tag',)}

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Tags, TagAdmin)