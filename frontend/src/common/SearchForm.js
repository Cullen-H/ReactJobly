import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchFor }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = evt => {
    setSearchQuery(evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    searchFor(searchQuery.trim() || undefined);
    setSearchQuery(searchQuery.trim());
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          name="searchQuery"
          placeholder="search..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
