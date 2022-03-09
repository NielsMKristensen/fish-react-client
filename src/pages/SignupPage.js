// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form className="signupForm" onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <label>Street:</label>
        <input 
          type="text"
          name="street"
          value={street}
          onChange={handleStreet}
        />

        <label>City:</label>
        <input 
          type="text"
          name="city"
          value={city}
          onChange={handleCity}
        />

        <label>Phone number:</label>
        <input 
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
        <br />
        <label >lake owner?
        <input 
          type="checkbox"
          name="ownerCheckbox"
          
          onChange={handleOwnerOfLake}
        />
        </label>


        <br />
        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;
