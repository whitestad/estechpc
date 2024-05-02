from django.db.models import Avg, Count
from rest_framework import viewsets
from rest_framework.response import Response

from products.models import Product
from .serializers import ProductSerializer, ProductDetailSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.annotate(
        average_rating=Avg('reviews__rating'),
        reviews_count=Count('reviews')
    )
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.request.query_params.get('include_reviews') == 'true':
            return ProductDetailSerializer
        return super().get_serializer_class()

