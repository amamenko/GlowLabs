import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import ClientProfile from "./clientprofile/ClientProfile";
import ConsentFormPage1 from "./clientprofile/ConsentForm/Pages/Page1/ConsentFormPage1";
import ConsentFormPage2 from "./clientprofile/ConsentForm/Pages/Page2/ConsentFormPage2";
import ConsentFormPage3 from "./clientprofile/ConsentForm/Pages/Page3/ConsentFormPage3";
import ConsentFormPage4 from "./clientprofile/ConsentForm/Pages/Page4/ConsentFormPage4";
import ConsentFormPage5 from "./clientprofile/ConsentForm/Pages/Page5/ConsentFormPage5";
import ConsentFormPage6 from "./clientprofile/ConsentForm/Pages/Page6/ConsentFormPage6";
import ConsentFormPage7 from "./clientprofile/ConsentForm/Pages/Page7/ConsentFormPage7";
import FacebookCompleteRegistration from "./login/FacebookCompleteRegistration/FacebookCompleteRegistration";

const AccountRouter = props => {
  return (
    <Switch>
      <Route exact path={props.match.path + "/login"} component={Login} />
      <Route exact path={props.match.path + "/signup"} component={SignUp} />
      <Route
        exact
        path={props.match.path + "/completeregistration"}
        component={FacebookCompleteRegistration}
      />
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
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page3"}
        component={ConsentFormPage3}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page4"}
        component={ConsentFormPage4}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page5"}
        component={ConsentFormPage5}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page6"}
        component={ConsentFormPage6}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/clientprofile/consentform/page7"}
        component={ConsentFormPage7}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    </Switch>
  );
};

export default AccountRouter;
