import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

function NotFound() {
  return(
    <div className="notfound">
      <h3 className="notfound-msg">Sorry! We can't find what you're looking for!</h3>
    </div>
  );
}

export default NotFound;
