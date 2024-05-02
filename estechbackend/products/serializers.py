from django.db.models import Avg
from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Product, ProductPhoto, ProductReview


class ProductPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPhoto
        fields = ['photo']


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['rating', 'text']


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    photos = ProductPhotoSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    favorites_count = serializers.SerializerMethodField()  # Добавляем новое поле

    class Meta:
        model = Product
        fields = ('title', 'description', 'price', 'photos', 'reviews', 'average_rating', 'favorites_count')

    def get_average_rating(self, obj):
        average = obj.reviews.aggregate(avg_rating=Avg('rating'))['avg_rating']
        return average if average is not None else 0

    def get_favorites_count(self, obj):
        return obj.favoriters.count()
