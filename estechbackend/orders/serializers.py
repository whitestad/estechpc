from rest_framework import serializers

from products.models import Product
from .models import Cart, CartItem, OrderItem, Order
from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_amount']

    def get_total_amount(self, obj):
        total = sum(item.product.price * item.quantity for item in obj.items.all())
        return total


class OrderProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'short_characteristics', 'image']

    def get_image(self, obj):
        first_photo = obj.photos.first()
        if first_photo:
            return first_photo.photo.url
        return None

class OrderItemSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'total_price']

    def get_total_price(self, obj):
        return obj.get_total_price()


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    delivery_method_display = serializers.CharField(source='get_delivery_method_display', read_only=True)
    contact_method_display = serializers.CharField(source='get_contact_method_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'updated_at', 'status', 'status_display',
                  'total_price', 'delivery_method', 'delivery_method_display',
                  'contact_method', 'contact_method_display', 'contact_info', 'address', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
