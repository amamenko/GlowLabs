import React from "react";
import GuestCheckout from "./GuestCheckout";
import ConfirmationPage from "./ConfirmationPage";
import { Switch, Route } from "react-router-dom";

const CheckoutRouter = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={GuestCheckout} />
      <Route
        exact
        path={match.path + "/confirmation"}
        component={ConfirmationPage}
      />
    </Switch>
  );
};

export default CheckoutRouter;
