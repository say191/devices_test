from django.contrib import admin
from devices.models import DeviceModel, Device
from django.templatetags.static import static
from devices.forms import DeviceForm


class DeviceAdmin(admin.ModelAdmin):
    form = DeviceForm
    list_display = ('name', 'ip_address', 'address', 'author', 'model', 'comment')
    search_fields = ('name',)

    class Media:
        js = (static('js/dadata.js'),)


admin.site.register(DeviceModel)
admin.site.register(Device, DeviceAdmin)
