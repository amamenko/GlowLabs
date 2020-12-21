import React, { useEffect, useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ACTION_SELECTED_DAY from "../../../actions/SelectedDay/ACTION_SELECTED_DAY";
import ACTION_SELECTED_DAY_RESET from "../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECTED_TIME_RESET from "../../../actions/SelectedTime/ACTION_SELECTED_TIME_RESET";
import ACTION_SELECT_TIME_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_ACTIVE";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import ACTION_REFORMATTED_DAY from "../../../actions/SelectedDay/ReformattedDay/ACTION_REFORMATTED_DAY";
import ACTION_REFORMATTED_DAY_RESET from "../../../actions/SelectedDay/ReformattedDay/ACTION_REFORMATTED_DAY_RESET";
import ACTION_REFORMATTED_DAY_CLONE_RESET from "../../../actions/SelectedDay/ReformattedDayClone/ACTION_REFORMATTED_DAY_CLONE_RESET";
import ACTION_ALL_COLLAPSE_RESET from "../../../actions/SelectedTime/CollapseIsOpen/ACTION_ALL_COLLAPSE_RESET";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./Availability.css";
import ACTION_CART_PAGE_OPENED from "../../../actions/InCart/CartPageOpened/ACTION_CART_PAGE_OPENED";
import ACTION_TIME_PREFERENCE_PAGE_OPENED from "../../../actions/InCart/CartPageOpened/ACTION_TIME_PREFERENCE_PAGE_OPENED";
import ACTION_SELECTED_ESTHETICIAN from "../../../actions/SelectedEsthetician/ACTION_SELECTED_ESTHETICIAN";
import ACTION_DAY_OF_THE_WEEK_RESET from "../../../actions/SelectedDay/DayOfTheWeek/ACTION_DAY_OF_THE_WEEK_RESET";
import { animateScroll } from "react-scroll";

const Availability = (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const [numberOfWeeks, changeNumberOfWeeks] = useState(null);

  const selectedDay = useSelector((state) => state.selectedDay.selectedDay);
  const selectTimeActive = useSelector(
    (state) => state.selectTimeActive.selectTimeActive
  );
  const selectedTime = useSelector((state) => state.selectedTime.selectedTime);
  const reformattedDay = useSelector(
    (state) => state.reformattedDay.reformattedDay
  );
  const reformattedDayClone = useSelector(
    (state) => state.reformattedDayClone.reformattedDayClone
  );
  const continueToCheckoutButton = useSelector(
    (state) => state.continueToCheckoutButton.continueButtonActive
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const selectedEsthetician = useSelector(
    (state) => state.selectedEsthetician.selectedEsthetician
  );
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

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

  const monthsArr = [
    { Jan: "January" },
    { Feb: "February" },
    { Mar: "March" },
    { Apr: "April" },
    { May: "May" },
    { Jun: "June" },
    { Jul: "July" },
    { Aug: "August" },
    { Sep: "September" },
    { Oct: "October" },
    { Nov: "November" },
    { Dec: "December" },
  ];

  let reformattedDate = "";

  const formatDate = () => {
    if (selectedDay) {
      const dateString = selectedDay.toString().slice(4, 15);
      const monthThreeLetters = dateString.slice(0, 3);
      let monthAllLetters = "";

      for (let i = 0; i < monthsArr.length; i++) {
        if (monthsArr[i][monthThreeLetters]) {
          monthAllLetters = monthsArr[i][monthThreeLetters];
        }
      }

      let dayAndYear = "";

      if (dateString[4] === "0") {
        dayAndYear = dateString
          .slice(5, 6)
          .concat(", ", dateString.slice(7, 11));
      } else {
        dayAndYear = dateString
          .slice(4, 6)
          .concat(", ", dateString.slice(7, 11));
      }

      reformattedDate = monthAllLetters.concat(" ", dayAndYear);
      dispatch(ACTION_REFORMATTED_DAY(reformattedDate));
    }
  };

  // Keeps user-selected date marker viewable even when traversing to other routes
  useEffect(() => {
    for (let i = 0; i < document.getElementsByTagName("ABBR").length; i++) {
      if (
        document.getElementsByTagName("ABBR")[i].attributes[0].nodeValue ===
        reformattedDay
      ) {
        if (selectedDay) {
          document
            .getElementsByTagName("ABBR")
            [i].parentElement.classList.add(
              "react-calendar__tile--active",
              "react-calendar__tile--rangeStart",
              "react-calendar__tile--rangeEnd",
              "react-calendar__tile--rangeBothEnds"
            );
        } else {
          document
            .getElementsByTagName("ABBR")
            [i].parentElement.classList.remove(
              "react-calendar__tile--active",
              "react-calendar__tile--rangeStart",
              "react-calendar__tile--rangeEnd",
              "react-calendar__tile--rangeBothEnds"
            );
        }
      }
    }
  }, [reformattedDay, selectedDay]);

  formatDate();

  useEffect(() => {
    if (location.pathname.includes("availability")) {
      animateScroll.scrollToTop({ containerId: "date_page", offset: -500 });
    }
  }, [location.pathname]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const sixtyDaysFromNow = new Date(today);
  sixtyDaysFromNow.setDate(sixtyDaysFromNow.getDate() + 60);

  const dayOfTheWeek = today.getDay();
  const hourOfTheDay = today.getHours();

  const handleMinDate = () => {
    if (dayOfTheWeek === 0) {
      if (hourOfTheDay > 5) {
        return new Date(tomorrow);
      } else {
        return new Date(today);
      }
    } else if (dayOfTheWeek === 1) {
      return new Date(tomorrow);
    } else if (
      (dayOfTheWeek === 2) |
      (dayOfTheWeek === 3) |
      (dayOfTheWeek === 4)
    ) {
      if (hourOfTheDay > 7) {
        return new Date(tomorrow);
      } else {
        return new Date(today);
      }
    } else if (dayOfTheWeek === 5) {
      if (hourOfTheDay > 3) {
        return new Date(dayAfterTomorrow);
      } else {
        return new Date(today);
      }
    } else {
      return new Date(tomorrow);
    }
  };

  const weekNumberValues = document.getElementsByClassName(
    "react-calendar__month-view__weekNumbers"
  );

  useEffect(() => {
    changeNumberOfWeeks(weekNumberValues[0].childElementCount);
  }, [numberOfWeeks, weekNumberValues]);

  // Selects new date while preventing two markers from being active at the same time
  const handleValueClick = (day) => {
    if (reformattedDay === reformattedDayClone) {
      dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET());
      dispatch(ACTION_ALL_COLLAPSE_RESET());
      for (let i = 0; i < document.getElementsByTagName("ABBR").length; i++) {
        document
          .getElementsByTagName("ABBR")
          [i].parentElement.classList.remove(
            "react-calendar__tile--active",
            "react-calendar__tile--rangeStart",
            "react-calendar__tile--rangeEnd",
            "react-calendar__tile--rangeBothEnds"
          );
      }
      if (selectedTime) {
        dispatch(ACTION_SELECTED_TIME_RESET());
      }
      if (continueToCheckoutButton) {
        dispatch(ACTION_CONTINUE_BUTTON_RESET());
      }
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
    if (selectedDay.toString() !== day.toString()) {
      dispatch(ACTION_SELECTED_DAY(day));
      dispatch(ACTION_ALL_COLLAPSE_RESET());
      if (selectedDay === "") {
        for (let i = 0; i < document.getElementsByTagName("ABBR").length; i++) {
          if (
            document.getElementsByTagName("ABBR")[i].attributes[0].nodeValue ===
            reformattedDay
          ) {
            document
              .getElementsByTagName("ABBR")
              [i].parentElement.classList.add(
                "react-calendar__tile--active",
                "react-calendar__tile--rangeStart",
                "react-calendar__tile--rangeEnd",
                "react-calendar__tile--rangeBothEnds"
              );
          }
        }
        if (selectedTime) {
          dispatch(ACTION_SELECTED_TIME_RESET());
        }
        if (continueToCheckoutButton) {
          dispatch(ACTION_CONTINUE_BUTTON_RESET());
        }
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
      } else {
        dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
        for (let i = 0; i < document.getElementsByTagName("ABBR").length; i++) {
          dispatch(ACTION_REFORMATTED_DAY_RESET());
          document
            .getElementsByTagName("ABBR")
            [i].parentElement.classList.remove(
              "react-calendar__tile--active",
              "react-calendar__tile--rangeStart",
              "react-calendar__tile--rangeEnd",
              "react-calendar__tile--rangeBothEnds"
            );
        }
        if (selectedTime) {
          dispatch(ACTION_SELECTED_TIME_RESET());
        }
        if (continueToCheckoutButton) {
          dispatch(ACTION_CONTINUE_BUTTON_RESET());
        }
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
    } else {
      dispatch(ACTION_SELECTED_DAY_RESET());
      dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
      dispatch(ACTION_ALL_COLLAPSE_RESET());
      for (let i = 0; i < document.getElementsByTagName("ABBR").length; i++) {
        document
          .getElementsByTagName("ABBR")
          [i].parentElement.classList.remove(
            "react-calendar__tile--active",
            "react-calendar__tile--rangeStart",
            "react-calendar__tile--rangeEnd",
            "react-calendar__tile--rangeBothEnds"
          );
      }
      if (selectedTime) {
        dispatch(ACTION_SELECTED_TIME_RESET());
      }
      if (continueToCheckoutButton) {
        dispatch(ACTION_CONTINUE_BUTTON_RESET());
      }
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

  const handleActiveMonthChange = () => {
    changeNumberOfWeeks(weekNumberValues[0].childElementCount);
    for (let i = 0; i < document.getElementsByTagName("ABBR").length; i++) {
      if (selectedDay !== "") {
        if (
          document.getElementsByTagName("ABBR")[i].attributes[0].nodeValue ===
          reformattedDay
        ) {
          document
            .getElementsByTagName("ABBR")
            [i].parentElement.classList.add(
              "react-calendar__tile--active",
              "react-calendar__tile--rangeStart",
              "react-calendar__tile--rangeEnd",
              "react-calendar__tile--rangeBothEnds"
            );
        }
      } else {
        dispatch(ACTION_REFORMATTED_DAY_RESET());
        document
          .getElementsByTagName("ABBR")
          [i].parentElement.classList.remove(
            "react-calendar__tile--active",
            "react-calendar__tile--rangeStart",
            "react-calendar__tile--rangeEnd",
            "react-calendar__tile--rangeBothEnds"
          );
      }
    }
  };

  const handleSelectTimeButtonClick = () => {
    if (selectedDay !== "") {
      dispatch(ACTION_SELECT_TIME_ACTIVE());
      dispatch(ACTION_TIME_PREFERENCE_PAGE_OPENED());
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!selectedEsthetician) {
      if (props.getEmployeesData) {
        if (props.getEmployeesData.employees) {
          const filteredEmployeesArr = props.getEmployeesData.employees.filter(
            (x) => {
              return x.employeeRole.includes("Esthetician");
            }
          );

          const randomEmployee =
            filteredEmployeesArr[
              Math.floor(Math.random() * (filteredEmployeesArr.length - 1))
            ];

          dispatch(
            ACTION_SELECTED_ESTHETICIAN(
              randomEmployee.firstName[0].toUpperCase() +
                randomEmployee.firstName.slice(1).toLowerCase() +
                " " +
                randomEmployee.lastName[0].toUpperCase() +
                randomEmployee.lastName.slice(1).toLowerCase()
            )
          );
        }
      }
    }
  });

  useEffect(() => {
    window.addEventListener("popstate", () => {
      if (document.location.href.includes("cart")) {
        dispatch(ACTION_CART_PAGE_OPENED());
      }
    });
  }, [dispatch]);

  return (
    <div className="availability_container" id="date_page">
      {redirectToHome()}
      <div className="availability_container_header">
        {!props.currentScreenSize ? (
          props.initialScreenSize >= 1200 ? (
            <div onClick={() => dispatch(ACTION_CART_PAGE_OPENED())}>
              <FontAwesomeIcon
                className="availability_back_arrow"
                icon={faChevronLeft}
              />
            </div>
          ) : (
            <Link
              to="/cart"
              onClick={() => dispatch(ACTION_CART_PAGE_OPENED())}
            >
              <FontAwesomeIcon
                className="availability_back_arrow"
                icon={faChevronLeft}
              />
            </Link>
          )
        ) : props.currentScreenSize >= 1200 ? (
          <div onClick={() => dispatch(ACTION_CART_PAGE_OPENED())}>
            <FontAwesomeIcon
              className="availability_back_arrow"
              icon={faChevronLeft}
            />
          </div>
        ) : (
          <Link to="/cart" onClick={() => dispatch(ACTION_CART_PAGE_OPENED())}>
            <FontAwesomeIcon
              className="availability_back_arrow"
              icon={faChevronLeft}
            />
          </Link>
        )}
        <h1>AVAILABILITY</h1>
        {!props.currentScreenSize ? (
          props.initialScreenSize >= 1200 ? (
            <div onClick={() => dispatch(ACTION_TIME_PREFERENCE_PAGE_OPENED())}>
              <FontAwesomeIcon
                className="availability_forward_arrow"
                icon={faChevronRight}
                style={{ display: selectTimeActive ? "block" : "none" }}
              />
            </div>
          ) : (
            <Link to={(location) => `${location.pathname}/timepreference`}>
              <FontAwesomeIcon
                className="availability_forward_arrow"
                style={{ display: selectTimeActive ? "block" : "none" }}
                icon={faChevronRight}
              />
            </Link>
          )
        ) : props.currentScreenSize >= 1200 ? (
          <div onClick={() => dispatch(ACTION_TIME_PREFERENCE_PAGE_OPENED())}>
            <FontAwesomeIcon
              className="availability_forward_arrow"
              icon={faChevronRight}
              style={{ display: selectTimeActive ? "block" : "none" }}
            />
          </div>
        ) : (
          <Link to={(location) => `${location.pathname}/timepreference`}>
            <FontAwesomeIcon
              className="availability_forward_arrow"
              style={{ display: selectTimeActive ? "block" : "none" }}
              icon={faChevronRight}
            />
          </Link>
        )}
      </div>
      <div className="select_a_date_header">
        <h2>
          SELECT A DATE
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
      <p className="availability_statement">
        You can schedule an appointment between 12 hours and 60 days ahead of
        time.
      </p>
      <Calendar
        calendarType="ISO 8601"
        activeStartDate={
          selectedDay
            ? selectedDay
            : reformattedDay
            ? new Date(reformattedDay)
            : today
        }
        minDate={handleMinDate()}
        maxDate={new Date(sixtyDaysFromNow)}
        maxDetail={"month"}
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        prevLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        next2Label={null}
        prev2Label={null}
        onActiveStartDateChange={() => handleActiveMonthChange()}
        showNeighboringMonth={false}
        showWeekNumbers={true}
        tileClassName="calendar_tiles"
        tileDisabled={({ date }) => date.getDay() === 6}
        onClickDay={(value) => handleValueClick(value)}
        onChange={() => {
          dispatch(ACTION_DAY_OF_THE_WEEK_RESET());
          dispatch(ACTION_REFORMATTED_DAY_RESET());
          dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET());
          dispatch(ACTION_ALL_COLLAPSE_RESET());
          dispatch(ACTION_CONTINUE_BUTTON_RESET());
          dispatch(ACTION_FIRST_NAME_RESET());
          dispatch(ACTION_LAST_NAME_RESET());
          dispatch(ACTION_EMAIL_RESET());
          dispatch(ACTION_PHONE_NUMBER_RESET());
          dispatch(ACTION_SELECTED_TIME_RESET());
        }}
      />
      <Link
        to={(location) => {
          if (!props.currentScreenSize) {
            if (props.initialScreenSize >= 1200) {
              return "/";
            } else {
              return `${location.pathname}/timepreference`;
            }
          } else {
            if (props.currentScreenSize >= 1200) {
              return "/";
            } else {
              return `${location.pathname}/timepreference`;
            }
          }
        }}
        style={{
          display: "block",
          pointerEvents: selectedDay !== "" ? "auto" : "none",
        }}
        onClick={handleSelectTimeButtonClick}
      >
        <div
          className="select_time_button"
          style={{
            marginTop: numberOfWeeks < 6 ? "4vh" : "2vh",
            marginBottom: numberOfWeeks < 6 ? "0" : "2vh",
            background: selectedDay ? "rgb(44, 44, 52)" : "#f0f0f0",
            color: selectedDay ? "rgb(255, 255, 255)" : "rgb(201, 201, 201)",
            pointerEvents: selectedDay !== "" ? "auto" : "none",
            transition: "background 0.5s ease, color 0.5s ease",
          }}
        >
          <p>Select a Time</p>
        </div>
      </Link>
    </div>
  );
};

export default Availability;
