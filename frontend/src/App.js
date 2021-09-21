import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";
import useLocalStorage from "./hooks/useLocalStorage"; //implement
import JoblyApi from "./api/api";
import Routes from "./routes/Routes";
import Nav from "./routes/Nav";
import UserContext from "./context/UserContext";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token])

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(userInfo) {
    try {
      let token = await JoblyApi.signup(userInfo);
      setToken(token);
      return { success: true }
    } catch (errors) {
      return { success: false, errors };
    }
  }

  async function login(userInfo) {
    try {
      let token = await JoblyApi.login(userInfo);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors }
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }
  
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Nav logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
