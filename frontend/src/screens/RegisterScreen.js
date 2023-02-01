import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col,Alert} from'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

function RegisterScreen() {
  const [name,setName]=useState('')  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState()
  const [confirmPassword,setConfirmPassword]=useState('')
  const [message,setMessage]=useState('')
  const dispatch=useDispatch()
  const loc=useLocation()
  const navigate=useNavigate()
  const redirect = loc.search ? loc.search.split('=')[1]:'/'

  const userRegister = useSelector(state=>state.userRegister)
  const {error,loading,userInfo}=userRegister

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,userInfo,redirect])

  const submitHandler = (e)=> {
    e.preventDefault()
    if(password!=confirmPassword){
        setMessage('Password do not match')
    }else{
    dispatch(register(name,email,password,phone))
    }
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message&&<Alert variant='danger'>{message} </Alert>}
      {error&&<Alert variant='danger'>{error} </Alert>}
      {loading&&<Loader/>}
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

        <Form.Group controlId='Phone'>
          <Form.Label>
            Mobile Number
          </Form.Label>
          <Form.Control required type='number' placeholder='Enter Mobile no.' max={10} value={phone} onChange={(e)=>setPhone(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mt-3'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm' className='mt-3'>
          <Form.Label> 
           Confirm Password
          </Form.Label>
          <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='py-2 mt-2'>Register</Button>
      </Form>
      <Row className='py-3'>
        <Col>Have an Account? <Link to={redirect?'/login?redirect='+redirect:'/login'}>Sign In</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen