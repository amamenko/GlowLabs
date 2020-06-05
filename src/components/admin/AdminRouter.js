import React, { useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import AdminLoginPage from "./AdminLogin/AdminLoginPage";
import AdminMenu from "./AdminMenu/AdminMenu";
import AdminClients from "./AdminClients/AdminClients";
import { useQuery } from "@apollo/react-hooks";
import { getClientsQuery } from "../../graphql/queries/queries";
import randomColor from "randomcolor";

const AdminRouter = (props) => {
  const { data: getClientsData } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache",
  });

  const randomColorArray = useMemo(() => {
    if (getClientsData) {
      if (getClientsData.clients.length > 0) {
        return randomColor({
          count: getClientsData.clients.length,
          hue: "#0081B1",
          format: "rgba",
          luminosity: "dark",
          alpha: 0.7,
        });
      }
    }
  }, [getClientsData]);

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
            randomColorArray={randomColorArray ? randomColorArray : null}
          />
        )}
      />
    </Switch>
  );
};

export default AdminRouter;
