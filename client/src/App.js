import React, { useEffect, useState } from "react";
import Home from "./Home";
import "./StyleSheet/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const url = "/api/isLoggedIn";

    axios.get(url).then((response) => {
      const isAdmin_status = response.data.isAdmin;
      const isLoggedin_status = response.data.authenticated;
      const isCustomer_status = response.data.isCustomer;

      setIsAdmin(isAdmin_status);
      setIsAuthenticated(isLoggedin_status);
      setIsCustomer(isCustomer_status);
    });
  }, []);

  return (
    <Router className="App">
      <Switch>
        <Route path="/user-login" exact={true}>
          <Header />
          <SignIn />
        </Route>
        <Route path="/account-recovery/forgot-password" exact={true}>
          <Header />
          <ForgotPassword />
        </Route>
        <Route path="/user-signup" exact={true}>
          <Header />
          <SignUp />
        </Route>
        <Route path="/" exact={true}>
          <Home
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
