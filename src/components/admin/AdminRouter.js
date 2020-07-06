import React, { useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLoginPage from "./AdminLogin/AdminLoginPage";
import AdminMenu from "./AdminMenu/AdminMenu";
import AdminClients from "./AdminClients/AdminClients";
import { useQuery } from "@apollo/react-hooks";
import {
  getClientsQuery,
  getAllAppointmentsQuery,
} from "../../graphql/queries/queries";
import randomColor from "randomcolor";
import LargeScreenSideMenu from "../account/LargeScreenSideMenu/LargeScreenSideMenu";
import AdminSchedule from "./AdminSchedule/AdminSchedule";
import AdminSaltCaveSchedule from "./AdminSaltCaveSchedule/AdminSaltCaveSchedule";

const AdminRouter = (props) => {
  const { data: getClientsData, refetch: getClientsRefetch } = useQuery(
    getClientsQuery,
    {
      fetchPolicy: "no-cache",
    }
  );

  const { data: getAllAppointmentsData } = useQuery(getAllAppointmentsQuery, {
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
    <>
      <LargeScreenSideMenu
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        getEmployeeData={props.getEmployeeData ? props.getEmployeeData : null}
        employeeDataRefetch={props.employeeDataRefetch}
      />
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
              getClientsRefetch={getClientsRefetch}
              randomColorArray={randomColorArray ? randomColorArray : null}
            />
          )}
        />
        <Route
          exact
          path={props.path + "/schedule"}
          render={() => (
            <AdminSchedule
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
              getAllAppointmentsData={getAllAppointmentsData}
              getEmployeeData={
                props.getEmployeeData ? props.getEmployeeData : null
              }
            />
          )}
        />
        <Route
          exact
          path={props.path + "/saltcaveschedule"}
          render={() => (
            <AdminSaltCaveSchedule
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
              getAllAppointmentsData={getAllAppointmentsData}
              getEmployeeData={
                props.getEmployeeData ? props.getEmployeeData : null
              }
            />
          )}
        />
        {/* If no path matches, redirect to home */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default AdminRouter;
