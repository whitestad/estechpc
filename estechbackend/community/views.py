from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import ProductReview
from .serializers import ProductReviewSerializer

class ProductReviewViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request, product_id=None):
        """
        Получить список отзывов для указанного продукта.
        """
        reviews = ProductReview.objects.filter(product_id=product_id)
        serializer = ProductReviewSerializer(reviews, many=True)
        return Response(serializer.data)