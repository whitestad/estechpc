from django.urls import path
from .views import CartDetailView, AddProductToCartView, UpdateCartItemView, RemoveProductFromCartView, ClearCartView, \
    OrderListCreateView, OrderDetailView

urlpatterns = [
    path('cart/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/add/', AddProductToCartView.as_view(), name='cart-add-product'),
    path('cart/update/<int:item_id>/', UpdateCartItemView.as_view(), name='cart-update-item'),
    path('cart/remove/<int:item_id>/', RemoveProductFromCartView.as_view(), name='cart-remove-product'),
    path('cart/clear/', ClearCartView.as_view(), name='cart-clear'),

    path('list/', OrderListCreateView.as_view(), name='order-list-create'),
    path('list/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
]
