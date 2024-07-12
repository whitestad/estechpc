from django.db.models import Avg, Count, Q

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product, Category, Filter
from .serializers import ProductSerializer, ProductDetailSerializer, CategorySerializer, CategoryFiltersSerializer, \
    FilterSerializer


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

        attribute_filters = self.request.query_params.getlist('attribute')

        if category_id:
            queryset = queryset.filter(category__id=category_id)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        if attribute_filters:
            q_objects = Q()
            for attr_filter in attribute_filters:
                attribute_id, value = attr_filter.split(':')
                q_objects &= Q(attributes__attribute_id=attribute_id, attributes__value=value)
            queryset = queryset.filter(q_objects)

        queryset = queryset.annotate(
            average_rating=Avg('reviews__rating'),
            count_of_reviews=Count('reviews')
        ).order_by('id')

        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.request.query_params.get('include_reviews') == 'true':
            return ProductDetailSerializer
        return super().get_serializer_class()


class CategoryFiltersView(APIView):
    def get(self, request, category_id):
        try:
            category = Category.objects.get(pk=category_id)
            filters = Filter.objects.filter(category=category)
            serializer = FilterSerializer(filters, many=True)
            return Response({
                "id": category.id,
                "name": category.name,
                "filters": serializer.data
            })
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=404)