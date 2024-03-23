import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import ReviewCard from '../productcomponents/ReviewCard'
import {FaStar} from 'react-icons/fa'
import Rating from '../productcomponents/Rating'

const ProductDetail = () => {


  const { id } = useParams()
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');

  const [productDescription, setproductDescription] = useState('');

  const [productImage, setProductImage] = useState('')

  // review rating  description
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [useremail, setUseremail] = useState('')
  const [description, setDescription] = useState('')





  useEffect(() => {
    


    const getSingleProductData = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/products/getProductReviews/${id}`)
      console.log(data)

      setTitle(data.title)
      setEmail(data.email)

      setproductDescription(data.description)

      setProductImage(data.image)


      // for reviews
      setReviews(data.review)

    }
    getSingleProductData()

  }, [id])

  // handling Delete
 

  // to add review

  const addReviewHandler = async (e) => {

    e.preventDefault()

    let review = {
      product_id: id,
      rating: rating,
      name: name,
      useremail: useremail,
      description: description
    }

  

    await axios.post(`http://localhost:8080/api/products/addReview/${id}`, review)

    alert('Review Submitted!')
    window.location.reload();

  }



  return (
    <>
      <Container className="mt-10 p-4">
        <h1 className="text-center">Company Details</h1>
        <hr />

        <Row>
          <Col md={7} lg={7} sm={7}>
            <Card className='shadow-lg m-3 p-2 rounded '>
              <div className="d-flex justify-content-center align-items-center">
                <Card.Img src={`http://localhost:8080/${productImage}`} fluid
                  style={{ width: '30%' }} />
              </div>
              <Card.Body>

                <Card.Title>Company: {title} </Card.Title>

                <Card.Text>
                  Email Id: {email}
                </Card.Text>

                

                <Card.Text>
                  Description: {productDescription}
                </Card.Text>
                <br />


             

              </Card.Body>
            </Card>
          </Col>

          <Col md={4} lg={5} sm={4}>

            <h2 className='text-center'>Add Review</h2>
            <hr />

            <Form onSubmit={addReviewHandler}>


              <Form.Group className="mb-3" controlId="rating">
              <div>
                       <label htmlFor="rating">Rating</label>
                       <select id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                           <option value="">Select</option>
                           <option value="1">1- Bad</option>
                           <option value="2">2- Fair</option>
                           <option value="3">3- Good</option>
                           <option value="4">4- Very good</option>
                           <option value="5">5- Excelent</option>

                       </select>
                     </div>
                     </Form.Group>


              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="useremail">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
                  type="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                />
              </Form.Group>

              <div className="d-flex justify-content-center ">

                <Button variant="primary" type="submit">
                  POST
                </Button>
              </div>
            </Form>

            <br />

          </Col>
        </Row>

        

        <Row>

          <h2 className='text-center'>Reviews</h2>
          <hr />
          {reviews.length > 0 ? (
            reviews.map(review => (
              <row  md={4} lg={4} sm={4} key={review.id} >
          
                <ReviewCard review={review} />
              </row>
            ))
          ) : (
            <p>No reviews for this Company</p>
          )}


        </Row>

      </Container>


    </>
  )
}

export default ProductDetail