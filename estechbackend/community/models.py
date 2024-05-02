from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from products.models import Product
from users.models import User


class BaseComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class WithAnswer(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    class Meta:
        abstract = True

    def is_root_comment(self):
        return self.parent is None


class ProductReview(BaseComment):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return f"отвзыв {self.product.title} ({self.rating}/5)"

    class Meta:
        verbose_name = 'отзыв товаров'
        verbose_name_plural = 'отзывы товаров'

        ordering = ['-rating']


class ProductReviewComment(BaseComment):
    review = models.ForeignKey(ProductReview, on_delete=models.CASCADE, related_name='answers')

    def __str__(self):
        return f'ответ на {self.review}, "{self.text}"'

    class Meta:
        verbose_name = 'ответ на отзывы'
        verbose_name_plural = 'ответы на отзывы'


class ProductComment(BaseComment, WithAnswer):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_comments')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')

    class Meta:
        verbose_name = 'комментарие товаров'
        verbose_name_plural = 'комментарии товаров'


class UserComment(BaseComment, WithAnswer):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='self_comments')

    class Meta:
        verbose_name = 'комментарие пользователей'
        verbose_name_plural = 'комментарии пользователей'


