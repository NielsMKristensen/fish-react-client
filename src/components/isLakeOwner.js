import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsLakeOwner( { children } ) {
  
  const { isLoggedIn, isLoading, isOwner } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;
  console.log("ISOWNER",isOwner )
  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  // check if owner of a lake... if not got to not owner page. will be extended to enroll for owner in next iteration.
  } else if(!isOwner) {
    return <Navigate to="/NotOwner" />;
  }else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsLakeOwner;
