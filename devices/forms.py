from django import forms
from devices.models import Device
from django.core.exceptions import ValidationError
import ipaddress


class DeviceForm(forms.ModelForm):
    class Meta:
        model = Device
        fields = ['address', 'name', 'ip_address', 'model', 'author', 'comment']

    def clean_ip_address(self):
        ip_address = self.cleaned_data.get('ip_address')
        try:
            ipaddress.ip_address(ip_address)
        except ValueError:
            raise ValidationError("Введите корректный IP-адрес.")
        return ip_address
