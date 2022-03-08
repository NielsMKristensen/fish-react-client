//copy of create lake page for now needs to use other api's and stuff


import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";


const API_URL = "http://localhost:5005";

function EditLake() {
//get data from state passed from link.
const data = useLocation();
//get id from header
const { _id } = useParams();

//state variables to be used to store data from form.
const [lakeName, setLakeName] = useState(`${data.state.lakeName}`)
const [street, setStreet] = useState(`${data.state.street}`)
const [city, setCity] = useState(`${data.state.city}`)
const [lakePhoneNumber, setLakePhoneNumber] = useState(`${data.state.lakePhoneNumber}`)
const [lakeEmail, setLakeEmail] = useState(`${data.state.lakeEmail}`)
const [description, setDescription] = useState(`${data.state.description}`)
const [openingHours, setOpeningHours] = useState(`${data.state.openingHours}`)
const [prices, setPrices] = useState(`${data.state.prices}`)
const [CVRnumber, setCVRnumber] = useState(`${data.state.CVRnumber}`)
const [pictureLinks, setPictureLinks] = useState("")

//cloudinary stuff
const [selectedFile, setSelectedFile] = useState();
    
//error message handling
const [errorMessage, setErrorMessage] = useState(undefined);
  
//navigate functionality
const navigate = useNavigate();
  

//handle input from form
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
  
//handle file selector
const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    };

//handle lake changes update.
const handleUpdateLakeSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = {lakeName, street, city, lakePhoneNumber, lakeEmail, description, openingHours, prices, CVRnumber, pictureLinks};
    const localToken = localStorage.getItem('authToken')
    
    //uploade file to cloudinary and save id in pictureLinks
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
        uploadImage(reader.result);
    };
    reader.onerror = () => {
        console.error('something went wrong!!');
    };
  
    const uploadImage = async (base64EncodedImage) => {

        await axios.post(`${API_URL}/api/uploadpicture`, JSON.stringify({ data: base64EncodedImage }), { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localToken}`, lake : lakeName }})
        .then((response) => {
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };
      
    // Make an axios request to the API
    axios.put(`${API_URL}/api/lake/${_id}`, requestBody, { headers: { Authorization: `Bearer ${localToken}` } })
      .then((response) => {
        navigate(`/lake/${data.state._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  //render update form
  return (
    <div className="createLake">
      <h1>Sign Up</h1>

      <form className="createLakeForm" onSubmit={handleUpdateLakeSubmit}>
        <label>Lake Name:</label>
        <input 
          type="text"
          name="lakeName"
          onChange={handleLakeName}
          value={lakeName}
        />   

        <label>Street:</label>
        <input 
          type="text"
          name="street"
          onChange={handleStreet}
          value={street}
        />

        <label>City:</label>
        <input 
          type="text"
          name="city"
          onChange={handleCity}
          value={city}
        />

        <label>Lake phone number:</label>
        <input 
          type="number"
          name="lakePhoneNumber"
          onChange={handleLakePhoneNumber}
          value={lakePhoneNumber}
        />

        <label>Lake E-Mail:</label>
        <input 
          type="email"
          name="lakeEmail"
          onChange={handleLakeEmail}
          value={lakeEmail}
        />
        
        <label>Description</label>
        <textarea
            type="text"
            name="description"
            rows="5"
            onChange={handleDescription}
            value={description}
          >
        </textarea>

        <label>Opening hours:</label>
        <input 
          type="text"
          name="openingHours"
          onChange={handleOpeningHours}
          value={openingHours}
        />

        <label>Prices:</label>
        <input 
          type="text"
          name="prices"
          onChange={handlePrices}
          value={prices}
        />

        <label>CVR number:</label>
        <input 
          type="number"
          name="CVRnumber"
          onChange={handleCVRnumber}
          value={CVRnumber}
        />

        <label>Upload picture:</label>
        <input 
          id="fileInput"
          type="file"
          name="Lake-Picture"
          onChange={handleFileInputChange}
        />
        
        <br />
        <button type="submit">Update</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

    </div>
  )
}

export default EditLake;