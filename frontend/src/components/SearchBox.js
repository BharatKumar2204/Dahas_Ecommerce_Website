import React,{useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Form,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function SearchBox() {
    const[keyword,setKeyword]=useState('')
    const location=useLocation()
    const navigate=useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(location.pathname)
        }
    }
  return (
    
        <Form onSubmit={submitHandler} className='d-flex '>
            <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>search</Button>
        </Form>
    
  )
}

export default SearchBox