from django.urls import path
from .views import ProductReviewViewSet

urlpatterns = [
    path('products/<int:product_id>/reviews/', ProductReviewViewSet.as_view({'get': 'list'}), name='product-reviews'),
]
