import React from "react";
import { Link } from "react-router-dom";
import "./CompanyContainer.css";

/** Container for company list companies.
  */

function CompanyContainer({ name, description, logoUrl, handle }) {
  return (
    <div className="company-container">
    <Link className="company-link" to={`/companies/${handle}`}>
      <div className="company-container-title">
        <img className="company-container-img" src={logoUrl} alt={name} />
        <h3>{name}</h3>
      </div>
      <p>{description}</p>
    </Link>
    </div>
  );
}

export default CompanyContainer;
