import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import "./App.css";

import Login from "./Login/Login";
import Main from "./Main/Main";
import TokenInfo from "./store/LoginStore";
import Req from './requests/requests';
function App() {
  const auth = TokenInfo.getToken();

  Req.setBase("https://localhost:44365/api/");
  return (
    <Router>
      <CssBaseline />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/">
          {auth ? <Main /> : <Redirect to={{ pathname: "/Login" }} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
