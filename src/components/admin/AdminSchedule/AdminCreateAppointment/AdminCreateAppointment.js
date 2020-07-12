import React, { useState } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LZString from "lz-string";
import Autosuggest from "react-autosuggest";
import "./AdminCreateAppointment.css";

const AdminCreateAppointment = (props) => {
  const [inputValue, changeInputValue] = useState("");
  const [inputSuggestions, changeInputSuggestions] = useState([]);
  const [clientEmail, changeClientEmail] = useState("");
  const [clientPhoneNumber, changeClientPhoneNumber] = useState("");

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
                src={LZString.decompressFromUTF16(x.profilePicture)}
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
    return (
      suggestion.firstName[0].toUpperCase() +
      suggestion.firstName.slice(1).toLowerCase() +
      " " +
      suggestion.lastName[0].toUpperCase() +
      suggestion.lastName.slice(1).toLowerCase()
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
    changeInputValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    changeInputSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    changeInputSuggestions([]);
  };

  const inputProps = {
    placeholder: "Select or create client",
    value: inputValue,
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
              <div className="admin_create_appointment_label">Name</div>
              <Autosuggest
                suggestions={inputSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
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
                  onChange={(e) => changeClientPhoneNumber(e.target.value)}
                  maxLength={20}
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
                />
              </div>
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Time
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
                  placeholder="Phone number"
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
