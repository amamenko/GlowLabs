import React, { useState, useEffect, useCallback } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LZString from "lz-string";
import Autosuggest from "react-autosuggest";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminCreateAppointment.css";

const AdminCreateAppointment = (props) => {
  const [inputSuggestions, changeInputSuggestions] = useState([]);
  const [clientEmail, changeClientEmail] = useState("");
  const [clientPhoneNumber, changeClientPhoneNumber] = useState("");
  const [clientFirstName, changeClientFirstName] = useState("");
  const [clientLastName, changeClientLastName] = useState("");
  const [selectedStaffMember, changeSelectedStaffMember] = useState("");
  const [appointmentNotes, changeAppointmentNotes] = useState("");

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

          changeSelectedStaffMember(
            currentEmployee.firstName[0].toUpperCase() +
              currentEmployee.firstName.slice(1).toLowerCase() +
              " " +
              currentEmployee.lastName[0].toUpperCase() +
              currentEmployee.lastName.slice(1).toLowerCase()
          );
        } else {
          changeSelectedStaffMember(employeeOptions()[0]);
        }
      }
    }
  }, [props.getEmployeeData, employeeOptions]);

  const clientSuggestions = props.getClientsData
    ? props.getClientsData.clients
      ? props.getClientsData.clients.map((x, i) => {
          return {
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email,
            phoneNumber: x.phoneNumber,
            profilePicture: x.profilePicture ? (
              <img
                className="autosuggest_client_profile_picture"
                src={LZString.decompressFromEncodedURIComponent(
                  x.profilePicture
                )}
                alt={
                  x.firstName[0].toUpperCase() +
                  x.firstName.slice(1).toLowerCase() +
                  " " +
                  x.lastName[0].toUpperCase() +
                  x.lastName.slice(1).toLowerCase() +
                  " Profile Picture"
                }
              />
            ) : (
              <div
                className="autosuggest_client_initials_square"
                style={{
                  background: props.randomColorArray
                    ? props.randomColorArray[i]
                    : "rgb(255, 255, 255)",
                }}
              >
                <p>
                  {x.firstName[0].toUpperCase() + x.lastName[0].toUpperCase()}
                </p>
              </div>
            ),
          };
        })
      : null
    : null;

  const getSuggestions = (value) => {
    const inputValue = value ? value.trim().toLowerCase() : "";
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    } else {
      if (clientSuggestions) {
        return clientSuggestions.filter((x) => {
          const clientFullName =
            x.firstName.toLowerCase() + " " + x.lastName.toLowerCase();

          if (clientFullName.slice(0, inputLength) === inputValue) {
            return clientFullName.slice(0, inputLength) === inputValue;
          } else if (
            x.lastName.toLowerCase().slice(0, inputLength) === inputValue
          ) {
            return (
              x.lastName.toLowerCase().slice(0, inputLength) === inputValue
            );
          } else if (
            x.email.toLowerCase().slice(0, inputLength) === inputValue
          ) {
            return x.email.toLowerCase().slice(0, inputLength) === inputValue;
          } else if (x.phoneNumber.includes(inputValue)) {
            return x.phoneNumber.includes(inputValue);
          } else {
            return null;
          }
        });
      } else {
        return [];
      }
    }
  };

  const getSuggestionValue = (suggestion) => {
    changeClientEmail(suggestion.email);
    changeClientPhoneNumber(suggestion.phoneNumber);
    changeClientLastName(
      suggestion.lastName[0].toUpperCase() +
        suggestion.lastName.slice(1).toLowerCase()
    );
    changeClientFirstName(
      suggestion.firstName[0].toUpperCase() +
        suggestion.firstName.slice(1).toLowerCase()
    );

    return (
      suggestion.firstName[0].toUpperCase() +
      suggestion.firstName.slice(1).toLowerCase()
    );
  };

  const renderSuggestion = (suggestion) => (
    <div className="admin_individual_client_suggestion_container">
      {suggestion.profilePicture}
      <div className="admin_individual_client_suggestion_contact_information_container">
        <p>
          {suggestion.firstName[0].toUpperCase() +
            suggestion.firstName.slice(1).toLowerCase()}{" "}
          {suggestion.lastName[0].toUpperCase() +
            suggestion.lastName.slice(1).toLowerCase()}
        </p>
        <p>{suggestion.email}</p>
        <p>{suggestion.phoneNumber}</p>
      </div>
    </div>
  );

  const inputChange = (event, { newValue }) => {
    changeClientFirstName(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    changeInputSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    changeInputSuggestions([]);
  };

  const inputProps = {
    placeholder: "Client first name",
    value: clientFirstName,
    onChange: inputChange,
  };

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
    changeClientPhoneNumber(currentTyping);
  };

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
            style={styleprops}
          >
            <div
              className="admin_individual_selected_client_back_container"
              onClick={() => props.changeCreateAppointmentClicked(false)}
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
              <Autosuggest
                suggestions={inputSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
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
                  value={clientLastName}
                  onChange={(e) => changeClientLastName(e.target.value)}
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
                  value={clientEmail}
                  maxLength={100}
                  onChange={(e) => changeClientEmail(e.target.value)}
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
                  value={clientPhoneNumber}
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
                  overlayWrapper: "",
                }}
                dayPickerProps={{ disabledDays: { before: new Date() } }}
                inputProps={{
                  className: "react-autosuggest__input",
                }}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={(day) => props.changeSelectedAppointmentDate(day)}
                format="L"
                value={props.selectedAppointmentDate}
                placeholder="Appointment Date"
              />
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Time
              </div>
              <Dropdown
                options={timeOptions()}
                onChange={(choice) =>
                  props.changeSelectedAppointmentTime(choice)
                }
                value={props.selectedAppointmentTime}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  props.selectedAppointmentTime
                    ? props.selectedAppointmentTime
                    : "Appointment Time"
                }
                placeholderClassName={
                  props.selectedAppointmentTime
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
              />
            </div>

            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">Staff</div>
              <Dropdown
                options={employeeOptions()}
                onChange={(choice) => changeSelectedStaffMember(choice)}
                value={selectedStaffMember}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  selectedStaffMember
                    ? selectedStaffMember
                    : "Selected Esthetician"
                }
                placeholderClassName={
                  selectedStaffMember
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
                  value={appointmentNotes}
                  maxLength={200}
                  onChange={(e) => changeAppointmentNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminCreateAppointment;
