import React, { useState, useEffect, useCallback } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LZString from "lz-string";
import Autosuggest from "react-autosuggest";
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
import ACTION_ADMIN_CLIENT_FIRST_NAME from "../../../../actions/Admin/AdminCreateAppointment/AdminClientFirstName/ACTION_ADMIN_CLIENT_FIRST_NAME";
import ACTION_ADMIN_SELECTED_TREATMENTS from "../../../../actions/Admin/AdminCreateAppointment/AdminSelectedTreatments/ACTION_ADMIN_SELECTED_TREATMENTS";
import ACTION_ADMIN_APPOINTMENT_NOTES from "../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentNotes/ACTION_ADMIN_APPOINTMENT_NOTES";
import treatmentSuggestions from "./TreatmentSuggestions";
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
import moment from "moment";

const AdminCreateAppointment = (props) => {
  const dispatch = useDispatch();

  const [inputSuggestions, changeInputSuggestions] = useState([]);
  const [treatmentInputSuggestions, changeTreatmentInputSuggestions] = useState(
    []
  );
  const [treatmentInput, changeTreatmentInput] = useState("");
  const [clickOutsideDayPicker, changeClickOutsideDayPicker] = useState(true);

  const adminClientFirstName = useSelector(
    (state) => state.adminClientFirstName.admin_client_first_name
  );
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

  const getTreatmentSuggestions = (value) => {
    const inputValue = value ? value.trim().toLowerCase() : "";
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      const sortedArr = [];

      const date = moment(adminAppointmentDate, "L").format("MMMM D, YYYY");
      const startTime = adminAppointmentTime;
      const thirtyMinutesPrior = moment(
        date + " " + startTime,
        "MMMM D, YYYY hh:mm A"
      )
        .subtract(30, "minutes")
        .format("MMMM D, YYYY hh:mm A");
      const fortyFiveMinutesPrior = moment(
        date + " " + startTime,
        "MMMM D, YYYY hh:mm A"
      )
        .subtract(45, "minutes")
        .format("MMMM D, YYYY hh:mm A");
      const hourPrior = moment(date + " " + startTime, "MMMM D, YYYY hh:mm A")
        .subtract(1, "hours")
        .format("MMMM D, YYYY hh:mm A");

      const thirtyMinutesAfter = moment(
        date + " " + startTime,
        "MMMM D, YYYY hh:mm A"
      )
        .add(30, "minutes")
        .format("MMMM D, YYYY hh:mm A");
      const fortyFiveMinutesAfter = moment(
        date + " " + startTime,
        "MMMM D, YYYY hh:mm A"
      )
        .add(45, "minutes")
        .format("MMMM D, YYYY hh:mm A");
      const hourAfter = moment(date + " " + startTime, "MMMM D, YYYY hh:mm A")
        .add(1, "hours")
        .format("MMMM D, YYYY hh:mm A");

      const filteredApps = props.getAllAppointmentsData
        ? props.getAllAppointmentsData.all_appointments.filter((x) => {
            if (x.esthetician === "Salt Cave") {
              return x.esthetician === "Salt Cave";
            } else {
              return null;
            }
          })
        : null;

      const sameDayApps = filteredApps.filter((x) => {
        if (x.date === date) {
          return x.date === date;
        } else {
          return null;
        }
      });

      console.log(filteredApps);

      for (let i = 0; i < treatmentSuggestions().length; i++) {
        sortedArr.push({
          sectionTitle: treatmentSuggestions()[i].sectionTitle,
          suggestions: treatmentSuggestions()[i].suggestions.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        });
      }
      return sortedArr;
    } else {
      const sortedArr = [];

      for (let i = 0; i < treatmentSuggestions().length; i++) {
        sortedArr.push({
          sectionTitle: treatmentSuggestions()[i].sectionTitle,
          suggestions: treatmentSuggestions()
            [i].suggestions.sort((a, b) => a.name.localeCompare(b.name))
            .filter((x) => {
              const treatmentName = x.name;

              if (
                treatmentName.toLowerCase().slice(0, inputLength) === inputValue
              ) {
                return (
                  treatmentName.toLowerCase().slice(0, inputLength) ===
                  inputValue
                );
              } else {
                return null;
              }
            }),
        });
        return sortedArr;
      }
    }
  };

  const getSuggestionValue = (suggestion) => {
    dispatch(ACTION_ADMIN_CLIENT_EMAIL(suggestion.email));
    dispatch(ACTION_ADMIN_CLIENT_PHONE_NUMBER(suggestion.phoneNumber));
    dispatch(
      ACTION_ADMIN_CLIENT_LAST_NAME(
        suggestion.lastName[0].toUpperCase() +
          suggestion.lastName.slice(1).toLowerCase()
      )
    );
    dispatch(
      ACTION_ADMIN_CLIENT_FIRST_NAME(
        suggestion.firstName[0].toUpperCase() +
          suggestion.firstName.slice(1).toLowerCase()
      )
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

  const renderTreatmentSuggestion = (suggestion) => {
    return (
      <div className="admin_individual_client_treatment_suggestion_container">
        {suggestion.props.children[3].props.children ? (
          <div className="admin_individual_client_treatment_suggestion_picture">
            {suggestion.props.children[3].props.children}
          </div>
        ) : null}

        <p>{suggestion.props.children[0].props.children}</p>
        <p>${suggestion.props.children[2].props.children}.00</p>
      </div>
    );
  };

  const inputChange = (event, { newValue }) => {
    dispatch(ACTION_ADMIN_CLIENT_FIRST_NAME(newValue));
  };

  const treatmentInputChange = (event, { newValue }) => {
    changeTreatmentInput(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    changeInputSuggestions(getSuggestions(value));
  };

  const onTreatmentSuggestionsFetchRequested = ({ value }) => {
    changeTreatmentInputSuggestions(getTreatmentSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    changeInputSuggestions([]);
  };

  const onTreatmentSuggestionsClearRequested = () => {
    changeTreatmentInputSuggestions([]);
  };

  const inputProps = {
    placeholder: "Client first name",
    value: adminClientFirstName,
    onChange: inputChange,
  };

  const treatmentInputProps = {
    placeholder: "Add a Treatment",
    value: treatmentInput,
    onChange: treatmentInputChange,
    style: { borderRight: "1px solid transparent" },
  };

  const getTreatmentSuggestionValue = (suggestion) => {
    dispatch(
      ACTION_ADMIN_SELECTED_TREATMENTS([...adminSelectedTreatments, suggestion])
    );

    return "";
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
                  color: "#000",
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
                  color: "#000",
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
                  color: "#000",
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

                dispatch(ACTION_ADMIN_SELECTED_TREATMENTS(treatmentsArr));
              }}
              className="admin_create_appointment_treatment_delete_button"
            />
          </div>
        );
      });
    }
  };

  const renderSectionTitle = (section) => {
    return (
      <span className="react_autosuggest_section_title_header">
        {section.sectionTitle}
      </span>
    );
  };

  const getSectionSuggestions = (section) => {
    return section.suggestions.map((x, i) => {
      return (
        <>
          <span key={i}>{x.name}</span>
          <span key={i}>{x.duration}</span>
          <span key={i}>{x.price}</span>
          <span key={i}>{x.picture}</span>
        </>
      );
    });
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
                  dispatch(ACTION_ADMIN_APPOINTMENT_TIME(choice))
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
            <div
              className="admin_create_appointment_input_information_container"
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
                <Autosuggest
                  suggestions={treatmentInputSuggestions}
                  onSuggestionsFetchRequested={
                    onTreatmentSuggestionsFetchRequested
                  }
                  onSuggestionsClearRequested={
                    onTreatmentSuggestionsClearRequested
                  }
                  getSuggestionValue={getTreatmentSuggestionValue}
                  renderSuggestion={renderTreatmentSuggestion}
                  inputProps={treatmentInputProps}
                  shouldRenderSuggestions={() => true}
                  focusInputOnSuggestionClick={false}
                  multiSection={true}
                  renderSectionTitle={(section) => renderSectionTitle(section)}
                  getSectionSuggestions={(section) =>
                    getSectionSuggestions(section)
                  }
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
                  style={{
                    borderLeft: "1px solid transparent",
                    borderRight: "1px solid transparent",
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
                  style={{
                    borderLeft: "1px solid transparent",
                  }}
                />
              </div>
            </div>
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
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminCreateAppointment;
