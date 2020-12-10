import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./AdminSchedule.css";
import "../../account/clientprofile/MyAppointments/MyAppointments.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import AdminSelectedAppointment from "./AdminCreateAppointment/AdminSelectedAppointment";
import AdminSelectedPersonalEvent from "./AdminPersonalEvent/AdminSelectedPersonalEvent";

const AdminCalendarComponent = (props) => {
  const selectedAppointmentBackRef = useRef(null);
  const backToAppointmentsRef = useRef(null);

  const [allAdminAppointments, changeAllAdminAppointments] = useState([]);
  const [currentToggledAppointment, changeCurrentToggledAppointment] = useState(
    ""
  );
  const [allPersonalEvents, changeAllPersonalEvents] = useState([]);
  const [headerOffset, changeHeaderOffset] = useState(0);

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );

  const localizer = momentLocalizer(moment);

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

  const renderSummaryCardTreatments = () => {
    let componentsArr = [];

    for (let i = 0; i < treatmentsSummaryCardComponentsArr.length; i++) {
      if (
        allAdminAppointments.filter((x) => x.id === currentToggledAppointment)
          .length > 0
      ) {
        if (
          allAdminAppointments.filter(
            (x) => x.id === currentToggledAppointment
          )[0].treatments
        ) {
          if (
            allAdminAppointments.filter(
              (x) => x.id === currentToggledAppointment
            )[0].treatments[0].name
          ) {
            if (
              allAdminAppointments.filter(
                (x) => x.id === currentToggledAppointment
              )[0].treatments[0].name ===
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
    return componentsArr.map((item, index) => (
      <div
        className="my_selected_appointment_treatment_container admin_side_client_calendar_schedule_treatment_container"
        key={index}
      >
        {item}
      </div>
    ));
  };

  const renderSummaryCardAddOns = () => {
    let componentsArr = [];

    for (let i = 0; i < addOnsSummaryCardComponentsArr.length; i++) {
      for (
        let j = 0;
        j <
        allAdminAppointments.filter(
          (x) => x.id === currentToggledAppointment
        )[0].addOns.length;
        j++
      ) {
        if (
          allAdminAppointments.filter((x) => x.id === currentToggledAppointment)
            .length > 0
        ) {
          if (
            allAdminAppointments.filter(
              (x) => x.id === currentToggledAppointment
            )[0].addOns !== []
          ) {
            if (
              allAdminAppointments.filter(
                (x) => x.id === currentToggledAppointment
              )[0].addOns[j].name
            ) {
              if (
                allAdminAppointments.filter(
                  (x) => x.id === currentToggledAppointment
                )[0].addOns[j].name === addOnsSummaryCardComponentsArr[i].name
              ) {
                componentsArr.push(addOnsSummaryCardComponentsArr[i].component);
              }
            }
          }
        }
      }
    }
    return componentsArr.map((item, index) => (
      <div
        className="my_selected_appointment_treatment_container admin_side_client_calendar_schedule_treatment_container"
        key={index}
      >
        {item}
      </div>
    ));
  };

  useEffect(() => {
    const currentAdminAppointments = () => {
      const filteredApps = props.getAllAppointmentsData
        ? props.getAllAppointmentsData.all_appointments.filter((x) => {
            if (x.esthetician) {
              if (props.getEmployeeData) {
                if (props.getEmployeeData.employee.firstName) {
                  if (props.getEmployeeData.employee.lastName) {
                    const firstName = x.esthetician.split(" ")[0];
                    const lastInitial = x.esthetician.split(" ")[1][0];

                    if (
                      props.getEmployeeData.employee.firstName.toUpperCase() ===
                        firstName.toUpperCase() &&
                      props.getEmployeeData.employee.lastName[0].toUpperCase() ===
                        lastInitial.toUpperCase()
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        : null;

      return filteredApps;
    };

    changeAllAdminAppointments(currentAdminAppointments());
  }, [props.getAllAppointmentsData, props.getEmployeeData]);

  useEffect(() => {
    const currentAdminPersonalEvents = () => {
      const filteredApps = props.getAllPersonalEventsData
        ? props.getAllPersonalEventsData.all_personal_events.filter((x) => {
            if (x.staff) {
              if (props.getEmployeeData) {
                if (props.getEmployeeData.employee.firstName) {
                  if (props.getEmployeeData.employee.lastName) {
                    const firstName = x.staff.split(" ")[0];
                    const lastInitial = x.staff.split(" ")[1][0];

                    if (
                      props.getEmployeeData.employee.firstName.toUpperCase() ===
                        firstName.toUpperCase() &&
                      props.getEmployeeData.employee.lastName[0].toUpperCase() ===
                        lastInitial.toUpperCase()
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        : null;

      return filteredApps;
    };

    changeAllPersonalEvents(currentAdminPersonalEvents());
  }, [props.getAllPersonalEventsData, props.getEmployeeData]);

  const events = () => {
    if (allAdminAppointments) {
      if (allAdminAppointments.length > 0) {
        return allAdminAppointments.map((x) => {
          return {
            id: x.id,
            title: (
              <>
                {x.confirmed ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="admin_appointment_confirmed_checkmark"
                  />
                ) : null}
                {x.client.firstName[0].toUpperCase() +
                  x.client.firstName.slice(1).toLowerCase() +
                  " " +
                  x.client.lastName[0].toUpperCase() +
                  x.client.lastName.slice(1).toLowerCase() +
                  " - " +
                  x.treatments[0].name +
                  " " +
                  "Facial" +
                  (x.addOns === []
                    ? null
                    : x.addOns.map((x) => `${x.name}, Add-On`))}
              </>
            ),
            text:
              x.client.firstName[0].toUpperCase() +
              x.client.firstName.slice(1).toLowerCase() +
              " " +
              x.client.lastName[0].toUpperCase() +
              x.client.lastName.slice(1).toLowerCase() +
              " - " +
              x.treatments[0].name +
              " " +
              "Facial" +
              (x.addOns === []
                ? null
                : x.addOns.map((x) => `${x.name}, Add-On`)),
            start: moment(
              x.date +
                " " +
                x.startTime +
                (Number(x.startTime.split(":")[0]) < 9 ||
                Number(x.startTime.split(":")[0]) >= 12
                  ? "PM"
                  : "AM"),
              "LLL"
            ).toDate(),
            end: moment(
              x.date +
                " " +
                x.endTime +
                (Number(x.endTime.split(":")[0]) < 9 ||
                Number(x.endTime.split(":")[0]) >= 12
                  ? "PM"
                  : "AM"),
              "LLL"
            ).toDate(),
          };
        });
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  const personalEvents = () => {
    if (allPersonalEvents) {
      if (allPersonalEvents.length > 0) {
        return allPersonalEvents.map((x) => {
          return {
            id: x._id,
            title: x.title,
            text: x.notes,
            start: moment(
              x.date + " " + x.startTime,
              "M/DD/YYYY h:mm A"
            ).toDate(),
            end: moment(x.date + " " + x.endTime, "M/DD/YYYY h:mm A").toDate(),
            backgroundColor: "rgb(211, 211, 211)",
            color: "#265985",
            allDay: x.allDay,
          };
        });
      } else {
        return [];
      }
    } else {
      return [];
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
          changeCurrentToggledAppointment("");
        }
      }
    }
  };

  let formats = {
    timeGutterFormat: "h A",
  };

  const eventStyleGetter = (event) => {
    if (event) {
      if (event.backgroundColor && event.color) {
        const style = {
          backgroundColor: event.backgroundColor,
          color: event.color,
          border: "none",
          fontWeight: 600,
        };
        return {
          style: style,
        };
      }
    }
  };

  // Used to place top calendar header in relation to vertical scrollbar
  useEffect(() => {
    const headerOffsetInterval = setInterval(() => {
      const calendarContent = document.getElementsByClassName(
        "rbc-time-content"
      );

      if (calendarContent[0]) {
        const currentRef = calendarContent[0];

        if (
          headerOffset !==
          Math.abs(currentRef.offsetWidth - currentRef.clientWidth)
        ) {
          changeHeaderOffset(
            Math.abs(currentRef.offsetWidth - currentRef.clientWidth)
          );
        }
      }
    }, 500);

    return () => {
      clearInterval(headerOffsetInterval);
    };
  }, [headerOffset]);

  useEffect(() => {
    const timeHeader = document.getElementsByClassName(
      "rbc-time-header rbc-overflowing"
    );

    if (timeHeader[0]) {
      const timeHeaderElement = timeHeader[0];

      if (headerOffset !== 0) {
        timeHeaderElement.style.marginRight = headerOffset + "px !important";
      } else {
        timeHeaderElement.style.marginRight = "0px !important";
      }
    }
  }, [headerOffset]);

  return (
    <div
      className="admin_schedule_calendar_main_container"
      style={{
        zIndex:
          props.createAppointmentClicked || props.personalEventClicked
            ? -1
            : logoutClicked || loadingSpinnerActive || cancelAppointmentClicked
            ? 0
            : 1,
      }}
    >
      <Calendar
        events={events().concat(personalEvents())}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={(x) => x.text}
        defaultDate={moment().toDate()}
        localizer={localizer}
        defaultView={Views.WEEK}
        step={15}
        timeslots={4}
        formats={formats}
        scrollToTime={moment()
          .set({ h: 10, m: 0 })
          .toDate()}
        onSelectEvent={(e) => {
          if (e.id) {
            changeCurrentToggledAppointment(e.id);
          } else if (e._id) {
            changeCurrentToggledAppointment(e._id);
          } else {
            return null;
          }
        }}
        slotPropGetter={(date) => {
          if (
            moment(date).format("dddd") === "Saturday" ||
            (moment(date).format("dddd") === "Sunday" &&
              moment(date).format("H") < 10) ||
            (moment(date).format("dddd") === "Sunday" &&
              moment(date).format("H") > 19) ||
            (moment(date).format("dddd") === "Monday" &&
              moment(date).format("H") < 10) ||
            (moment(date).format("dddd") === "Monday" &&
              moment(date).format("H") > 19) ||
            (moment(date).format("dddd") === "Tuesday" &&
              moment(date).format("H") < 10) ||
            (moment(date).format("dddd") === "Tuesday" &&
              moment(date).format("H") > 19) ||
            (moment(date).format("dddd") === "Wednesday" &&
              moment(date).format("H") < 10) ||
            (moment(date).format("dddd") === "Wednesday" &&
              moment(date).format("H") > 19) ||
            (moment(date).format("dddd") === "Thursday" &&
              moment(date).format("H") < 10) ||
            (moment(date).format("dddd") === "Thursday" &&
              moment(date).format("H") > 19) ||
            (moment(date).format("dddd") === "Friday" &&
              moment(date).format("H") < 10) ||
            (moment(date).format("dddd") === "Friday" &&
              moment(date).format("H") > 15)
          ) {
            let newStyle = {
              backgroundColor: "rgb(222, 222, 222)",
              borderTop: "1px solid rgb(212, 212, 212)",
            };

            return {
              style: newStyle,
            };
          }
        }}
        selectable={true}
        onSelectSlot={(time) =>
          props.handleCreateAppointmentToggled(
            moment(time.start).format("LT"),
            moment(time.end).format("LT"),
            moment(time.start).format("L")
          )
        }
      />
      <AdminSelectedAppointment
        allAdminAppointments={allAdminAppointments}
        getAllAppointmentsRefetch={props.getAllAppointmentsRefetch}
        currentToggledAppointment={currentToggledAppointment}
        changeCurrentToggledAppointment={changeCurrentToggledAppointment}
        ref={{
          selectedAppointmentBackRef: selectedAppointmentBackRef,
          backToAppointmentsRef: backToAppointmentsRef,
        }}
        handleAppointmentUntoggled={handleAppointmentUntoggled}
        renderSummaryCardAddOns={renderSummaryCardAddOns}
        renderSummaryCardTreatments={renderSummaryCardTreatments}
        getNotificationsRefetch={props.getNotificationsRefetch}
      />
      <AdminSelectedPersonalEvent
        currentToggledAppointment={currentToggledAppointment}
        changeCurrentToggledAppointment={changeCurrentToggledAppointment}
        ref={{
          selectedAppointmentBackRef: selectedAppointmentBackRef,
          backToAppointmentsRef: backToAppointmentsRef,
        }}
        handleAppointmentUntoggled={handleAppointmentUntoggled}
        getAllPersonalEventsData={props.getAllPersonalEventsData}
        getAllPersonalEventsRefetch={props.getAllPersonalEventsRefetch}
        intialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        employeeOptions={props.employeeOptions}
        timeOptions={props.timeOptions}
        getNotificationsRefetch={props.getNotificationsRefetch}
      />
    </div>
  );
};

export default AdminCalendarComponent;
