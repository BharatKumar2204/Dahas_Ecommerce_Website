from base.models import Product
from base.serializer import ProductSerializer 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger

@api_view(['GET'])
def getProducts(request):
    query=request.query_params.get('keyword')
    if query==None:
        query=''
    products = Product.objects.filter(name__icontains=query)
    page=request.query_params.get('page')
    paginator=Paginator(products,12)
    try:
        products=paginator.page(page)
    except PageNotAnInteger:
        products=paginator.page(1)
    except EmptyPage:
        products=paginator.page(paginator.num_pages) 

    if page==None:
            page=1

    page=int(page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page,'pages':paginator.num_pages})  

@api_view(['GET'])
def getAllProducts(request):
    products = Product.objects.all().order_by('_id')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data) 

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user=request.user
    product = Product.objects.create(
        user=user,
        name='samplename',
        price=0,
        brand='sample brand',
        countInStock_S=0,
        countInStock_M=0,
        countInStock_L=0,
        countInStock_XL=0,
        category='sample',
        description='sample dis'
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data) 

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data=request.data
    product = Product.objects.get(_id=pk)
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.category=data['category']
    product.description=data['description']
    product.countInStock_S=data['countInStock_S']
    product.countInStock_M=data['countInStock_M']
    product.countInStock_L=data['countInStock_L']
    product.countInStock_XL=data['countInStock_XL']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)         

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product deleted')    

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id=data['product_id']   
    product=Product.objects.get(_id=product_id) 
    product.image=request.FILES.get('image')
    product.save()
    return Response("Image was uploaded")