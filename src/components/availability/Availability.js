import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "./Availability.css";

const Availability = () => {
  let location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
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

  return (
    <div className="availability_container">
      <div className="availability_container_header">
        <Link to="/cart">
          <FontAwesomeIcon
            className="availability_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>AVAILABILITY</h1>
      </div>
      <div className="select_a_date_header">
        <h2>SELECT A DATE</h2>
      </div>
      <div style={{ width: "100vw", paddingLeft: "3vw", paddingTop: "0.8rem" }}>
        <Calendar
          calendarType="ISO 8601"
          minDate={handleMinDate()}
          maxDate={new Date(sixtyDaysFromNow)}
          maxDetail="month"
          next2Label={null}
          prev2Label={null}
          tileClassName="calendar_tiles"
          tileDisabled={({ date }) =>
            (date.getDay() === 1) | (date.getDay() === 6)
          }
        />
      </div>
    </div>
  );
};

export default Availability;
