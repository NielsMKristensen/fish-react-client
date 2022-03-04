import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const API_URL = "http://localhost:5005";


function FrontPage() {
  
  
  return (
    <div>
      <h1>front page</h1>
    </div>
  )
}

export default FrontPage;