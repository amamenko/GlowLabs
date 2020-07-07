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
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import "./AdminSchedule.css";
import "../../account/clientprofile/MyAppointments/MyAppointments.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const AdminCalendarComponent = (props) => {
  const selectedAppointmentBackRef = useRef(null);
  const backToAppointmentsRef = useRef(null);

  const [allAdminAppointments, changeAllAdminAppointments] = useState([]);
  const [currentToggledAppointment, changeCurrentToggledAppointment] = useState(
    ""
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
        onSelectEvent={(e) => changeCurrentToggledAppointment(e.id)}
      />
      <Transition
        items={currentToggledAppointment}
        from={{ transform: "translateX(-100%)" }}
        enter={{ transform: "translateX(0%)" }}
        leave={{ transform: "translateX(-100%)" }}
        config={{ duration: 200 }}
      >
        {(currentToggledAppointment) =>
          currentToggledAppointment ===
            (allAdminAppointments.find(
              (x) => x.id === currentToggledAppointment
            )
              ? allAdminAppointments.find(
                  (x) => x.id === currentToggledAppointment
                ).id
              : null) &&
          ((styleprops) => (
            <div
              className="admin_side_schedule_calendar_individual_selected_appointment_container"
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
                  <p>Back to My Schedule</p>
                </div>
                <div className="selected_appointment_date_and_time_header">
                  <p>Client Name</p>
                </div>
                <div className="selected_appointment_date_and_time_content_container">
                  <div className="selected_appointment_date_and_time_content">
                    <p>
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0]
                        ? allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .client.firstName[0].toUpperCase() +
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .client.firstName.slice(1)
                            .toLowerCase() +
                          " " +
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .client.lastName[0].toUpperCase() +
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .client.lastName.slice(1)
                            .toLowerCase()
                        : null}
                    </p>
                  </div>
                </div>
                <div className="selected_appointment_date_and_time_header">
                  <p>Appointment Date &amp; Time</p>
                </div>
                <div className="selected_appointment_date_and_time_content_container">
                  <div className="selected_appointment_date_and_time_content">
                    <p>
                      {moment(
                        allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].date,
                        "LL"
                      )
                        .format("LLLL")
                        .split(" ")
                        .slice(
                          0,
                          moment(
                            allAdminAppointments.filter(
                              (x) => x.id === currentToggledAppointment
                            )[0].date,
                            "LL"
                          )
                            .format("LLLL")
                            .split(" ").length - 2
                        )
                        .join(" ")}
                    </p>
                    <p>
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].startTime +
                        " " +
                        (Number(
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .startTime.split(":")[0]
                        ) >= 12 ||
                        Number(
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .startTime.split(":")[0]
                        ) < 9
                          ? "PM"
                          : "AM")}{" "}
                      -{" "}
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].endTime +
                        " " +
                        (Number(
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .endTime.split(":")[0]
                        ) >= 12 ||
                        Number(
                          allAdminAppointments
                            .filter(
                              (x) => x.id === currentToggledAppointment
                            )[0]
                            .endTime.split(":")[0]
                        ) < 9
                          ? "PM"
                          : "AM")}{" "}
                    </p>
                    <p>
                      (
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].duration >= 60
                        ? Math.floor(
                            allAdminAppointments.filter(
                              (x) => x.id === currentToggledAppointment
                            )[0].duration / 60
                          )
                        : allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].duration}{" "}
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].duration >= 60
                        ? Math.floor(
                            allAdminAppointments.filter(
                              (x) => x.id === currentToggledAppointment
                            )[0].duration / 60
                          ) === 1
                          ? "hour"
                          : "hours"
                        : null}
                      {Number.isInteger(
                        allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].duration / 60
                      )
                        ? null
                        : " "}
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].duration >= 60
                        ? Number.isInteger(
                            allAdminAppointments.filter(
                              (x) => x.id === currentToggledAppointment
                            )[0].duration / 60
                          )
                          ? null
                          : allAdminAppointments.filter(
                              (x) => x.id === currentToggledAppointment
                            )[0].duration -
                            Math.floor(
                              allAdminAppointments.filter(
                                (x) => x.id === currentToggledAppointment
                              )[0].duration / 60
                            ) *
                              60 +
                            " minutes"
                        : "minutes"}
                      )
                    </p>
                  </div>
                </div>
                <div className="selected_appointment_treatments_header">
                  <p>Treatment</p>
                </div>
                {renderSummaryCardTreatments()}
                {allAdminAppointments.filter(
                  (x) => x.id === currentToggledAppointment
                )[0].addOns.length === 0 ? null : (
                  <>
                    <div className="selected_appointment_add_ons_header">
                      <p>
                        Add On
                        {allAdminAppointments.filter(
                          (x) => x.id === currentToggledAppointment
                        )[0].addOns.length > 1
                          ? "s"
                          : null}
                      </p>
                    </div>
                    {renderSummaryCardAddOns()}
                  </>
                )}
                <div className="selected_appointment_total_header admin_side_total_header">
                  <p>Total</p>
                  <p>
                    $
                    {
                      allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].price
                    }
                  </p>
                </div>
                <div className="selected_appointment_date_and_time_header">
                  <p>Notes</p>
                </div>
                <div className="selected_appointment_date_and_time_content_container">
                  <div className="selected_appointment_date_and_time_content">
                    <p>
                      {" "}
                      {allAdminAppointments.filter(
                        (x) => x.id === currentToggledAppointment
                      )[0].notes
                        ? allAdminAppointments.filter(
                            (x) => x.id === currentToggledAppointment
                          )[0].notes
                        : "No notes provided"}
                    </p>
                  </div>
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
  );
};

export default AdminCalendarComponent;