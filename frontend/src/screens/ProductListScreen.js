import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Table,Button,Alert,Row,Col} from'react-bootstrap'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { deleteProduct, listProducts, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen() {
    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const productList=useSelector(state=>state.productList)
    const{loading,error,products,pages,page}=productList
    const productDelete=useSelector(state=>state.productDelete)
    const{loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete
    const productCreate=useSelector(state=>state.productCreate)
    const{loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate
    const userLogin=useSelector(state=>state.userLogin)
    const{userInfo}=userLogin
    let keyword = location.search
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            navigate('/login')
        }
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }
        
    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,keyword])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure to delete this product?')){
            
           dispatch(deleteProduct(id))
        }
        
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }
  return (
    <div>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Alert varient='danger'>{errorDelete}</Alert>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Alert varient='danger'>{errorCreate}</Alert>}
        {loading?
        (<Loader/>)
        :error?
        (<Alert variant='danger'>{error}</Alert>)
        :(<div>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>Rs{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit' ></i>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                    <i className='fas fa-trash' ></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
            </div>
        )}
    </div>
  )
}

export default ProductListScreen