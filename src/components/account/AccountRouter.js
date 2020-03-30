import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import ClientProfile from "./clientprofile/ClientProfile";
import ConsentFormPage1 from "./clientprofile/ConsentForm/Pages/Page1/ConsentFormPage1";
import ConsentFormPage2 from "./clientprofile/ConsentForm/Pages/Page2/ConsentFormPage2";

const AccountRouter = props => {
  return (
    <Switch>
      <Route exact path={props.match.path + "/login"} component={Login} />
      <Route exact path={props.match.path + "/signup"} component={SignUp} />
      <Route
        exact
        path={props.match.path + "/clientprofile"}
        component={ClientProfile}
      />
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page1"}
        component={ConsentFormPage1}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page2"}
        component={ConsentFormPage2}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    </Switch>
  );
};

export default AccountRouter;
