import React from "react";
import moment from "moment";
import AddToCalendar from "react-add-to-calendar";
import "react-add-to-calendar/dist/react-add-to-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import BounceLoader from "react-spinners/BounceLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { Transition } from "react-spring/renderprops";
import { useDispatch } from "react-redux";
import { css } from "@emotion/css";
import ACTION_CANCEL_APPOINTMENT_CLICKED_RESET from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED_RESET";
import ACTION_CANCEL_APPOINTMENT_CLICKED from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED";
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

const ClientRenderUpcomingAppointments = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {
    upcomingAppointmentsData,
    loadingSpinnerActive,
    currentScreenSize,
    initialScreenSize,
    handleAppointmentToggled,
    cancelAppointmentClicked,
    logoutClicked,
    appointmentToggled,
    handleCancelAppointment,
    handleAppointmentUntoggled,
    renderSummaryCardAddOns,
    renderSummaryCardTreatments,
    loadingAppointments,
  } = props;

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
      {upcomingAppointmentsData ? (
        upcomingAppointmentsData.own_appointments.length > 0 ? (
          upcomingAppointmentsData.own_appointments.map((item, i) => {
            const event = {
              title: "Glow Labs Appointment",
              description:
                (item.treatments[0].name
                  ? item.treatments[0].name === "ChemicalPeel"
                    ? "Chemical Peel"
                    : item.treatments[0].name
                  : "") +
                (item.treatments[0].name === "Salt Cave"
                  ? " Treatment"
                  : " Facial") +
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
                  item.morningOrEvening,
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
                  item.startTime +
                  " " +
                  item.morningOrEvening,
                "LLLL"
              )
                .add(item.duration, "minutes")
                .format(),
            };

            return (
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
                  <div
                    className="cancel_appointment_modal_content_container"
                    style={{
                      display:
                        cancelAppointmentClicked && !loadingSpinnerActive
                          ? "flex"
                          : "none",
                    }}
                  >
                    <div className="log_out_modal_contents">
                      <FontAwesomeIcon
                        className="modal_x"
                        icon={faTimes}
                        onClick={() =>
                          dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                        }
                      />
                      <h2>Are you sure you want to cancel your appointment?</h2>
                      <span className="logout_buttons_container">
                        <div
                          className="logout_button yes_cancel_appointment_button"
                          onClick={() => handleCancelAppointment(item)}
                        >
                          <p>YES, CANCEL</p>
                        </div>
                        <div
                          className="cancel_logout_button no_dont_cancel_appointment_button"
                          onClick={() =>
                            dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                          }
                        >
                          <p>NO, GO BACK</p>
                        </div>
                      </span>
                    </div>
                  </div>
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
                      .join(" ") + ", "}
                    {!currentScreenSize ? (
                      initialScreenSize >= 1200 ? (
                        <br />
                      ) : null
                    ) : currentScreenSize >= 1200 ? (
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
                    zIndex: cancelAppointmentClicked
                      ? -1
                      : logoutClicked || appointmentToggled
                      ? 0
                      : 1,
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
                        style={{
                          ...styleprops,
                          ...{ zIndex: cancelAppointmentClicked ? 0 : 1 },
                        }}
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
                            <p>Back to Upcoming Appointments</p>
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
                                event={event}
                              />
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
                          {renderSummaryCardTreatments(i)}
                          {upcomingAppointmentsData ? (
                            upcomingAppointmentsData.own_appointments ? (
                              upcomingAppointmentsData.own_appointments[i]
                                .addOns.length === 0 ? null : (
                                <>
                                  <div className="selected_appointment_add_ons_header">
                                    <p>
                                      Add On
                                      {upcomingAppointmentsData
                                        ? upcomingAppointmentsData
                                            .own_appointments[i].addOns.length >
                                          1
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
                                dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED())
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
            );
          })
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
        )
      ) : loadingAppointments ? (
        <div className="my_upcoming_appointments_empty_container">
          <ClipLoader
            size={100}
            css={override}
            color={"rgb(44, 44, 52)"}
            loading={loadingAppointments}
          />
        </div>
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
    </>
  );
});

export default ClientRenderUpcomingAppointments;
