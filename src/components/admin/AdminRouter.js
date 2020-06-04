import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminLoginPage from "./AdminLogin/AdminLoginPage";
import AdminMenu from "./AdminMenu/AdminMenu";
import AdminClients from "./AdminClients/AdminClients";
import { useQuery } from "@apollo/react-hooks";
import { getClientsQuery } from "../../graphql/queries/queries";

const AdminRouter = (props) => {
  const { data: getClientsData, called, refetch } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache",
  });

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
      <Route
        exact
        path={props.path + "/menu"}
        render={() => (
          <AdminMenu
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
            getEmployeeData={
              props.getEmployeeData ? props.getEmployeeData : null
            }
            employeeDataRefetch={props.employeeDataRefetch}
          />
        )}
      />
      <Route
        exact
        path={props.path + "/clients"}
        render={() => (
          <AdminClients
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
            getClientsData={getClientsData ? getClientsData : null}
          />
        )}
      />
    </Switch>
  );
};

export default AdminRouter;
