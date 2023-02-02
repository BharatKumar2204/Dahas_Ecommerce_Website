import React,{useState,useEffect} from 'react'
import {Link,useParams,useLocation, unstable_HistoryRouter,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { Row, Col ,ListGroup,Image,Form,Button,Card,Alert } from 'react-bootstrap'
import { listAllProducts } from '../actions/productActions'
import { addToCart,removeFromCart } from '../actions/cartActions'

import Loader from '../components/Loader'

function CartScreen({match,location,history}) {
    const _id = useParams()
    const productId=_id.id
    const loc=useLocation()
    const qty=loc.search ? Number(loc.search.split('=')[1]) : 1
    const size= loc.search.split('=')[3]
    const countInStock=loc.search ? Number(loc.search.split('=')[4]) : 1
    const product = useSelector(state=>state.product)
    const{error,loading,products} = product
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {cartItems}=cart
    
    console.log(products)
    console.log(cartItems)
    useEffect(()=>{
      dispatch(listAllProducts())
      
        if(productId){ 
            dispatch(addToCart(productId,qty,size,countInStock))
          }
        
      
      //cartItems.map(item=>products.filter(prod=>item.product!=prod.id).map(prod=>dispatch(removeFromCart(item.product,item.size))))
      cartItems.map(item=>updateCartHandler(item.product,item.qty,item.size,item.countInStock) ) 
    },[dispatch,productId,qty,size,countInStock]) 
    const removeFromCartHandler=(id,size)=>{ 
      dispatch(removeFromCart(id,size))
    }
    const updateCartHandler=(id,qty,size,stock)=>{ 
      dispatch(addToCart(id,qty,size,stock))
    } 

    console.log()
    const checkoutHandler=()=>{
      
      navigate('/login?redirect=/shipping')
      
    }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length===0 ?(
          <Alert variant='info'>Your Cart is empty <Link to='/'>Go Back</Link></Alert>
        ):(
          <ListGroup variant='flush'>
            
              {cartItems.map(item=>(
                products.filter(prod=>(item.product==prod._id)).map(prod=>(
                <ListGroup.Item key={item.product && item.size} >
                  {prod[`countInStock_${item.size}`]==0 || prod._id!=item.product ? dispatch(removeFromCart(item.product,item.size)):(
                   <Row>
                    <Col xs={5} sm={5}   lg={3} className='d-grid gap-1'>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                      <Row>
                        <Col>
                        
                      <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value),item.size,prod[`countInStock_${item.size}`]))}>
                                        {
                                            [...Array(prod[`countInStock_${item.size}`]).keys()].map((x)=>(
                                                <option key={x+1} value={x+1} className='btn'>Qty: {x+1}</option>
                                            ))
                                        } {prod[`countInStock_${item.size}`]}           
                    </Form.Control>
                    </Col>
                      </Row>
                    </Col>
                        {loading && <Loader/>}
                        {error && <Alert varient='danger'>{error}</Alert>}
                       
                         
                    <Col xs={7} md={7}   sm={6} className='d-grid gap-1 mt-2'>
                      
                      <Row>
                      <Link to={'/product/'+item.product} style={{textDecoration:'none'}} className='clamp pb-0 m-0'><h4 className='clamp pb-0 m-0'>{item.name}</h4></Link>
                      </Row>
                      <Row>
                        <Col><h5 className='mt-2'>Size: {item.size}</h5></Col>
                      
                      </Row>
                      <Row>
                        <Col><h5>Rs.{item.price}</h5></Col>
                      
                      </Row>
                      
                      
                      <Row className='mt-2 '>
                      <div className="d-grid align-self-end">
                      <Button  type='button' varient='light' className=''  onClick={()=>removeFromCartHandler(item.product,item.size)}><h6 className='m-0 p-1'><i className='fas fa-trash'></i>remove</h6></Button>
                      </div>
                    </Row>
                    </Col>
                    
                    
                    
                    
                   </Row>

                   )}
                </ListGroup.Item >
                
              ))))}
          </ListGroup>
          
        )}
        
      </Col>
      
      <Col md={4}>
        <Card>
          <ListGroup varient='flush'>
            <ListGroup.Item>
              <h2>Sub Total({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
              {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
          <div className="d-grid gap-1">
          
            <Button type='button' className='btn btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
             Proceed To Checkout
            </Button>
          
          </div>
          </ListGroup.Item>
          </ListGroup>
          
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen