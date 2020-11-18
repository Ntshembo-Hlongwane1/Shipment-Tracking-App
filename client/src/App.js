import React from "react";

import Home from "./Home";
import "./StyleSheet/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
const App = () => {
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
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
