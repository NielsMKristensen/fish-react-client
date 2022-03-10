import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'


//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        storeToken(response.data.authToken); 
        authenticateUser();
        navigate('/');                                
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div className="App">
    <header className="App-header">
          <Form className="mb-3 " onSubmit={handleLoginSubmit}>
            
              <Col md>
              <br/>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Adress</Form.Label>
                  <Form.Control type="email" value={email} onChange={handleEmail} placeholder="example@gmail.com" />
                </Form.Group>
                <br/>
              </Col>
              <Col md>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={handlePassword} placeholder="FishHeaven1234" />
                </Form.Group>
              </Col>
            <br/>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br/>
            { errorMessage && <p className="error-message">{errorMessage}</p> }
            <br/>

            <p>Don't have an account yet?</p>
            <Link to={"/signup"} style={{color: "white"}}> Sign Up</Link>
          </Form>
    </header>
    </div>
  )
}

export default LoginPage;