import React, { useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Email from "./Form/Email";
import PhoneNumber from "./Form/PhoneNumber";
import ACTION_FIRST_NAME from "../../actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME";
import ACTION_LAST_NAME from "../../actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME";
import ACTION_FIRST_NAME_RESET from "../../actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME_RESET";
import ACTION_LAST_NAME_RESET from "../../actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME_RESET";
import ACTION_APPOINTMENT_NOTES from "../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES";
import ACTION_BOOKING_SUMMARY_ACTIVE from "../../actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_ACTIVE";
import ACTION_APPOINTMENT_NOTES_INVALID from "../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_INVALID";
import ACTION_APPOINTMENT_NOTES_VALID from "../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_VALID";
import ACTION_BOOKING_SUMMARY_NOT_ACTIVE from "../../actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_NOT_ACTIVE";
import ACTION_TIME_PREFERENCE_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_TIME_PREFERENCE_PAGE_OPENED";
import ACTION_PAYMENT_INFO_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_PAYMENT_INFO_PAGE_OPENED";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Form, FormGroup, FormText, Label, Input } from "reactstrap";
import "./GuestCheckout.css";

// Minified Bootstrap CSS file (for Forms)
import "../../bootstrap_forms.min.css";

const GuestCheckout = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();

  const firstName = useSelector((state) => state.firstName.first_name);
  const lastName = useSelector((state) => state.lastName.last_name);
  const continueToBookingSummaryActive = useSelector(
    (state) => state.continueToBookingSummaryActive.bookingSummaryActive
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );

  // Email States
  const emailIsValid = useSelector((state) => state.emailIsValid.email_valid);

  // Phone Number States
  const phoneIsValid = useSelector((state) => state.phoneIsValid.phone_valid);

  // Appointment Notes States
  const appointmentNotes = useSelector(
    (state) => state.appointmentNotes.appointment_notes
  );
  const appointmentNotesValid = useSelector(
    (state) => state.appointmentNotesValid.appointmentNotesValid
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

  const redirectToConfirmationPage = () => {
    if (userAuthenticated) {
      return <Redirect to="/checkout/confirmation" />;
    }
  };

  const handleFirstName = (e) => {
    dispatch(ACTION_FIRST_NAME(e.currentTarget.value.trim()));
  };

  const handleLastName = (e) => {
    dispatch(ACTION_LAST_NAME(e.currentTarget.value.trim()));
  };

  const firstNameTyping = () => {
    dispatch(ACTION_FIRST_NAME_RESET());
  };

  const lastNameTyping = () => {
    dispatch(ACTION_LAST_NAME_RESET());
  };

  const appointmentNotesTyping = (e) => {
    dispatch(ACTION_APPOINTMENT_NOTES(e.currentTarget.value.trim()));
  };

  const handleConfirmDetailsButtonClick = () => {
    dispatch(ACTION_BOOKING_SUMMARY_ACTIVE());
    dispatch(ACTION_PAYMENT_INFO_PAGE_OPENED());
  };

  const renderRemainingCharacters = () => {
    let remainingCharacters = [];

    if (appointmentNotes) {
      remainingCharacters.unshift("(", Math.abs(500 - appointmentNotes.length));

      if (500 - appointmentNotes.length === 1) {
        remainingCharacters.push(" character remaining).");

        if (!appointmentNotesValid) {
          dispatch(ACTION_APPOINTMENT_NOTES_VALID());
        }
      } else {
        if (500 - appointmentNotes.length < 0) {
          remainingCharacters.push(" too many).");
          dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
          if (appointmentNotesValid) {
            dispatch(ACTION_APPOINTMENT_NOTES_INVALID());
          }
        } else {
          remainingCharacters.push(" characters remaining).");

          if (!appointmentNotesValid) {
            dispatch(ACTION_APPOINTMENT_NOTES_VALID());
          }
        }
      }
    }
    return remainingCharacters.join("");
  };

  useEffect(() => {
    if (location.pathname.includes("checkout")) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="checkout_container">
      {redirectToHome()}
      {redirectToConfirmationPage()}
      <div className="checkout_container_header">
        <Link
          to={
            !props.currentScreenSize
              ? props.initialScreenSize >= 1200
                ? "/"
                : "/availability/timepreference"
              : props.currentScreenSize >= 1200
              ? "/"
              : "/availability/timepreference"
          }
          onClick={() => dispatch(ACTION_TIME_PREFERENCE_PAGE_OPENED())}
        >
          <FontAwesomeIcon
            className="checkout_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CHECKOUT</h1>
        <Link
          to={
            !props.currentScreenSize
              ? props.initialScreenSize >= 1200
                ? "/"
                : "/paymentinfo"
              : props.currentScreenSize >= 1200
              ? "/"
              : "/paymentinfo"
          }
          onClick={() => dispatch(ACTION_PAYMENT_INFO_PAGE_OPENED())}
        >
          <FontAwesomeIcon
            className="checkout_forward_arrow"
            style={{
              display: continueToBookingSummaryActive ? "block" : "none",
            }}
            icon={faChevronRight}
          />
        </Link>
      </div>
      <div className="checkout_header">
        <h2>CHECKOUT AS GUEST</h2>
      </div>
      <div className="guest_checkout_form_container">
        <Form>
          <FormGroup>
            <Label for="firstName">
              {" "}
              <div className="top_form_container">
                <div className="required_label">
                  First Name<p className="required_label red_asterisk">* </p>
                </div>
                <div className="required_fields_container">
                  <p className="red_asterisk">* </p>{" "}
                  <p className="required_fields_statement"> Required Fields</p>
                </div>
              </div>
            </Label>
            <Input
              type="text"
              name="firstName"
              defaultValue={firstName}
              maxLength={50}
              placeholder="First name"
              className="input_field"
              onBlur={handleFirstName}
              onChange={firstNameTyping}
              valid={firstName === "" ? false : true}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">
              <div className="required_label">
                Last Name<p className="required_label red_asterisk">* </p>
              </div>
            </Label>
            <Input
              type="text"
              name="lastName"
              defaultValue={lastName}
              maxLength={50}
              placeholder="Last name"
              onChange={lastNameTyping}
              onBlur={handleLastName}
              className="input_field"
              valid={lastName === "" ? false : true}
            />
          </FormGroup>
          <Email />
          <PhoneNumber />
          <FormGroup>
            <Label for="appointmentNotes">Appointment Notes</Label>
            <Input
              type="textarea"
              className="form_appointment_notes form_notes_container"
              maxLength={1000}
              placeholder="Enter any skin care issues/concerns here."
              defaultValue={appointmentNotes}
              style={{
                fontFamily: "Montserrat",
              }}
              name="appointmentNotes"
              onChange={appointmentNotesTyping}
            />
            <FormText
              className="form_appointment_notes_caption"
              style={{ color: "rgb(151, 151, 151)" }}
            >
              <p
                style={{
                  color:
                    500 - appointmentNotes.length < 0
                      ? "rgb(255, 22, 34)"
                      : "rgb(151, 151, 151)",
                  transition: "color 0.5s ease",
                }}
                className="notes_character_limit"
              >
                Maximum 500 characters {renderRemainingCharacters()}
              </p>
              <p>
                To protect your privacy, do not include any privileged material
                such as personal health information.{" "}
              </p>
            </FormText>
          </FormGroup>
        </Form>
        <div className="guest_checkout_bottom_buttons_container">
          <Link
            to={
              !props.currentScreenSize
                ? props.initialScreenSize >= 1200
                  ? "/"
                  : "/paymentinfo"
                : props.currentScreenSize >= 1200
                ? "/"
                : "/paymentinfo"
            }
            style={{
              display: "block",
              pointerEvents:
                firstName &&
                lastName &&
                emailIsValid &&
                phoneIsValid &&
                appointmentNotesValid
                  ? "auto"
                  : "none",
            }}
            onClick={handleConfirmDetailsButtonClick}
          >
            <div
              className="confirm_details_button"
              style={{
                background:
                  firstName &&
                  lastName &&
                  emailIsValid &&
                  phoneIsValid &&
                  appointmentNotesValid
                    ? "rgb(44, 44, 52)"
                    : "#f0f0f0",
                color:
                  firstName &&
                  lastName &&
                  emailIsValid &&
                  phoneIsValid &&
                  appointmentNotesValid
                    ? "rgb(255, 255, 255)"
                    : "rgb(201, 201, 201)",
                transition: "background 0.5s ease, color 0.5s ease",
              }}
            >
              <p>Payment Details</p>
            </div>
          </Link>
          <Link
            to={
              !props.currentScreenSize
                ? props.initialScreenSize >= 1200
                  ? "/"
                  : "/availability/timepreference"
                : props.currentScreenSize >= 1200
                ? "/"
                : "/availability/timepreference"
            }
            onClick={() => dispatch(ACTION_TIME_PREFERENCE_PAGE_OPENED())}
          >
            <div className="change_time_button">
              <p>Change Time</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckout;
