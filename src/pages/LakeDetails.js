import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/auth.context';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'

//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";


function LakeDetails () {
  const { user } = useContext(AuthContext);
  const [lake, setLake] = useState(null);
  const { _id } = useParams();
    //error message handling
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    //navigate functionality
    const navigate = useNavigate();
  
  //get the details of the specific lake where details was clicked.
  const getLake = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/lake/${_id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneLakeDetails = response.data;
        setLake(oneLakeDetails);
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(()=> {
    getLake();
  },[]); 

  //handle delete button
  const handleDeleteLakeSubmit = (e) => {
    e.preventDefault();

    const localToken = localStorage.getItem('authToken')
      
    // Make an axios request to the API to delete a lake.
    axios.delete(`${API_URL}/api/lake/${_id}`, { headers: { Authorization: `Bearer ${localToken}` } })
      .then((response) => {
        navigate(`/`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

 
  return (
    <div className="app">
    <br/>
    <header className="App-header" >
    
    {lake && (
      <Card className="mb-3" style={{ color: "green", display: 'flex', flexDirection: 'row', width: "1000px", height: "600px" }}>
            <Card.Img src={lake.pictureLinks} alt={lake.lakeName} style={{ width: "600px", height: "600px" }}  />
            <Card.Body style={{ color: "green", display: 'flex', flexDirection: 'column'}} >
              <Card.Title style={{fontSize:"30px"}}>Lake: {lake.lakeName}</Card.Title>
              <Card.Text style={{fontSize:"20px"}}>Description: <br /> {lake.description}</Card.Text>
              <Card.Text style={{fontSize:"20px"}}>Address: {lake.street} {lake.city}</Card.Text>
              <Card.Text style={{fontSize:"20px"}}>Phone Number: {lake.lakePhoneNumber} </Card.Text>
              <Card.Text style={{fontSize:"20px"}}>E-mail Address: {lake.lakeEmail} </Card.Text>
              <Card.Text style={{fontSize:"20px"}}>Opening Hours: {lake.openingHours} </Card.Text>
              <Card.Text style={{fontSize:"20px"}}>Prices: {lake.prices} </Card.Text>
              <Card.Text style={{fontSize:"20px"}}>CVR Number: {lake.CVRnumber} </Card.Text>
              
              <div style={{ color: "green", display: 'flex', flexDirection: 'row', justifyContent: "space-around"  }}>
              <Link to="/orderpermit" state={lake}>
                <Button>Order Permit</Button>
              </Link>
              
                    {/*passes data to the edit form to prepopulate all the fields. */}
              {user.ownerOfLake &&
              <Link to={`/lake/edit/${_id}`} state={lake}>
                <Button>Edit Lake</Button>
              </Link>
              }
              
              {/* Delete button to delete the lake */}
              {user.ownerOfLake &&
              <form className="DeleteLakeForm" onSubmit={handleDeleteLakeSubmit}>
               <Button type="submit">Delete Lake</Button>
             </form>
              }
              </div>
            </Card.Body>
          </Card>
          )} 
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      </header>
    </div>
  );
}

export default LakeDetails;