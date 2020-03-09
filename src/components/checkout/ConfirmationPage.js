import React, { useEffect, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { addAppointmentMutation } from "../../graphql/queries/queries";
import { useSelector } from "react-redux";
import { Link, useLocation, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCalendar,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import "./ConfirmationPage.css";
import CalmSummaryCard from "./SummaryReviewCards/Treatments/CalmSummaryCard";
import BacialSummaryCard from "./SummaryReviewCards/Treatments/BacialSummaryCard";
import ClarifySummaryCard from "./SummaryReviewCards/Treatments/ClarifySummaryCard";
import DermaplaningSummaryCard from "./SummaryReviewCards/Treatments/DermaplaningSummaryCard";
import GlowSummaryCard from "./SummaryReviewCards/Treatments/GlowSummaryCard";
import QuenchSummaryCard from "./SummaryReviewCards/Treatments/QuenchSummaryCard";
import QuickieSummaryCard from "./SummaryReviewCards/Treatments/QuickieSummaryCard";
import ChemicalPeelSummaryCard from "./SummaryReviewCards/Treatments/ChemicalPeelSummaryCard";
import CBDSummaryCard from "./SummaryReviewCards/Treatments/CBDSummaryCard";
import MicroneedleSummaryCard from "./SummaryReviewCards/Treatments/MicroneedleSummaryCard";
import RejuvenateSummaryCard from "./SummaryReviewCards/Treatments/RejuvenateSummaryCard";
import ExtraExtractionsSummaryCard from "./SummaryReviewCards/AddOns/ExtraExtractionsCard";
import HydroJellyMaskSummaryCard from "./SummaryReviewCards/AddOns/HydroJellyMaskSummaryCard";
import LEDTherapySummaryCard from "./SummaryReviewCards/AddOns/LEDTherapySummaryCard";
import MicrocurrentSummaryCard from "./SummaryReviewCards/AddOns/MicrocurrentSummaryCard";
import MicrodermabrasionSummaryCard from "./SummaryReviewCards/AddOns/MicrodermabrasionSummaryCard";
import DermarollingSummaryCard from "./SummaryReviewCards/AddOns/DermarollingSummaryCard";
import NanoNeedlingSummaryCard from "./SummaryReviewCards/AddOns/NanoNeedlingSummaryCard";
import GuaShaSummaryCard from "./SummaryReviewCards/AddOns/GuaShaSummaryCard";
import BeardSummaryCard from "./SummaryReviewCards/AddOns/BeardSummaryCard";

const ConfirmationPage = () => {
  let location = useLocation();
  const counter = useSelector(state => state.counterReducer.counter);
  const reformattedDay = useSelector(
    state => state.reformattedDay.reformattedDay
  );
  const dayOfTheWeek = useSelector(state => state.dayOfTheWeek.dayOfTheWeek);
  const selectedTime = useSelector(state => state.selectedTime.selectedTime);
  const appointmentEndTime = useSelector(
    state => state.appointmentEndTime.end_time
  );
  const addOnsArr = useSelector(state => state.addOnsArr.add_ons_arr);
  const treatmentsArr = useSelector(
    state => state.treatmentsArr.treatments_arr
  );
  const totalPrice = useSelector(state => state.totalPrice.totalPrice);
  const totalDuration = useSelector(state => state.totalDuration.totalDuration);
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );
  const firstName = useSelector(state => state.firstName.first_name);
  const lastName = useSelector(state => state.lastName.last_name);
  const email = useSelector(state => state.email.email);
  const phoneNumber = useSelector(state => state.phoneNumber.phone_number);
  const appointmentNotes = useSelector(
    state => state.appointmentNotes.appointment_notes
  );

  const [addAppointment] = useMutation(addAppointmentMutation);

  const handleSubmitBooking = e => {
    e.preventDefault();
    const variablesModel = {
      date: reformattedDay,
      time: selectedTime,
      duration: totalDuration,
      price: totalPrice,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      notes: appointmentNotes
    };

    const treatmentsMap = () => {
      for (let i = 0; i < treatmentsArr.length; i++) {
        return treatmentsArr.map(item => ({
          treatment_name: item.name,
          treatment_duration: Number(item.duration),
          treatment_price: Number(item.price)
        }))[i];
      }
    };

    console.log(treatmentsMap());

    const addOnsMap = () => {
      for (let i = 0; i < addOnsArr.length; i++) {
        return addOnsArr.map(item => ({
          add_on_name: item.name,
          add_on_duration: Number(item.duration),
          add_on_price: Number(item.price)
        }))[i];
      }
    };

    console.log(addOnsMap());

    addAppointment({
      variables: { ...variablesModel, ...treatmentsMap(), ...addOnsMap() }
    });
  };

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const treatmentsSummaryCardComponentsArr = [
    { name: "Calm", component: <CalmSummaryCard /> },
    { name: "Bacial", component: <BacialSummaryCard /> },
    { name: "Clarify", component: <ClarifySummaryCard /> },
    { name: "Dermaplaning", component: <DermaplaningSummaryCard /> },
    { name: "Glow", component: <GlowSummaryCard /> },
    { name: "Quench", component: <QuenchSummaryCard /> },
    { name: "Quickie", component: <QuickieSummaryCard /> },
    { name: "ChemicalPeel", component: <ChemicalPeelSummaryCard /> },
    { name: "CBD", component: <CBDSummaryCard /> },
    { name: "Microneedle", component: <MicroneedleSummaryCard /> },
    { name: "Rejuvenate", component: <RejuvenateSummaryCard /> }
  ];

  const addOnsSummaryCardComponentsArr = [
    { name: "ExtraExtractions", component: <ExtraExtractionsSummaryCard /> },
    { name: "HydroJelly", component: <HydroJellyMaskSummaryCard /> },
    { name: "LED", component: <LEDTherapySummaryCard /> },
    { name: "Microcurrent", component: <MicrocurrentSummaryCard /> },
    { name: "Microdermabrasion", component: <MicrodermabrasionSummaryCard /> },
    { name: "Dermarolling", component: <DermarollingSummaryCard /> },
    { name: "NanoNeedling", component: <NanoNeedlingSummaryCard /> },
    { name: "GuaSha", component: <GuaShaSummaryCard /> },
    { name: "Beard", component: <BeardSummaryCard /> }
  ];

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const treatmentsComponentNames = treatmentsArr.map(item => item.name);

  const renderSummaryCardTreatments = () => {
    let componentsArr = [];
    for (let i = 0; i < treatmentsSummaryCardComponentsArr.length; i++) {
      if (
        treatmentsComponentNames.indexOf(
          treatmentsSummaryCardComponentsArr[i].name
        ) > -1
      ) {
        componentsArr.push(treatmentsSummaryCardComponentsArr[i].component);
      }
    }
    return componentsArr.map((item, index) => <div key={index}>{item}</div>);
  };

  const addOnsComponentNames = addOnsArr.map(item => item.name);

  const renderSummaryCardAddOns = () => {
    let componentsArr = [];
    for (let i = 0; i < addOnsSummaryCardComponentsArr.length; i++) {
      if (
        addOnsComponentNames.indexOf(addOnsSummaryCardComponentsArr[i].name) >
        -1
      ) {
        componentsArr.push(addOnsSummaryCardComponentsArr[i].component);
      }
    }
    return componentsArr.map((item, index) => <div key={index}>{item}</div>);
  };

  const renderSummaryCardAddOnSection = () => {
    if (addOnsArr.length >= 1) {
      return (
        <div className="summary_add_ons_container">
          <h2 className="summary_add_ons_container_title">
            My Add-On{addOnsArr.length > 1 ? "s" : null}
          </h2>
          {renderSummaryCardAddOns()}
        </div>
      );
    } else {
      return null;
    }
  };

  const formatTotalDurationHour = useCallback(() => {
    let firstDigit = (totalDuration / 60).toString().split("");
    firstDigit = firstDigit[0];

    if (firstDigit === "0") {
      return null;
    } else {
      return firstDigit;
    }
  }, [totalDuration]);

  const formatTotalDurationMinutes = useCallback(() => {
    let minutes = "";
    let hours = (totalDuration / 60).toString().split("");
    hours = Number(hours[0]) * 60;
    minutes = (totalDuration - hours).toString();

    if (minutes === "0") {
      return null;
    } else {
      return minutes;
    }
  }, [totalDuration]);

  return (
    <div className="confirmation_page_container">
      {redirectToHome()}
      <div className="confirmation_page_container_header">
        <Link to="/checkout">
          <FontAwesomeIcon
            className="confirmation_page_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>REVIEW DETAILS</h1>
      </div>
      <div className="confirmation_page_header">
        <h2>BOOKING SUMMARY</h2>
        <h3>{counter} treatments</h3>
      </div>
      <p className="confirmation_page_statement">
        Almost there! Please make sure that the following booking information is
        correct.
      </p>
      <div className="summary_selected_date_container">
        <FontAwesomeIcon className="summary_calendar_icon" icon={faCalendar} />
        <p>
          {dayOfTheWeek}, {reformattedDay}
        </p>
      </div>
      <div className="summary_selected_time_container">
        <FontAwesomeIcon className="summary_clock_icon" icon={faClock} />
        <p>
          {selectedTime}{" "}
          {Number(selectedTime.slice(0, 1)) > 1
            ? "PM"
            : Number(selectedTime.slice(0, 2)) < 12
            ? "AM"
            : "PM"}{" "}
          - {appointmentEndTime}{" "}
          {Number(appointmentEndTime.slice(0, 1)) > 1
            ? "PM"
            : Number(appointmentEndTime.slice(0, 2)) < 12
            ? "AM"
            : "PM"}{" "}
          ({formatTotalDurationHour()}
          {totalDuration / 60 >= 1 ? " " : null}
          {totalDuration / 60 >= 1
            ? totalDuration / 60 < 2
              ? "hour"
              : "hours"
            : null}
          {totalDuration / 60 >= 1
            ? Number.isInteger(totalDuration / 60)
              ? null
              : " "
            : null}
          {formatTotalDurationMinutes()}
          {Number.isInteger(totalDuration / 60) ? null : " "}
          {Number.isInteger(totalDuration / 60) ? null : "minutes"})
        </p>
      </div>
      <div className="summary_facial_container">
        <h2 className="summary_facial_container_title">My Facial</h2>
        {renderSummaryCardTreatments()}
      </div>
      {renderSummaryCardAddOnSection()}
      <div className="summary_card_subtotal_container">
        <p>TOTAL</p>
        <p>${totalPrice}</p>
      </div>
      <Link to="/checkout/confirmation">
        <div className="book_appointment_button" onClick={handleSubmitBooking}>
          <p>Book Appointment</p>
        </div>
      </Link>
    </div>
  );
};

export default ConfirmationPage;
