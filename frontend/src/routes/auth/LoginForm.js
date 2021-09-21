import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AuthForm.css";
import Alert from "../../common/Alert";

/** Login Form
  *
  * Displays a form and updates state according to user input.
  *
  * On successful login, redirects to '/companies'.
  *
  * Route -> '/login'
  */

function LoginForm({ login }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
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
    let res = await login(formData);
    if (res.success) {
      history.push('/companies');
    } else {
      setAlerts(res.errors);
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-form-alerts">
      {
        alerts ?
        alerts.map(alert => (
          <Alert type="danger" message={alert.message} />
        )) : null
      }
      </div>
      
      <div className="auth-form-container">
      <form onSubmit={gatherInput}>
        <input
          className="auth-form-input"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <input
          className="auth-form-input"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <button className="auth-form-submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default LoginForm;
