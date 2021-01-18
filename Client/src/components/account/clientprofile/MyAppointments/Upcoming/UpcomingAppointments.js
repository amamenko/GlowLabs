import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import CalmSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/CalmSummaryCard";
import BacialSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/BacialSummaryCard";
import ClarifySummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/ClarifySummaryCard";
import DermaplaningSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/DermaplaningSummaryCard";
import GlowSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/GlowSummaryCard";
import QuenchSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/QuenchSummaryCard";
import QuickieSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/QuickieSummaryCard";
import ChemicalPeelSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/ChemicalPeelSummaryCard";
import CBDSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/CBDSummaryCard";
import MicroneedleSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/MicroneedleSummaryCard";
import RejuvenateSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/RejuvenateSummaryCard";
import ExtraExtractionsSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/ExtraExtractionsCard";
import HydroJellyMaskSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/HydroJellyMaskSummaryCard";
import LEDTherapySummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/LEDTherapySummaryCard";
import MicrocurrentSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/MicrocurrentSummaryCard";
import MicrodermabrasionSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/MicrodermabrasionSummaryCard";
import DermarollingSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/DermarollingSummaryCard";
import NanoNeedlingSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/NanoNeedlingSummaryCard";
import GuaShaSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/GuaShaSummaryCard";
import BeardSummaryCard from "../../../../checkout/SummaryReviewCards/AddOns/BeardSummaryCard";
import { css } from "@emotion/css";
import { useMutation } from "@apollo/react-hooks";
import deleteAppointmentMutation from "../../../../../graphql/mutations/deleteAppointmentMutation";
import UnsureSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/UnsureSummaryCard";
import ClientRenderUpcomingAppointments from "./ClientRenderUpcomingAppointments";
import SaltCaveSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/SaltCaveSummaryCard";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_CANCEL_APPOINTMENT_CLICKED_RESET from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED_RESET";
import "../MyAppointments.css";

const UpcomingAppointments = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    refetch,
    initialScreenSize,
    currentScreenSize,
    loadingAppointments,
    upcomingAppointmentsData,
    upcomingAppointmentsCalled,
    getOwnAppointments,
  } = props;

  const individualAppointmentRef = useRef(null);
  const selectedAppointmentBackRef = useRef(null);
  const backToAppointmentsRef = useRef(null);

  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const pdfLoading = useSelector((state) => state.pdfLoading.pdf_loading);
  const [appointmentToggled, changeAppointmentToggled] = useState("");
  const [loadingSpinnerActive, changeLoadingSpinnerActive] = useState(false);
  const [
    deleteAppointment,
    { loading, data: deleteAppointmentData },
  ] = useMutation(deleteAppointmentMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const handleCancelAppointment = async (item) => {
    await deleteAppointment({
      variables: { _id: item.id },
    }).then(() => {
      setTimeout(() => refetch(), 1000);
    });
  };

  const resetStatesAfterLoading = useCallback(() => {
    refetch();
    changeLoadingSpinnerActive(false);
    dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET());
    changeAppointmentToggled(false);
  }, [dispatch, refetch]);

  useEffect(() => {
    if (deleteAppointmentData) {
      const loadingFunction = setTimeout(() => resetStatesAfterLoading(), 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [deleteAppointmentData, resetStatesAfterLoading]);

  useEffect(() => {
    if (loading) {
      changeLoadingSpinnerActive(true);
    }
  }, [loading, deleteAppointmentData]);

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  const redirectToLogInPage = () => {
    if (!userAuthenticated && !adminAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

  useMemo(() => {
    if (!upcomingAppointmentsCalled) {
      getOwnAppointments();
    }
  }, [getOwnAppointments, upcomingAppointmentsCalled]);

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const treatmentsSummaryCardComponentsArr = [
    { name: "Calm", component: <CalmSummaryCard /> },
    { name: "Bacial", component: <BacialSummaryCard /> },
    { name: "Clarify", component: <ClarifySummaryCard /> },
    { name: "Dermaplaning", component: <DermaplaningSummaryCard /> },
    { name: "Glow", component: <GlowSummaryCard /> },
    { name: "Quench", component: <QuenchSummaryCard /> },
    { name: "Quickie", component: <QuickieSummaryCard /> },
    { name: "ChemicalPeel", component: <ChemicalPeelSummaryCard /> },
    { name: "CBD", component: <CBDSummaryCard /> },
    { name: "Microneedling", component: <MicroneedleSummaryCard /> },
    { name: "Rejuvenate", component: <RejuvenateSummaryCard /> },
    { name: "Not Sure", component: <UnsureSummaryCard /> },
    { name: "Salt Cave", component: <SaltCaveSummaryCard /> },
  ];

  const addOnsSummaryCardComponentsArr = [
    { name: "ExtraExtractions", component: <ExtraExtractionsSummaryCard /> },
    { name: "HydroJelly", component: <HydroJellyMaskSummaryCard /> },
    { name: "LED", component: <LEDTherapySummaryCard /> },
    { name: "Microcurrent", component: <MicrocurrentSummaryCard /> },
    { name: "Microdermabrasion", component: <MicrodermabrasionSummaryCard /> },
    { name: "Dermarolling", component: <DermarollingSummaryCard /> },
    { name: "NanoNeedling", component: <NanoNeedlingSummaryCard /> },
    { name: "GuaSha", component: <GuaShaSummaryCard /> },
    { name: "Beard", component: <BeardSummaryCard /> },
  ];

  const renderSummaryCardTreatments = (dataIndex) => {
    let componentsArr = [];

    for (let i = 0; i < treatmentsSummaryCardComponentsArr.length; i++) {
      if (upcomingAppointmentsData) {
        if (upcomingAppointmentsData.own_appointments) {
          if (upcomingAppointmentsData.own_appointments[dataIndex].treatments) {
            if (
              upcomingAppointmentsData.own_appointments[dataIndex].treatments[0]
                .name
            ) {
              if (
                upcomingAppointmentsData.own_appointments[dataIndex]
                  .treatments[0].name ===
                treatmentsSummaryCardComponentsArr[i].name
              ) {
                componentsArr.push(
                  treatmentsSummaryCardComponentsArr[i].component
                );
              }
            }
          }
        }
      }
    }
    return componentsArr.map((item, index) => (
      <div className="my_selected_appointment_treatment_container" key={index}>
        {item}
      </div>
    ));
  };

  const renderSummaryCardAddOns = (dataIndex) => {
    let componentsArr = [];

    for (let i = 0; i < addOnsSummaryCardComponentsArr.length; i++) {
      for (
        let j = 0;
        j < upcomingAppointmentsData.own_appointments[dataIndex].addOns.length;
        j++
      ) {
        if (upcomingAppointmentsData) {
          if (upcomingAppointmentsData.own_appointments) {
            if (
              upcomingAppointmentsData.own_appointments[dataIndex].addOns !== []
            ) {
              if (
                upcomingAppointmentsData.own_appointments[dataIndex].addOns[j]
                  .name
              ) {
                if (
                  upcomingAppointmentsData.own_appointments[dataIndex].addOns[j]
                    .name === addOnsSummaryCardComponentsArr[i].name
                ) {
                  componentsArr.push(
                    addOnsSummaryCardComponentsArr[i].component
                  );
                }
              }
            }
          }
        }
      }
    }
    return componentsArr.map((item, index) => (
      <div className="my_selected_appointment_treatment_container" key={index}>
        {item}
      </div>
    ));
  };

  // Allows click only if selected appointment modal is not active

  const handleAppointmentToggled = (e, item) => {
    if (e.currentTarget && individualAppointmentRef) {
      if (individualAppointmentRef.current) {
        if (
          individualAppointmentRef.current.className ===
          e.currentTarget.className
        ) {
          if (selectedAppointmentBackRef) {
            if (!selectedAppointmentBackRef.current) {
              if (item) {
                if (item.id) {
                  changeAppointmentToggled(item.id);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled appointment

  const handleAppointmentUntoggled = (e) => {
    if (
      (e.currentTarget && selectedAppointmentBackRef) ||
      (e.currentTarget && backToAppointmentsRef)
    ) {
      if (selectedAppointmentBackRef.current || backToAppointmentsRef.current) {
        if (
          selectedAppointmentBackRef.current.className ===
            e.currentTarget.className ||
          backToAppointmentsRef.current.className === e.currentTarget.className
        ) {
          changeAppointmentToggled("");
        }
      }
    }
  };

  return (
    <div
      className="my_appointments_container"
      style={{
        height: upcomingAppointmentsData
          ? upcomingAppointmentsData.own_appointments.length > 4
            ? "100%"
            : "100vh"
          : "100vh",
        zIndex: logoutClicked || pdfLoading ? -1 : "auto",
      }}
    >
      {redirectToLogInPage()}
      <div
        className="my_appointments_header"
        style={{
          zIndex: cancelAppointmentClicked ? 0 : 3,
          filter: cancelAppointmentClicked ? "blur(5px)" : "none",
        }}
      >
        {adminAuthenticated ? null : (
          <Link to="/account/clientprofile">
            <FontAwesomeIcon
              className="my_appointments_header_back_arrow"
              icon={faChevronLeft}
            />
          </Link>
        )}
        <h1>
          {adminAuthenticated ? "CLIENT" : "MY"}{" "}
          {!currentScreenSize
            ? initialScreenSize >= 1200
              ? "UPCOMING "
              : null
            : currentScreenSize >= 1200
            ? "UPCOMING "
            : null}
          APPOINTMENTS
        </h1>
      </div>
      {
        <div
          className="my_appointments_sub_header"
          style={{ zIndex: logoutClicked ? -1 : 2 }}
        >
          <div className="upcoming_appointments_upcoming_title_container">
            <h2>UPCOMING</h2>
          </div>
          <Link
            to="/account/clientprofile/pastappointments"
            className="sub_header_container_link"
          >
            <div className="upcoming_appointments_past_title_container">
              <h2>PAST</h2>
            </div>
          </Link>
        </div>
      }
      <div className="my_appointments_content_container">
        <ClientRenderUpcomingAppointments
          upcomingAppointmentsData={upcomingAppointmentsData}
          loadingAppointments={loadingAppointments}
          handleAppointmentToggled={handleAppointmentToggled}
          handleAppointmentUntoggled={handleAppointmentUntoggled}
          handleCancelAppointment={handleCancelAppointment}
          individualAppointmentRef={individualAppointmentRef}
          appointmentToggled={appointmentToggled}
          override={override}
          renderSummaryCardAddOns={renderSummaryCardAddOns}
          renderSummaryCardTreatments={renderSummaryCardTreatments}
          cancelAppointmentClicked={cancelAppointmentClicked}
          changeLoadingSpinnerActive={changeLoadingSpinnerActive}
          loadingSpinnerActive={loadingSpinnerActive}
          ref={{
            individualAppointmentRef: individualAppointmentRef,
            selectedAppointmentBackRef: selectedAppointmentBackRef,
            backToAppointmentsRef: backToAppointmentsRef,
          }}
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      </div>
    </div>
  );
};

export default UpcomingAppointments;
