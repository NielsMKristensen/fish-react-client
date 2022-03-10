// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'

//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [ownerOfLake, setOwnerOfLake] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleOwnerOfLake = (e) => {
     
    setOwnerOfLake(!ownerOfLake);
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = { email, password, name, street, city, phoneNumber, ownerOfLake };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className="App-header">
      <Form className="mb-2 SignupPage" onSubmit={handleSignupSubmit}>
        <Form.Label>Email Adress</Form.Label>
        <Form.Control 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <Form.Label>Street</Form.Label>
        <Form.Control 
          type="text"
          name="street"
          value={street}
          onChange={handleStreet}
        />

        <Form.Label>City</Form.Label>
        <Form.Control 
          type="text"
          name="city"
          value={city}
          onChange={handleCity}
        />

        <Form.Label>Phone number</Form.Label>
        <Form.Control 
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
        
        <Form.Label >lake owner?
        <br />
        <input 
          type="checkbox"
          name="ownerCheckbox"
          onChange={handleOwnerOfLake}
        />
        </Form.Label>
        <br />
        <Button type="submit">Sign Up</Button>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p>Already have account?</p>
        <Link to={"/login"} style={{color: "white"}}> Login</Link> 

      </Form>


    </div>
  )
}

export default SignupPage;
