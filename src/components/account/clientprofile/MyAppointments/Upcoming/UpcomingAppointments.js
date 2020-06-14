import React, { useEffect, useState, useRef, useCallback } from "react";
import "../MyAppointments.css";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Transition } from "react-spring/renderprops";
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
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import AddToCalendar from "react-add-to-calendar";
import "react-add-to-calendar/dist/react-add-to-calendar.css";
import { Modal } from "reactstrap";
import { BounceLoader } from "react-spinners";
import { css } from "emotion";
import { useMutation } from "@apollo/react-hooks";
import { deleteAppointmentMutation } from "../../../../../graphql/queries/queries";
import UnsureSummaryCard from "../../../../checkout/SummaryReviewCards/Treatments/UnsureSummaryCard";

const UpcomingAppointments = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const individualAppointmentRef = useRef(null);
  const selectedAppointmentBackRef = useRef(null);
  const backToAppointmentsRef = useRef(null);

  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const [appointmentToggled, changeAppointmentToggled] = useState("");
  const [cancelAppointmentClicked, changeCancelAppointmentClicked] = useState(
    false
  );
  const [loadingSpinnerActive, changeLoadingSpinnerActive] = useState(false);
  const [deleteAppointment, { loading, data }] = useMutation(
    deleteAppointmentMutation
  );

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const handleCancelAppointment = (item) => {
    deleteAppointment({
      variables: { _id: item.id },
    });
  };

  const resetStatesAfterLoading = useCallback(() => {
    props.refetch();
    changeLoadingSpinnerActive(false);
    changeCancelAppointmentClicked(false);
    changeAppointmentToggled(false);
  }, [props]);

  useEffect(() => {
    if (data) {
      const loadingFunction = setTimeout(() => resetStatesAfterLoading(), 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [data, dispatch, resetStatesAfterLoading]);

  useEffect(() => {
    if (loading) {
      changeLoadingSpinnerActive(true);
    }
  }, [loading, data]);

  useEffect(() => {
    const checkModalRef = setInterval(() => {
      let currentRef;

      if (selectedAppointmentBackRef) {
        currentRef = selectedAppointmentBackRef.current;
      }

      if (currentRef) {
        if (appointmentToggled) {
          disableBodyScroll({ targetElement: currentRef });
        } else {
          enableBodyScroll({ targetElement: currentRef });
        }
      }
    }, 100);
    return () => {
      clearInterval(checkModalRef);
      clearAllBodyScrollLocks();
    };
  }, [appointmentToggled]);

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

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
      if (props.data) {
        if (props.data.own_appointments) {
          if (props.data.own_appointments[dataIndex].treatments) {
            if (props.data.own_appointments[dataIndex].treatments[0].name) {
              if (
                props.data.own_appointments[dataIndex].treatments[0].name ===
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
        j < props.data.own_appointments[dataIndex].addOns.length;
        j++
      ) {
        if (props.data) {
          if (props.data.own_appointments) {
            if (props.data.own_appointments[dataIndex].addOns !== []) {
              if (props.data.own_appointments[dataIndex].addOns[j].name) {
                if (
                  props.data.own_appointments[dataIndex].addOns[j].name ===
                  addOnsSummaryCardComponentsArr[i].name
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
        height: props.data
          ? props.data.own_appointments.length > 4
            ? "100%"
            : "100vh"
          : "100vh",
        zIndex: logoutClicked ? -1 : "auto",
      }}
    >
      {redirectToHome()}
      {redirectToLogInPage()}
      <div
        className="my_appointments_header"
        style={{ zIndex: logoutClicked ? 0 : 3 }}
      >
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="my_appointments_header_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>
          MY{" "}
          {!props.currentScreenSize
            ? props.initialScreenSize >= 1200
              ? "UPCOMING "
              : null
            : props.currentScreenSize >= 1200
            ? "UPCOMING "
            : null}
          APPOINTMENTS
        </h1>
      </div>
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
      <div className="my_appointments_content_container">
        {props.data ? (
          props.data.own_appointments.length > 0 ? (
            props.data.own_appointments.map((item, i) => (
              <div
                key={i}
                className="my_individual_appointment_container"
                onClick={(e) => handleAppointmentToggled(e, item)}
                ref={individualAppointmentRef}
              >
                <Modal
                  isOpen={
                    cancelAppointmentClicked && appointmentToggled === item.id
                  }
                  className="cancel_appointment_modal"
                  style={{
                    content: {
                      position: "fixed",
                      zIndex: 10000,
                      opacity: 0.99,
                      height: "100%",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                      paddingBottom: "10%",
                      borderRadius: "none",
                      width: "100vw",
                      top: "0",
                      left: "0",
                      right: "0",
                      bottom: "0",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <BounceLoader
                    size={100}
                    css={override}
                    color={"rgb(44, 44, 52)"}
                    loading={loadingSpinnerActive}
                  />
                  <Transition
                    items={cancelAppointmentClicked && !loadingSpinnerActive}
                    from={{ transform: "translate3d(0, -65%, 0)" }}
                    enter={{ transform: "translate3d(0, 0, 0)" }}
                    leave={{ display: "none" }}
                  >
                    {(cancelAppointmentClicked) =>
                      cancelAppointmentClicked &&
                      ((styleprops) => (
                        <div
                          className="cancel_appointment_modal_content_container"
                          style={styleprops}
                        >
                          <div className="log_out_modal_contents">
                            <FontAwesomeIcon
                              className="modal_x"
                              icon={faTimes}
                              onClick={() =>
                                changeCancelAppointmentClicked(false)
                              }
                            />
                            <h2>
                              Are you sure you want to cancel your appointment?
                            </h2>
                            <span className="logout_buttons_container">
                              <div
                                className="logout_button"
                                onClick={() => handleCancelAppointment(item)}
                              >
                                <p>YES, CANCEL</p>
                              </div>
                              <div
                                className="cancel_logout_button"
                                onClick={() =>
                                  changeCancelAppointmentClicked(false)
                                }
                              >
                                <p>NO, GO BACK</p>
                              </div>
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </Transition>
                </Modal>
                <div className="my_appointment_date_square">
                  <p>
                    {item.date
                      .split(" ")[1]
                      .slice(0, item.date.split(" ")[1].indexOf(","))}
                  </p>
                  <p>
                    {item.date
                      .split(" ")[0]
                      .slice(0, 3)
                      .toUpperCase()}
                  </p>
                </div>
                <div className="my_appointment_information_container">
                  <p className="my_appointment_date_time">
                    {moment(item.date, "LL")
                      .format("LLLL")
                      .split(" ")
                      .slice(
                        0,
                        moment(item.date, "LL")
                          .format("LLLL")
                          .split(" ").length - 2
                      )
                      .join(" ") +
                      ", " +
                      item.startTime +
                      " " +
                      (Number(item.startTime.split(":")[0]) >= 12 ||
                      Number(item.startTime.split(":")[0]) < 9
                        ? "PM"
                        : "AM")}
                  </p>
                  <p className="my_appointment_details">
                    {item.treatments[0].name
                      ? item.treatments[0].name === "ChemicalPeel"
                        ? "Chemical Peel"
                        : item.treatments[0].name
                      : null}{" "}
                    Facial
                    {item.addOns[0]
                      ? ", " +
                        (item.addOns[0].name
                          ? item.addOns[0].name === "ExtraExtractions"
                            ? "Extra Extractions"
                            : item.addOns[0].name
                          : null) +
                        " Add On"
                      : null}{" "}
                    {item.addOns.length > 1
                      ? "+ " + (item.addOns.length - 1).toString() + " more"
                      : null}
                  </p>
                  <p className="my_appointment_details">
                    {item.duration >= 60
                      ? Math.floor(item.duration / 60)
                      : item.duration}{" "}
                    {item.duration >= 60
                      ? Math.floor(item.duration / 60) === 1
                        ? "hour"
                        : "hours"
                      : null}{" "}
                    {item.duration >= 60
                      ? Number.isInteger(item.duration / 60)
                        ? null
                        : item.duration -
                          Math.floor(item.duration / 60) * 60 +
                          " minutes"
                      : "minutes"}
                  </p>
                </div>
                <FontAwesomeIcon
                  style={{
                    zIndex: logoutClicked || appointmentToggled ? 0 : 1,
                    transitionDelay: logoutClicked
                      ? "initial"
                      : !appointmentToggled
                      ? "0.5s"
                      : "initial",
                  }}
                  icon={faEllipsisH}
                  className="my_individual_appointment_expand_icon"
                />
                <Transition
                  items={appointmentToggled}
                  from={{ transform: "translateX(-100%)" }}
                  enter={{ transform: "translateX(0%)" }}
                  leave={{ transform: "translateX(-100%)" }}
                  config={{ duration: 200 }}
                >
                  {(appointmentToggled) =>
                    appointmentToggled === item.id &&
                    ((styleprops) => (
                      <div
                        className="my_individual_selected_appointment_container"
                        style={styleprops}
                      >
                        <div className="my_individual_selected_appointment_contents_container">
                          <div
                            className="my_individual_selected_appointment_back_container"
                            ref={selectedAppointmentBackRef}
                            onClick={(e) => handleAppointmentUntoggled(e)}
                          >
                            <FontAwesomeIcon
                              icon={faLongArrowAltLeft}
                              className="my_individual_selected_appointment_back_arrow_icon"
                            />
                          </div>
                          <div className="selected_appointment_date_and_time_header">
                            <p>Appointment Date &amp; Time</p>
                          </div>
                          <div className="selected_appointment_date_and_time_content_container">
                            <div className="selected_appointment_date_and_time_content">
                              <p>
                                {moment(item.date, "LL")
                                  .format("LLLL")
                                  .split(" ")
                                  .slice(
                                    0,
                                    moment(item.date, "LL")
                                      .format("LLLL")
                                      .split(" ").length - 2
                                  )
                                  .join(" ")}
                              </p>
                              <p>
                                {item.startTime +
                                  " " +
                                  (Number(item.startTime.split(":")[0]) >= 12 ||
                                  Number(item.startTime.split(":")[0]) < 9
                                    ? "PM"
                                    : "AM")}{" "}
                                -{" "}
                                {item.endTime +
                                  " " +
                                  (Number(item.endTime.split(":")[0]) >= 12 ||
                                  Number(item.endTime.split(":")[0]) < 9
                                    ? "PM"
                                    : "AM")}{" "}
                              </p>
                              <p>
                                (
                                {item.duration >= 60
                                  ? Math.floor(item.duration / 60)
                                  : item.duration}{" "}
                                {item.duration >= 60
                                  ? Math.floor(item.duration / 60) === 1
                                    ? "hour"
                                    : "hours"
                                  : null}
                                {Number.isInteger(item.duration / 60)
                                  ? null
                                  : " "}
                                {item.duration >= 60
                                  ? Number.isInteger(item.duration / 60)
                                    ? null
                                    : item.duration -
                                      Math.floor(item.duration / 60) * 60 +
                                      " minutes"
                                  : "minutes"}
                                )
                              </p>
                            </div>
                            <div className="add_to_calendar_button_container">
                              <AddToCalendar
                                buttonTemplate={{ "calendar-plus-o": "left" }}
                                buttonLabel="Add to Calendar"
                                event={{
                                  title: "GlowLabs Facial",
                                  description:
                                    (item.treatments[0].name
                                      ? item.treatments[0].name ===
                                        "ChemicalPeel"
                                        ? "Chemical Peel"
                                        : item.treatments[0].name
                                      : "") +
                                    " Facial" +
                                    (item.addOns[0]
                                      ? item.addOns[0].name
                                        ? ", " +
                                          item.addOns
                                            .map((x) =>
                                              x.name === "ExtraExtractions"
                                                ? "Extra Extractions Add On"
                                                : x.name + " Add On"
                                            )
                                            .join(", ")
                                        : ""
                                      : ""),
                                  location: "1506 Broadway, Hewlett, NY 11557",
                                  startTime: moment(
                                    moment(item.date, "LL")
                                      .format("LLLL")
                                      .split(" ")
                                      .slice(
                                        0,
                                        moment(item.date, "LL")
                                          .format("LLLL")
                                          .split(" ").length - 2
                                      )
                                      .join(" ") +
                                      " " +
                                      item.startTime +
                                      " " +
                                      (Number(item.startTime.split(":")[0]) >=
                                        12 ||
                                      Number(item.startTime.split(":")[0]) < 9
                                        ? "PM"
                                        : "AM"),
                                    "LLLL"
                                  ).format(),
                                  endTime: moment(
                                    moment(item.date, "LL")
                                      .format("LLLL")
                                      .split(" ")
                                      .slice(
                                        0,
                                        moment(item.date, "LL")
                                          .format("LLLL")
                                          .split(" ").length - 2
                                      )
                                      .join(" ") +
                                      " " +
                                      item.endTime +
                                      " " +
                                      (Number(item.endTime.split(":")[0]) >=
                                        12 ||
                                      Number(item.endTime.split(":")[0]) < 9
                                        ? "PM"
                                        : "AM"),
                                    "LLLL"
                                  ).format(),
                                }}
                              />
                            </div>
                          </div>
                          <div className="selected_appointment_treatments_header">
                            <p>Treatment</p>
                          </div>
                          {renderSummaryCardTreatments(i)}
                          {props.data ? (
                            props.data.own_appointments ? (
                              props.data.own_appointments[i].addOns.length ===
                              0 ? null : (
                                <>
                                  <div className="selected_appointment_add_ons_header">
                                    <p>
                                      Add On
                                      {props.data
                                        ? props.data.own_appointments[i].addOns
                                            .length > 1
                                          ? "s"
                                          : null
                                        : null}
                                    </p>
                                  </div>
                                  {renderSummaryCardAddOns(i)}
                                </>
                              )
                            ) : null
                          ) : null}
                          <div className="selected_appointment_total_header">
                            <p>Total</p>
                            <p>${item.price}</p>
                          </div>
                          <div className="selected_appointments_bottom_buttons_container">
                            <div
                              className="cancel_appointment_button"
                              onClick={() =>
                                changeCancelAppointmentClicked(true)
                              }
                            >
                              <p>Cancel Appointment</p>
                            </div>
                            <div
                              className="back_to_all_appointments_button"
                              ref={backToAppointmentsRef}
                              onClick={(e) => handleAppointmentUntoggled(e)}
                            >
                              <p>Back to Appointments</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </Transition>
              </div>
            ))
          ) : (
            <div className="my_upcoming_appointments_empty_container">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="my_upcoming_appointments_empty_calendar_icon"
              />
              <h2>No upcoming appointments</h2>
              <p>
                Any future appointment bookings will be added here, so check
                back soon!
              </p>
            </div>
          )
        ) : (
          <div className="my_upcoming_appointments_empty_container">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="my_upcoming_appointments_empty_calendar_icon"
            />
            <h2>No upcoming appointments</h2>
            <p>
              Any future appointment bookings will be added here, so check back
              soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
