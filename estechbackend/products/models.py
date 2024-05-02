from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver


class Category(models.Model):
    title = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return f'{self.title} <- {self.parent}'

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'


class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.IntegerField()

    count_of_orders = models.IntegerField(default=0)
    count_of_likes = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def add_price_history(self, new_price):
        PriceHistory.objects.create(product=self, price=new_price)


    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'товары'


class PriceHistory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price_history')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_changed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.title} - {self.price} on {self.date_changed}"

    class Meta:
        verbose_name = 'история цен'
        verbose_name_plural = 'истории цен'


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


class ProductPhoto(models.Model):
    product = models.ForeignKey(Product, related_name='photos', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='products_photos')

    def __str__(self):
        return f"Photo of {self.product.title}"

    class Meta:
        verbose_name = 'фото товаров'
        verbose_name_plural = 'фотографии товаров'
