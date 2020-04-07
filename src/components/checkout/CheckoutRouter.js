import React from "react";
import { Switch, Route } from "react-router-dom";
import GuestCheckout from "./GuestCheckout";
import ConfirmationPage from "./ConfirmationPage";
import ConsentFormPage1 from "../account/clientprofile/ConsentForm/Pages/Page1/ConsentFormPage1";
import ConsentFormPage2 from "../account/clientprofile/ConsentForm/Pages/Page2/ConsentFormPage2";
import ConsentFormPage3 from "../account/clientprofile/ConsentForm/Pages/Page3/ConsentFormPage3";
import ConsentFormPage4 from "../account/clientprofile/ConsentForm/Pages/Page4/ConsentFormPage4";
import ConsentFormPage5 from "../account/clientprofile/ConsentForm/Pages/Page5/ConsentFormPage5";
import ConsentFormPage6 from "../account/clientprofile/ConsentForm/Pages/Page6/ConsentFormPage6";
import ConsentFormPage7 from "../account/clientprofile/ConsentForm/Pages/Page7/ConsentFormPage7";

const CheckoutRouter = (props) => {
  return (
    <Switch>
      <Route exact path={props.match.path} component={GuestCheckout} />
      <Route
        exact
        path={props.match.path + "/confirmation"}
        component={ConfirmationPage}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page1"}
        component={ConsentFormPage1}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page2"}
        component={ConsentFormPage2}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page3"}
        component={ConsentFormPage3}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page4"}
        component={ConsentFormPage4}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page5"}
        component={ConsentFormPage5}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page6"}
        component={ConsentFormPage6}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
      <Route
        exact
        path={props.match.path + "/confirmation/consentform/page7"}
        component={ConsentFormPage7}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
      />
    </Switch>
  );
};

export default CheckoutRouter;
