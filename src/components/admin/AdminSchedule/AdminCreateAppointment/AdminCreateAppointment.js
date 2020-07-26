import React, { useState, useEffect, useCallback } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminCreateAppointment.css";
import { useSelector, useDispatch } from "react-redux";
import ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentStaffMember/ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER";
import ACTION_ADMIN_CLIENT_EMAIL from "../../../../actions/Admin/AdminCreateAppointment/AdminClientEmail/ACTION_ADMIN_CLIENT_EMIAL";
import ACTION_ADMIN_CLIENT_PHONE_NUMBER from "../../../../actions/Admin/AdminCreateAppointment/AdminClientPhoneNumber/ACTION_ADMIN_CLIENT_PHONE_NUMBER";
import ACTION_ADMIN_CLIENT_LAST_NAME from "../../../../actions/Admin/AdminCreateAppointment/AdminClientLastName/ACTION_ADMIN_CLIENT_LAST_NAME";
import ACTION_ADMIN_SELECTED_TREATMENTS from "../../../../actions/Admin/AdminCreateAppointment/AdminSelectedTreatments/ACTION_ADMIN_SELECTED_TREATMENTS";
import ACTION_ADMIN_APPOINTMENT_NOTES from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentNotes/ACTION_ADMIN_APPOINTMENT_NOTES";
import ACTION_ADMIN_APPOINTMENT_DATE from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDate/ACTION_ADMIN_APPOINTMENT_DATE";
import ACTION_ADMIN_APPOINTMENT_TIME from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentTime/ACTION_ADMIN_APPOINTMENT_TIME";
import ACTION_ADMIN_CLIENT_FIRST_NAME_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminClientFirstName/ACTION_ADMIN_CLIENT_FIRST_NAME_RESET";
import ACTION_ADMIN_CLIENT_LAST_NAME_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminClientLastName/ACTION_ADMIN_CLIENT_LAST_NAME_RESET";
import ACTION_ADMIN_CLIENT_PHONE_NUMBER_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminClientPhoneNumber/ACTION_ADMIN_CLIENT_PHONE_NUMBER_RESET";
import ACTION_ADMIN_CLIENT_EMAIL_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminClientEmail/ACTION_ADMIN_CLIENT_EMAIL_RESET";
import ACTION_ADMIN_SELECTED_TREATMENTS_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminSelectedTreatments/ACTION_ADMIN_SELECTED_TREATMENTS_RESET";
import ACTION_ADMIN_APPOINTMENT_DATE_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDate/ACTION_ADMIN_APPOINTMENT_DATE_RESET";
import ACTION_ADMIN_APPOINTMENT_NOTES_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentNotes/ACTION_ADMIN_APPOINTMENT_NOTES_RESET";
import ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentStaffMember/ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER_RESET";
import ACTION_ADMIN_APPOINTMENT_TIME_RESET from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentTime/ACTION_ADMIN_APPOINTMENT_TIME_RESET";
import ACTION_ADMIN_APPOINTMENT_DURATION from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDuration/ACTION_ADMIN_APPOINTMENT_DURATION";
import ClientAutosuggest from "./Autosuggest/ClientAutosuggest";
import TreatmentAutosuggest from "./Autosuggest/TreatmentAutosuggest";
import SaltCaveAutosuggest from "./Autosuggest/SaltCaveAutosuggest";
import AdminPaymentInfo from "./AdminPaymentInfo/AdminPaymentInfo";
import { Collapse } from "reactstrap";
// Minified Bootstrap CSS file (for Collapse feature)
import "../../../../bootstrap.min.css";

const AdminCreateAppointment = (props) => {
  const dispatch = useDispatch();

  const [clickOutsideDayPicker, changeClickOutsideDayPicker] = useState(true);
  const [addCardCollapseOpen, changeAddCardCollapseOpen] = useState(false);
  const [
    bookWithoutCardCollapseOpen,
    changeBookWithoutCardCollapseOpen,
  ] = useState(false);

  const adminClientLastName = useSelector(
    (state) => state.adminClientLastName.admin_client_last_name
  );
  const adminClientEmail = useSelector(
    (state) => state.adminClientEmail.admin_client_email
  );
  const adminClientPhoneNumber = useSelector(
    (state) => state.adminClientPhoneNumber.admin_client_phone_number
  );
  const adminAppointmentNotes = useSelector(
    (state) => state.adminAppointmentNotes.admin_appointment_notes
  );
  const adminAppointmentStaffMember = useSelector(
    (state) => state.adminAppointmentStaffMember.admin_appointment_staff_member
  );
  const adminSelectedTreatments = useSelector(
    (state) => state.adminSelectedTreatments.admin_selected_treatments
  );
  const adminAppointmentDate = useSelector(
    (state) => state.adminAppointmentDate.admin_appointment_date
  );
  const adminAppointmentTime = useSelector(
    (state) => state.adminAppointmentTime.admin_appointment_time
  );

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );

  const timeOptions = () => {
    const minutesArr = ["00", "15", "30", "45"];
    const allTimeArr = [];

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < minutesArr.length; j++) {
        allTimeArr.push(
          (i > 12 ? i - 12 : i === 0 ? "12" : i) +
            ":" +
            minutesArr[j] +
            " " +
            (i > 11 ? "PM" : "AM")
        );
      }
    }

    return allTimeArr;
  };

  const employeeOptions = useCallback(() => {
    if (props.getEmployeesData) {
      if (props.getEmployeesData.employees) {
        const estheticians = props.getEmployeesData.employees.filter(
          (employee) => employee.employeeRole.includes("Esthetician")
        );

        return estheticians.map(
          (esthetician) =>
            esthetician.firstName[0].toUpperCase() +
            esthetician.firstName.slice(1).toLowerCase() +
            " " +
            esthetician.lastName[0].toUpperCase() +
            esthetician.lastName.slice(1).toLowerCase()
        );
      }
    }
  }, [props.getEmployeesData]);

  useEffect(() => {
    if (props.getEmployeeData) {
      if (props.getEmployeeData.employee) {
        if (
          props.getEmployeeData.employee.employeeRole.includes("Esthetician")
        ) {
          const currentEmployee = props.getEmployeeData.employee;

          if (!adminAppointmentStaffMember) {
            dispatch(
              ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER(
                currentEmployee.firstName[0].toUpperCase() +
                  currentEmployee.firstName.slice(1).toLowerCase() +
                  " " +
                  currentEmployee.lastName[0].toUpperCase() +
                  currentEmployee.lastName.slice(1).toLowerCase()
              )
            );
          }
        } else {
          dispatch(ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER(employeeOptions()[0]));
        }
      }
    }
  }, [
    dispatch,
    props.getEmployeeData,
    employeeOptions,
    adminAppointmentStaffMember,
  ]);

  const phoneNumberKeyTyping = (e) => {
    if (
      (e.keyCode >= 8 && e.keyCode < 32) ||
      (e.keyCode >= 37 && e.keyCode <= 40) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  const phoneNumberTyping = (e) => {
    let currentTyping = e.currentTarget.value;

    // Formatting for US Phone Numbers
    if (currentTyping.length === 3) {
      currentTyping = currentTyping.split("");
      currentTyping.unshift("(");
      currentTyping.push(") ");

      currentTyping = currentTyping.join("");
    } else {
      if (currentTyping.length === 4) {
        if (
          currentTyping.indexOf("(") === 0 &&
          currentTyping.indexOf(")") < 0
        ) {
          currentTyping = currentTyping.split("");
          currentTyping.splice(currentTyping.indexOf("("), 1);

          currentTyping = currentTyping.join("");
        } else {
          if (
            currentTyping.indexOf("(") < 0 &&
            currentTyping.indexOf(")") < 0
          ) {
            currentTyping = currentTyping.split("");
            currentTyping.unshift("(");
            currentTyping.splice(4, 0, ") ");

            currentTyping = currentTyping.join("");
          }
        }
      } else {
        if (currentTyping.length === 6) {
          if (currentTyping.indexOf(" ") < 0) {
            currentTyping = currentTyping.split("");
            currentTyping.splice(5, 0, " ");

            currentTyping = currentTyping.join("");
          }
        } else {
          if (currentTyping.length === 10) {
            if (currentTyping.lastIndexOf(" ") === 5) {
              currentTyping = currentTyping.split("");
              currentTyping.splice(9, 0, " - ");

              currentTyping = currentTyping.join("");
            } else {
              if (currentTyping.indexOf("(") < 0) {
                currentTyping = currentTyping.split("");
                currentTyping.unshift("(");
                currentTyping.splice(4, 0, ") ");
                currentTyping.splice(8, 0, " - ");
                currentTyping = currentTyping.join("");
              }
            }
          } else {
            if (currentTyping.length === 11) {
              if (
                currentTyping.lastIndexOf(" ") === 9 &&
                currentTyping.indexOf("-") < 0
              ) {
                currentTyping = currentTyping.split("");
                currentTyping.splice(9, 0, " -");

                currentTyping = currentTyping.join("");
              }
            } else {
              if (currentTyping.length === 12) {
                if (currentTyping.lastIndexOf(" ") === 9) {
                  currentTyping = currentTyping.split("");
                  currentTyping.splice(11, 0, " ");

                  currentTyping = currentTyping.join("");
                }
              }
            }
          }
        }
      }
    }
    e.currentTarget.value = currentTyping;
    dispatch(ACTION_ADMIN_CLIENT_PHONE_NUMBER(currentTyping));
  };

  useEffect(() => {
    const dayPickerClickFunction = (e) => {
      if (e.target) {
        if (e.target.placeholder === "Appointment Date") {
          if (clickOutsideDayPicker) {
            changeClickOutsideDayPicker(false);
          }
        } else if (e.target.getAttribute("class")) {
          if (typeof (e.target.className === "string")) {
            if (!e.target.className.baseVal) {
              if (
                e.target.className.split(" ").includes("DayPicker-Day") ||
                e.target.className.split(" ").includes("DayPicker-NavButton")
              ) {
                if (clickOutsideDayPicker) {
                  changeClickOutsideDayPicker(false);
                }
              } else {
                if (!clickOutsideDayPicker) {
                  changeClickOutsideDayPicker(true);
                }
              }
            } else {
              if (!clickOutsideDayPicker) {
                changeClickOutsideDayPicker(true);
              }
            }
          } else {
            if (!clickOutsideDayPicker) {
              changeClickOutsideDayPicker(true);
            }
          }
        } else {
          if (!clickOutsideDayPicker) {
            changeClickOutsideDayPicker(true);
          }
        }
      }
    };

    window.addEventListener("click", dayPickerClickFunction);

    return () => {
      window.removeEventListener("click", dayPickerClickFunction);
    };
  }, [clickOutsideDayPicker]);

  const renderSelectedTreatments = () => {
    if (adminSelectedTreatments.length < 1) {
      return null;
    } else {
      return adminSelectedTreatments.map((item, i) => {
        return (
          <div
            className="admin_create_appointment_input_information_container"
            key={i}
            style={{
              borderLeft: "1px solid rgb(211, 211, 211)",
            }}
          >
            <div
              role="combobox"
              aria-haspopup="listbox"
              aria-owns="react-autowhatever-1"
              aria-controls="react-autowhatever-1"
              aria-expanded="false"
              className="react-autosuggest__container"
            >
              <input
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="react-autowhatever-1"
                className="react-autosuggest__input"
                value={
                  adminSelectedTreatments.length < 1
                    ? ""
                    : item.props
                    ? item.props.children
                      ? item.props.children[0]
                        ? item.props.children[0].props
                          ? item.props.children[0].props.children
                            ? item.props.children[0].props.children
                            : ""
                          : ""
                        : ""
                      : ""
                    : ""
                }
                onChange={(e) => e.preventDefault()}
                style={{
                  borderLeft: "1px solid transparent",
                  borderRight: "1px solid transparent",
                  color: "rgb(74, 144, 226)",
                }}
              />
            </div>
            <div
              role="combobox"
              aria-haspopup="listbox"
              aria-owns="react-autowhatever-1"
              aria-controls="react-autowhatever-1"
              aria-expanded="false"
              className="react-autosuggest__container"
            >
              <input
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="react-autowhatever-1"
                className="react-autosuggest__input"
                value={
                  adminSelectedTreatments.length < 1
                    ? ""
                    : item.props
                    ? item.props.children
                      ? item.props.children[1]
                        ? item.props.children[1].props
                          ? item.props.children[1].props.children
                            ? item.props.children[1].props.children + " minutes"
                            : ""
                          : ""
                        : ""
                      : ""
                    : ""
                }
                onChange={(e) => e.preventDefault()}
                style={{
                  borderLeft: "1px solid transparent",
                  borderRight: "1px solid transparent",
                  color: "rgb(74, 144, 226)",
                }}
              />
            </div>
            <div
              role="combobox"
              aria-haspopup="listbox"
              aria-owns="react-autowhatever-1"
              aria-controls="react-autowhatever-1"
              aria-expanded="false"
              className="react-autosuggest__container"
            >
              <input
                type="text"
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="react-autowhatever-1"
                className="react-autosuggest__input"
                value={
                  adminSelectedTreatments.length < 1
                    ? ""
                    : item.props
                    ? item.props.children
                      ? item.props.children[2]
                        ? item.props.children[2].props
                          ? item.props.children[2].props.children
                            ? "$" +
                              item.props.children[2].props.children +
                              ".00"
                            : ""
                          : ""
                        : ""
                      : ""
                    : ""
                }
                onChange={(e) => e.preventDefault()}
                style={{
                  borderLeft: "1px solid transparent",
                  color: "rgb(74, 144, 226)",
                }}
              />
            </div>{" "}
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                let filteredArr = [];

                const treatmentsArr = adminSelectedTreatments
                  .slice()
                  .filter((x, i) => {
                    if (
                      x.props.children[0].props.children !==
                      item.props.children[0].props.children
                    ) {
                      return x.props.children[0].props.children;
                    } else {
                      if (
                        !filteredArr.includes(
                          x.props.children[0].props.children
                        )
                      ) {
                        filteredArr.push(x.props.children[0].props.children);
                        return null;
                      } else {
                        return x.props.children[0].props.children;
                      }
                    }
                  });

                dispatch(
                  ACTION_ADMIN_APPOINTMENT_DURATION(
                    treatmentsArr
                      .map((x) => x.props.children[1].props.children)
                      .reduce((a, b) => a + b, 0)
                  )
                );
                dispatch(ACTION_ADMIN_SELECTED_TREATMENTS(treatmentsArr));
              }}
              className="admin_create_appointment_treatment_delete_button"
            />
          </div>
        );
      });
    }
  };

  // Disable hover and select on unavailable salt cave times
  useEffect(() => {
    const checkForHighlightedElement = setInterval(() => {
      const highlightedTreatment = document.getElementsByClassName(
        "react-autosuggest__suggestion--highlighted"
      );

      if (highlightedTreatment[0]) {
        if (highlightedTreatment[0].textContent.includes("Pick a treatment")) {
          highlightedTreatment[0].setAttribute(
            "style",
            "pointer-events: none; background: #fff;"
          );
        } else if (
          highlightedTreatment[0].textContent.includes("Pick a date/time first")
        ) {
          highlightedTreatment[0].setAttribute(
            "style",
            "pointer-events: none; background: #fff;"
          );
        } else if (
          highlightedTreatment[0].textContent.includes("Unavailable")
        ) {
          highlightedTreatment[0].setAttribute(
            "style",
            "pointer-events: none; background: #fff;"
          );
        } else {
          return null;
        }
      }
    }, 100);

    return () => {
      clearInterval(checkForHighlightedElement);
    };
  }, []);

  return (
    <Transition
      items={props.createAppointmentClicked}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
    >
      {(createAppointmentClicked) =>
        createAppointmentClicked &&
        ((styleprops) => (
          <div
            className="admin_create_appointment_container"
            style={{ ...styleprops, zIndex: logoutClicked ? 0 : 5 }}
          >
            <div
              className="admin_individual_selected_client_back_container"
              onClick={() => {
                props.changeCreateAppointmentClicked(false);

                dispatch(ACTION_ADMIN_CLIENT_FIRST_NAME_RESET());
                dispatch(ACTION_ADMIN_CLIENT_LAST_NAME_RESET());
                dispatch(ACTION_ADMIN_CLIENT_PHONE_NUMBER_RESET());
                dispatch(ACTION_ADMIN_CLIENT_EMAIL_RESET());
                dispatch(ACTION_ADMIN_SELECTED_TREATMENTS_RESET());
                dispatch(ACTION_ADMIN_APPOINTMENT_DATE_RESET());
                dispatch(ACTION_ADMIN_APPOINTMENT_TIME_RESET());
                dispatch(ACTION_ADMIN_APPOINTMENT_NOTES_RESET());
                dispatch(ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER_RESET());

                changeAddCardCollapseOpen(false);
                changeClickOutsideDayPicker(false);
              }}
            >
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className="admin_individual_selected_client_back_arrow_icon"
              />
              <p>Back to schedule</p>
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Client Information</h2>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                First Name
              </div>
              <ClientAutosuggest
                getClientsData={props.getClientsData}
                randomColorArray={props.randomColorArray}
              />
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Last Name
              </div>
              <div
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="react-autowhatever-1"
                aria-controls="react-autowhatever-1"
                aria-expanded="false"
                className="react-autosuggest__container"
              >
                <input
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="react-autowhatever-1"
                  className="react-autosuggest__input"
                  value={adminClientLastName}
                  onChange={(e) =>
                    dispatch(ACTION_ADMIN_CLIENT_LAST_NAME(e.target.value))
                  }
                  placeholder="Client last name"
                />
              </div>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Email
              </div>
              <div
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="react-autowhatever-1"
                aria-controls="react-autowhatever-1"
                aria-expanded="false"
                className="react-autosuggest__container"
              >
                <input
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="react-autowhatever-1"
                  className="react-autosuggest__input"
                  placeholder="Email address"
                  value={adminClientEmail}
                  maxLength={100}
                  onChange={(e) =>
                    dispatch(ACTION_ADMIN_CLIENT_EMAIL(e.target.value))
                  }
                />
              </div>
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Phone
              </div>
              <div
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="react-autowhatever-1"
                aria-controls="react-autowhatever-1"
                aria-expanded="false"
                className="react-autosuggest__container"
              >
                <input
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  onKeyDown={phoneNumberKeyTyping}
                  onChange={phoneNumberTyping}
                  maxLength={16}
                  value={adminClientPhoneNumber}
                  aria-controls="react-autowhatever-1"
                  className="react-autosuggest__input"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Appointment Details</h2>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Date
              </div>
              <DayPickerInput
                classNames={{
                  container: "react-autosuggest__container",
                  overlay: "",
                  overlayWrapper: clickOutsideDayPicker
                    ? "react-autosuggest__input_hide"
                    : "",
                }}
                dayPickerProps={{ disabledDays: { before: new Date() } }}
                inputProps={{
                  className: "react-autosuggest__input",
                  style: {
                    color: "rgb(74, 144, 226)",
                  },
                }}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={(day) =>
                  dispatch(ACTION_ADMIN_APPOINTMENT_DATE(day))
                }
                format="L"
                value={adminAppointmentDate}
                placeholder="Appointment Date"
              />
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Time
              </div>
              <Dropdown
                options={timeOptions()}
                onChange={(choice) =>
                  dispatch(ACTION_ADMIN_APPOINTMENT_TIME(choice.value))
                }
                value={adminAppointmentTime}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  adminAppointmentTime
                    ? adminAppointmentTime
                    : "Appointment Time"
                }
                placeholderClassName={
                  adminAppointmentTime
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
              />
            </div>

            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">Staff</div>
              <Dropdown
                options={employeeOptions()}
                onChange={(choice) =>
                  dispatch(ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER(choice))
                }
                value={adminAppointmentStaffMember}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  adminAppointmentStaffMember
                    ? adminAppointmentStaffMember
                    : "Selected Esthetician"
                }
                placeholderClassName={
                  adminAppointmentStaffMember
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
              />
            </div>

            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">
                Appointment Notes
              </div>
              <div
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="react-autowhatever-1"
                aria-controls="react-autowhatever-1"
                aria-expanded="false"
                className="react-autosuggest__container"
              >
                <input
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="react-autowhatever-1"
                  className="react-autosuggest__input"
                  placeholder={
                    "Enter additional notes for use by staff only (optional)"
                  }
                  value={adminAppointmentNotes}
                  maxLength={200}
                  onChange={(e) =>
                    dispatch(ACTION_ADMIN_APPOINTMENT_NOTES(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="admin_create_appointment_service_label_container">
              <div className="admin_create_appointment_label">Services</div>
              <div className="admin_create_appointment_label">Duration</div>
              <div
                className="admin_create_appointment_label"
                style={{
                  borderRight: "1px solid rgb(211, 211, 211)",
                }}
              >
                Amount
              </div>
            </div>
            {renderSelectedTreatments()}
            <TreatmentAutosuggest />
            <SaltCaveAutosuggest
              getAllAppointmentsData={props.getAllAppointmentsData}
            />

            <div
              className="admin_create_appointment_service_label_container"
              style={{ marginTop: "0rem" }}
            >
              <div className="admin_create_appointment_label"></div>
              <div
                className="admin_create_appointment_label admin_create_appointment_total_label"
                style={{
                  borderLeft: "1px solid transparent",
                }}
              >
                Total
              </div>
              <div
                className="admin_create_appointment_label admin_create_appointment_total_label"
                style={{
                  borderLeft: "1px solid transparent",
                  borderRight: "1px solid rgb(211, 211, 211)",
                }}
              >
                {adminSelectedTreatments.length < 1
                  ? "$0.00"
                  : "$" +
                    adminSelectedTreatments
                      .map((x) => {
                        if (x.props) {
                          if (x.props.children) {
                            if (x.props.children[2]) {
                              if (x.props.children[2].props) {
                                if (x.props.children[2].props.children) {
                                  return x.props.children[2].props.children;
                                } else {
                                  return null;
                                }
                              } else {
                                return null;
                              }
                            } else {
                              return null;
                            }
                          } else {
                            return null;
                          }
                        } else {
                          return null;
                        }
                      })
                      .reduce((a, b) => a + b, 0) +
                    ".00"}
              </div>
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Payment Details</h2>
            </div>
            <div className="admin_payment_info_buttons_container">
              <div
                className="admin_add_credit_card_button"
                onClick={() => {
                  changeAddCardCollapseOpen(!addCardCollapseOpen);
                  changeBookWithoutCardCollapseOpen(false);
                }}
              >
                Book With Card
              </div>
              OR
              <div
                className="admin_book_without_card_button"
                onClick={() => {
                  changeBookWithoutCardCollapseOpen(
                    !bookWithoutCardCollapseOpen
                  );
                  changeAddCardCollapseOpen(false);
                }}
              >
                Book Without Card
              </div>
            </div>
            <Collapse isOpen={addCardCollapseOpen}>
              <AdminPaymentInfo getClientsData={props.getClientsData} />
            </Collapse>
            <Collapse isOpen={bookWithoutCardCollapseOpen}>
              <div className="admin_square_payment_form_container">
                <div className="sq-payment-form">
                  <div className="sq-creditcard">Book Appointment</div>
                </div>
              </div>
            </Collapse>
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminCreateAppointment;
