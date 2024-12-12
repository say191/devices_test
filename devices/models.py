from django.db import models
from django.contrib.auth.models import User


class DeviceModel(models.Model):
    name = models.CharField(max_length=100, verbose_name='название')
    description = models.TextField(verbose_name='описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'модель'
        verbose_name_plural = 'модели'


class Device(models.Model):
    address = models.CharField(max_length=100, verbose_name='адрес')
    name = models.CharField(max_length=100, verbose_name='название')
    ip_address = models.CharField(max_length=20, verbose_name='ip-адрес')
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='автор')
    model = models.ForeignKey(DeviceModel, on_delete=models.CASCADE, verbose_name='модель')
    comment = models.TextField(blank=True, null=True, verbose_name='комментарий')

    def __str__(self):
        return f"{self.name} - {self.ip_address} - {self.author}"

    class Meta:
        verbose_name = 'устройство'
        verbose_name_plural = 'устройства'
