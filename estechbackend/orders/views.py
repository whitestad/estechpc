from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Basket, BasketItem, Product
from .serializers import BasketSerializer, BasketItemSerializer


class BasketDetailView(generics.RetrieveAPIView):
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        basket, created = Basket.objects.get_or_create(user=user)
        return basket


class AddProductToBasketView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        basket, created = Basket.objects.get_or_create(user=user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        product = Product.objects.get(id=product_id)
        basket_item, created = BasketItem.objects.get_or_create(basket=basket, product=product)
        if not created:
            basket_item.quantity += int(quantity)
        else:
            basket_item.quantity = int(quantity)
        basket_item.save()

        return Response({'status': 'product added'}, status=status.HTTP_200_OK)


class UpdateBasketItemView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        basket = Basket.objects.get(user=user)
        item_id = request.data.get('item_id')
        quantity = request.data.get('quantity')

        print(request.data)

        try:
            basket_item = BasketItem.objects.get(basket=basket, id=item_id)
            if quantity > 0:
                basket_item.quantity = quantity
                basket_item.save()
            else:
                basket_item.delete()
            return Response({'status': 'item updated'}, status=status.HTTP_200_OK)
        except BasketItem.DoesNotExist:
            return Response({'error': 'item not found'}, status=status.HTTP_404_NOT_FOUND)


class RemoveProductFromBasketView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        basket = Basket.objects.get(user=user)
        item_id = request.data.get('item_id')

        try:
            basket_item = BasketItem.objects.get(basket=basket, id=item_id)
            basket_item.delete()
            return Response({'status': 'product removed'}, status=status.HTTP_200_OK)
        except BasketItem.DoesNotExist:
            return Response({'error': 'item not found'}, status=status.HTTP_404_NOT_FOUND)


class ClearBasketView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        basket = Basket.objects.get(user=user)
        basket.items.all().delete()
        return Response({'status': 'basket cleared'}, status=status.HTTP_200_OK)