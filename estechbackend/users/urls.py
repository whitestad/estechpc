from django.urls import include, path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views
from .views import MyTokenObtainPairView, UserProfileView

urlpatterns = [
    path('', views.get_routes),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),

    path('profile/', UserProfileView.as_view(), name='user_profile'),

    path('test/', views.test_end_point, name='test'),
]