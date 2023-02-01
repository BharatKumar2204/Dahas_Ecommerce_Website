import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link,useParams,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Alert} from'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails,updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
function ProductEditScreen() {
  const match = useParams()
  const productId=  match.id 
  const [name,setName]=useState('')  
  const [price,setPrice]=useState(0) 
  const [image,setImage]=useState('') 
  const [brand,setBrand]=useState('') 
  const [category,setCategory]=useState('') 
  const [countInStock_S,setCountInStock_S]=useState('')
  const [countInStock_M,setCountInStock_M]=useState('')
  const [countInStock_L,setCountInStock_L]=useState('')
  const [countInStock_XL,setCountInStock_XL]=useState('')
  const [description,setDescription]=useState('') 
  const [uploading,setUploading]=useState(false)
  

  const dispatch=useDispatch()
  const loc=useLocation()
  const navigate=useNavigate()

  const productDetails = useSelector(state=>state.productDetails)
  const {error,loading,product}=productDetails

  const productUpdate = useSelector(state=>state.productUpdate)
  const {error:errorUpdate,loading:loadingUpdate,success:successUpdate}=productUpdate

  useEffect(()=>{

    if(successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET})
        navigate('/admin/productlist')
    }else{
        if(!product.name || product._id !== Number(productId)){
            dispatch(listProductDetails(productId))
            }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock_S(product.countInStock_S)
            setCountInStock_M(product.countInStock_M)
            setCountInStock_L(product.countInStock_L)
            setCountInStock_XL(product.countInStock_XL)
            setDescription(product.description)
           }
    }

       
  },[product,productId,dispatch,navigate,successUpdate])

  const submitHandler = (e)=> {
    e.preventDefault()
    dispatch(updateProduct({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock_S,
        countInStock_M,
        countInStock_L,
        countInStock_XL,
        description

    }))
  }

  const uploadFileHandler= async (e)=>{
    const file = e.target.files[0]
    const formData=new FormData()
    formData.append('image',file)
    formData.append('product_id',productId)
    setUploading(true)
    try{
        const config ={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('/api/products/upload/',formData,config)
        setImage(data)
        setUploading(false)
    }catch(error){
        setUploading(false)
    }
  }
  return (
    <div>
        <Link to='/admin/productlist'>
        Go back
        </Link>
    <FormContainer>
      <h1>Edit Product</h1>

      {loadingUpdate && <Loader/>}
        {errorUpdate && <Alert varient='danger'>{errorUpdate}</Alert>}

      {loading ? <Loader/>:error ? <Alert varient='danger'>{error}</Alert>:(
    <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>
            Price
          </Form.Label>
          <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>
            Image
          </Form.Label>
          <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
          <Form.Control type='file'  label='Choose a File'  onChange={uploadFileHandler}></Form.Control>
          {uploading&&<Loader/>}
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>
            Brand
          </Form.Label>
          <Form.Control type='text' placeholder='Enter Name' value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock_S'>
          <Form.Label>
           Stock_S
          </Form.Label>
          <Form.Control type='number' placeholder='Enter Stock in S' value={countInStock_S} onChange={(e)=>setCountInStock_S(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock_M'>
          <Form.Label>
           Stock_M
          </Form.Label>
          <Form.Control type='number' placeholder='Enter Stock in M' value={countInStock_M} onChange={(e)=>setCountInStock_M(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock_L'>
          <Form.Label>
           Stock_L
          </Form.Label>
          <Form.Control type='number' placeholder='Enter Stock in L' value={countInStock_L} onChange={(e)=>setCountInStock_L(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock_XL'>
          <Form.Label>
           Stock_XL
          </Form.Label>
          <Form.Control type='number' placeholder='Enter Stock in XL' value={countInStock_XL} onChange={(e)=>setCountInStock_XL(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>
            Category
          </Form.Label>
          <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>
            Description
          </Form.Label>
          <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary' className='py-2 mt-2'>Update</Button>
      </Form>
      )}
      

    </FormContainer>
    </div>
  )
}

export default ProductEditScreen