import React,{useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from "../components/Product"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {useDispatch,useSelector} from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const productList = useSelector(state=>state.productList)
  const{error,loading,products,page,pages} = productList
  let keyword = location.search
  console.log(keyword)
  useEffect(()=>{
     dispatch(listProducts(keyword))     

  },[dispatch,keyword])
  return (
    <div>
      {(!keyword||keyword=='?page=1')&&<ProductCarousel/>}
      
        {products.length!=0  ?<h1>Latest Collections</h1>:''}
        {loading ? <Loader/>
          :error ? <Message varient='danger'>{error}</Message>
            :<div>
            <Row>
            {products.length!=0 ?products.filter(product=>(product.category!='carousel')).map(product =>(
                <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                {<Product product={product}/>}
                </Col>
              )) :<h3>No Products found</h3>}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword}/>
            </div>
        }
        
    </div>
  )
}

export default HomeScreen