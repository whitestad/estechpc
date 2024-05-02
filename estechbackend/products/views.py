from django.shortcuts import render


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('title')
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super(ProductViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context
