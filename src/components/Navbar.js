import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context"; 
import navBarPic from "../assets/trout.jpg"

function Navbar() {

  const { isLoggedIn, user, logOutUser, isOwner } = useContext(AuthContext);
 

  return (
    <nav className="Navbar">
      
      <NavLink to="/"><a href=""><img src={navBarPic} alt="home gif" className="navBarPic" /></a> </NavLink>
 
      
      {isLoggedIn &&  (
        
        <>
        {/* add is owner to display create lake */}
          <Button onClick={logOutUser}>Logout {user && user.name}</Button>    
        </>
      )}

      { isOwner && (
        <>
          <Link to="/CreateLake">
            <Button>Create Lake</Button>
          </Link> 
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <Button>Sign Up</Button> </Link>
          <Link to="/login"> <Button>Login</Button> </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
