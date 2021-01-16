import React from "react";
import moment from "moment";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/css";
import "../../../../../components/checkout/SummaryReviewCards/SummaryReviewCards.css";
import "../../../../../components/treatments/Bacial/Bacial.css";
import "../../../../../components/treatments/Calm/Calm.css";
import "../../../../../components/treatments/CBD/CBD.css";
import "../../../../../components/treatments/ChemicalPeel/ChemicalPeel.css";
import "../../../../../components/treatments/Clarify/Clarify.css";
import "../../../../../components/treatments/Dermaplaning/Dermaplaning.css";
import "../../../../../components/treatments/Glow/Glow.css";
import "../../../../../components/treatments/JetHydroPeel/JetHydroPeel.css";
import "../../../../../components/treatments/Microneedle/Microneedle.css";
import "../../../../../components/treatments/Quench/Quench.css";
import "../../../../../components/treatments/Quickie/Quickie.css";
import "../../../../../components/treatments/Rejuvenate/Rejuvenate.css";
import "../../../../../components/treatments/SaltCave/SaltCave.css";
import "../../../../../components/add_ons/Beard/Beard.css";
import "../../../../../components/add_ons/Dermarolling/Dermarolling.css";
import "../../../../../components/add_ons/ExtraExtractions/ExtraExtractions.css";
import "../../../../../components/add_ons/GuaSha/GuaSha.css";
import "../../../../../components/add_ons/HydroJellyMask/HydroJellyMask.css";
import "../../../../../components/add_ons/LEDTherapy/LEDTherapy.css";
import "../../../../../components/add_ons/Microcurrent/Microcurrent.css";
import "../../../../../components/add_ons/Microdermabrasion/Microdermabrasion.css";
import "../../../../../components/add_ons/NanoNeedling/NanoNeedling.css";
import "../../../../../components/treatments_pages/Page_2/NotSurePopUp/NotSurePopUp.css";

const ClientRenderPastAppointments = React.forwardRef((props, ref) => {
  const {
    individualAppointmentRef,
    selectedAppointmentBackRef,
    backToAppointmentsRef,
  } = ref;

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  return (
    <>
      {props.data ? (
        props.data.own_past_appointments.length > 0 ? (
          props.data.own_past_appointments.map((item, i) => (
            <div
              key={i}
              className="my_individual_appointment_container"
              onClick={(e) => props.handleAppointmentToggled(e, item)}
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
                      ? "Chemical Peel Facial"
                      : item.treatments[0].name === "Salt Cave"
                      ? "Salt Cave"
                      : item.treatments[0].name + " Facial"
                    : null}
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
                  zIndex:
                    props.logoutClicked || props.appointmentToggled ? 0 : 1,
                  transitionDelay: props.logoutClicked
                    ? "initial"
                    : !props.appointmentToggled
                    ? "0.5s"
                    : "initial",
                }}
                icon={faEllipsisH}
                className="my_individual_appointment_expand_icon"
              />
              <Transition
                items={props.appointmentToggled}
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
                          onClick={(e) => props.handleAppointmentUntoggled(e)}
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
                          <p>
                            Treatment{" "}
                            {item.treatments[0].name === "Salt Cave"
                              ? null
                              : item.esthetician
                              ? "(with " + item.esthetician + ")"
                              : null}
                          </p>
                        </div>
                        {props.renderSummaryCardTreatments(i)}
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
                                {props.renderSummaryCardAddOns(i)}
                              </>
                            )
                          ) : null
                        ) : null}
                        <div className="selected_appointment_total_header">
                          <p>Total</p>
                          <p>${item.price}</p>
                        </div>
                        <div className="selected_past_appointments_bottom_buttons_container">
                          <div
                            className="back_to_all_appointments_button"
                            ref={backToAppointmentsRef}
                            onClick={(e) => props.handleAppointmentUntoggled(e)}
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
            <p>Any previous appointment information will be available here</p>
          </div>
        )
      ) : props.loadingPastAppointments ? (
        <div className="my_upcoming_appointments_empty_container">
          <ClipLoader
            size={100}
            css={override}
            color={"rgb(44, 44, 52)"}
            loading={props.loadingPastAppointments}
          />
        </div>
      ) : (
        <div className="my_upcoming_appointments_empty_container">
          <FontAwesomeIcon
            icon={faHistory}
            className="my_upcoming_appointments_empty_calendar_icon"
          />
          <h2>No past appointments</h2>
          <p>Any previous appointment information will be available here</p>
        </div>
      )}
    </>
  );
});

export default ClientRenderPastAppointments;
