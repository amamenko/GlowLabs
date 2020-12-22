import React, { useEffect, useMemo } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AdminLoginPage from "./AdminLogin/AdminLoginPage";
import AdminMenu from "./AdminMenu/AdminMenu";
import AdminClients from "./AdminClients/AdminClients";
import { useMutation, useQuery } from "@apollo/react-hooks";
import getClientsQuery from "../../graphql/queries/getClientsQuery";
import getAllAppointmentsQuery from "../../graphql/queries/getAllAppointmentsQuery";
import getAllPersonalEventsQuery from "../../graphql/queries/getAllPersonalEventsQuery";
import resetNotificationsMutation from "../../graphql/mutations/resetNotificationsMutation";
import randomColor from "randomcolor";
import LargeScreenSideMenu from "../account/LargeScreenSideMenu/LargeScreenSideMenu";
import AdminSchedule from "./AdminSchedule/AdminSchedule";
import AdminStaff from "./AdminStaff/AdminStaff";
import AdminNotifications from "./AdminNotifications/AdminNotifications";
import { Font } from "@react-pdf/renderer";
import { useDispatch } from "react-redux";
import ACTION_ON_ACTIVITY_PAGE from "../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/css";

const AdminRouter = React.forwardRef((props, ref) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    getEmployeeData,
    path,
    initialScreenSize,
    currentScreenSize,
    getEmployeeLoading,
    employeeDataRefetch,
    getEmployeesData,
    getEmployeesRefetch,
    handleClickToScrollToHome,
  } = props;

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

  const [resetNotifications] = useMutation(resetNotificationsMutation);

  useEffect(() => {
    if (location.pathname.includes("activity")) {
      dispatch(ACTION_ON_ACTIVITY_PAGE());
    }
  }, [location.pathname, dispatch]);

  const registerFont = () => {
    Font.register({
      family: "Montserrat",
      src:
        "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
    });
  };

  useMemo(() => {
    registerFont();
  }, []);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  return (
    <div className="admin_router_container">
      <LargeScreenSideMenu
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        getEmployeeData={getEmployeeData ? getEmployeeData : null}
        employeeDataRefetch={employeeDataRefetch}
        getClientsLoading={getClientsLoading}
        handleClickToScrollToHome={handleClickToScrollToHome}
        ref={ref}
        resetNotifications={resetNotifications}
      />
      {/* <div className="auth_route_fallback_clip_loader">
        <ClipLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={true}
        />
      </div> */}
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <AdminLoginPage
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              getEmployeeData={getEmployeeData ? getEmployeeData : null}
              employeeDataRefetch={employeeDataRefetch}
            />
          )}
        />
        <Route
          exact
          path={path + "/menu"}
          render={() => (
            <AdminMenu
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              getEmployeeData={getEmployeeData ? getEmployeeData : null}
              employeeDataRefetch={employeeDataRefetch}
            />
          )}
        />
        <Route
          exact
          path={path + "/activity"}
          render={() => (
            <AdminNotifications
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              getEmployeeData={getEmployeeData ? getEmployeeData : null}
              getEmployeeLoading={getEmployeeLoading}
              resetNotifications={resetNotifications}
            />
          )}
        />
        <Route
          exact
          path={path + "/clients"}
          render={() => (
            <AdminClients
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              getEmployeeData={getEmployeeData ? getEmployeeData : null}
              getClientsData={getClientsData ? getClientsData : null}
              getClientsRefetch={getClientsRefetch}
              getClientsLoading={getClientsLoading}
              randomColorArray={randomColorArray ? randomColorArray : null}
              resetNotifications={resetNotifications}
            />
          )}
        />
        <Route
          exact
          path={path + "/staff"}
          render={() => (
            <AdminStaff
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              getClientsData={getClientsData ? getClientsData : null}
              getClientsLoading={getClientsLoading}
              getEmployeeData={getEmployeeData ? getEmployeeData : null}
              employeeDataRefetch={employeeDataRefetch}
              getEmployeesData={getEmployeesData}
              getEmployeesRefetch={getEmployeesRefetch}
              getAllAppointmentsData={getAllAppointmentsData}
              getAllAppointmentsRefetch={getAllAppointmentsRefetch}
              randomColorArray={randomColorArray ? randomColorArray : null}
              resetNotifications={resetNotifications}
            />
          )}
        />
        <Route
          exact
          path={path + "/schedule"}
          render={() => (
            <AdminSchedule
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              getAllAppointmentsData={getAllAppointmentsData}
              getAllAppointmentsRefetch={getAllAppointmentsRefetch}
              getEmployeeData={getEmployeeData ? getEmployeeData : null}
              getEmployeesData={getEmployeesData ? getEmployeesData : null}
              getClientsData={getClientsData ? getClientsData : null}
              getClientsRefetch={getClientsRefetch}
              getAllPersonalEventsData={getAllPersonalEventsData}
              getAllPersonalEventsRefetch={getAllPersonalEventsRefetch}
              randomColorArray={randomColorArray ? randomColorArray : null}
              resetNotifications={resetNotifications}
            />
          )}
        />
        {/* If no path matches, redirect to home */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
});

export default AdminRouter;
