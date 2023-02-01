import React,{useState,useEffect} from 'react'
import {Link,useParams,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Alert} from'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails,updateUser} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstance'

function UserEditScreen() {
  const match = useParams()
  const userId=  match.id 
  const [name,setName]=useState('')  
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [isAdmin,setAdmin]=useState(false)
  const dispatch=useDispatch()
  const loc=useLocation()
  const navigate=useNavigate()

  const userDetails = useSelector(state=>state.userDetails)
  const {error,loading,user}=userDetails

  const userUpdate = useSelector(state=>state.userUpdate)
  const {error:errorUpdate,loading:loadingUpdate,success:successUpdate}=userUpdate

  useEffect(()=>{
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      navigate('/admin/userlist')
    }else{
      if(!user.name || user._id !== Number(userId)){
      dispatch(getUserDetails(userId))
      }else{
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone)
      setAdmin(user.isAdmin)
     }
    }  
  },[user,userId,dispatch,successUpdate,navigate])

  const submitHandler = (e)=> {
    e.preventDefault()
    dispatch(updateUser({_id:user._id,name,email,isAdmin,phone}))
  }
  return (
    <div>
        <Link to='/admin/userlist'>
        Go back
        </Link>
    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Alert varient='danger'>{errorUpdate}</Alert>}
      {loading ? <Loader/>:error ? <Alert varient='danger'>{error}</Alert>:(
    <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>
            Mobile Number
          </Form.Label>
          <Form.Control type='number' placeholder='Enter Mobile No.' value={phone} onChange={(e)=>setPhone(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='isadmin' className='mt-3'>
          <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e)=>setAdmin(e.target.checked)}></Form.Check>
        </Form.Group>


        <Button type='submit' variant='primary' className='py-2 mt-2'>Update</Button>
      </Form>
      )}
      

    </FormContainer>
    </div>
  )
}

export default UserEditScreen