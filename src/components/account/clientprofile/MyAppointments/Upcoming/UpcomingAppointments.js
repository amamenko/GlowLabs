import React, { useEffect, useState } from "react";
import "../MyAppointments.css";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { Transition } from "react-spring/renderprops";

const UpcomingAppointments = (props) => {
  const location = useLocation();
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

  console.log(appointmentToggled);

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
        <h1>MY APPOINTMENTS</h1>
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
        {props.data
          ? props.data.own_appointments.map((item, i) => (
              <div
                key={i}
                className="my_individual_appointment_container"
                onClick={() =>
                  appointmentToggled
                    ? changeAppointmentToggled("")
                    : changeAppointmentToggled(item.id ? item.id : "")
                }
              >
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
                  from={{ transform: "translateX(100%)" }}
                  enter={{ transform: "translateX(0%)" }}
                  leave={{ transform: "translateX(100%)" }}
                  config={{ duration: 200 }}
                >
                  {(appointmentToggled) =>
                    appointmentToggled === item.id &&
                    ((styleprops) => (
                      <div
                        className="my_individual_selected_appointment_container"
                        style={styleprops}
                      >
                        <p className="selected_appointment_date_and_time_header">
                          Appointment Date &amp; Time
                        </p>
                        <div className="selected_appointment_date_and_time_content_container">
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
                            {Number.isInteger(item.duration / 60) ? null : " "}
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
                    ))
                  }
                </Transition>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
