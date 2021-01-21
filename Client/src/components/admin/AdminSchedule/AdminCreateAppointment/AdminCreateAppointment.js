import React, { useState, useEffect, useCallback } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import Dropdown from "react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import ClientAutosuggest from "./Autosuggest/ClientAutosuggest";
import TreatmentAutosuggest from "./Autosuggest/TreatmentAutosuggest";
import SaltCaveAutosuggest from "./Autosuggest/SaltCaveAutosuggest";
import AdminPaymentInfo from "./AdminPaymentInfo/AdminPaymentInfo";
import { Collapse } from "reactstrap";
import addAppointmentMutation from "../../../../graphql/mutations/addAppointmentMutation";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
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
import ACTION_LOADING_SPINNER_ACTIVE from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_TOTAL_PRICE_RESET from "../../../../actions/TotalPrice/ACTION_TOTAL_PRICE_RESET";
import ACTION_TOTAL_PRICE from "../../../../actions/TotalPrice/ACTION_TOTAL_PRICE";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminCreateAppointment.css";
// Minified Bootstrap CSS file (for Collapse feature)
import "../../../../bootstrap.min.css";

const AdminCreateAppointment = (props) => {
  const dispatch = useDispatch();

  const {
    stopTransition,
    createAppointmentClicked,
    getClientsData,
    getClientsRefetch,
    changeStopTransition,
    randomColorArray,
    changeCreateAppointmentClicked,
    changePersonalEventClicked,
    getAllAppointmentsRefetch,
    allEmployeeOptions,
    getEmployeeData,
    renderLoggedInStaffName,
  } = props;

  const [clickOutsideDayPicker, changeClickOutsideDayPicker] = useState(true);
  const [addCardCollapseOpen, changeAddCardCollapseOpen] = useState(false);
  const [
    bookWithoutCardCollapseOpen,
    changeBookWithoutCardCollapseOpen,
  ] = useState(false);

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
  const totalPrice = useSelector((state) => state.totalPrice.totalPrice);
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [selectedTreatments, changeSelectedTreatments] = useState([]);
  const [selectedAddOns, changeSelectedAddOns] = useState([]);

  const [
    addAppointment,
    { loading: addAppointmentLoading, data: addAppointmentData },
  ] = useMutation(addAppointmentMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

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
                    ? item.props.children.length === 4
                      ? item.props.children[1]
                        ? item.props.children[1].props
                          ? item.props.children[1].props.children
                            ? item.props.children[1].props.children + " minutes"
                            : ""
                          : ""
                        : ""
                      : item.props.children[2]
                      ? item.props.children[2].props
                        ? item.props.children[2].props.children
                          ? item.props.children[2].props.children + " minutes"
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
                      ? item.props.children.length === 4
                        ? item.props.children[2]
                          ? item.props.children[2].props
                            ? item.props.children[2].props.children
                              ? "$" +
                                item.props.children[2].props.children +
                                ".00"
                              : ""
                            : ""
                          : ""
                        : item.props.children[3]
                        ? item.props.children[3].props
                          ? item.props.children[3].props.children
                            ? "$" +
                              item.props.children[3].props.children +
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
                      .map((x) => x.props.children[3].props.children)
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
        } else if (
          highlightedTreatment[0].textContent.includes("already selected")
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

  useEffect(() => {
    if (adminSelectedTreatments.length > 0) {
      const treatments = adminSelectedTreatments.filter(
        (item) => !item.props.children[0].props.children.includes("Add On")
      );
      const addOns = adminSelectedTreatments.filter((item) =>
        item.props.children[0].props.children.includes("Add On")
      );

      changeSelectedTreatments(
        treatments.map((item) => {
          if (item.props.children.length === 4) {
            return {
              name: item.props.children[0].props.children,
              duration: item.props.children[1].props.children,
              price: item.props.children[2].props.children,
            };
          } else {
            return {
              name: item.props.children[1].props.children,
              duration: item.props.children[2].props.children,
              price: item.props.children[3].props.children,
            };
          }
        })
      );

      changeSelectedAddOns(
        addOns.map((item) => {
          return {
            name: item.props.children[1].props.children,
            duration: item.props.children[2].props.children,
            price: item.props.children[3].props.children,
          };
        })
      );
    }
  }, [adminSelectedTreatments]);

  const variablesModel = {
    firstName: adminClientFirstName,
    lastName: adminClientLastName,
    email: adminClientEmail,
    phoneNumber: adminClientPhoneNumber,
    bookedWithCardSquareID: "",
    notes: adminAppointmentNotes,
    squareCustomerId: "",
  };

  const handleBackToSchedule = useCallback(() => {
    changeCreateAppointmentClicked(false);

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
  }, [dispatch, changeCreateAppointmentClicked]);

  const handleSubmitBooking = (e) => {
    e.preventDefault();

    const appDate = moment(adminAppointmentDate, "MM/DD/YYYY").format(
      "MMMM D, YYYY"
    );

    const beforeSalt = selectedTreatments.filter((x) => {
      if (x.name) {
        if (typeof x.name === "string") {
          if (x.name.includes("Before")) {
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
    });
    const duringSalt = selectedTreatments.filter((x) => {
      if (x.name) {
        if (typeof x.name === "string") {
          if (x.name.includes("Minutes)")) {
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
    });
    const afterSalt = selectedTreatments.filter((x) => {
      if (x.name) {
        if (typeof x.name === "string") {
          if (x.name.includes("After)")) {
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
    });
    const regularTreatments = selectedTreatments.filter((x) => {
      if (x.name) {
        if (typeof x.name === "string") {
          if (!x.name.includes("Salt Cave")) {
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
    });

    const twilioStaggerArr = [
      beforeSalt.length > 0,
      regularTreatments.length > 0,
      duringSalt.length > 0,
      afterSalt.length > 0,
    ];

    const twilioDelayArr = [];

    let highestDelay = 0;

    for (let i = 0; i < twilioStaggerArr.length; i++) {
      if (twilioStaggerArr[i]) {
        twilioDelayArr.push(highestDelay);
        highestDelay += 5000;
      } else {
        twilioDelayArr.push(0);
      }
    }

    if (beforeSalt.length > 0) {
      const beforeAppStartTime = moment(
        appDate + " " + adminAppointmentTime,
        "MMMM D, YYYY h:mm A"
      )
        .subtract(beforeSalt[0].duration, "minutes")
        .format("h:mm A");
      const beforeAppEndTime = moment(
        appDate + " " + beforeAppStartTime,
        "MMMM D, YYYY h:mm A"
      )
        .add(beforeSalt[0].duration, "minutes")
        .format("h:mm");

      setTimeout(() => {
        addAppointment({
          variables: {
            ...variablesModel,
            date: appDate,
            startTime: beforeAppStartTime.split(" ")[0],
            morningOrEvening: beforeAppStartTime.split(" ")[1],
            endTime: beforeAppEndTime,
            price: beforeSalt[0].price,
            duration: beforeSalt[0].duration,
            esthetician: "Salt Cave",
            treatments: beforeSalt,
            addOns: [],
          },
        });
      }, twilioDelayArr[0]);
    }

    if (duringSalt.length > 0) {
      const duringEndTime = moment(
        appDate + " " + adminAppointmentTime,
        "MMMM D, YYYY h:mm A"
      )
        .add(duringSalt[0].duration, "minutes")
        .format("h:mm");

      setTimeout(() => {
        addAppointment({
          variables: {
            ...variablesModel,
            date: appDate,
            startTime: adminAppointmentTime.split(" ")[0],
            morningOrEvening: adminAppointmentTime.split(" ")[1],
            endTime: duringEndTime,
            price: duringSalt[0].price,
            duration: duringSalt[0].duration,
            esthetician: "Salt Cave",
            treatments: duringSalt,
            addOns: [],
          },
        });
      }, twilioDelayArr[2]);
    }

    const regularDuration = regularTreatments
      .concat(selectedAddOns)
      .map((x) => x.duration)
      .reduce((a, b) => a + b, 0);

    const regularEndTime = moment(
      appDate + " " + adminAppointmentTime,
      "MMMM D, YYYY h:mm A"
    )
      .add(regularDuration, "minutes")
      .format("h:mm A");

    if (afterSalt.length > 0) {
      const afterSaltEndTime = moment(
        appDate + " " + regularEndTime,
        "MMMM D, YYYY h:mm A"
      )
        .add(afterSalt[0].duration, "minutes")
        .format("h:mm");

      setTimeout(() => {
        addAppointment({
          variables: {
            ...variablesModel,
            date: appDate,
            startTime: regularEndTime.split(" ")[0],
            morningOrEvening: regularEndTime.split(" ")[1],
            endTime: afterSaltEndTime,
            price: afterSalt[0].price,
            duration: afterSalt[0].duration,
            esthetician: "Salt Cave",
            treatments: afterSalt,
            addOns: [],
          },
        });
      }, twilioDelayArr[3]);
    }

    if (regularTreatments.length > 0) {
      setTimeout(() => {
        addAppointment({
          variables: {
            ...variablesModel,
            date: appDate,
            startTime: adminAppointmentTime.split(" ")[0],
            morningOrEvening: adminAppointmentTime.split(" ")[1],
            endTime: regularEndTime.split(" ")[0],
            price: regularTreatments
              .concat(selectedAddOns)
              .map((x) => x.price)
              .reduce((a, b) => a + b, 0),
            duration: regularDuration,
            esthetician: adminAppointmentStaffMember,
            treatments: regularTreatments,
            addOns: selectedAddOns,
          },
        });
      }, twilioDelayArr[1]);
    }

    if (highestDelay === 0) {
      if (addAppointmentData) {
        getAllAppointmentsRefetch();
        dispatch(ACTION_LOADING_SPINNER_RESET());
        handleBackToSchedule();
      }
    } else {
      setTimeout(() => {
        getAllAppointmentsRefetch();
        dispatch(ACTION_LOADING_SPINNER_RESET());
        handleBackToSchedule();
      }, highestDelay);
    }
  };

  useEffect(() => {
    if (adminSelectedTreatments.length < 1) {
      dispatch(ACTION_TOTAL_PRICE_RESET());
    } else {
      const totalTime = adminSelectedTreatments
        .map((x) => {
          if (x.props) {
            if (x.props.children) {
              if (x.props.children.length === 4) {
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
                if (x.props.children[3]) {
                  if (x.props.children[3].props) {
                    if (x.props.children[3].props.children) {
                      return x.props.children[3].props.children;
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              }
            } else {
              return null;
            }
          } else {
            return null;
          }
        })
        .reduce((a, b) => a + b, 0);

      dispatch(ACTION_TOTAL_PRICE(totalTime));
    }
  }, [adminSelectedTreatments, dispatch]);

  useEffect(() => {
    if (addAppointmentData && !loadingSpinnerActive) {
      handleBackToSchedule();
    }
  }, [handleBackToSchedule, addAppointmentData, loadingSpinnerActive]);

  useEffect(() => {
    if (addAppointmentLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [addAppointmentLoading, dispatch]);

  return (
    <Transition
      items={createAppointmentClicked}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
      immediate={stopTransition}
    >
      {(createAppointmentClicked) =>
        createAppointmentClicked &&
        ((styleprops) => (
          <div
            className="admin_create_appointment_container"
            style={{
              ...styleprops,
              zIndex: logoutClicked || loadingSpinnerActive ? 0 : 5,
            }}
          >
            <Modal
              isOpen={loadingSpinnerActive}
              style={{
                content: {
                  position: "fixed",
                  zIndex: "10000",
                  height: "100%",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                  paddingBottom: "10%",
                  borderRadius: "none",
                  width: "100vw",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <BounceLoader
                size={100}
                css={override}
                color={"rgb(44, 44, 52)"}
                loading={loadingSpinnerActive}
              />
            </Modal>
            <div className="admin_individual_selected_client_back_container">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className="admin_individual_selected_client_back_arrow_icon"
                onClick={handleBackToSchedule}
              />
              <p onClick={handleBackToSchedule}>Back to schedule</p>
              <div className="admin_individual_selected_client_top_page_options">
                <p
                  onClick={() => {
                    changePersonalEventClicked(true);
                    changeCreateAppointmentClicked(false);
                    changeStopTransition(true);
                    setTimeout(() => {
                      changeStopTransition(false);
                    }, 1000);
                  }}
                >
                  Create Personal Event
                </p>
                <p>/</p>
                <p className="admin_individual_selected_client_chosen_create_page">
                  Create Appointment
                </p>
              </div>
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Client Information</h2>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                First Name
              </div>
              <ClientAutosuggest
                getClientsData={getClientsData}
                randomColorArray={randomColorArray}
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
                options={props.timeOptions()}
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
                options={
                  getEmployeeData
                    ? getEmployeeData.employee
                      ? getEmployeeData.employee.employeeRole.includes("Admin")
                        ? allEmployeeOptions()
                        : renderLoggedInStaffName()
                      : renderLoggedInStaffName()
                    : renderLoggedInStaffName()
                }
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
                {!totalPrice ? "$0.00" : "$" + totalPrice + ".00"}
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
              <AdminPaymentInfo
                getClientsData={getClientsData}
                getClientsRefetch={getClientsRefetch}
                handleBackToSchedule={handleBackToSchedule}
                handleSubmitBooking={handleSubmitBooking}
              />
            </Collapse>
            <Collapse isOpen={bookWithoutCardCollapseOpen}>
              <div className="admin_square_payment_form_container">
                <div className="sq-payment-form">
                  <div className="sq-creditcard" onClick={handleSubmitBooking}>
                    Book Appointment
                  </div>
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
