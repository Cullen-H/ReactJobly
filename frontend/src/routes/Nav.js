import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./Nav.css";

/** Navbar functionality
  */

function Nav({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-links">
        <li className="navbar-home navbar-item">
          <Link className="navbar-link" to="/">
            Jobly
          </Link>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/" onClick={logout}>
            Log Out
          </NavLink>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-links">
        <li className="navbar-item navbar-home">
          <Link className="navbar-link" to="/">
            Jobly
          </Link>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/login">
            Log In
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar">
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Nav;
