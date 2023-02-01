import React,{useState,useEffect} from 'react'
import {Link, Navigate, useParams,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Alert, Col,Row,ListGroup,Image} from'react-bootstrap'
import {getOrderDetails,payOrder,deliverOrder} from '../actions/orderActions'
import Loader from '../components/Loader'
import MiniLoader from '../components/MiniLoader'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen() {
    const match=useParams()
    const orderId=match.id
    const navigate=useNavigate()
    const orderDetails=useSelector(state=>state.orderDetails)
    const{order,error,loading}=orderDetails
    const userLogin=useSelector(state=>state.userLogin)
    const{userInfo}=userLogin
    const orderPay=useSelector(state=>state.orderPay)
    const{loading:loadingPay,success:successPay}=orderPay
    const orderDeliver=useSelector(state=>state.orderDeliver)
    const{loading:loadingDeliver,success:successDeliver}=orderDeliver
    const dispatch=useDispatch()
    const [sdkReady,setSdkReady]=useState(false)
    console.log(order)
    if(!loading && !error){
        order.itemsPrice=order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
    }
    //mi = tlhaiO89012357371520
    //mk=  dT@Kq&OY48P4vatE
    const addRasorpayScript=()=>{
        const script=document.createElement('script')
        script.type='text/javascript'
        script.src='https://checkout.razorpay.com/v1/checkout.js'
        script.async=true
        script.onload=()=>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(()=>{

        if(!userInfo){
            navigate('/login')
        }
        if(!order || successPay || order._id!==Number(orderId) || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.Razorpay){
                addRasorpayScript()
            }else{
                setSdkReady(true)
            }
        }
    },[dispatch,order,orderId,successPay,successDeliver])

//    const successPaymentHandler=(paymentResult)=>{
//        dispatch(payOrder(orderId,paymentResult))
//    }

    const deliverHandler=()=>{
        dispatch(deliverOrder(order))
    }

    const handleSubmit = ()=>{
        var options = {
        key: "rzp_test_dShz4kIUcdeP4o",
        key_secret:"pUwPmVi515PDNr5PC6cNMWOc",
        amount: order.totalPrice*100 ,
        currency:"INR",
        name:"Dahas",
        description:"payment",
        handler: function(response){
          dispatch(payOrder(orderId,response.razorpay_payment_id))
        },
        prefill: {
          name:order.user.name,
          email:order.user.email,
        },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme: {
          color:"#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }

    

  return loading?(<Loader/>):error?(<Alert variant='danger'>{error}</Alert>):(
    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        
                        <p>
                            <strong>Shipping:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},
                            {order.shippingAddress.country}
                        </p>
                        <p><strong>Phone No:</strong>{order.shippingAddress.phone}</p>
                        {order.isDelivered?(
                            <Alert variant='success'>Delivered on {order.deliveredAt }</Alert>
                        ):(
                            <Alert variant='warning'>Not Delivered</Alert>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid?(
                            <Alert variant='success'>Paid on {order.paidAt.substring(0,10)}</Alert>
                        ):(
                            <Alert variant='warning'>Not Paid</Alert>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length===0?<Alert variant='info'>Your order is empty</Alert>:(
                            <ListGroup vatiant='flush'>
                                {order.orderItems.map((item,index)=>(
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
                        <Col>Rs.{order.itemsPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>Rs.{order.shippingPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>Rs.{order.taxPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>Rs.{order.totalPrice}</Col>
                    </Row>
                    </ListGroup.Item>

                    {!order.isPaid &&(
                        <ListGroup.Item>
                            {!sdkReady?(<Loader/>):(
                                <div className="d-grid gap-1">
                                <Button type='button' className=' btn btn-block' onClick={handleSubmit} amount={order.totalPrice} >{loadingPay ? <MiniLoader/>: ( <i className="fa fa-credit-card"> Pay</i>)}</Button>
                                </div>
                            )}
                        </ListGroup.Item>
                    )}

                </ListGroup>
                {userInfo&& userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                        <div className="d-grid gap-1">
                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>{loadingDeliver ? <MiniLoader/>: 'Mark As Delivered'}</Button>
                        </div>
                    </ListGroup.Item>
                )}
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen

