import React, { useContext, useState, useEffect } from "react";
import "./Job.css";
import UserContext from "../../context/UserContext";

/** Displays job info.
  */

function Job({ id, title, salary, equity, companyName }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(function updateApplicationStatus() {
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  const handleApply = evt => {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return(
    <div className="job"> {applied}
      <div className="job-body">
        <h4 className="job-title">{title}</h4>
        <p>{companyName}</p>
        {salary && <div>Salary: ${salary}</div>}
        {equity !== undefined && <div>Equity: {equity}</div>}
        <button
          className="job-button"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default Job;
