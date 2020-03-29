import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import ClientProfile from "./clientprofile/ClientProfile";
import ConsentForm from "./clientprofile/ConsentForm/ConsentForm";

const AccountRouter = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path + "/login"} component={Login} />
      <Route exact path={match.path + "/signup"} component={SignUp} />
      <Route
        exact
        path={match.path + "/clientprofile"}
        component={ClientProfile}
      />
      <Route
        exact
        path={match.path + "/clientprofile/consentform"}
        component={ConsentForm}
      />
    </Switch>
  );
};

export default AccountRouter;
