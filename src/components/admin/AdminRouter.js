import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminLoginPage from "./AdminLogin/AdminLoginPage";

const AdminRouter = (props) => {
  return (
    <Switch>
      <Route
        exact
        path={props.path}
        render={() => (
          <AdminLoginPage
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
            getEmployeeData={
              props.getEmployeeData ? props.getEmployeeData : null
            }
            employeeDataRefetch={props.employeeDataRefetch}
          />
        )}
      />
    </Switch>
  );
};

export default AdminRouter;
