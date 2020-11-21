import React, { useEffect, useState } from "react";
import Home from "./Home";
import "./StyleSheet/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import PasswordReset from "./PasswordReset";
import Map from "./Map";
import ShipmentRequest from "./ShipmentRequest";
import ShipmentTracker from "./ShipmentTracker";
import DashBoard from "./AdminDashBoard/DashBoard";
import PendingShipments from "./AdminDashBoard/PendingShipments";
import AllDelivered from "./AdminDashBoard/AllDelivered";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const url = "/api/isLoggedIn";

    async function loadData() {
      try {
        const response = await axios.get(url);
        const auth_status = response.data.authenticated;
        const customer_status = response.data.isCustomer;
        const admin_status = response.data.isAdmin;

        if (mounted) {
          setIsAdmin(admin_status);
          setIsAuthenticated(auth_status);
          setIsCustomer(customer_status);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
    loadData();
    return () => {
      setMounted(false);
    };
  }, [mounted]);

  return (
    <Router className="App">
      <Switch>
        <Route path="/user-login" exact={true}>
          <Header
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
          <SignIn />
        </Route>
        <Route path="/admin-dashboard/pending-shipments" exact={true}>
          <Header
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
          <PendingShipments />
        </Route>
        <Route path="/admin-dashboard/finihed-shipments" exact={true}>
          <Header
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
          <AllDelivered />
        </Route>
        <Route path="/admin-dashboard" exact={true}>
          <Header
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
          <DashBoard />
        </Route>
        <Route path="/track-shipment" exact={true}>
          <Header
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
          <ShipmentTracker />
        </Route>
        <Route path="/request-shipment" exact={true}>
          <Header
            authenticated={isAuthenticated}
            isAdmin={isAdmin}
            isCustomer={isCustomer}
          />
          <ShipmentRequest
            authenticated={isAuthenticated}
            isCustomer={isCustomer}
          />
        </Route>
        <Route path="/map" exact={true}>
          <Map />
        </Route>
        <Route path="/password-reset/:email/:id" exact={true}>
          <Header />
          <PasswordReset />
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
