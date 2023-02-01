import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Alert, Col} from'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen() {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [paymentMethod,setPaymentMethod]=useState('online')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer variant='flush'>
        <CheckoutSteps step2 step3 variant='flush'/>
        <Form onSubmit={submitHandler} >
            <Form.Group variant='flush'>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check type='radio' label='Online Payment' id='online' value='Online Payment' name='paymentMethod' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
                <Col>
                <Form.Check disabled type='radio' label='Cash On Delivery' id='offline' value='Cash On Delivery' name='paymentMethods' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen