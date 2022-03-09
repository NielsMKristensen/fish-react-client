import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";

function OrderPermit() {

    const { user } = useContext(AuthContext);
  //get data from state passed from link.
    const lakeData = useLocation();
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
    <div className="createLake">
      <h1>Sign Up</h1>

      <form className="createPermitForm" onSubmit={handleOrderPermitSubmit}>
        <label>Select the day you want to go fishing in <b>{lakeData.state.lakeName}</b> :</label>
        <br/>
        <input 
          id = "fishingdate"
          type="date"
          name="permitDate"
          onChange={handlePermitDate}
        />   
        <br />
        <p>Price for the day is <b>{lakeData.state.prices} DKK</b> </p>
        <p>Bill will be sint to your e-mail <b>{user.email}</b></p>
        <p>press order to confirm</p>
        <br />
        <button type="submit">Order</button>
        
        <Link to={"/"} >
        <button>Cancel</button>
        </Link>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

    </div>
  )
}

export default OrderPermit;