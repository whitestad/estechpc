from django.contrib import admin

from .models import SameTypeProducts, Basket, Order, OrderItem


@admin.register(SameTypeProducts)
class SameTypeProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'count')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'same_type_product', 'price_at_order')


@admin.register(Basket)
class BasketAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')