from django.contrib import admin
from .models import Category, Product, ProductPhoto, PriceHistory, Attribute, AttributeValue

admin.site.register(Category)

admin.site.register(Product)
admin.site.register(ProductPhoto)

admin.site.register(Attribute)
admin.site.register(AttributeValue)

admin.site.register(PriceHistory)

