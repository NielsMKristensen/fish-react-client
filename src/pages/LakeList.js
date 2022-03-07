import { useState, useEffect } from "react";
import axios from "axios";
import LakeCard from "../components/LakeCard";

const API_URL = "http://localhost:5005";

function LakeList() {
  const [lakes, setLakes] = useState([]);

  const getAllLakes = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
    .get(
    `${API_URL}/api/lake`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => setLakes(response.data))
    .catch((error) => console.log(error));
};

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllLakes();
    // console.log();
  }, [] );

  
  return (
    <div className="LakeList">
      <h1>List Of Lakes</h1>

      { lakes.map((lake) => <LakeCard key={lake._id} {...lake} /> )} 
       
    </div>
  );
}

export default LakeList;