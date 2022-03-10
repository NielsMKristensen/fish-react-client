import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";                      
import { AuthContext } from "../context/auth.context"; 
import navBarPic from "../assets/download-removebg-preview.png"

function Fishnavbar() {

  const { isLoggedIn, user, logOutUser, isOwner } = useContext(AuthContext);
 

  return (
    <>  
    <Navbar className="navbar nav-color"  variant="dark" fixed="top" expand="sm" collapseOnSelect>
      <Container>
      <Navbar.Brand>
          <NavLink to="/"> <img src={navBarPic} width="150px" height="100px" alt='' /> {' '}</NavLink>
      </Navbar.Brand>

      <Navbar.Text style={{fontSize:"30px"}}>
      {!isLoggedIn && (
        <Nav.Link href="/">Welcome to Put & Take Heaven</Nav.Link> 
      )}

      {isLoggedIn && (
        <Nav.Link href="/">Welcome {user && user.name}</Nav.Link> 
      )}

      </Navbar.Text>
       

      <Nav className="">
    
        {!isLoggedIn && (
          <Nav.Link href="/signup">Signup</Nav.Link>
        )}
      
        {!isLoggedIn && (
          <Nav.Link href="/login">Login</Nav.Link>
        )}

          {/* dont have time to research but it seems that href and link to= is handling the call of the path in different ways causing error in check isOwner check */}
        { isOwner && (
          <Nav.Link href="/CreateLake"><Link to={"/CreateLake"}>Create Lake</Link></Nav.Link> 
        )}
        
        
        

        {isLoggedIn && (
          <Nav.Link onClick={logOutUser} href="/">Logout</Nav.Link>
        )}
      </Nav>
      
      </Container>
    </Navbar>
{/* *************************************************************************** */}
    <Navbar className="Navbar nav-color"  variant="dark" fixed="bottom" expand="sm" collapseOnSelect>
      <Container>
      <Navbar.Brand>
      </Navbar.Brand>

       
      <Navbar.Text style={{fontSize:"30px"}}>
      </Navbar.Text>

      <Nav className="">
        <Nav.Link href="#">Twitter</Nav.Link>
        <Nav.Link href="#">Facebook</Nav.Link>
        <Nav.Link href="#">Instagram</Nav.Link>
      </Nav>
      
      </Container>
    </Navbar>
</>
    
    
  );
}

export default Fishnavbar;
