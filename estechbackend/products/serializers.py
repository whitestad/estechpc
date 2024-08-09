from rest_framework import serializers

from community.serializers import ProductReviewSerializer
from .models import Product, ProductPhoto, Category, Attribute, AttributeValue, Filter


class ParentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ChildCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    parent = ChildCategorySerializer(read_only=True)
    children = ChildCategorySerializer(many=True, read_only=True, source='children_set')

    class Meta:
        model = Category
        fields = '__all__'


class ProductPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPhoto
        fields = ['photo']


class ProductSerializer(serializers.ModelSerializer):
    photos = ProductPhotoSerializer(many=True, read_only=True)

    average_rating = serializers.FloatField(read_only=True)
    count_of_reviews = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'short_characteristics', 'description', 'price', 'photos', 'average_rating', 'count', 'count_of_reviews', 'count_of_orders']


class ProductDetailSerializer(ProductSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = ProductSerializer.Meta.model
        fields = ProductSerializer.Meta.fields + ['reviews']

    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        return ProductReviewSerializer(reviews, many=True).data


class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = ['value']

class AttributeSerializer(serializers.ModelSerializer):
    values = serializers.SerializerMethodField()

    class Meta:
        model = Attribute
        fields = ['id', 'name', 'values']

    def get_values(self, obj):
        values = AttributeValue.objects.filter(attribute=obj).values_list('value', flat=True).distinct()
        return values   

class FilterSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='attribute.id')
    name = serializers.ReadOnlyField(source='attribute.name')
    values = serializers.SerializerMethodField()

    class Meta:
        model = Filter
        fields = ['id', 'name', 'values']

    def get_values(self, obj):
        values = AttributeValue.objects.filter(attribute=obj.attribute).values_list('value', flat=True).distinct()
        return values


class CategoryFiltersSerializer(serializers.ModelSerializer):
    filters = FilterSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'filters']
