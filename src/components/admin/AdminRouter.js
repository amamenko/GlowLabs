import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminLoginPage from "./AdminLoginPage";

const AdminRouter = (props) => {
  return (
    <Switch>
      <Route exact path={props.path} render={() => <AdminLoginPage />} />
    </Switch>
  );
};

export default AdminRouter;
