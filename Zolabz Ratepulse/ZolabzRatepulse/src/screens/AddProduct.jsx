import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'





const AddProduct = ({ }) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(0);
    const [description, setDescription] = useState('');
    
    const [image, setImage] = useState('')

    const addProductHandler = async (e) => {
        e.preventDefault();

        //const data = {
         //   title: title,
         //   price: price,
         //   description: description,
          //  published: true,
        //};

        const formData = new FormData()

        formData.append('image', image)
        formData.append('title', title)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('description', description)
        

        await axios.post('http://localhost:8080/api/products/addProduct', formData)
        navigate('/products')


    }


    return (
        <>
            <Container className='mt-5 p-2'>
                <h1>Add Company</h1>
                <hr />
                <Form onSubmit={addProductHandler}  method="POST" encType='multipart/form-data'>

                    <Form.Group controlId="fileName" className="mb-3">
                        <Form.Label>Upload Logo</Form.Label>
                        <Form.Control
                            type="file"
                            name='image'
                            onChange={(e) => setImage(e.target.files[0])}
                            size="lg" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
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

                    

                    <Button variant="primary" type="submit">
                        Add Company
                    </Button>


                </Form>
            </Container>

        </>
    )
}

export default AddProduct