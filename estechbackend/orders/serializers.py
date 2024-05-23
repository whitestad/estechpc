from rest_framework import serializers
from .models import Basket, BasketItem

from products.serializers import ProductSerializer


class BasketItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = BasketItem
        fields = ['id', 'product', 'quantity']


class BasketSerializer(serializers.ModelSerializer):
    items = BasketItemSerializer(many=True, read_only=True)

    class Meta:
        model = Basket
        fields = ['id', 'user', 'items']