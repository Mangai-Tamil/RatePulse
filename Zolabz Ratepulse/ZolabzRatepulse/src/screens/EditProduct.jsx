import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(0)
    const [description, setDescription] = useState('')

    useEffect(() => {
        const getDataById = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products/${id}`)
            setTitle(data.title)
            setEmail(data.email)
            setPassword(data.password)
            setDescription(data.description)

        }

        getDataById()
    }, [id])

    const updateHandler = async (e) => {

        e.preventDefault()

        // update by put request

        const data = {
            title: title,
            email: email,
            password: password,
            description: description,
           

        }

        await axios.put(`http://localhost:8080/api/products/${id}`, data)
        navigate('/products')


    }



    return (
        <>
            <Container className='mt-5 p-2'>
                <h1>Edit Company</h1>
                <hr />

                <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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


                    
                    <Button variant="primary" type="submit">
                        Update Company
                    </Button>
                    
                </Form>
            </Container>
        </>
    )
}

export default EditProduct