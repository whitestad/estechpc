from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver


class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    image = models.ImageField(upload_to='products', blank=True, null=True)

    def __str__(self):
        return f'{self.name}{f' <- {self.parent}' if self.parent else ''}'

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'


class Product(models.Model):
    name = models.CharField(max_length=100)
    short_characteristics = models.TextField(blank=True)
    description = models.TextField(blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='products')
    price = models.IntegerField()

    count = models.IntegerField(default=1)
    count_of_orders = models.IntegerField(default=0)
    count_of_likes = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def add_price_history(self, new_price):
        PriceHistory.objects.create(product=self, price=new_price)

    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'товары'


class Attribute(models.Model):
    # category = models.ForeignKey(Category, related_name='attributes', on_delete=models.CASCADE, blank=True)
    name = models.CharField(max_length=100)
    # description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Характеристика'
        verbose_name_plural = 'Характеристики'


class AttributeValue(models.Model):
    product = models.ForeignKey(Product, related_name='attributes', on_delete=models.CASCADE)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product.name} - {self.attribute.name}: {self.value}"

    class Meta:
        verbose_name = 'Значение характеристики'
        verbose_name_plural = 'Значения характеристики'


class Filter(models.Model):
    category = models.ForeignKey(Category, related_name='filters', on_delete=models.CASCADE)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.category.name} - {self.attribute.name}"

    class Meta:
        verbose_name = 'Фильтр'
        verbose_name_plural = 'Фильтры'


class PriceHistory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price_history')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_changed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.price} on {self.date_changed}"

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
        return f"Photo of {self.product.name}"

    class Meta:
        verbose_name = 'фото товаров'
        verbose_name_plural = 'фотографии товаров'
