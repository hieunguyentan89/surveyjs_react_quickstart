import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SurveyReactV2 from "./SurveyReactV2";

import "bootstrap/dist/css/bootstrap.css";

export default function SurveyJSReactApplication() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
              </a>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/">
            <SurveyReactV2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
