import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '@restart/ui/Button';


const ProductCard = ({ product }) => {
  return (
    <>

      <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
        
        <Card.Body>
        <Card.Img src={`http://localhost:8080/${product.image}`} />
          <br/><br/>
          <Card.Title>Company: {product.title} </Card.Title>
          
          <Card.Text>
            Email Id: {product.email}
          </Card.Text>
        
          <Link to={`/product/${product.id}`}>
            <Button>Detail</Button>
          </Link>

        </Card.Body>
      </Card>
    </>
  )
}

export default ProductCard