import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CalmSummaryCard from "../../checkout/SummaryReviewCards/Treatments/CalmSummaryCard";
import BacialSummaryCard from "../../checkout/SummaryReviewCards/Treatments/BacialSummaryCard";
import ClarifySummaryCard from "../../checkout/SummaryReviewCards/Treatments/ClarifySummaryCard";
import DermaplaningSummaryCard from "../../checkout/SummaryReviewCards/Treatments/DermaplaningSummaryCard";
import GlowSummaryCard from "../../checkout/SummaryReviewCards/Treatments/GlowSummaryCard";
import QuenchSummaryCard from "../../checkout/SummaryReviewCards/Treatments/QuenchSummaryCard";
import QuickieSummaryCard from "../../checkout/SummaryReviewCards/Treatments/QuickieSummaryCard";
import ChemicalPeelSummaryCard from "../../checkout/SummaryReviewCards/Treatments/ChemicalPeelSummaryCard";
import CBDSummaryCard from "../../checkout/SummaryReviewCards/Treatments/CBDSummaryCard";
import MicroneedleSummaryCard from "../../checkout/SummaryReviewCards/Treatments/MicroneedleSummaryCard";
import RejuvenateSummaryCard from "../../checkout/SummaryReviewCards/Treatments/RejuvenateSummaryCard";
import UnsureSummaryCard from "../../checkout/SummaryReviewCards/Treatments/UnsureSummaryCard";
import ExtraExtractionsSummaryCard from "../../checkout/SummaryReviewCards/AddOns/ExtraExtractionsCard";
import HydroJellyMaskSummaryCard from "../../checkout/SummaryReviewCards/AddOns/HydroJellyMaskSummaryCard";
import LEDTherapySummaryCard from "../../checkout/SummaryReviewCards/AddOns/LEDTherapySummaryCard";
import MicrocurrentSummaryCard from "../../checkout/SummaryReviewCards/AddOns/MicrocurrentSummaryCard";
import MicrodermabrasionSummaryCard from "../../checkout/SummaryReviewCards/AddOns/MicrodermabrasionSummaryCard";
import DermarollingSummaryCard from "../../checkout/SummaryReviewCards/AddOns/DermarollingSummaryCard";
import NanoNeedlingSummaryCard from "../../checkout/SummaryReviewCards/AddOns/NanoNeedlingSummaryCard";
import GuaShaSummaryCard from "../../checkout/SummaryReviewCards/AddOns/GuaShaSummaryCard";
import BeardSummaryCard from "../../checkout/SummaryReviewCards/AddOns/BeardSummaryCard";
import "../../account/clientprofile/MyAppointments/MyAppointments.css";

const AdminRenderUpcomingAppointments = (props) => {
  const location = useLocation();
  const individualAppointmentRef = useRef(null);
  const selectedAppointmentBackRef = useRef(null);
  const backToAppointmentsRef = useRef(null);

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const [appointmentToggled, changeAppointmentToggled] = useState("");

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
        if (props.data.own_past_appointments) {
          if (props.data.own_past_appointments[dataIndex].treatments) {
            if (
              props.data.own_past_appointments[dataIndex].treatments[0].name
            ) {
              if (
                props.data.own_past_appointments[dataIndex].treatments[0]
                  .name === treatmentsSummaryCardComponentsArr[i].name
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
      <div
        className="my_selected_appointment_treatment_container admin_side_client_treatment_container"
        key={index}
      >
        {item}
      </div>
    ));
  };

  const renderSummaryCardAddOns = (dataIndex) => {
    let componentsArr = [];

    for (let i = 0; i < addOnsSummaryCardComponentsArr.length; i++) {
      for (
        let j = 0;
        j < props.data.own_past_appointments[dataIndex].addOns.length;
        j++
      ) {
        if (props.data) {
          if (props.data.own_past_appointments) {
            if (props.data.own_past_appointments[dataIndex].addOns !== []) {
              if (props.data.own_past_appointments[dataIndex].addOns[j].name) {
                if (
                  props.data.own_past_appointments[dataIndex].addOns[j].name ===
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
      <div
        className="my_selected_appointment_treatment_container admin_side_client_treatment_container"
        key={index}
      >
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
    <>
      {props.data ? (
        props.data.own_past_appointments.length > 0 ? (
          props.data.own_past_appointments.map((item, i) => (
            <div
              key={i}
              className="admin_side_my_individual_appointment_container"
              onClick={(e) => handleAppointmentToggled(e, item)}
              ref={individualAppointmentRef}
            >
              <div className="my_past_appointment_date_square">
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
                    .join(" ") + ", "}
                  {!props.currentScreenSize ? (
                    props.initialScreenSize >= 1200 ? (
                      <br />
                    ) : null
                  ) : props.currentScreenSize >= 1200 ? (
                    <br />
                  ) : null}
                  {item.startTime +
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
                className="admin_side_my_individual_appointment_expand_icon"
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
                      className="admin_side_my_individual_selected_appointment_container"
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
                          <p>Back to Past Appointments</p>
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
                        </div>
                        <div className="selected_appointment_treatments_header">
                          <p>Treatment</p>
                        </div>
                        {renderSummaryCardTreatments(i)}
                        {props.data ? (
                          props.data.own_past_appointments ? (
                            props.data.own_past_appointments[i].addOns
                              .length === 0 ? null : (
                              <>
                                <div className="selected_appointment_add_ons_header">
                                  <p>
                                    Add On
                                    {props.data
                                      ? props.data.own_past_appointments[i]
                                          .addOns.length > 1
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
                        <div className="selected_appointment_total_header admin_side_total_header">
                          <p>Total</p>
                          <p>${item.price}</p>
                        </div>
                        <div className="selected_past_appointments_bottom_buttons_container">
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
              icon={faHistory}
              className="my_upcoming_appointments_empty_calendar_icon"
            />
            <h2>No past appointments</h2>
            <p>
              {props.item.firstName[0].toUpperCase() +
                props.item.firstName.slice(1).toLowerCase() +
                " " +
                props.item.lastName[0].toUpperCase() +
                props.item.lastName.slice(1).toLowerCase() +
                " does not have any past appointments."}
            </p>
          </div>
        )
      ) : (
        <div className="my_upcoming_appointments_empty_container">
          <FontAwesomeIcon
            icon={faHistory}
            className="my_upcoming_appointments_empty_calendar_icon"
          />
          <h2>No past appointments</h2>
          <p>
            {props.item.firstName[0].toUpperCase() +
              props.item.firstName.slice(1).toLowerCase() +
              " " +
              props.item.lastName[0].toUpperCase() +
              props.item.lastName.slice(1).toLowerCase() +
              " does not have any past appointments."}
          </p>
        </div>
      )}
    </>
  );
};

export default AdminRenderUpcomingAppointments;
