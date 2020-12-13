import React, { useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLoginPage from "./AdminLogin/AdminLoginPage";
import AdminMenu from "./AdminMenu/AdminMenu";
import AdminClients from "./AdminClients/AdminClients";
import { useQuery } from "@apollo/react-hooks";
import {
  getClientsQuery,
  getAllAppointmentsQuery,
  getAllPersonalEventsQuery,
} from "../../graphql/queries/queries";
import randomColor from "randomcolor";
import LargeScreenSideMenu from "../account/LargeScreenSideMenu/LargeScreenSideMenu";
import AdminSchedule from "./AdminSchedule/AdminSchedule";
import AdminStaff from "./AdminStaff/AdminStaff";
import AdminNotifications from "./AdminNotifications/AdminNotifications";

const AdminRouter = React.forwardRef((props, ref) => {
  const {
    data: getClientsData,
    refetch: getClientsRefetch,
    loading: getClientsLoading,
  } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache",
  });

  const {
    data: getAllAppointmentsData,
    refetch: getAllAppointmentsRefetch,
  } = useQuery(getAllAppointmentsQuery, {
    fetchPolicy: "no-cache",
  });

  const {
    data: getAllPersonalEventsData,
    refetch: getAllPersonalEventsRefetch,
  } = useQuery(getAllPersonalEventsQuery, {
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
        getClientsLoading={getClientsLoading}
        handleClickToScrollToHome={props.handleClickToScrollToHome}
        ref={ref}
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
          path={props.path + "/activity"}
          render={() => (
            <AdminNotifications
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
              getEmployeeData={
                props.getEmployeeData ? props.getEmployeeData : null
              }
              getEmployeeLoading={props.getEmployeeLoading}
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
              getEmployeeData={
                props.getEmployeeData ? props.getEmployeeData : null
              }
              getClientsData={getClientsData ? getClientsData : null}
              getClientsRefetch={getClientsRefetch}
              getClientsLoading={getClientsLoading}
              randomColorArray={randomColorArray ? randomColorArray : null}
            />
          )}
        />
        <Route
          exact
          path={props.path + "/staff"}
          render={() => (
            <AdminStaff
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
              getClientsData={getClientsData ? getClientsData : null}
              getClientsLoading={getClientsLoading}
              getEmployeeData={
                props.getEmployeeData ? props.getEmployeeData : null
              }
              employeeDataRefetch={props.employeeDataRefetch}
              getEmployeesData={props.getEmployeesData}
              getEmployeesRefetch={props.getEmployeesRefetch}
              getAllAppointmentsData={getAllAppointmentsData}
              getAllAppointmentsRefetch={getAllAppointmentsRefetch}
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
              getAllAppointmentsRefetch={getAllAppointmentsRefetch}
              getEmployeeData={
                props.getEmployeeData ? props.getEmployeeData : null
              }
              getEmployeesData={
                props.getEmployeesData ? props.getEmployeesData : null
              }
              getClientsData={getClientsData ? getClientsData : null}
              getClientsRefetch={getClientsRefetch}
              getAllPersonalEventsData={getAllPersonalEventsData}
              getAllPersonalEventsRefetch={getAllPersonalEventsRefetch}
              randomColorArray={randomColorArray ? randomColorArray : null}
            />
          )}
        />
        {/* If no path matches, redirect to home */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
});

export default AdminRouter;
