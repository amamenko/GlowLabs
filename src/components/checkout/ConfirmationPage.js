import React, { useEffect, useCallback, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Transition } from "react-spring/renderprops";
import { css } from "emotion";
import { BounceLoader } from "react-spinners";
import Modal from "react-modal";
import { addAppointmentMutation } from "../../graphql/queries/queries";
import { useSelector, useDispatch } from "react-redux";
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
import ACTION_LOADING_SPINNER_ACTIVE from "../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_FINAL_BOOK_BUTTON_ACTIVE from "../../actions/FinalBookButton/ACTION_FINAL_BOOK_BUTTON_ACTIVE";

const ConfirmationPage = () => {
  let location = useLocation();
  const dispatch = useDispatch();
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
  const loadingSpinnerActive = useSelector(
    state => state.loadingSpinnerActive.loading_spinner
  );
  const finalBookButtonActive = useSelector(
    state => state.finalBookButton.final_book_button_active
  );
  const [finalBookingModalActive, changeFinalBookingModalActive] = useState(
    false
  );

  const [
    addAppointment,
    { loading: appLoading, error: appError, data }
  ] = useMutation(addAppointmentMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

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

  const handleSubmitBooking = e => {
    e.preventDefault();

    if (!finalBookButtonActive) {
      dispatch(ACTION_FINAL_BOOK_BUTTON_ACTIVE());
    }

    const treatmentsMap = () => {
      for (let i = 0; i < treatmentsArr.length; i++) {
        return treatmentsArr.map(item => ({
          treatment_name: item.name,
          treatment_duration: Number(item.duration),
          treatment_price: Number(item.price)
        }))[i];
      }
    };

    const addOnsMap = () => {
      return {
        addOns: addOnsArr
      };
    };

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

  const handleSpinner = useCallback(() => {
    if (appLoading) {
      if (!loadingSpinnerActive) {
        dispatch(ACTION_LOADING_SPINNER_ACTIVE());
      }
    } else {
      setTimeout(() => {
        dispatch(ACTION_LOADING_SPINNER_RESET());
        changeFinalBookingModalActive(true);
      }, 3000);
    }
  }, [appLoading, loadingSpinnerActive, dispatch]);

  handleSpinner();

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
      <Modal
        isOpen={finalBookButtonActive}
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
            background: "rgba(0, 0, 0, 0.5)"
          }
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(232, 210, 195)"}
          loading={loadingSpinnerActive}
        />
        <Transition
          items={finalBookingModalActive}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {finalBookingModalActive =>
            finalBookingModalActive ? (
              <div
                className="final_booking_modal"
                style={{
                  content: {
                    position: "fixed",
                    zIndex: "5",
                    height: "60%",
                    borderRadius: "none",
                    width: "80vw",
                    marginTop: "20vh",
                    marginRight: "10vw",
                    marginLeft: "10vw",
                    border: "2px solid transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }
                }}
              >
                <svg width="50" height="50" viewBox="0 0 13.229 13.229">
                  <path d="M1.637 12.36a.469.469 0 01-.263-.288c-.036-.131-.035-9.665 0-9.796a.484.484 0 01.287-.294c.058-.017.358-.027.814-.027h.721v-.264c0-.319.027-.423.142-.54.117-.12.214-.145.568-.145.284 0 .308.004.424.066.1.054.135.09.188.193.06.117.064.146.064.408v.282h4.156v-.264c0-.319.028-.423.142-.54.117-.12.214-.145.569-.145.284 0 .307.004.423.066.1.054.136.09.188.193.06.117.064.146.064.408v.282h.722c.455 0 .755.01.813.027a.484.484 0 01.287.294c.036.134.036 9.665 0 9.799a.484.484 0 01-.287.294c-.066.019-1.49.026-5.01.025-4.18 0-4.933-.006-5.012-.034zm9.873-4.117V4.565h-9.7v7.356h9.7zm0-4.983v-.83h-1.386v.282c0 .262-.005.29-.064.408a.366.366 0 01-.188.193c-.117.063-.138.066-.44.066-.304 0-.325-.004-.442-.066a.366.366 0 01-.187-.193c-.06-.117-.065-.146-.065-.408V2.43H4.582v.282c0 .262-.005.29-.064.408a.366.366 0 01-.188.193c-.117.063-.138.066-.44.066-.304 0-.325-.004-.442-.066a.366.366 0 01-.187-.193c-.06-.117-.065-.146-.065-.408V2.43H1.811v1.66h9.699zM4.12 2.192v-.711h-.462v1.423h.462zm5.542 0v-.711H9.2v1.423h.462z" />
                </svg>
              </div>
            ) : null
          }
        </Transition>
      </Modal>
    </div>
  );
};

export default ConfirmationPage;
