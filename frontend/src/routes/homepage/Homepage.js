import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../../context/UserContext";

/** Site homepage
  *
  * Displays login and signup buttons
  *
  * Route -> '/'
  */

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="homepage">
      <h1 className="homepage-header">Jobly</h1>
      <div className="homepage-body">
        { currentUser ? 
          <h2>Welcome back, {currentUser.firstName || currentUser.username}!</h2> :
          (
            <p>
              <Link className="homepage-button" to="/login">
                Log In
              </Link>
              <Link className="homepage-button" to="/signup">
                Sign Up
              </Link>
            </p>
          )
        }
      </div>
    </div>
  )
}

export default Homepage
