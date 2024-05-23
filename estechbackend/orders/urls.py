from django.urls import path
from .views import BasketDetailView, AddProductToBasketView, UpdateBasketItemView, RemoveProductFromBasketView, ClearBasketView

urlpatterns = [
    path('basket/', BasketDetailView.as_view(), name='basket-detail'),
    path('basket/add/', AddProductToBasketView.as_view(), name='basket-add-product'),
    path('basket/update/', UpdateBasketItemView.as_view(), name='basket-update-item'),
    path('basket/remove/', RemoveProductFromBasketView.as_view(), name='basket-remove-product'),
    path('basket/clear/', ClearBasketView.as_view(), name='basket-clear'),
]
