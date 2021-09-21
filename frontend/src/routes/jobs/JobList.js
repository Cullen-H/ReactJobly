import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import Search from "../../common/SearchForm";
import JoblyApi from "../../api/api";
import Job from "./Job";

/** Displays a page with a list of jobs.
  *
  * Route -> '/jobs'
  */

function JobList() {
  const [jobs, setJobs] = useState([])

  useEffect(function getJobs() {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <LoadingSpinner />;

  return(
    <div className="job-list">
      <Search searchFor={search} />
      {
        jobs.length
        ? jobs.map(job => (
            <Job 
              key={job.id}
              id={job.id}
              title={job.title}
              salaray={job.salary}
              equity={job.equity}
              companyName={job.companyName}
            />
          ))
        : <p>Sorry, no results!</p>
      }
    </div>
  );
}

export default JobList;
