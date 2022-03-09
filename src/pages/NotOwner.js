import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";




function NotOwner () {

  return (
    <div className="NotOwner">
    <h1><b>You are not owner of a Lake</b></h1>
        {/* button to redirect to main page if user is not lake owner */}
      <Link to="/">
        <button>OK</button>
      </Link>
    </div>
  );
}

export default NotOwner;