import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'


//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";

function OrderPermit() {

    const { user } = useContext(AuthContext);
  //get data from state passed from link.
    const lakeData = useLocation();
    console.log("stateData", lakeData)
    const lakeId = lakeData.state._id
    const userId = user._id
    
  //state variables to be used to store data from form.
  const [date, setDate] = useState("date");
   
  //handle error messages
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  //handle navigation links
  const navigate = useNavigate();
  
  const handlePermitDate = (e) => setDate(e.target.value);

  //handle Submit of lake to create.
  const handleOrderPermitSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = {date, userId, lakeId };
    console.log ("Date", date, "user", userId, "lake", lakeId)
    const localToken = localStorage.getItem('authToken')
    
    //Make an axios request to the API to create the permit and navigate to start page.
    axios.post(`${API_URL}/api/permit`, requestBody, { headers: { Authorization: `Bearer ${localToken}` } })
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  //render form
  return (
    <div className="app">
    <header className="app-header">
    <Form className="mb-3 " onSubmit={handleOrderPermitSubmit}>
            
            <Col md>
            <br/>
              <Form.Group >
                <Form.Label style={{color: "white", fontSize: "20px"}}>Select the day you want to go fishing in <b>{lakeData.state.lakeName}</b> </Form.Label>
                <Form.Control type="date"  onChange={handlePermitDate} />
              </Form.Group>
                <br/>
                <p style={{color: "white"}}>Price for the day is <b>{lakeData.state.prices} DKK</b> </p>
                <p style={{color: "white"}}>Bill will be sint to your e-mail <b>{user.email}</b></p>
                <p style={{color: "white"}}>press order to confirm</p>
                <br />
             <Button variant="primary" type="submit">Order</Button>
              <br/>
             <Link to={"/"} ><Button>Cancel</Button></Link>

              { errorMessage && <p className="error-message">{errorMessage}</p> }
          </Col>
    </Form>

      </header>
    </div>
  )
}

export default OrderPermit;