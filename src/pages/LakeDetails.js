import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";


function LakeDetails () {
  const [lake, setLake] = useState(null);
  const { _id } = useParams();
    //error message handling
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    //navigate functionality
    const navigate = useNavigate();
  
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
  }, [] );


  const handleDeleteLakeSubmit = (e) => {
    e.preventDefault();

    const localToken = localStorage.getItem('authToken')
      
    // Make an axios request to the API
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
    <div className="Lake Details">
    
      {lake && (
        <>
          <h1>{lake.lakeName}</h1>
          <img src={lake.pictureLinks} alt={lake.lakeName} style={{ maxWidth: "400px"}}></img>
          <p>Description:</p>
          <p>{lake.description}</p>

          <p>Address:</p>
          <p>{lake.street}</p>
          <p>{lake.city}</p>

          <p>Phone Number:</p>
          <p>{lake.lakePhoneNumber}</p>

          <p>E-mail Address:</p>
          <p>{lake.lakeEmail}</p>

          <p>Opening Hours</p>
          <p>{lake.openingHours}</p>

          <p>Prices</p>
          <p>{lake.prices}</p>

          <p>CVR Number:</p>
          <p>{lake.CVRnumber}</p>

        </>
      )}

      <Link to="/orderpermit">
        <button>Order Permit</button>
      </Link>
          
      <Link to={`/lake/edit/${_id}`} state={lake}>
        <button>Edit Lake</button>
      </Link>

      <form className="DeleteLakeForm" onSubmit={handleDeleteLakeSubmit}>
        <button type="submit">Delete Lake</button>
      </form>
      


      
    </div>
  );
}

export default LakeDetails;