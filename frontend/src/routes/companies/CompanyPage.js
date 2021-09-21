import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";
import JoblyApi from "../../api/api";
import Job from "../jobs/Job";
import "./CompanyPage.css";

/** Displays a specific companies page
  *
  * Route -> '/companies/:handle'
  */

function CompanyPage() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(function getCompanyOnLoad() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;

  return (
    <div className="company-page">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <div className="company-page-jobs">
      {company.jobs.map(job => (
        <Job
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
      </div>
    </div>
  );
}

export default CompanyPage;
