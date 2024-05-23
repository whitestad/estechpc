from django.contrib import admin

from .models import Basket, BasketItem, Order, OrderItem


@admin.register(BasketItem)
class BasketItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'basket', 'product', 'quantity')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'same_type_product', 'price_at_order')


@admin.register(Basket)
class BasketAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')