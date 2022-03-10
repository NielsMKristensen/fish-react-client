import { Link } from 'react-router-dom';

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