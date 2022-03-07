import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function LakeCard ( {_id, lakeName, description, pictureLinks } ) {
  
  return (
    <div className="lakeCard">
      <h3>{lakeName}</h3>
      <img src={pictureLinks} alt={lakeName} style={{ maxWidth: "400px"}}></img>
      <p><b>Description:</b></p>
      <p>{description} </p>
      <Link to={`/lake/${_id}`}>
      <button>Details</button>
      </Link>
    </div>
  );
}

export default LakeCard;