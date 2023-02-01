import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Alert, Col,Row,ListGroup,Image,Card} from'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
function PlaceOrderScreen() {
    const orderCreate=useSelector(state=>state.orderCreate)
    const{order,error,success}=orderCreate
    
    const cart=useSelector(state=>state.cart)
    console.log(cart)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
    cart.shippingPrice=(cart.itemsPrice>500 ? 0: 40).toFixed(2)
    cart.taxPrice=(0).toFixed(2)
    cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
   
    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
        if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[success,navigate,cart.paymentMethod])

    const placeOrder = ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
        }))
    }
  return (
    <div>
        <CheckoutSteps step2 step3 step4 /> 
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Shipping:</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country}
                            
                        </p>
                        <p><strong>Phone No:</strong>{cart.shippingAddress.phone}</p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length===0?<Alert variant='info'>Your cart is empty</Alert>:(
                            
                            <ListGroup vatiant='flush'>
                                {cart.cartItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={3} xs={4}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                            <Row>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Row>
                                            
                                            <Row>
                                                <Col>
                                                {item.qty} X Rs.{item.price} = Rs.{(item.qty*item.price).toFixed(2)}
                                                </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                    Size = {item.size}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Item:</Col>
                        <Col>Rs.{cart.itemsPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>Rs.{cart.shippingPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>Rs.{cart.taxPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>Rs.{cart.totalPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    {error&&<ListGroup.Item><Alert variant='danger'>{error}</Alert></ListGroup.Item>}

                    <ListGroup.Item>
                    <div className="d-grid gap-1">
                        <Button type='button' className=' btn btn-block' disabled={cart.cartItems.length===0} onClick={placeOrder}>
                            Place Order
                        </Button>
                    </div>    
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen