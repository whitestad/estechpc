from django.urls import include, path
from rest_framework import routers

from .views import ProductViewSet

router = routers.DefaultRouter()
router.register(r'list', ProductViewSet, basename='products')

urlpatterns = [
    path('', include(router.urls)),

]