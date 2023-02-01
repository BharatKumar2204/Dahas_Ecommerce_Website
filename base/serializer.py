from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
User=get_user_model()

from django.db import models
from django.core.validators import RegexValidator
from .models import Product,Order,OrderItem,ShippingAddress,NewUser 


 

class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    #phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")

    class Meta:
        model =User
        fields = ['id','username','email','name','_id','isAdmin', 'phone' ]
    
    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff   

    def get_name(self,obj):
        name=obj.first_name
        if (name==''):
            name=obj.email
        return name     

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields=['id','username','email','name','_id','isAdmin','token', 'phone' ]

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)   

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =Product
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model =ShippingAddress
        fields = '__all__' 
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model =OrderItem
        fields = '__all__'    

class OrderSerializer(serializers.ModelSerializer):
    orderItems=serializers.SerializerMethodField(read_only=True)
    shippingAddress=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =Order
        fields = '__all__'   

    def get_orderItems(self,obj):
        items=obj.orderitem_set.all()
        serializer=OrderItemSerializer(items,many=True)
        return serializer.data

    def get_shippingAddress(self,obj):
        try:
            address=ShippingAddressSerializer(obj.shippingaddress,many=False).data

        except:
            address=False    
        return address   

    def get_user(self,obj):
        user=obj.user
        serializer=UserSerializer(user,many=False)
        return serializer.data    
