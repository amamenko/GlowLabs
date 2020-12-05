import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import saltCaveSuggestions from "../SaltCaveSuggestions";
import ACTION_ADMIN_APPOINTMENT_DURATION from "../../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDuration/ACTION_ADMIN_APPOINTMENT_DURATION";
import ACTION_ADMIN_SELECTED_TREATMENTS from "../../../../../actions/Admin/AdminCreateAppointment/AdminSelectedTreatments/ACTION_ADMIN_SELECTED_TREATMENTS";

const SaltCaveAutosuggest = (props) => {
  const dispatch = useDispatch();

  const [saltCaveInputSuggestions, changeSaltCaveInputSuggestions] = useState(
    []
  );
  const [saltCaveInput, changeSaltCaveInput] = useState("");

  const adminAppointmentDuration = useSelector(
    (state) => state.adminAppointmentDuration.admin_appointment_duration
  );
  const adminAppointmentDate = useSelector(
    (state) => state.adminAppointmentDate.admin_appointment_date
  );
  const adminAppointmentTime = useSelector(
    (state) => state.adminAppointmentTime.admin_appointment_time
  );
  const adminSelectedTreatments = useSelector(
    (state) => state.adminSelectedTreatments.admin_selected_treatments
  );

  const saltCaveInputChange = (event, { newValue }) => {
    changeSaltCaveInput(newValue);
  };

  const renderSaltCaveSuggestion = (suggestion) => {
    return (
      <div className="admin_individual_client_treatment_suggestion_container">
        {suggestion.props.children[3].props.children ? (
          <div className="admin_individual_client_treatment_suggestion_picture">
            {suggestion.props.children[3].props.children}
          </div>
        ) : null}

        <p
          style={{
            color: suggestion.props.children[0].props.children
              ? suggestion.props.children[0].props.children.includes(
                  "Unavailable"
                )
                ? "rgb(177, 177, 177)"
                : "#000"
              : "#000",
          }}
        >
          {suggestion.props.children[0].props.children}
        </p>
        <p>
          {suggestion.props.children[2].props.children
            ? "$" + suggestion.props.children[2].props.children + ".00"
            : null}
        </p>
      </div>
    );
  };

  const renderSectionTitle = (section) => {
    if (section.sectionTitle) {
      return (
        <span className="react_autosuggest_section_title_header">
          {section.sectionTitle}
        </span>
      );
    } else {
      return null;
    }
  };

  const getSectionSuggestions = (section) => {
    if (section.suggestions) {
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
    }
  };

  const onSaltCaveSuggestionsFetchRequested = ({ value }) => {
    changeSaltCaveInputSuggestions(getSaltCaveSuggestions(value));
  };

  const onSaltCaveSuggestionsClearRequested = () => {
    changeSaltCaveInputSuggestions([]);
  };

  const saltCaveInputProps = {
    placeholder: "Add Salt Cave",
    value: saltCaveInput,
    onChange: saltCaveInputChange,
    style: { borderRight: "1px solid transparent" },
  };

  const getSaltCaveSuggestionValue = (suggestion) => {
    dispatch(
      ACTION_ADMIN_APPOINTMENT_DURATION(
        adminAppointmentDuration + suggestion.props.children[1].props.children
      )
    );
    dispatch(
      ACTION_ADMIN_SELECTED_TREATMENTS([...adminSelectedTreatments, suggestion])
    );

    return "";
  };

  const getSaltCaveSuggestions = (value) => {
    const inputValue = value ? value.trim().toLowerCase() : "";
    const inputLength = inputValue.length;

    const date = moment(adminAppointmentDate, "L").format("MMMM D, YYYY");

    const startTime = adminAppointmentTime;

    const fifteenMinutesPrior = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .subtract(15, "minutes")
      .format("MMMM D, YYYY h:mm A");

    const thirtyMinutesPrior = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .subtract(30, "minutes")
      .format("MMMM D, YYYY h:mm A");

    const fortyFiveMinutesPrior = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .subtract(45, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const hourPrior = moment(date + " " + startTime, "MMMM D, YYYY hh:mm A")
      .subtract(1, "hours")
      .format("MMMM D, YYYY hh:mm A");

    const fifteenMinutesAfter = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(15 + adminAppointmentDuration, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const actualAppointmentStartTime = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    ).format("MMMM D, YYYY hh:mm A");

    const fifteenMinutesIntoAppointment = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(15, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const thirtyMinutesIntoAppointment = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(30, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const fortyFiveMinutesIntoAppointment = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(45, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const hourIntoAppointment = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(60, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const actualAppointmentEndTime = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(adminAppointmentDuration, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const thirtyMinutesAfter = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(30 + adminAppointmentDuration, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const fortyFiveMinutesAfter = moment(
      date + " " + startTime,
      "MMMM D, YYYY hh:mm A"
    )
      .add(45 + adminAppointmentDuration, "minutes")
      .format("MMMM D, YYYY hh:mm A");

    const hourAfter = moment(date + " " + startTime, "MMMM D, YYYY hh:mm A")
      .add(60 + adminAppointmentDuration, "minutes")
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

    const bookedTimes = sameDayApps.map((x) => {
      const interval = x.duration / 5;
      const bookedArr = [];

      for (let i = 0; i < interval + 1; i++) {
        const start = x.date + " " + x.startTime + " " + x.morningOrEvening;

        bookedArr.push(
          moment(start, "MMMM D, YYYY hh:mm A")
            .add(i * 5, "minutes")
            .format("MMMM D, YYYY hh:mm A")
        );
      }

      return bookedArr;
    });

    const bookedTimesArr = bookedTimes.flat();

    const saltCaveSuggestionsArguments = saltCaveSuggestions(
      adminAppointmentDuration,
      adminAppointmentDate,
      adminAppointmentTime,
      adminSelectedTreatments ? adminSelectedTreatments : [],
      bookedTimesArr.includes(actualAppointmentStartTime) ||
        bookedTimesArr.includes(fifteenMinutesPrior) ||
        bookedTimesArr.includes(thirtyMinutesPrior),
      bookedTimesArr.includes(actualAppointmentStartTime) ||
        bookedTimesArr.includes(fifteenMinutesPrior) ||
        bookedTimesArr.includes(thirtyMinutesPrior) ||
        bookedTimesArr.includes(fortyFiveMinutesPrior),
      bookedTimesArr.includes(actualAppointmentStartTime) ||
        bookedTimesArr.includes(fifteenMinutesPrior) ||
        bookedTimesArr.includes(thirtyMinutesPrior) ||
        bookedTimesArr.includes(fortyFiveMinutesPrior) ||
        bookedTimesArr.includes(hourPrior),
      bookedTimes.includes(actualAppointmentStartTime) ||
        bookedTimesArr.includes(fifteenMinutesIntoAppointment) ||
        bookedTimesArr.includes(thirtyMinutesIntoAppointment),
      bookedTimes.includes(actualAppointmentStartTime) ||
        bookedTimesArr.includes(fifteenMinutesIntoAppointment) ||
        bookedTimesArr.includes(thirtyMinutesIntoAppointment) ||
        bookedTimesArr.includes(fortyFiveMinutesIntoAppointment),
      bookedTimes.includes(actualAppointmentStartTime) ||
        bookedTimesArr.includes(fifteenMinutesIntoAppointment) ||
        bookedTimesArr.includes(thirtyMinutesIntoAppointment) ||
        bookedTimesArr.includes(fortyFiveMinutesIntoAppointment) ||
        bookedTimesArr.includes(hourIntoAppointment),
      adminAppointmentDuration === 0
        ? true
        : bookedTimesArr.includes(actualAppointmentEndTime) ||
            bookedTimesArr.includes(fifteenMinutesAfter) ||
            bookedTimesArr.includes(thirtyMinutesAfter),
      adminAppointmentDuration === 0
        ? true
        : bookedTimesArr.includes(actualAppointmentEndTime) ||
            bookedTimesArr.includes(fifteenMinutesAfter) ||
            bookedTimesArr.includes(thirtyMinutesAfter) ||
            bookedTimesArr.includes(fortyFiveMinutesAfter),
      adminAppointmentDuration === 0
        ? true
        : bookedTimesArr.includes(actualAppointmentEndTime) ||
            bookedTimesArr.includes(fifteenMinutesAfter) ||
            bookedTimesArr.includes(thirtyMinutesAfter) ||
            bookedTimesArr.includes(fortyFiveMinutesAfter) ||
            bookedTimesArr.includes(hourAfter)
    );

    if (inputLength === 0) {
      const sortedArr = [];

      for (let i = 0; i < saltCaveSuggestionsArguments.length; i++) {
        sortedArr.push({
          sectionTitle: saltCaveSuggestionsArguments[i]
            ? saltCaveSuggestionsArguments[i].sectionTitle
              ? saltCaveSuggestionsArguments[i].sectionTitle
              : null
            : null,
          suggestions: saltCaveSuggestionsArguments[i]
            ? saltCaveSuggestionsArguments[i].suggestions
              ? saltCaveSuggestionsArguments[i].suggestions.sort((a, b) =>
                  a.name ? a.name.localeCompare(b.name) : null
                )
              : null
            : null,
        });
      }
      return sortedArr;
    } else {
      const sortedArr = [];

      for (let i = 0; i < saltCaveSuggestionsArguments.length; i++) {
        sortedArr.push({
          sectionTitle: saltCaveSuggestionsArguments[i]
            ? saltCaveSuggestionsArguments[i].sectionTitle
              ? saltCaveSuggestionsArguments[i].sectionTitle
              : null
            : null,
          suggestions: saltCaveSuggestionsArguments[i]
            ? saltCaveSuggestionsArguments[i].suggestions
                .sort((a, b) => (a.name ? a.name.localeCompare(b.name) : null))
                .filter((x) => {
                  const treatmentName = x.name;

                  if (
                    treatmentName.toLowerCase().slice(0, inputLength) ===
                    inputValue
                  ) {
                    return (
                      treatmentName.toLowerCase().slice(0, inputLength) ===
                      inputValue
                    );
                  } else {
                    return null;
                  }
                })
            : null,
        });
        return sortedArr;
      }
    }
  };

  return (
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
          suggestions={saltCaveInputSuggestions}
          onSuggestionsFetchRequested={onSaltCaveSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSaltCaveSuggestionsClearRequested}
          getSuggestionValue={getSaltCaveSuggestionValue}
          renderSuggestion={renderSaltCaveSuggestion}
          inputProps={saltCaveInputProps}
          shouldRenderSuggestions={() => true}
          focusInputOnSuggestionClick={false}
          multiSection={true}
          renderSectionTitle={(section) => renderSectionTitle(section)}
          getSectionSuggestions={(section) => getSectionSuggestions(section)}
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
  );
};

export default SaltCaveAutosuggest;
