import React from "react";
import "./Alert.css"
import { v4 as uuid } from "uuid";

/**
  * Component for showing form alerts.
  */

function Alert({ type = "danger", message = "" }) {
  return (
    <div key={uuid()} className={`alert alert-${type}`}>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
