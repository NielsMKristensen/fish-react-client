import { useState, useEffect } from "react";
import axios from "axios";
import LakeCard from "../components/LakeCard";

//const API_URL = "http://localhost:5005";
const API_URL = "https://fish-react-client.herokuapp.com";

function LakeList() {
  const [lakes, setLakes] = useState([]);

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
    <div className="LakeList">
      <h1>List Of Lakes</h1>
      {/* populates the list with lake cards containing information on each lake. */}
      {lakes.map((lake) => (
        <LakeCard key={lake._id} {...lake} />
      ))}
    </div>
  );
}

export default LakeList;
