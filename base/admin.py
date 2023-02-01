from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)

#class CustomUserAdmin(UserAdmin):
#    fieldsets=(
#        *UserAdmin.fieldsets,(
#            'Additional Info',
#            {
#                'fields':(
#                    'phone',
#                )
#            }
#        )
#    )

#admin.site.register(NewUser,CustomUserAdmin)   

fields=list(UserAdmin.fieldsets)
fields[1]=('Personal Info',{'fields':('first_name','last_name','email','phone')})
UserAdmin.fieldsets=tuple(fields)
admin.site.register(NewUser,UserAdmin)
    