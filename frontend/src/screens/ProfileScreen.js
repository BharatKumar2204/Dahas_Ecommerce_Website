import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col,Alert,Table} from'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import MiniLoader from '../components/MiniLoader'
import Loader from '../components/Loader'
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstance'
import { listMyOrders } from '../actions/orderActions'
import { logout } from '../actions/userActions'


function ProfileScreen() {
    const [name,setName]=useState('')  
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState('')
  const dispatch=useDispatch()
  const loc=useLocation()
  const navigate=useNavigate()

  const userDetails = useSelector(state=>state.userDetails)
  const {error,loading,user}=userDetails

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
  const {success}=userUpdateProfile

  const orderListMy = useSelector(state=>state.orderListMy)
  const {loading:loadingOrders,error:errorOrders,orders}=orderListMy

  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }else{
        if(!user || !user.name || success || userInfo._id !== user._id){
            dispatch({'type':USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }else{
            setName(user.name)
            setEmail(user.email)
            setPhone(user.phone)
        }
    }
  },[navigate,userInfo,dispatch,user,success])
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  const submitHandler = (e)=> {
    e.preventDefault()
    if(password!=confirmPassword){
        setMessage('Password do not match')
    }else{
        dispatch(updateUserProfile({'id':user._id,'name':name,'email':email,'password':password,'phone':phone}))
        setMessage('')
    }
  }
  return (
    <Row>
        <Col md={4}><h1>User Profile</h1>
        {message&&<Alert variant='danger'>{message} </Alert>}
      {error&&<Alert variant='danger'>{error} </Alert>}
      
      <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control required type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>
            Mobile number
          </Form.Label>
          <Form.Control required type='number' placeholder='Enter Mobile No.' value={phone} onChange={(e)=>setPhone(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mt-3'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control  type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm' className='mt-3'>
          <Form.Label>
           Confirm Password
          </Form.Label>
          <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='py-2 mt-2'>{loading ? <MiniLoader/>:'Update'}</Button>
      </Form>

      <Button   variant='primary' className='py-2 mt-2' onClick={logoutHandler}>Logout</Button>
      </Col>
        <Col md={8}>
          <h1>My Orders </h1>
          {loadingOrders?(
            <Loader/>
          ):errorOrders?(
            <Alert variant='danger'>{errorOrders}</Alert>
          ):(
            <Table striped responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order=>(
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>Rs.{order.totalPrice}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm'>View</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
    </Row>
  )
}

export default ProfileScreen