import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Link } from 'react-router-dom';

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { url } from "../utils/Constants";
import bgvideo from '../../src/assets/bg.mp4';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addUserHandler = async (e) => {
    e.preventDefault();

    //const data = {
     //   title: title,
     //   price: price,
     //   description: description,
      //  published: true,
    //};

    const formData = new FormData()

 
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
  
    

    await axios.post('http://localhost:8080/api/products/addUser', formData)
    navigate('/products')

  }


  return (
    <Container className="d-flex justify-content-center align-items-center ">

<video autoPlay muted loop id='myVideo'>
          <source src={bgvideo} type='video/mp4' />
        </video>

      <Card style={{ maxWidth: "500px", width: "100%", "backgroundColor": "#252e5f", color: "aliceblue", margin: "40px auto" }}>
        <div className="position-relative">
          <div
            className="position-absolute text-center top-50 start-50 translate-middle border border-info p-2 "
            style={{ width: "150px", zIndex: 1, backgroundColor: "#02edda", borderRadius: "2px" }}
          >
            SIGN UP
          </div>
        </div>
        <Card.Body >
          <div
            className="text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              fontSize: "28px",
              margin: "30px auto 10px",
              backgroundColor: "#02edda",
            }}
          >
            <img
              src="./avtar.png"
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <Form onSubmit={addUserHandler}  method="POST" encType='multipart/form-data'>


            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name} onChange={(e) => setName(e.target.value)}

              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date of Birth"
                name="dob"

              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email} onChange={(e) => setEmail(e.target.value)}

              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary w-100" type="submit" style={{ backgroundColor: "#02edda" }}>
              Signup
            </Button>
          </Form>
          <p className="mt-3 text-center">
            <span className="align-middle">
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register