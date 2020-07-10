import React from "react";
import moment from "moment";
import { Transition } from "react-spring/renderprops";
import AddToCalendar from "react-add-to-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { BounceLoader } from "react-spinners";
import ACTION_CANCEL_APPOINTMENT_CLICKED_RESET from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED_RESET";
import ACTION_CANCEL_APPOINTMENT_CLICKED from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED";
import { useDispatch } from "react-redux";

const ClientRenderUpcomingAppointments = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {
    individualAppointmentRef,
    selectedAppointmentBackRef,
    backToAppointmentsRef,
  } = ref;

  return (
    <>
      {props.data ? (
        props.data.own_appointments.length > 0 ? (
          props.data.own_appointments.map((item, i) => (
            <div
              key={i}
              className="my_individual_appointment_container"
              onClick={(e) => props.handleAppointmentToggled(e, item)}
              ref={individualAppointmentRef}
            >
              <Modal
                isOpen={
                  props.cancelAppointmentClicked &&
                  props.appointmentToggled === item.id
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
                  css={props.override}
                  color={"rgb(44, 44, 52)"}
                  loading={props.loadingSpinnerActive}
                />
                <Transition
                  items={
                    props.cancelAppointmentClicked &&
                    !props.loadingSpinnerActive
                  }
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
                              dispatch(
                                ACTION_CANCEL_APPOINTMENT_CLICKED_RESET()
                              )
                            }
                          />
                          <h2>
                            Are you sure you want to cancel your appointment?
                          </h2>
                          <span className="logout_buttons_container">
                            <div
                              className="logout_button yes_cancel_appointment_button"
                              onClick={() =>
                                props.handleCancelAppointment(item)
                              }
                            >
                              <p>YES, CANCEL</p>
                            </div>
                            <div
                              className="cancel_logout_button no_dont_cancel_appointment_button"
                              onClick={() =>
                                dispatch(
                                  ACTION_CANCEL_APPOINTMENT_CLICKED_RESET()
                                )
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
                  zIndex: props.cancelAppointmentClicked
                    ? -1
                    : props.logoutClicked || props.appointmentToggled
                    ? 0
                    : 1,
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
                      style={{
                        ...styleprops,
                        ...{ zIndex: props.cancelAppointmentClicked ? 0 : 1 },
                      }}
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
                              event={{
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
                              }}
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
                        {props.renderSummaryCardTreatments(i)}
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
                                {props.renderSummaryCardAddOns(i)}
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
