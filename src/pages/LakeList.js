import { useState, useEffect } from "react";
import axios from "axios";
import LakeCard from "../components/LakeCard";
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import { AuthContext } from "../context/auth.context"; 
import { useContext } from "react";

//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";

function LakeList() {
  const [lakes, setLakes] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  //gets all lakes from the database via the api.
  const getAllLakes = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/lake`
      , {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setLakes(response.data))
      .catch((error) => console.log(error));
  };

  //run get all lakes once.
  useEffect(() => {
    getAllLakes();
    // console.log();
  }, []);

  return (
    <div className="app">
    <br/>
    <header className="App-header" >
    <Card className="mb-3" style={{ color: "green"}}>
            <Card.Body style={{ color: "green", display: 'flex', flexDirection: 'column'}} >
              <Card.Title style={{fontSize:"30px"}}>The best place to find the right lake for the perfect fishing trip!</Card.Title>
              {!isLoggedIn && (
              <Card.Text style={{fontSize:"15px"}}>Please Signup/Login in to get further details and order a fishing permit for the trip of your life!</Card.Text>
              )}
            </Card.Body>
          </Card>

      {/* populates the list with lake cards containing information on each lake. */}
      {lakes.map((lake) => (
        <LakeCard key={lake._id} {...lake} />
      ))}
      </header>
    </div>
  );
}

export default LakeList;
