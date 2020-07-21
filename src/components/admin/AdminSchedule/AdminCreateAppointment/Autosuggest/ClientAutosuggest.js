import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import LZString from "lz-string";
import { useDispatch, useSelector } from "react-redux";
import ACTION_ADMIN_CLIENT_FIRST_NAME from "../../../../../actions/Admin/AdminCreateAppointment/AdminClientFirstName/ACTION_ADMIN_CLIENT_FIRST_NAME";
import ACTION_ADMIN_CLIENT_EMAIL from "../../../../../actions/Admin/AdminCreateAppointment/AdminClientEmail/ACTION_ADMIN_CLIENT_EMIAL";
import ACTION_ADMIN_CLIENT_PHONE_NUMBER from "../../../../../actions/Admin/AdminCreateAppointment/AdminClientPhoneNumber/ACTION_ADMIN_CLIENT_PHONE_NUMBER";
import ACTION_ADMIN_CLIENT_LAST_NAME from "../../../../../actions/Admin/AdminCreateAppointment/AdminClientLastName/ACTION_ADMIN_CLIENT_LAST_NAME";

const ClientAutosuggest = (props) => {
  const dispatch = useDispatch();

  const [inputSuggestions, changeInputSuggestions] = useState([]);

  const adminClientFirstName = useSelector(
    (state) => state.adminClientFirstName.admin_client_first_name
  );

  const inputChange = (event, { newValue }) => {
    dispatch(ACTION_ADMIN_CLIENT_FIRST_NAME(newValue));
  };

  const inputProps = {
    placeholder: "Client first name",
    value: adminClientFirstName,
    onChange: inputChange,
  };

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

  const onSuggestionsFetchRequested = ({ value }) => {
    changeInputSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    changeInputSuggestions([]);
  };
  return (
    <>
      <Autosuggest
        suggestions={inputSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </>
  );
};

export default ClientAutosuggest;
