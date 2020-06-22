import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./AdminSchedule.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const AdminCalendarComponent = (props) => {
  const [allAdminAppointments, changeAllAdminAppointments] = useState([]);
  const localizer = momentLocalizer(moment);

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

  console.log(allAdminAppointments);

  const events = () => {
    if (allAdminAppointments.length > 0) {
      return allAdminAppointments.map((x, i) => {
        return {
          id: i,
          title:
            x.client.firstName[0].toUpperCase() +
            x.client.firstName.slice(1).toLowerCase() +
            " " +
            x.client.lastName[0].toUpperCase() +
            x.client.lastName.slice(1).toLowerCase() +
            " - " +
            x.treatments[0].name +
            " " +
            "Facial" +
            (x.addOns === [] ? null : x.addOns.map((x) => `${x.name}, Add-On`)),
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
      {events().length > 0 ? (
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
      ) : null}
    </div>
  );
};

export default AdminCalendarComponent;
