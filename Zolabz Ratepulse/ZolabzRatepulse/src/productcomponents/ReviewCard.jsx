import React from 'react'
import Card from 'react-bootstrap/Card';
import {FaStar} from 'react-icons/fa'
import Rating from './Rating'
const ReviewCard = ({review}) => {
    return (
        <>

            <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '68rem' }}>
           
                <Card.Body>
                    <Card.Title><strong>User: {review.name}</strong></Card.Title>
                    
                   

                    <Card.Text>
                    <Rating value={review.rating}/>
                    
                    </Card.Text>
                    

                    <Card.Text>
                    Description: {review.description}
                    <p>{review.createdAt.substring(0, 10)}</p>
                    </Card.Text>
                  
                   
                </Card.Body>
                  
            </Card>
        </>
    )
}

export default ReviewCard