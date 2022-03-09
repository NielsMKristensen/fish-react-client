import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function LakeCard({ _id, lakeName, description, pictureLinks }) {
  return (
    <div className="lakeCard" >
    
      <Card className="mb-3" style={{ color: "#000", display: 'flex', flexDirection: 'column', width: "900px" }}>
            <Card.Img src={pictureLinks} alt={lakeName} style={{ width: "900px", height: "300px" }}  />
            <Card.Body style={{ color: "green"}} >
              <Card.Title style={{fontSize:"40px"}}>{lakeName}</Card.Title>
              <Card.Text style={{fontSize:"30px"}}>{description}</Card.Text>
              <Link to={`/lake/${_id}`}>
                <Button>Details</Button>
              </Link>
            </Card.Body>
          </Card>
          
    
        

      {/* <h3>{lakeName}</h3>
      <img
        src={pictureLinks}
        alt={lakeName}
        style={{ maxWidth: "400px" }}
      ></img>
      <p>
        <b>Description:</b>
      </p>
      <p>{description} </p> */}
      
    </div>
  );
}

export default LakeCard;
