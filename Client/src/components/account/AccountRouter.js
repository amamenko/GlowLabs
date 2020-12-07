import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import ClientProfile from "./clientprofile/ClientProfile";
import ConsentFormPage1 from "./clientprofile/ConsentForm/Pages/Page1/ConsentFormPage1";
import ConsentFormPage2 from "./clientprofile/ConsentForm/Pages/Page2/ConsentFormPage2";
import ConsentFormPage3 from "./clientprofile/ConsentForm/Pages/Page3/ConsentFormPage3";
import ConsentFormPage4 from "./clientprofile/ConsentForm/Pages/Page4/ConsentFormPage4";
import ConsentFormPage5 from "./clientprofile/ConsentForm/Pages/Page5/ConsentFormPage5";
import ConsentFormPage6 from "./clientprofile/ConsentForm/Pages/Page6/ConsentFormPage6";
import ConsentFormPage7 from "./clientprofile/ConsentForm/Pages/Page7/ConsentFormPage7";
import FacebookCompleteRegistration from "./login/FacebookCompleteRegistration/FacebookCompleteRegistration";
import UpcomingAppointments from "./clientprofile/MyAppointments/Upcoming/UpcomingAppointments";
import PastAppointments from "./clientprofile/MyAppointments/Past/PastAppointments";
import { useLazyQuery } from "@apollo/react-hooks";
import {
  getOwnAppointmentsQuery,
  getOwnPastAppointmentsQuery,
} from "../../graphql/queries/queries";
import MyProfile from "./clientprofile/MyProfile/MyProfile";
import SkinCareRoutine from "./clientprofile/MyProfile/SkinCareRoutine/SkinCareRoutine";
import MyRoutine from "./clientprofile/MyProfile/SkinCareRoutine/MyRoutine";
import LargeScreenSideMenu from "./LargeScreenSideMenu/LargeScreenSideMenu";
import "./LargeScreenSideMenu/LargeScreenSideMenu.css";

const AccountRouter = React.forwardRef((props, ref) => {
  const [
    getOwnAppointments,
    { data, called, refetch, loading: loadingAppointments },
  ] = useLazyQuery(getOwnAppointmentsQuery, {
    fetchPolicy: "no-cache",
  });

  const [
    getOwnPastAppointments,
    {
      data: pastAppointmentsData,
      called: pastAppointmentsCalled,
      loading: loadingPastAppointments,
    },
  ] = useLazyQuery(getOwnPastAppointmentsQuery, {
    fetchPolicy: "no-cache",
  });

  return (
    <>
      <LargeScreenSideMenu
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        called={called}
        refetch={refetch}
        pastAppointmentsCalled={pastAppointmentsCalled}
        getOwnAppointments={getOwnAppointments}
        getOwnPastAppointments={getOwnPastAppointments}
        getClientData={props.getClientData}
        handleClickToScrollToHome={props.handleClickToScrollToHome}
        ref={ref}
      />
      <Switch>
        <Route exact path={props.path + "/login"} component={Login} />
        <Route exact path={props.path + "/signup"} component={SignUp} />
        <Route
          exact
          path={props.path + "/completeregistration"}
          render={() => <FacebookCompleteRegistration />}
        />
        <Route
          exact
          path={props.path + "/clientprofile"}
          render={() => (
            <ClientProfile
              called={called}
              refetch={refetch}
              pastAppointmentsCalled={pastAppointmentsCalled}
              getOwnAppointments={getOwnAppointments}
              getOwnPastAppointments={getOwnPastAppointments}
              getClientData={props.getClientData}
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={props.path + "/clientprofile/profile"}
          render={() => <MyProfile getClientData={props.getClientData} />}
        />
        <Route
          exact
          path={props.path + "/clientprofile/profile/routine"}
          render={() => <SkinCareRoutine getClientData={props.getClientData} />}
        />
        <Route
          exact
          path={props.path + "/clientprofile/profile/myroutine"}
          render={() => (
            <MyRoutine
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
          )}
        />
        <Route
          exact
          path={props.path + "/clientprofile/upcomingappointments"}
          render={() => (
            <UpcomingAppointments
              data={data ? data : null}
              refetch={refetch ? refetch : null}
              loadingAppointments={loadingAppointments}
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={props.path + "/clientprofile/pastappointments"}
          render={() => (
            <PastAppointments
              data={pastAppointmentsData ? pastAppointmentsData : null}
              loadingPastAppointments={loadingPastAppointments}
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page1"}
          component={ConsentFormPage1}
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page2"}
          component={ConsentFormPage2}
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page3"}
          component={ConsentFormPage3}
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page4"}
          component={ConsentFormPage4}
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page5"}
          component={ConsentFormPage5}
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page6"}
          component={ConsentFormPage6}
          initialScreenSize={props.initialScreenSize}
          currentScreenSize={props.currentScreenSize}
        />
        <Route
          exact
          path={props.path + "/clientprofile/consentform/page7"}
          render={() => (
            <ConsentFormPage7
              initialScreenSize={props.initialScreenSize}
              currentScreenSize={props.currentScreenSize}
              clientDataRefetch={props.clientDataRefetch}
            />
          )}
        />
        {/* If no path matches, redirect to home */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
});

export default AccountRouter;
