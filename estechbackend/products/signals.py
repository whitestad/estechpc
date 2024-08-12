# products/signals.py

from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Favorite, Product


@receiver(pre_save, sender=Product)
def capture_pre_save_price(sender, instance, **kwargs):
    if instance.pk:
        instance._pre_save_price = Product.objects.get(pk=instance.pk).price
    else:
        instance._pre_save_price = None


@receiver(post_save, sender=Product)
def handle_price_history(sender, instance, created, **kwargs):
    if created:
        instance.add_price_history(instance.price)
    elif (hasattr(instance, '_pre_save_price')
          and instance._pre_save_price is not None and instance._pre_save_price != instance.price):
        instance.add_price_history(instance.price)


@receiver(post_save, sender=Favorite)
@receiver(post_delete, sender=Favorite)
def update_favorites_count(sender, instance, **kwargs):
    product = instance.product
    product.count_of_likes = product.favorites.count()
    product.save()
