import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";

const AccountRouter = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path + "/login"} component={Login} />
      <Route exact path={match.path + "/signup"} component={SignUp} />
    </Switch>
  );
};

export default AccountRouter;
