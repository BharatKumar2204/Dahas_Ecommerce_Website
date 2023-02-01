import React,{useState,useEffect} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { Alert,Row,Col, Image,ListGroup,Button,Card,Form,ToggleButton,ToggleButtonGroup} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useDispatch,useSelector } from 'react-redux'
import {listProductDetails} from '../actions/productActions'


function ProductScreen({history}) {
  const [qty,setQty]  = useState(1)
  const [sizee,setSize]  = useState('')
  const _id = useParams()
  const dispatch=useDispatch() 
  const productDetails= useSelector(state=>state.productDetails) 
  const {loading,error,product}=productDetails

  const[countInStock,setStock]=useState(1)
  const[error_mes,setMes]=useState(false)
  useEffect(()=>{
    
      dispatch(listProductDetails(_id.id))
      
  },[dispatch,_id])
 
  const handleChange=(value,newAlignment)=>{
    if(newAlignment!==null){
        setSize(newAlignment)
    }
    setMes(()=>false)
    setStock(()=>value[0])
    console.log(value[0])
    }
  
  let navigate = useNavigate()
  const addToCartHandler=()=>{
    if(sizee){
        
        navigate('/cart/'+_id.id+'?qty='+qty+'=?size='+sizee.target.value.split(',')[1]+'='+sizee.target.value.split(',')[0])
    }  
    else{
        setMes(()=>true)
    }
  } 
  
  return (
     
    <div>
    <Link to='/' className='btn btn-light my-3'>Go Back</Link>    
        {loading ? <Loader/>
          :error ? <Alert varient='danger'>{error}</Alert>
            : <Row>
            <Col md={4}> 
            <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
    
                    <ListGroup.Item>
                    <Rating value={product.rating} text={product.numReviews +' Ratings'} color={'#f8e825'}/>
                    </ListGroup.Item>
    
                    <ListGroup.Item>
                    Price: Rs {product.price}
                    </ListGroup.Item>
    
                    <ListGroup.Item>
                     Description: {product.description}   
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={'auto'}>
                <Card>
                    <ListGroup varient='flush'>
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                Price:
                                </Col>
                                <Col>
                                <strong>Rs.{product.price}</strong>
                                </Col>
                            </Row>
                         </ListGroup.Item>
    
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                Status:
                                </Col>
                                <Col>
                                {product.countInStock_S+product.countInStock_M+product.countInStock_L+product.countInStock_XL > 0? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                         </ListGroup.Item>

                         <ListGroup.Item>
                            <Row>
                            <Col>Size:</Col>
                            <Col>
                            <ToggleButtonGroup type="radio" name="options" size='sm' value={sizee} onChange={handleChange}>
                              <ToggleButton id="S" value={[product.countInStock_S,'S']} disabled={product.countInStock_S===0 } >
                               S
                              </ToggleButton>
                             <ToggleButton id="tbg-radio-2" value={[product.countInStock_M,'M']} disabled={product.countInStock_M===0 }>
                               M
                             </ToggleButton>
                             <ToggleButton id="tbg-radio-3" value={[product.countInStock_L,'L']} disabled={product.countInStock_L===0 }>
                              L
                             </ToggleButton>
                             <ToggleButton id="tbg-radio-4" value={[product.countInStock_XL,'XL']} disabled={product.countInStock_XL===0 }>
                              XL
                             </ToggleButton>
                         </ToggleButtonGroup>    
                         {error_mes ?<h6>*select a size*</h6>:null}
                      
                            </Col>
                            </Row>
                         </ListGroup.Item>
                         
                         

                         {product.countInStock_S+product.countInStock_M+product.countInStock_L+product.countInStock_XL>0 &&(
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Qty:
                                    </Col>
                                    <Col xs='auto' className='my-1'>
                                    <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                        {
                                            [...Array(countInStock).keys()].map((x)=>(
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))
                                        }            
                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                         )}
    
                         <ListGroup.Item>
                         <div className="d-grid gap-1">
                            <Button onClick={addToCartHandler} className=' btn btn-block' disabled={product.countInStock_S+product.countInStock_M+product.countInStock_L+product.countInStock_XL===0 } type='button'>Add to Cart</Button>
                            </div>
                         </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        }    
    
    
    </div>
  )
}

export default ProductScreen