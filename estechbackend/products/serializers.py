from rest_framework import serializers

from community.serializers import ProductReviewSerializer
from .models import Product, ProductPhoto


class ProductPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPhoto
        fields = ['photo']


class ProductSerializer(serializers.ModelSerializer):
    photos = ProductPhotoSerializer(many=True, read_only=True)

    average_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'photos', 'average_rating', 'reviews_count']


class ProductDetailSerializer(ProductSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = ProductSerializer.Meta.model
        fields = ProductSerializer.Meta.fields + ['reviews']

    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        return ProductReviewSerializer(reviews, many=True).data
