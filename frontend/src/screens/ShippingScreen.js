import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Alert} from'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'
import { getUserDetails } from '../actions/userActions'

function ShippingScreen() {

    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userDetails = useSelector(state=>state.userDetails)
    const {user}=userDetails
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const {shippingAddress}=cart
    const [address,setAddress]=useState(shippingAddress.address) 
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)
    const [phone,setPhone]=useState(user.phone)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country,phone}))
        navigate('/payment')
    }

    useEffect(()=>{
      if(!userInfo){
        navigate('/login')
      }else{
          if(!user || !user.name ||  userInfo._id !== user._id){
              
              dispatch(getUserDetails('profile'))
             
          }else{
              setPhone(user.phone)
          }
      }
    },[navigate,userInfo,dispatch,user ])
  return (
    <FormContainer>
      <CheckoutSteps step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
          <Form.Label>
            Address
          </Form.Label>
          <Form.Control required type='text' placeholder='Enter Address' value={address ? address : ''} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>
            City
          </Form.Label>
          <Form.Control required type='text' placeholder='Enter City' value={city? city : ''} onChange={(e)=>setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>
            Postal Code
          </Form.Label>
          <Form.Control required type='text' placeholder='Enter PostalCode' value={postalCode ? postalCode : ''} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>
            Country
          </Form.Label>
          <Form.Control required type='text' placeholder='Enter Country' value={country ? country : ''} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>
            Mobile Number
          </Form.Label>
          <Form.Control required type='number' placeholder='Enter Mobile Number' value={phone?phone:'' } onChange={(e)=>setPhone(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen