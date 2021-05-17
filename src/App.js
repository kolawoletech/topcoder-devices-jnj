import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDevice from "./components/AddDevice";

import DevicesList from "./components/DevicesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/devices" className="navbar-brand">
          Kolawole
        </a>
        <div className="navbar-nav mr-auto">
       
          <li className="nav-item">
            <Link to={"/devices"} className="nav-link">
               Devices
            </Link>
          </li>
     
          <li className="nav-item">
            <Link to={"/add-device"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Devices</h2>
        <Switch>
          <Route exact path={["/", "/devices"]} component={DevicesList} />

          <Route exact path="/add-device" component={AddDevice} />

        </Switch>
      </div>
    </div>
  );
}

export default App;
