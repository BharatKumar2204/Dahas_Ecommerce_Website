import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col,Alert} from'react-bootstrap'
import MiniLoader from '../components/MiniLoader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'

function LoginScreen() {

  const [email,setEmail]=useState('')

  const [password,setPassword]=useState('')
  const dispatch=useDispatch()
  const loc=useLocation()
  const navigate=useNavigate()
  const redirect = loc.search ? loc.search.split('=')[1]:'/'

  const userLogin = useSelector(state=>state.userLogin)
  const {error,loading,userInfo}=userLogin

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,userInfo,redirect])

  const submitHandler = (e)=> {
    e.preventDefault()
    dispatch(login(email,password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error&&<Alert variant='danger'>{error} </Alert>}
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mt-3'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='py-2 mt-2'>{loading ? <MiniLoader/>: 'Sign In'}</Button>
      </Form>
      <Row className='py-3'>
        <Col>New Customer? <Link to={redirect?'/register?redirect='+redirect:'/register'}>Register</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen