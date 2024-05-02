from django.db import models

from products.models import Product
from users.models import User


class SameTypeProducts(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()

    class Meta:
        verbose_name = 'группа товаров'
        verbose_name_plural = 'группы товаров'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')

    class Meta:
        verbose_name = 'заказ'
        verbose_name_plural = 'заказы'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    same_type_product = models.OneToOneField(SameTypeProducts, on_delete=models.CASCADE)
    price_at_order = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'единица заказов'
        verbose_name_plural = 'единицы заказов'


class Basket(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='basket')
    products = models.ManyToManyField(SameTypeProducts, related_name='basket')

    class Meta:
        verbose_name = 'корзина'
        verbose_name_plural = 'корзины'

