import React, { useState, useContext } from "react";
import Alert from "../../common/Alert";
import JoblyApi from "../../api/api";
import UserContext from "../../context/UserContext";
import "./ProfileForm.css";

/** Diisplays form to edit profile info.
  *
  * Route -> '/profile'
  */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: ""
  });
  const [alerts, setAlerts] = useState([]);
  
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const gatherInput = async evt => {
    evt.preventDefault();

    let userInfo;
    try {
      userInfo = await JoblyApi.updateProfile(formData);
    } catch (errors) {
      setAlerts(errors);
      return;
    }

    setFormData(f => ({...f, password: ""}));
    setAlerts([]);
    setCurrentUser(userInfo);
  }

  return (
    <div className="profile-form">
      <div className="profile-form-alerts">
      {
        alerts ?
        alerts.map(alert => (
          <Alert type="danger" message={alert.message} />
        )) : null
      }
      </div>
      
      <div className="profile-form-container">
      <form onSubmit={gatherInput}>
        <h3>{formData.username}</h3>

        <input
          className="profile-form-input"
          placeholder="first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          className="profile-form-input"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />

        <input
          className="profile-form-input"
          placeholder="last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          className="profile-form-input"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <button className="profile-form-submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default ProfileForm;
