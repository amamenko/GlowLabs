import React from "react";
import Availability from "./Date/Availability";
import TimePreference from "./Time/TimePreference";
import { Switch, Route } from "react-router-dom";

const AvailabilityRouter = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Availability} />
      <Route
        exact
        path={match.path + "/timepreference"}
        component={TimePreference}
      />
    </Switch>
  );
};

export default AvailabilityRouter;
