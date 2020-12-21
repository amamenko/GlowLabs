import React, { useCallback, useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/react-hooks";
import getAllAppointmentsQuery from "../../../graphql/queries/getAllAppointmentsQuery";
import getAllPersonalEventsQuery from "../../../graphql/queries/getAllPersonalEventsQuery";
import { animateScroll } from "react-scroll";
import ACTION_DAY_OF_THE_WEEK from "../../../actions/SelectedDay/DayOfTheWeek/ACTION_DAY_OF_THE_WEEK";
import ACTION_REFORMATTED_DAY_CLONE_RESET from "../../../actions/SelectedDay/ReformattedDayClone/ACTION_REFORMATTED_DAY_CLONE_RESET";
import ACTION_SELECTED_TIME from "../../../actions/SelectedTime/ACTION_SELECTED_TIME";
import ACTION_SELECTED_TIME_RESET from "../../../actions/SelectedTime/ACTION_SELECTED_TIME_RESET";
import ACTION_AFTERNOON_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/Afternoon/ACTION_AFTERNOON_OPEN";
import ACTION_AFTERNOON_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/Afternoon/ACTION_AFTERNOON_CLOSED";
import ACTION_LATE_AFTERNOON_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/LateAfternoon/ACTION_LATE_AFTERNOON_OPEN";
import ACTION_LATE_AFTERNOON_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/LateAfternoon/ACTION_LATE_AFTERNOON_CLOSED";
import ACTION_MORNING_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/Morning/ACTION_MORNING_OPEN";
import ACTION_MORNING_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/Morning/ACTION_MORNING_CLOSED";
import ACTION_EVENING_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/Evening/ACTION_EVENING_OPEN";
import ACTION_EVENING_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/Evening/ACTION_EVENING_CLOSED";
import ACTION_CONTINUE_BUTTON_ACTIVE from "../../../actions/ContinueToCheckoutButtonActive/ACTION_CONTINUE_BUTTON_ACTIVE";
import ACTION_CONTINUE_BUTTON_RESET from "../../../actions/ContinueToCheckoutButtonActive/ACTION_CONTINUE_BUTTON_RESET";
import ACTION_FIRST_NAME_RESET from "../../../actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME_RESET";
import ACTION_LAST_NAME_RESET from "../../../actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME_RESET";
import ACTION_EMAIL_RESET from "../../../actions/GuestCheckoutForm/Email/ACTION_EMAIL_RESET";
import ACTION_EMAIL_NOT_INVALID from "../../../actions/EmailValidation/Invalid/ACTION_EMAIL_NOT_INVALID";
import ACTION_EMAIL_NOT_VALID from "../../../actions/EmailValidation/Valid/ACTION_EMAIL_NOT_VALID";
import ACTION_PHONE_NUMBER_RESET from "../../../actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER_RESET";
import ACTION_PHONE_NOT_INVALID from "../../../actions/PhoneNumberValidation/Invalid/ACTION_PHONE_NOT_INVALID";
import ACTION_PHONE_NOT_VALID from "../../../actions/PhoneNumberValidation/Valid/ACTION_PHONE_NOT_VALID";
import ACTION_APPOINTMENT_NOTES_RESET from "../../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_RESET";
import ACTION_APPOINTMENT_END_TIME from "../../../actions/AppointmentEndTime/ACTION_APPOINTMENT_END_TIME";
import ACTION_TOTAL_DURATION from "../../../actions/TotalDuration/ACTION_TOTAL_DURATION";
import ACTION_AVAILABILITY_PAGE_OPENED from "../../../actions/InCart/CartPageOpened/ACTION_AVAILABILITY_PAGE_OPENED";
import ACTION_PAYMENT_INFO_PAGE_OPENED from "../../../actions/InCart/CartPageOpened/ACTION_PAYMENT_INFO_PAGE_OPENED";
import ACTION_GUEST_CHECKOUT_FORM_PAGE_OPENED from "../../../actions/InCart/CartPageOpened/ACTION_GUEST_CHECKOUT_FORM_PAGE_OPENED";
import "./TimePreference.css";
// Minified Bootstrap CSS file (for Collapse feature)
import "../../../bootstrap.min.css";

const TimePreference = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const addOnsArr = useSelector((state) => state.addOnsArr.add_ons_arr);
  const treatmentsArr = useSelector(
    (state) => state.treatmentsArr.treatments_arr
  );
  const reformattedDay = useSelector(
    (state) => state.reformattedDay.reformattedDay
  );
  const selectedDay = useSelector((state) => state.selectedDay.selectedDay);
  const dayOfTheWeek = useSelector((state) => state.dayOfTheWeek.dayOfTheWeek);
  const selectedTime = useSelector((state) => state.selectedTime.selectedTime);
  const totalDuration = useSelector(
    (state) => state.totalDuration.totalDuration
  );
  const continueToCheckoutButton = useSelector(
    (state) => state.continueToCheckoutButton.continueButtonActive
  );
  const morningCollapseIsOpen = useSelector(
    (state) => state.morningCollapse.collapseIsOpen
  );
  const afternoonCollapseIsOpen = useSelector(
    (state) => state.afternoonCollapse.collapseIsOpen
  );
  const lateAfternoonCollapseIsOpen = useSelector(
    (state) => state.lateAfternoonCollapse.collapseIsOpen
  );
  const eveningCollapseIsOpen = useSelector(
    (state) => state.eveningCollapse.collapseIsOpen
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const selectedEsthetician = useSelector(
    (state) => state.selectedEsthetician.selectedEsthetician
  );
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

  const [bookedTimes, changeBookedTimes] = useState(null);

  // Checkout Form States
  const firstName = useSelector((state) => state.firstName.first_name);
  const lastName = useSelector((state) => state.lastName.last_name);
  const appointmentNotes = useSelector(
    (state) => state.appointmentNotes.appointment_notes
  );

  // Email States
  const email = useSelector((state) => state.email.email);
  const emailIsValid = useSelector((state) => state.emailIsValid.email_valid);
  const emailIsInvalid = useSelector(
    (state) => state.emailIsInvalid.email_invalid
  );

  // Phone Number States
  const phoneNumber = useSelector((state) => state.phoneNumber.phone_number);
  const phoneIsValid = useSelector((state) => state.phoneIsValid.phone_valid);
  const phoneIsInvalid = useSelector(
    (state) => state.phoneIsInvalid.phone_invalid
  );

  const [individualItemHovered, changeIndividualItemHovered] = useState("");
  const [checkedForBlockedTimes, changeCheckedForBlockedTimes] = useState(
    false
  );

  const { data: appointmentsData, loading: appointmentsLoading } = useQuery(
    getAllAppointmentsQuery,
    {
      fetchPolicy: "no-cache",
    }
  );

  const { data: personalEventsData, loading: personalEventsLoading } = useQuery(
    getAllPersonalEventsQuery,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (location.pathname.includes("/availability/timepreference")) {
      animateScroll.scrollToTop({ containerId: "time_page" });
    }
  }, [location.pathname]);

  const alreadyBookedAppointments = appointmentsData
    ? appointmentsData.all_appointments.filter(
        (item) =>
          item.date === reformattedDay &&
          item.esthetician === selectedEsthetician
      )
    : null;

  const blockedTimeForPersonalEvent = personalEventsData
    ? personalEventsData.all_personal_events.filter(
        (item) =>
          moment(item.date, "L").format("MMMM D, YYYY") === reformattedDay &&
          item.staff.split(" ")[0] + " " + item.staff.split(" ")[1][0] + "." ===
            selectedEsthetician &&
          item.blockTime
      )
    : null;

  const alreadyBookedTimes = useCallback(() => {
    const alreadyBookedTimesArr = [];
    let minutesArr = ["00", "15", "30", "45"];

    if (alreadyBookedAppointments !== null) {
      for (let i = 0; i < alreadyBookedAppointments.length; i++) {
        if (alreadyBookedAppointments) {
          const startMinutes = Number(
            alreadyBookedAppointments[i].startTime.slice(-2)
          );
          const minutes =
            startMinutes +
            Math.ceil(alreadyBookedAppointments[i].duration / 15) * 15;

          const currentDurationMinutes =
            totalDuration - Math.floor(totalDuration / 60) * 60 > 30
              ? Math.ceil(totalDuration / 15) * 15
              : Math.floor(totalDuration / 15) * 15;

          const currentDurationEndHour = Math.ceil(currentDurationMinutes / 60);

          const endHour = (
            Number(alreadyBookedAppointments[i].startTime.split(":")[0]) +
            Number((minutes / 60).toString().slice(0, 1))
          ).toString();

          const endMinutes =
            (minutes / 60).toString().length > 1
              ? (
                  Number((minutes / 60).toString().slice(1, minutes.length)) *
                  60
                ).toString()
              : "00";

          const calendarEndTime =
            (Number(endHour) > 12
              ? (Number(endHour) - 12).toString()
              : endHour) +
            ":" +
            endMinutes;

          const intervalArr = new Array(
            Math.ceil(
              Math.ceil(alreadyBookedAppointments[i].duration / 15) /
                minutesArr.length
            )
          )
            .fill(minutesArr)
            .reduce(
              (accumulator, currentValue) => accumulator.concat(currentValue),
              []
            );

          const hourArr = [];

          for (
            let j =
              Number(alreadyBookedAppointments[i].startTime.split(":")[0]) -
              currentDurationEndHour;
            j < Number(endHour) + 1;
            j++
          ) {
            if (j > 12) {
              hourArr.push(j - 12);
            } else {
              hourArr.push(j);
            }
          }

          const quadrupleHourArr = hourArr
            .map((e) => {
              return [
                e.toString() + ":" + intervalArr[0],
                e.toString() + ":" + intervalArr[1],
                e.toString() + ":" + intervalArr[2],
                e.toString() + ":" + intervalArr[3],
              ];
            })
            .reduce(
              (accumulator, currentValue) => accumulator.concat(currentValue),
              []
            );

          const startSliceBasedOnDuration = Number.isInteger(totalDuration / 15)
            ? // Rounds available apppointment time up if total duration is divisibile by 15
              (Number(alreadyBookedAppointments[i].startTime.split(":")[0]) *
                60 +
                Number(alreadyBookedAppointments[i].startTime.split(":")[1]) -
                totalDuration) /
              60
            : // Rounds available apppointment time down if total duration is not divisibile by 15
              Math.floor(
                (Number(alreadyBookedAppointments[i].startTime.split(":")[0]) *
                  60 +
                  (Number(
                    alreadyBookedAppointments[i].startTime.split(":")[1]
                  ) -
                    totalDuration)) /
                  60 /
                  0.25
              ) * 0.25;

          const endSliceBasedOnDuration = () => {
            let emptyArr = [];

            emptyArr.push(startSliceBasedOnDuration.toString().split(".")[1]);
            emptyArr.unshift(".");
            emptyArr = (Number(emptyArr.join("")) * 60).toString();
            return emptyArr;
          };

          alreadyBookedTimesArr.push(
            alreadyBookedAppointments[i].startTime,
            quadrupleHourArr
              .slice(
                quadrupleHourArr.indexOf(
                  Number.isInteger(startSliceBasedOnDuration)
                    ? startSliceBasedOnDuration.toString() + ":00"
                    : startSliceBasedOnDuration.toString().split(".")[0] +
                        ":" +
                        endSliceBasedOnDuration()
                ),
                quadrupleHourArr.length -
                  (Number(
                    alreadyBookedAppointments[i].endTime.split(":")[1]
                  ) === 30 ||
                  Number(alreadyBookedAppointments[i].endTime.split(":")[1]) ===
                    35 ||
                  Number(alreadyBookedAppointments[i].endTime.split(":")[1]) ===
                    40 ||
                  Number(alreadyBookedAppointments[i].endTime.split(":")[1]) ===
                    45
                    ? 0
                    : 4 -
                      minutesArr.indexOf(
                        Math.floor(
                          (Number(
                            alreadyBookedAppointments[i].endTime.split(":")[1]
                          ) +
                            25) /
                            15
                        ) *
                          15 >
                          60
                          ? (
                              Math.floor(
                                (Number(
                                  alreadyBookedAppointments[i].endTime.split(
                                    ":"
                                  )[1]
                                ) +
                                  25) /
                                  15
                              ) *
                                15 -
                              60
                            ).toString()
                          : (
                              Math.floor(
                                (Number(
                                  alreadyBookedAppointments[i].endTime.split(
                                    ":"
                                  )[1]
                                ) +
                                  25) /
                                  15
                              ) * 15
                            ).toString()
                      ))
              )
              .sort(),
            calendarEndTime
          );
        } else {
          return null;
        }
      }
      changeBookedTimes(
        alreadyBookedTimesArr.reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue),
          []
        )
      );
    }
  }, [alreadyBookedAppointments, totalDuration]);

  const blockPersonalEventTimes = useCallback(() => {
    const blockedTimeArr = [];

    if (blockedTimeForPersonalEvent !== null) {
      for (let i = 0; i < blockedTimeForPersonalEvent.length; i++) {
        const allDay = blockedTimeForPersonalEvent[i].allDay;

        let start = "";
        let end = "";

        if (!allDay) {
          start = moment(blockedTimeForPersonalEvent[i].startTime, "h:mm A");
          end = moment(blockedTimeForPersonalEvent[i].endTime, "h:mm A");
        } else {
          start = moment("12:00 AM", "h:mm A");
          end = moment("11:30 PM", "h:mm A");
        }

        let current = moment(start);

        while (current <= end) {
          blockedTimeArr.push(current.format("h:mm"));
          current.add(15, "minutes");
        }

        if (bookedTimes) {
          changeBookedTimes(bookedTimes.concat(blockedTimeArr));
        } else {
          changeBookedTimes(blockedTimeArr);
        }
      }
    }
  }, [blockedTimeForPersonalEvent, bookedTimes]);

  useEffect(() => {
    if (!appointmentsLoading && !personalEventsLoading) {
      if (!checkedForBlockedTimes) {
        alreadyBookedTimes();
        blockPersonalEventTimes();

        changeCheckedForBlockedTimes(true);
      }
    }
  }, [
    checkedForBlockedTimes,
    appointmentsLoading,
    personalEventsLoading,
    alreadyBookedTimes,
    blockPersonalEventTimes,
  ]);

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    } else if (!props.currentScreenSize) {
      if (props.initialScreenSize >= 1200) {
        return <Redirect to="/" />;
      }
    } else if (props.currentScreenSize >= 1200) {
      return <Redirect to="/" />;
    }
  };

  const daysOfTheWeekArr = [
    { Mon: "Monday" },
    { Tue: "Tuesday" },
    { Wed: "Wednesday" },
    { Thu: "Thursday" },
    { Fri: "Friday" },
    { Sat: "Saturday" },
    { Sun: "Sunday" },
  ];

  const getFullDayOfTheWeek = useCallback(() => {
    if (selectedDay) {
      const dayThreeLetters = selectedDay.toString().slice(0, 3);

      let fullDayName = "";

      for (let i = 0; i < daysOfTheWeekArr.length; i++) {
        if (daysOfTheWeekArr[i][dayThreeLetters]) {
          fullDayName = daysOfTheWeekArr[i][dayThreeLetters];
        }
      }

      return fullDayName;
    }
  }, [daysOfTheWeekArr, selectedDay]);

  useEffect(() => {
    if (!dayOfTheWeek) {
      dispatch(ACTION_DAY_OF_THE_WEEK(getFullDayOfTheWeek()));
    }
  }, [dayOfTheWeek, dispatch, getFullDayOfTheWeek]);

  const handleMorningCollapse = () => {
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    } else {
      dispatch(ACTION_MORNING_OPEN());
    }
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    }
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    }
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    }
  };

  const handleAfternoonCollapse = () => {
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    } else {
      dispatch(ACTION_AFTERNOON_OPEN());
    }
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    }
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    }
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    }
  };

  const handleLateAfternoonCollapse = () => {
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    } else {
      dispatch(ACTION_LATE_AFTERNOON_OPEN());
    }
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    }
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    }
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    }
  };

  const handleEveningCollapse = () => {
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    } else {
      dispatch(ACTION_EVENING_OPEN());
    }
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    }
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    }
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    }
  };

  const handleContinueCheckoutButtonClick = () => {
    dispatch(ACTION_CONTINUE_BUTTON_ACTIVE());
    dispatch(ACTION_DAY_OF_THE_WEEK(dayOfTheWeek));
  };

  const fifteenMinuteIntervals = ["00", "15", "30", "45"];
  const morningTimesArr = [];

  const createMorningTimeInstances = () => {
    let hours = [];
    let minutes = fifteenMinuteIntervals.concat(fifteenMinuteIntervals);

    for (let i = 10; i < 12; i++) {
      hours.push(i);
    }

    const multipleHours = hours
      .map((e) => [e, e, e, e])
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 0; i < multipleHours.length; i++) {
      morningTimesArr.push(
        multipleHours[i].toString() + ":" + minutes[i].toString()
      );
    }
  };

  createMorningTimeInstances();

  const afternoonTimesArr = [];

  const createAfternoonTimeInstances = () => {
    let hours = [];
    let minutes = new Array(20)
      .fill(fifteenMinuteIntervals)
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 12; i < 17; i++) {
      hours.push(i);
    }

    const multipleHours = hours
      .map((e) => (e > 12 ? [e - 12, e - 12, e - 12, e - 12] : [e, e, e, e]))
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 0; i < multipleHours.length; i++) {
      afternoonTimesArr.push(
        multipleHours[i].toString() + ":" + minutes[i].toString()
      );
    }
  };

  createAfternoonTimeInstances();

  let lateAfternoonTimesArr = afternoonTimesArr.splice(12, 10);

  const eveningTimesArr = [];

  const createEveningTimeInstances = () => {
    let hours = [];
    let minutes = new Array(dayOfTheWeek === "Sunday" ? 5 : 12)
      .fill(fifteenMinuteIntervals)
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 17; i < (dayOfTheWeek === "Sunday" ? 19 : 20); i++) {
      hours.push(i);
    }

    const multipleHours = hours
      .map((e) => [e - 12, e - 12, e - 12, e - 12])
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 0; i < multipleHours.length; i++) {
      eveningTimesArr.push(
        multipleHours[i].toString() + ":" + minutes[i].toString()
      );
    }
  };

  createEveningTimeInstances();

  const handleTimeClick = (e) => {
    let renderedTime = "";

    // Required for button border click to trigger selected time on mobile
    if (e.target.lastChild.innerText) {
      renderedTime = e.target.lastChild.innerText;
    } else {
      renderedTime = e.target.innerText;
    }

    dispatch(ACTION_SELECTED_TIME(renderedTime));
    if (selectedTime === renderedTime) {
      dispatch(ACTION_SELECTED_TIME_RESET());
      dispatch(ACTION_CONTINUE_BUTTON_RESET());
      if (firstName) {
        dispatch(ACTION_FIRST_NAME_RESET());
      }
      if (lastName) {
        dispatch(ACTION_LAST_NAME_RESET());
      }
      if (email) {
        dispatch(ACTION_EMAIL_RESET());
      }
      if (emailIsInvalid) {
        dispatch(ACTION_EMAIL_NOT_INVALID());
      }
      if (emailIsValid) {
        dispatch(ACTION_EMAIL_NOT_VALID());
      }
      if (phoneNumber) {
        dispatch(ACTION_PHONE_NUMBER_RESET());
      }
      if (phoneIsInvalid) {
        dispatch(ACTION_PHONE_NOT_INVALID());
      }
      if (phoneIsValid) {
        dispatch(ACTION_PHONE_NOT_VALID());
      }
      if (appointmentNotes) {
        dispatch(ACTION_APPOINTMENT_NOTES_RESET());
      }
    }
  };

  useEffect(() => {
    const treatmentDurationArr = treatmentsArr.map((item) => item.duration);
    const addOnsDurationArr = addOnsArr.map((item) => item.duration);
    const totalDurationArr = treatmentDurationArr.concat(addOnsDurationArr);

    let totalDurationValue;
    totalDurationArr[0] === undefined
      ? (totalDurationValue = null)
      : (totalDurationValue = totalDurationArr.reduce((a, b) => a + b));

    if (totalDuration !== totalDurationValue) {
      dispatch(ACTION_TOTAL_DURATION(totalDurationValue));
    }
  }, [addOnsArr, dispatch, treatmentsArr, totalDuration]);

  useEffect(() => {
    if (selectedTime) {
      let endTotalTime = "";
      let endMinutes =
        Number(
          selectedTime.slice(selectedTime.length - 2, selectedTime.length)
        ) + totalDuration;
      let endHours = Number(selectedTime.slice(0, selectedTime.indexOf(":")));

      if (endMinutes >= 240) {
        endMinutes -= 240;
        endHours += 4;
      } else {
        if (endMinutes >= 180) {
          endMinutes -= 180;
          endHours += 3;
        } else {
          if (endMinutes >= 120) {
            endMinutes -= 120;
            endHours += 2;
          } else {
            if (endMinutes >= 60) {
              endMinutes -= 60;
              endHours += 1;
            }
          }
        }
      }

      if (endHours > 12) {
        endHours -= 12;
      }

      endMinutes = endMinutes.toString().split("");
      if (endMinutes.toString().length < 2) {
        endMinutes.splice(0, 0, "0");
      }

      endTotalTime = endHours.toString() + ":" + endMinutes.join("");

      dispatch(ACTION_APPOINTMENT_END_TIME(endTotalTime));
    }
  }, [selectedTime, totalDuration, dispatch]);

  return (
    <div className="select_time_container" id="time_page">
      {redirectToHome()}
      <div className="select_time_container_header">
        <Link
          to={() => {
            if (!props.currentScreenSize) {
              if (props.initialScreenSize >= 1200) {
                return "/";
              } else {
                return "/availability";
              }
            } else {
              if (props.currentScreenSize >= 1200) {
                return "/";
              } else {
                return "/availability";
              }
            }
          }}
        >
          <FontAwesomeIcon
            className="select_time_back_arrow"
            icon={faChevronLeft}
            onClick={() => {
              dispatch(ACTION_AVAILABILITY_PAGE_OPENED());
              dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET);
            }}
          />
        </Link>
        <h1>AVAILABILITY</h1>
        <Link
          to={() => {
            if (!props.currentScreenSize) {
              if (props.initialScreenSize >= 1200) {
                return "/";
              } else {
                if (userAuthenticated) {
                  return "/paymentinfo";
                } else {
                  return "/checkout";
                }
              }
            } else {
              if (props.currentScreenSize >= 1200) {
                return "/";
              } else {
                if (userAuthenticated) {
                  return "/paymentinfo";
                } else {
                  return "/checkout";
                }
              }
            }
          }}
          onClick={() => {
            if (userAuthenticated) {
              dispatch(ACTION_PAYMENT_INFO_PAGE_OPENED());
            } else {
              dispatch(ACTION_GUEST_CHECKOUT_FORM_PAGE_OPENED());
            }
          }}
        >
          <FontAwesomeIcon
            className="select_time_forward_arrow"
            style={{ display: continueToCheckoutButton ? "block" : "none" }}
            icon={faChevronRight}
          />
        </Link>
      </div>
      <div className="select_a_time_header">
        <h2>
          SELECT A TIME
          {saltCaveInCart
            ? null
            : selectedEsthetician
            ? " WITH " +
              selectedEsthetician.split(" ")[0].toUpperCase() +
              " " +
              selectedEsthetician.split(" ")[1][0].toUpperCase() +
              "."
            : null}
        </h2>
      </div>
      <p className="time_statement">
        Choose a time for your appointment on {getFullDayOfTheWeek()},{" "}
        {reformattedDay}.
      </p>
      <div className="time_of_day_selectors_wrapper">
        <div className="time_of_day_card_container">
          <div className="time_of_day_card_top_wrapping">
            <div className="time_of_day_heading">
              <p>Morning</p>
            </div>
            <p
              className="time_of_day_card_show_more"
              onClick={handleMorningCollapse}
            >
              Show {morningCollapseIsOpen ? "Less" : "Times"}
            </p>
          </div>
          <Collapse isOpen={morningCollapseIsOpen}>
            <div className="inner_times_wrapper">
              {morningTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  onMouseOver={() => {
                    if (!props.currentScreenSize) {
                      if (props.initialScreenSize >= 1200) {
                        changeIndividualItemHovered({
                          arr: "morningTimesArr",
                          index: i,
                        });
                      }
                    } else {
                      if (props.currentScreenSize >= 1200) {
                        changeIndividualItemHovered({
                          arr: "morningTimesArr",
                          index: i,
                        });
                      }
                    }
                  }}
                  onMouseOut={() => {
                    if (individualItemHovered !== "") {
                      changeIndividualItemHovered("");
                    }
                  }}
                  style={{
                    background: bookedTimes
                      ? item === selectedTime
                        ? "rgb(44, 44, 52)"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "#f0f0f0"
                        : individualItemHovered.arr === "morningTimesArr" &&
                          individualItemHovered.index === i
                        ? "rgba(0, 129, 177, 0.4)"
                        : "rgb(255, 255, 255)"
                      : "rgb(255, 255, 255)",
                    color: bookedTimes
                      ? item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "rgb(201, 201, 201)"
                        : "rgb(0, 0, 0)"
                      : "rgb(0, 0, 0)",
                    border: bookedTimes
                      ? item === selectedTime
                        ? "2px solid transparent"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "rgb(201, 201, 201)"
                        : individualItemHovered.arr === "morningTimesArr" &&
                          individualItemHovered.index === i
                        ? "2px solid rgba(0, 129, 177, 0.4)"
                        : "2px solid rgb(0, 0, 0)"
                      : "2px solid rgb(0, 0, 0)",
                    pointerEvents: bookedTimes
                      ? bookedTimes.includes(item) ||
                        moment(
                          dayOfTheWeek +
                            ", " +
                            reformattedDay +
                            " " +
                            item +
                            " " +
                            (Number(item.split(":")[0]) >= 12 ||
                            Number(item.split(":")[0]) < 9
                              ? "PM"
                              : "AM"),
                          "LLLL"
                        )
                          .utc()
                          .subtract(12, "hours")
                          .valueOf() <=
                          moment()
                            .utc()
                            .valueOf()
                        ? "none"
                        : "auto"
                      : "auto",
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        <div className="time_of_day_card_container">
          <div className="time_of_day_card_top_wrapping">
            <div className="time_of_day_heading">
              <p>Afternoon</p>
            </div>
            <p
              className="time_of_day_card_show_more"
              onClick={handleAfternoonCollapse}
            >
              Show {afternoonCollapseIsOpen ? "Less" : "Times"}
            </p>
          </div>
          <Collapse isOpen={afternoonCollapseIsOpen}>
            <div className="inner_times_wrapper">
              {afternoonTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  onMouseOver={() => {
                    if (!props.currentScreenSize) {
                      if (props.initialScreenSize >= 1200) {
                        changeIndividualItemHovered({
                          arr: "afternoonTimesArr",
                          index: i,
                        });
                      }
                    } else {
                      if (props.currentScreenSize >= 1200) {
                        changeIndividualItemHovered({
                          arr: "afternoonTimesArr",
                          index: i,
                        });
                      }
                    }
                  }}
                  onMouseOut={() => {
                    if (individualItemHovered !== "") {
                      changeIndividualItemHovered("");
                    }
                  }}
                  style={{
                    background: bookedTimes
                      ? item === selectedTime
                        ? "rgb(44, 44, 52)"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "#f0f0f0"
                        : individualItemHovered.arr === "afternoonTimesArr" &&
                          individualItemHovered.index === i
                        ? "rgba(0, 129, 177, 0.4)"
                        : "rgb(255, 255, 255)"
                      : "rgb(255, 255, 255)",
                    color: bookedTimes
                      ? item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "rgb(201, 201, 201)"
                        : "rgb(0, 0, 0)"
                      : "rgb(0, 0, 0)",
                    border: bookedTimes
                      ? item === selectedTime
                        ? "2px solid transparent"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "rgb(201, 201, 201)"
                        : individualItemHovered.arr === "afternoonTimesArr" &&
                          individualItemHovered.index === i
                        ? "2px solid rgba(0, 129, 177, 0.4)"
                        : "2px solid rgb(0, 0, 0)"
                      : "2px solid rgb(0, 0, 0)",
                    pointerEvents: bookedTimes
                      ? bookedTimes.includes(item) ||
                        moment(
                          dayOfTheWeek +
                            ", " +
                            reformattedDay +
                            " " +
                            item +
                            " " +
                            (Number(item.split(":")[0]) >= 12 ||
                            Number(item.split(":")[0]) < 9
                              ? "PM"
                              : "AM"),
                          "LLLL"
                        )
                          .utc()
                          .subtract(12, "hours")
                          .valueOf() <=
                          moment()
                            .utc()
                            .valueOf()
                        ? "none"
                        : "auto"
                      : "auto",
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        <div className="time_of_day_card_container">
          <div className="time_of_day_card_top_wrapping">
            <div className="time_of_day_heading">
              <p>Late Afternoon</p>
            </div>
            <p
              className="time_of_day_card_show_more"
              onClick={handleLateAfternoonCollapse}
            >
              Show {lateAfternoonCollapseIsOpen ? "Less" : "Times"}
            </p>
          </div>
          <Collapse isOpen={lateAfternoonCollapseIsOpen}>
            <div className="inner_times_wrapper">
              {lateAfternoonTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  onMouseOver={() => {
                    if (!props.currentScreenSize) {
                      if (props.initialScreenSize >= 1200) {
                        changeIndividualItemHovered({
                          arr: "lateAfternoonTimesArr",
                          index: i,
                        });
                      }
                    } else {
                      if (props.currentScreenSize >= 1200) {
                        changeIndividualItemHovered({
                          arr: "lateAfternoonTimesArr",
                          index: i,
                        });
                      }
                    }
                  }}
                  onMouseOut={() => {
                    if (individualItemHovered !== "") {
                      changeIndividualItemHovered("");
                    }
                  }}
                  style={{
                    opacity:
                      dayOfTheWeek === "Friday"
                        ? parseInt(item[0], 10) > 3
                          ? 0
                          : 1
                        : 1,
                    pointerEvents: bookedTimes
                      ? dayOfTheWeek === "Friday"
                        ? parseInt(item[0], 10) > 3
                          ? "none"
                          : bookedTimes.includes(item) ||
                            moment(
                              dayOfTheWeek +
                                ", " +
                                reformattedDay +
                                " " +
                                item +
                                " " +
                                (Number(item.split(":")[0]) >= 12 ||
                                Number(item.split(":")[0]) < 9
                                  ? "PM"
                                  : "AM"),
                              "LLLL"
                            )
                              .utc()
                              .subtract(12, "hours")
                              .valueOf() <=
                              moment()
                                .utc()
                                .valueOf()
                          ? "none"
                          : "auto"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "none"
                        : "auto"
                      : "auto",
                    background: bookedTimes
                      ? item === selectedTime
                        ? "rgb(44, 44, 52)"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "#f0f0f0"
                        : individualItemHovered.arr ===
                            "lateAfternoonTimesArr" &&
                          individualItemHovered.index === i
                        ? "rgba(0, 129, 177, 0.4)"
                        : "rgb(255, 255, 255)"
                      : "rgb(255, 255, 255)",
                    color: bookedTimes
                      ? item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "rgb(201, 201, 201)"
                        : "rgb(0, 0, 0)"
                      : "rgb(0, 0, 0)",
                    border: bookedTimes
                      ? item === selectedTime
                        ? "2px solid transparent"
                        : bookedTimes.includes(item) ||
                          moment(
                            dayOfTheWeek +
                              ", " +
                              reformattedDay +
                              " " +
                              item +
                              " " +
                              (Number(item.split(":")[0]) >= 12 ||
                              Number(item.split(":")[0]) < 9
                                ? "PM"
                                : "AM"),
                            "LLLL"
                          )
                            .utc()
                            .subtract(12, "hours")
                            .valueOf() <=
                            moment()
                              .utc()
                              .valueOf()
                        ? "rgb(201, 201, 201)"
                        : individualItemHovered.arr ===
                            "lateAfternoonTimesArr" &&
                          individualItemHovered.index === i
                        ? "2px solid rgba(0, 129, 177, 0.4)"
                        : "2px solid rgb(0, 0, 0)"
                      : "2px solid rgb(0, 0, 0)",
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        {dayOfTheWeek === "Friday" ? null : (
          <div className="time_of_day_card_container">
            <div className="time_of_day_card_top_wrapping">
              <div className="time_of_day_heading">
                <p>Evening</p>
              </div>
              <p
                className="time_of_day_card_show_more"
                onClick={handleEveningCollapse}
              >
                Show {eveningCollapseIsOpen ? "Less" : "Times"}
              </p>
            </div>
            <Collapse isOpen={eveningCollapseIsOpen}>
              <div className="inner_times_wrapper">
                {eveningTimesArr.map((item, i) => (
                  <div
                    key={i}
                    className="individual_time_wrapper"
                    onClick={handleTimeClick}
                    onMouseOver={() => {
                      if (!props.currentScreenSize) {
                        if (props.initialScreenSize >= 1200) {
                          changeIndividualItemHovered({
                            arr: "eveningTimesArr",
                            index: i,
                          });
                        }
                      } else {
                        if (props.currentScreenSize >= 1200) {
                          changeIndividualItemHovered({
                            arr: "eveningTimesArr",
                            index: i,
                          });
                        }
                      }
                    }}
                    onMouseOut={() => {
                      if (individualItemHovered !== "") {
                        changeIndividualItemHovered("");
                      }
                    }}
                    style={{
                      opacity:
                        dayOfTheWeek === "Sunday"
                          ? parseInt(item[0], 10) > 5
                            ? 0
                            : 1
                          : 1,
                      pointerEvents: bookedTimes
                        ? dayOfTheWeek === "Sunday"
                          ? parseInt(item[0], 10) > 5
                            ? "none"
                            : bookedTimes.includes(item) ||
                              moment(
                                dayOfTheWeek +
                                  ", " +
                                  reformattedDay +
                                  " " +
                                  item +
                                  " " +
                                  (Number(item.split(":")[0]) >= 12 ||
                                  Number(item.split(":")[0]) < 9
                                    ? "PM"
                                    : "AM"),
                                "LLLL"
                              )
                                .utc()
                                .subtract(12, "hours")
                                .valueOf() <=
                                moment()
                                  .utc()
                                  .valueOf()
                            ? "none"
                            : "auto"
                          : bookedTimes.includes(item) ||
                            moment(
                              dayOfTheWeek +
                                ", " +
                                reformattedDay +
                                " " +
                                item +
                                " " +
                                (Number(item.split(":")[0]) >= 12 ||
                                Number(item.split(":")[0]) < 9
                                  ? "PM"
                                  : "AM"),
                              "LLLL"
                            )
                              .utc()
                              .subtract(12, "hours")
                              .valueOf() <=
                              moment()
                                .utc()
                                .valueOf()
                          ? "none"
                          : "auto"
                        : "auto",
                      background: bookedTimes
                        ? item === selectedTime
                          ? "rgb(44, 44, 52)"
                          : bookedTimes.includes(item) ||
                            moment(
                              dayOfTheWeek +
                                ", " +
                                reformattedDay +
                                " " +
                                item +
                                " " +
                                (Number(item.split(":")[0]) >= 12 ||
                                Number(item.split(":")[0]) < 9
                                  ? "PM"
                                  : "AM"),
                              "LLLL"
                            )
                              .utc()
                              .subtract(12, "hours")
                              .valueOf() <=
                              moment()
                                .utc()
                                .valueOf()
                          ? "#f0f0f0"
                          : individualItemHovered.arr === "eveningTimesArr" &&
                            individualItemHovered.index === i
                          ? "rgba(0, 129, 177, 0.4)"
                          : "rgb(255, 255, 255)"
                        : "rgb(255, 255, 255)",
                      color: bookedTimes
                        ? item === selectedTime
                          ? "rgb(255, 255, 255)"
                          : bookedTimes.includes(item) ||
                            moment(
                              dayOfTheWeek +
                                ", " +
                                reformattedDay +
                                " " +
                                item +
                                " " +
                                (Number(item.split(":")[0]) >= 12 ||
                                Number(item.split(":")[0]) < 9
                                  ? "PM"
                                  : "AM"),
                              "LLLL"
                            )
                              .utc()
                              .subtract(12, "hours")
                              .valueOf() <=
                              moment()
                                .utc()
                                .valueOf()
                          ? "rgb(201, 201, 201)"
                          : "rgb(0, 0, 0)"
                        : "rgb(0, 0, 0)",
                      border: bookedTimes
                        ? item === selectedTime
                          ? "2px solid transparent"
                          : bookedTimes.includes(item) ||
                            moment(
                              dayOfTheWeek +
                                ", " +
                                reformattedDay +
                                " " +
                                item +
                                " " +
                                (Number(item.split(":")[0]) >= 12 ||
                                Number(item.split(":")[0]) < 9
                                  ? "PM"
                                  : "AM"),
                              "LLLL"
                            )
                              .utc()
                              .subtract(12, "hours")
                              .valueOf() <=
                              moment()
                                .utc()
                                .valueOf()
                          ? "rgb(201, 201, 201)"
                          : individualItemHovered.arr === "eveningTimesArr" &&
                            individualItemHovered.index === i
                          ? "2px solid rgba(0, 129, 177, 0.4)"
                          : "2px solid rgb(0, 0, 0)"
                        : "2px solid rgb(0, 0, 0)",
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        )}
        <div
          className="time_preference_bottom_buttons_container"
          style={{
            paddingTop: "5vh",
            marginTop:
              dayOfTheWeek === "Sunday"
                ? eveningCollapseIsOpen
                  ? "-10vh"
                  : "0vh"
                : dayOfTheWeek === "Friday"
                ? lateAfternoonCollapseIsOpen
                  ? "-10vh"
                  : "0vh"
                : eveningCollapseIsOpen
                ? "-4vh"
                : "0vh",
            transition: "margin-top 0.4s ease, padding-top 0.4s ease",
          }}
        >
          <Link
            to={() => {
              if (!props.currentScreenSize) {
                if (props.initialScreenSize >= 1200) {
                  return "/";
                } else {
                  if (userAuthenticated) {
                    return "/paymentinfo";
                  } else {
                    return "/checkout";
                  }
                }
              } else {
                if (props.currentScreenSize >= 1200) {
                  return "/";
                } else {
                  if (userAuthenticated) {
                    return "/paymentinfo";
                  } else {
                    return "/checkout";
                  }
                }
              }
            }}
            style={{
              display: "block",
              pointerEvents: selectedTime !== "" ? "auto" : "none",
            }}
            onClick={handleContinueCheckoutButtonClick}
          >
            <div
              className="time_preference_continue_button"
              style={{
                background: selectedTime ? "rgb(44, 44, 52)" : "#f0f0f0",
                color: selectedTime
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
                transition: "background 0.5s ease, color 0.5s ease",
              }}
              onClick={() => {
                if (userAuthenticated) {
                  dispatch(ACTION_PAYMENT_INFO_PAGE_OPENED());
                } else {
                  dispatch(ACTION_GUEST_CHECKOUT_FORM_PAGE_OPENED());
                }
              }}
            >
              <p>Continue Checkout</p>
            </div>
          </Link>
          <Link
            to={() => {
              if (!props.currentScreenSize) {
                if (props.initialScreenSize >= 1200) {
                  return "/";
                } else {
                  return "/availability";
                }
              } else {
                if (props.currentScreenSize >= 1200) {
                  return "/";
                } else {
                  return "/availability";
                }
              }
            }}
          >
            <div
              className="change_date_button"
              onClick={() => dispatch(ACTION_AVAILABILITY_PAGE_OPENED())}
            >
              <p>Change Date</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimePreference;
