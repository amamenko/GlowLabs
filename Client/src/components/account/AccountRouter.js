import React, { useMemo, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import getOwnPastAppointmentsQuery from "../../graphql/queries/getOwnPastAppointmentsQuery";
import getOwnAppointmentsQuery from "../../graphql/queries/getOwnAppointmentsQuery";
import MyProfile from "./clientprofile/MyProfile/MyProfile";
// import SkinCareRoutine from "./clientprofile/MyProfile/SkinCareRoutine/SkinCareRoutine";
// import MyRoutine from "./clientprofile/MyProfile/SkinCareRoutine/MyRoutine";
import LargeScreenSideMenu from "./LargeScreenSideMenu/LargeScreenSideMenu";
import { Font } from "@react-pdf/renderer";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_NAVBAR_NOT_VISIBLE from "../../actions/NavbarIsVisible/ACTION_NAVBAR_NOT_VISIBLE";
import ACTION_NAVBAR_IS_VISIBLE from "../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import "./LargeScreenSideMenu/LargeScreenSideMenu.css";
import "../../components/checkout/ConfirmationPage.css";
import "../../components/checkout/GuestCheckout.css";

const AccountRouter = React.forwardRef((props, ref) => {
  const {
    getClientData,
    getClientError,
    initialScreenSize,
    currentScreenSize,
    path,
    handleClickToScrollToHome,
    clientDataRefetch,
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();

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

  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );

  const registerFont = () => {
    Font.register({
      family: "Montserrat",
      fonts: [
        {
          src: "../../MontserratFont/woff2/Montserrat-Light.woff2",
          fontStyle: "normal",
          fontWeight: 300,
        },
        {
          src: "../../MontserratFont/woff2/Montserrat-Regular.woff2",
          fontStyle: "normal",
          fontWeight: 400,
        },
        {
          src: "../../MontserratFont/woff2/Montserrat-Medium.woff2",
          fontStyle: "normal",
          fontWeight: 500,
        },
        {
          src: "../../MontserratFont/woff2/Montserrat-SemiBold.woff2",
          fontStyle: "normal",
          fontWeight: 600,
        },
        {
          src: "../../MontserratFont/woff2/Montserrat-Bold.woff2",
          fontStyle: "normal",
          fontWeight: 700,
        },
        {
          src: "../../MontserratFont/woff2/Montserrat-Black.woff2",
          fontStyle: "normal",
          fontWeight: 900,
        },

        {
          src: "../../MontserratFont/woff/Montserrat-Light.woff",
          fontStyle: "normal",
          fontWeight: 300,
        },
        {
          src: "../../MontserratFont/woff/Montserrat-Regular.woff",
          fontStyle: "normal",
          fontWeight: 400,
        },
        {
          src: "../../MontserratFont/woff/Montserrat-Medium.woff",
          fontStyle: "normal",
          fontWeight: 500,
        },
        {
          src: "../../MontserratFont/woff/Montserrat-SemiBold.woff",
          fontStyle: "normal",
          fontWeight: 600,
        },
        {
          src: "../../MontserratFont/woff/Montserrat-Bold.woff",
          fontStyle: "normal",
          fontWeight: 700,
        },
        {
          src: "../../MontserratFont/woff/Montserrat-Black.woff",
          fontStyle: "normal",
          fontWeight: 900,
        },

        {
          src: "../../MontserratFont/otf/Montserrat-Light.otf",
          fontStyle: "normal",
          fontWeight: 300,
        },
        {
          src: "../../MontserratFont/otf/Montserrat-Regular.otf",
          fontStyle: "normal",
          fontWeight: 400,
        },
        {
          src: "../../MontserratFont/otf/Montserrat-Medium.otf",
          fontStyle: "normal",
          fontWeight: 500,
        },
        {
          src: "../../MontserratFont/otf/Montserrat-SemiBold.otf",
          fontStyle: "normal",
          fontWeight: 600,
        },
        {
          src: "../../MontserratFont/otf/Montserrat-Bold.otf",
          fontStyle: "normal",
          fontWeight: 700,
        },
        {
          src: "../../MontserratFont/otf/Montserrat-Black.otf",
          fontStyle: "normal",
          fontWeight: 900,
        },

        {
          src: "../../MontserratFont/ttf/Montserrat-Light.ttf",
          fontStyle: "normal",
          fontWeight: 300,
        },
        {
          src: "../../MontserratFont/ttf/Montserrat-Regular.ttf",
          fontStyle: "normal",
          fontWeight: 400,
        },
        {
          src: "../../MontserratFont/ttf/Montserrat-Medium.ttf",
          fontStyle: "normal",
          fontWeight: 500,
        },
        {
          src: "../../MontserratFont/ttf/Montserrat-SemiBold.ttf",
          fontStyle: "normal",
          fontWeight: 600,
        },
        {
          src: "../../MontserratFont/ttf/Montserrat-Bold.ttf",
          fontStyle: "normal",
          fontWeight: 700,
        },
        {
          src: "../../MontserratFont/ttf/Montserrat-Black.ttf",
          fontStyle: "normal",
          fontWeight: 900,
        },
      ],
    });
  };

  useMemo(() => {
    registerFont();
  }, []);

  useMemo(() => {
    // If client error, refresh page a single time to check again
    if (getClientError) {
      if (location.pathname.includes("clientprofile")) {
        if (!window.location.hash) {
          window.location = window.location + "#";
          window.location.reload();
        }
      }
    }
  }, [getClientError, location.pathname]);

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  useEffect(() => {
    if (
      location.pathname.includes("/login") ||
      location.pathname.includes("/signup")
    ) {
      dispatch(ACTION_NAVBAR_NOT_VISIBLE());
    } else {
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <LargeScreenSideMenu
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        called={called}
        refetch={refetch}
        pastAppointmentsCalled={pastAppointmentsCalled}
        getOwnAppointments={getOwnAppointments}
        getOwnPastAppointments={getOwnPastAppointments}
        getClientData={getClientData}
        handleClickToScrollToHome={handleClickToScrollToHome}
        ref={ref}
      />
      <Switch>
        <Route exact path={path + "/login"} component={Login} />
        <Route exact path={path + "/signup"} component={SignUp} />
        <Route
          exact
          path={path + "/completeregistration"}
          render={() => <FacebookCompleteRegistration />}
        />
        <Route
          exact
          path={path + "/clientprofile"}
          render={() => (
            <ClientProfile
              called={called}
              refetch={refetch}
              pastAppointmentsCalled={pastAppointmentsCalled}
              getOwnAppointments={getOwnAppointments}
              getOwnPastAppointments={getOwnPastAppointments}
              getClientData={getClientData}
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/profile"}
          render={() => <MyProfile getClientData={getClientData} />}
        />
        {/* <Route
          exact
          path={path + "/clientprofile/profile/routine"}
          render={() => <SkinCareRoutine getClientData={getClientData} />}
        /> */}
        {/* <Route
          exact
          path={path + "/clientprofile/profile/myroutine"}
          render={() => (
            <MyRoutine
              getClientData={getClientData}
              clientDataRefetch={clientDataRefetch}
            />
          )}
        /> */}
        <Route
          exact
          path={path + "/clientprofile/upcomingappointments"}
          render={() => (
            <UpcomingAppointments
              data={data ? data : null}
              refetch={refetch ? refetch : null}
              loadingAppointments={loadingAppointments}
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/pastappointments"}
          render={() => (
            <PastAppointments
              data={pastAppointmentsData ? pastAppointmentsData : null}
              loadingPastAppointments={loadingPastAppointments}
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page1"}
          render={() => (
            <ConsentFormPage1
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page2"}
          render={() => (
            <ConsentFormPage2
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page3"}
          render={() => (
            <ConsentFormPage3
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page4"}
          render={() => (
            <ConsentFormPage4
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page5"}
          render={() => (
            <ConsentFormPage5
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page6"}
          render={() => (
            <ConsentFormPage6
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
        <Route
          exact
          path={path + "/clientprofile/consentform/page7"}
          render={() => (
            <ConsentFormPage7
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
              clientDataRefetch={clientDataRefetch}
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
