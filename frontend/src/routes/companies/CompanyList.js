import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import JoblyApi from "../../api/api";
import CompanyContainer from "./CompanyContainer";
import SearchForm from "../../common/SearchForm";
import "../../common/SearchForm.css";
import "./CompanyList.css";

/** Displays a list of companies.
  * 
  * Reloads companies when search form is submitted.
  *
  * Route -> '/companies'
  */

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  const search = async name => {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <LoadingSpinner />;

  return (
    <div>
      <SearchForm searchFor={search} />
      {companies.length
          ? (
              <div className="company-list">
                {companies.map(c => (
                  <CompanyContainer 
                    key={c.handle}
                    handle={c.handle}
                    name={c.name}
                    description={c.description}
                    logoUrl={c.logoUrl}
                  />
                ))}
              </div>
            ) : (
              <p className="no-results">Sorry, no results.</p>
            )}
      </div>
  );
}

export default CompanyList;
