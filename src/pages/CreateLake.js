import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";

function CreateLake() {
  const [lakeName, setLakeName] = useState("");
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [lakePhoneNumber, setLakePhoneNumber] = useState(0)
  const [lakeEmail, setLakeEmail] = useState("")
  const [description, setDescription] = useState("")
  const [openingHours, setOpeningHours] = useState("")
  const [prices, setPrices] = useState("")
  const [CVRnumber, setCVRnumber] = useState(0)
  const [pictureLinks, setPictureLinks] = useState("")
  


  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleLakeName = (e) => setLakeName(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleLakePhoneNumber = (e) => setLakePhoneNumber(e.target.value);
  const handleLakeEmail = (e) => setLakeEmail(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleOpeningHours = (e) => setOpeningHours(e.target.value);
  const handlePrices = (e) => setPrices(e.target.value);
  const handleCVRnumber = (e) => setCVRnumber(e.target.value);
  const handlePictureLinks = (e) => setPictureLinks(e.target.value);


  const handleCreateLakeSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = {lakeName, street, city, lakePhoneNumber, lakeEmail, description, openingHours, prices, CVRnumber, pictureLinks};
    const localToken = localStorage.getItem('authToken')

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/api/lake`, requestBody, { headers: { Authorization: `Bearer ${localToken}` } })
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className="createLake">
      <h1>Sign Up</h1>

      <form className="createLakeForm" onSubmit={handleCreateLakeSubmit}>
        <label>Lake Name:</label>
        <input 
          type="text"
          name="lakeName"
          value={lakeName}
          onChange={handleLakeName}
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

        <label>Lake phone number:</label>
        <input 
          type="number"
          name="lakePhoneNumber"
          value={lakePhoneNumber}
          onChange={handleLakePhoneNumber}
        />

        <label>Lake E-Mail:</label>
        <input 
          type="email"
          name="lakeEmail"
          value={lakeEmail}
          onChange={handleLakeEmail}
        />
        
        <label>Description</label>
        <textarea
            type="text"
            name="description"
            rows="5"
            value={description}
            onChange={handleDescription}
          >
        </textarea>

        <label>Opening hours:</label>
        <input 
          type="text"
          name="openingHours"
          value={openingHours}
          onChange={handleOpeningHours}
        />

        <label>Prices:</label>
        <input 
          type="text"
          name="prices"
          value={prices}
          onChange={handlePrices}
        />

        <label>CVR number:</label>
        <input 
          type="number"
          name="CVRnumber"
          value={CVRnumber}
          onChange={handleCVRnumber}
        />

        <label>Upload picture:</label>
        <input 
          type="file"
          name="Lake-Picture"
          value={pictureLinks}
          onChange={handlePictureLinks}
        />
        




        <br />
        <button type="submit">Create</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

    </div>
  )
}

export default CreateLake;