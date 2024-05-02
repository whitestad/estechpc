from django.contrib import admin
from .models import Category, Product, ProductPhoto, PriceHistory

admin.site.register(Category)

admin.site.register(Product)
admin.site.register(ProductPhoto)

admin.site.register(PriceHistory)

