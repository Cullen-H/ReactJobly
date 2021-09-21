import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Homepage from "./homepage/Homepage";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import CompanyList from "./companies/CompanyList";
import CompanyPage from "./companies/CompanyPage";
import JobList from "./jobs/JobList";
import ProfileForm from "./profiles/ProfileForm";
import NotFound from "./404";

function Routes({ login, signup }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>
        <PrivateRoute exact path="/companies/:handle">
          <CompanyPage />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
