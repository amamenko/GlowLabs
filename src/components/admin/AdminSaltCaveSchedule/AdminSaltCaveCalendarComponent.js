import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./AdminSaltCaveSchedule.css";
import "../../account/clientprofile/MyAppointments/MyAppointments.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const AdminSaltCaveCalendarComponent = (props) => {
  const [allAdminAppointments, changeAllAdminAppointments] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const saltCaveAppointments = () => {
      const filteredApps = props.getAllAppointmentsData
        ? props.getAllAppointmentsData.all_appointments.filter((x) => {
            if (x.esthetician === "Salt Cave") {
              return true;
            } else {
              return false;
            }
          })
        : null;

      return filteredApps;
    };

    changeAllAdminAppointments(saltCaveAppointments());
  }, [props.getAllAppointmentsData, props.getEmployeeData]);

  const events = () => {
    if (allAdminAppointments.length > 0) {
      return allAdminAppointments.map((x) => {
        return {
          id: x.id,
          title:
            x.client.firstName[0].toUpperCase() +
            x.client.firstName.slice(1).toLowerCase() +
            " " +
            x.client.lastName[0].toUpperCase() +
            x.client.lastName.slice(1).toLowerCase() +
            (x.notes ? " " + x.notes : ""),
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
  };

  return (
    <div className="admin_schedule_calendar_main_container">
      <Calendar
        events={events()}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        defaultView={Views.WEEK}
        step={15}
        timeslots={4}
        min={new Date(0, 0, 0, 10, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
      />
    </div>
  );
};

export default AdminSaltCaveCalendarComponent;
