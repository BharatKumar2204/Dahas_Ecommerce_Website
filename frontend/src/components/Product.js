import React from 'react'
import { Card } from 'react-bootstrap';
import Rating from './Rating'
import { Link } from 'react-router-dom'
function Product({product}) {
  return (
    <Card className='my-1 p-1 rounded'>
       <Link to={'/product/'+product._id}>
           <Card.Img src={product.image}/>
       </Link>
       <Card.Body>
       <Link to={'/product/'+product._id}>
           <Card.Title as="div">
            <strong className='clamp-2'>{product.name}</strong>
           </Card.Title>
       </Link>
       <Card.Text as="div">
        <div className='my-3'>
            <Rating value={product.rating} text={product.numReviews +' Reviews'} color={'#f8e825'}/>
        </div>
       </Card.Text>
       <Card.Text as="h5">
        Rs.{product.price}
       </Card.Text>
       </Card.Body>
    </Card>
  )
}

export default Product