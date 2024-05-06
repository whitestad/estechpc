from django.db.models import Avg, Count
from rest_framework import viewsets
from rest_framework.response import Response

from products.models import Product, Category
from .serializers import ProductSerializer, ProductDetailSerializer, CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        category_id = self.request.query_params.get('c')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if category_id:
            queryset = queryset.filter(category__id=category_id)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        queryset = queryset.annotate().annotate(
            average_rating=Avg('reviews__rating'),
            count_of_reviews=Count('reviews')
        ).order_by('id')

        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.request.query_params.get('include_reviews') == 'true':
            return ProductDetailSerializer
        return super().get_serializer_class()

