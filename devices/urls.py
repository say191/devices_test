from django.urls import path, include
from rest_framework.routers import DefaultRouter
from devices.views import DeviceModelViewSet, DeviceViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'devicemodels', DeviceModelViewSet)
router.register(r'devices', DeviceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get-token/', CustomAuthToken.as_view(), name='token-auth'),
]
