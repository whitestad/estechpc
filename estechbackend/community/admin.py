from django.contrib import admin

from .models import ProductComment, ProductReview, ProductReviewComment, UserComment


@admin.register(UserComment)
class UserCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'user', 'text', 'created_at')


@admin.register(ProductComment)
class ProductCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'product', 'text', 'created_at')


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'product', 'rating', 'text', 'created_at')


@admin.register(ProductReviewComment)
class ProductReviewCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'review', 'text', 'created_at')

