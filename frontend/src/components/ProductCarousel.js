import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel,Image,Alert } from 'react-bootstrap'
import Loader from './Loader'
import { listAllProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch=useDispatch()

    const product=useSelector(state=> state.product)
    const {error,loading,products}=product

    useEffect(()=>{
        dispatch(listAllProducts())
    },[dispatch])
  return (loading?<Loader/>
  :error
  ? <Alert variant='danger'>{error}</Alert>
  :( 
     <Carousel pause='hover' className='bg-light'>
        {products.filter(product=>(product.category=='carousel')).map(product =>(
            <Carousel.Item key={product._id}>
                 
                    <Image src={product.image} className="d-block w-100" alt={product.name} fluid/>
                    <Carousel.Caption className='carousel.caption d-none'>
                        <h4>{product.name}</h4>
                    </Carousel.Caption>
                
            </Carousel.Item>

        ))}
    </Carousel> 
  )
  )
}

export default ProductCarousel