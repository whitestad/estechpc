from rest_framework import serializers

from .models import ProductReview


class ProductReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    avatar = serializers.CharField(source='author.avatar', read_only=True)

    class Meta:
        model = ProductReview
        fields = ['id', 'username', 'text', 'rating', 'avatar', 'created_at']
