import React, { useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ACTION_FIRST_NAME from "../../actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME";
import ACTION_LAST_NAME from "../../actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME";
import ACTION_FIRST_NAME_RESET from "../../actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME_RESET";
import ACTION_LAST_NAME_RESET from "../../actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME_RESET";
import ACTION_EMAIL from "../../actions/GuestCheckoutForm/Email/ACTION_EMAIL";
import ACTION_EMAIL_RESET from "../../actions/GuestCheckoutForm/Email/ACTION_EMAIL_RESET";
import ACTION_EMAIL_NOT_INVALID from "../../actions/EmailValidation/Invalid/ACTION_EMAIL_NOT_INVALID";
import ACTION_EMAIL_VALID from "../../actions/EmailValidation/Valid/ACTION_EMAIL_VALID";
import ACTION_EMAIL_INVALID from "../../actions/EmailValidation/Invalid/ACTION_EMAIL_INVALID";
import ACTION_EMAIL_NOT_VALID from "../../actions/EmailValidation/Valid/ACTION_EMAIL_NOT_VALID";
import ACTION_PHONE_NUMBER from "../../actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER";
import ACTION_PHONE_NUMBER_RESET from "../../actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER_RESET";
import ACTION_PHONE_VALID from "../../actions/PhoneNumberValidation/Valid/ACTION_PHONE_VALID";
import ACTION_PHONE_NOT_INVALID from "../../actions/PhoneNumberValidation/Invalid/ACTION_PHONE_NOT_INVALID";
import ACTION_PHONE_NOT_VALID from "../../actions/PhoneNumberValidation/Valid/ACTION_PHONE_NOT_VALID";
import ACTION_PHONE_INVALID from "../../actions/PhoneNumberValidation/Invalid/ACTION_PHONE_INVALID";
import ACTION_APPOINTMENT_NOTES from "../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES";
import ACTION_BOOKING_SUMMARY_ACTIVE from "../../actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_ACTIVE";
import ACTION_APPOINTMENT_NOTES_INVALID from "../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_INVALID";
import ACTION_APPOINTMENT_NOTES_VALID from "../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_VALID";
import ACTION_BOOKING_SUMMARY_NOT_ACTIVE from "../../actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_NOT_ACTIVE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input
} from "reactstrap";
import "./GuestCheckout.css";

// Minified Bootstrap CSS file (for Forms)
import "../../bootstrap_forms.min.css";

const GuestCheckout = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const firstName = useSelector(state => state.firstName.first_name);
  const lastName = useSelector(state => state.lastName.last_name);
  const continueToBookingSummaryActive = useSelector(
    state => state.continueToBookingSummaryActive.bookingSummaryActive
  );
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );

  // Email States
  const email = useSelector(state => state.email.email);
  const emailIsValid = useSelector(state => state.emailIsValid.email_valid);
  const emailIsInvalid = useSelector(
    state => state.emailIsInvalid.email_invalid
  );

  // Phone Number States
  const phoneNumber = useSelector(state => state.phoneNumber.phone_number);
  const phoneIsValid = useSelector(state => state.phoneIsValid.phone_valid);
  const phoneIsInvalid = useSelector(
    state => state.phoneIsInvalid.phone_invalid
  );

  // Appointment Notes States
  const appointmentNotes = useSelector(
    state => state.appointmentNotes.appointment_notes
  );
  const appointmentNotesValid = useSelector(
    state => state.appointmentNotesValid.appointmentNotesValid
  );

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const handleFirstName = e => {
    dispatch(ACTION_FIRST_NAME(e.currentTarget.value));
  };

  const handleLastName = e => {
    dispatch(ACTION_LAST_NAME(e.currentTarget.value));
  };

  // Regular Expression for Phone Number Validation - allows only phone numbers in the format (xxx) xxx - xxx, with x values being digits
  const phoneNumberReg = /^(\(\d\d\d\))+\s+(\d\d\d)+\s+(-)+\s+(\d\d\d\d)$/g;

  // Regular Expression for Autocompleted Phone Numbers - allows phone numbers in the format 1xxxxxxxxxx, with x values being digits and the leading 1 country code being optional.
  const phoneNumberAutocompleteReg = /^(1*\d{10})$/g;

  const validatePhoneNumber = number => {
    const validPhoneNumber = phoneNumberReg.test(number);
    const validPhoneAutocomplete = phoneNumberAutocompleteReg.test(number);

    if (validPhoneNumber | validPhoneAutocomplete) {
      dispatch(ACTION_PHONE_VALID());
      dispatch(ACTION_PHONE_NOT_INVALID());
    } else {
      dispatch(ACTION_PHONE_NOT_VALID());
      dispatch(ACTION_PHONE_INVALID());
      dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
    }
  };

  const handlePhoneNumber = e => {
    validatePhoneNumber(e.currentTarget.value);
    dispatch(ACTION_PHONE_NUMBER(e.currentTarget.value));
  };

  // Regular Expression for Email Validation - allows only one @ and only one period while not allowing special characters or spaces
  const emailReg = /^[^\s@#!]+@{1}[^\s@.#!]+\.{1}[^\s@.]+$/;

  const validateEmail = e => {
    const validEmail = emailReg.test(e.currentTarget.value);
    dispatch(ACTION_EMAIL(e.currentTarget.value));
    if (validEmail) {
      dispatch(ACTION_EMAIL_NOT_INVALID());
      dispatch(ACTION_EMAIL_VALID());
    } else {
      dispatch(ACTION_EMAIL_INVALID());
      dispatch(ACTION_EMAIL_NOT_VALID());
      dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
    }
  };

  const firstNameTyping = () => {
    dispatch(ACTION_FIRST_NAME_RESET());
  };

  const lastNameTyping = () => {
    dispatch(ACTION_LAST_NAME_RESET());
  };

  const emailTyping = () => {
    dispatch(ACTION_EMAIL_RESET());
  };

  const phoneNumberTyping = e => {
    let currentTyping = e.currentTarget.value;

    dispatch(ACTION_PHONE_NUMBER_RESET());

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
  };

  const phoneNumberKeyTyping = e => {
    if (
      (e.keyCode >= 8 && e.keyCode <= 46) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  const appointmentNotesTyping = e => {
    dispatch(ACTION_APPOINTMENT_NOTES(e.currentTarget.value));
  };

  const handleConfirmDetailsButtonClick = () => {
    dispatch(ACTION_BOOKING_SUMMARY_ACTIVE());
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
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="checkout_container">
      {redirectToHome()}
      <div className="checkout_container_header">
        <Link to="/availability/timepreference">
          <FontAwesomeIcon
            className="checkout_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CHECKOUT</h1>
        <Link to="/checkout/confirmation">
          <FontAwesomeIcon
            className="checkout_forward_arrow"
            style={{
              display: continueToBookingSummaryActive ? "block" : "none"
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
          <FormGroup>
            <Label for="guestEmail">
              <div className="required_label">
                Email<p className="required_label red_asterisk">* </p>
              </div>
            </Label>
            <Input
              type="email"
              name="email"
              defaultValue={email}
              maxLength={128}
              placeholder="Email address"
              className="input_field"
              onChange={emailTyping}
              onBlur={validateEmail}
              invalid={email === "" ? false : emailIsInvalid ? true : false}
              valid={email === "" ? false : emailIsValid ? true : false}
            />
            <FormFeedback invalid="true">
              Please enter a valid email address.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">
              <div className="required_label">
                Phone Number<p className="required_label red_asterisk">* </p>
              </div>
            </Label>
            <Input
              type="tel"
              name="phoneNumber"
              maxLength={16}
              onKeyDown={phoneNumberKeyTyping}
              defaultValue={phoneNumber}
              placeholder="Phone number"
              onChange={phoneNumberTyping}
              onBlur={handlePhoneNumber}
              className="input_field"
              invalid={
                phoneNumber === "" ? false : phoneIsInvalid ? true : false
              }
              valid={phoneNumber === "" ? false : phoneIsValid ? true : false}
            />
            <FormFeedback invalid="true">
              Please enter a valid phone number.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="appointmentNotes">Appointment Notes</Label>
            <Input
              type="textarea"
              className="form_appointment_notes"
              maxLength={1000}
              placeholder="Enter any skin care issues/concerns here."
              defaultValue={appointmentNotes}
              style={{
                fontFamily: "Montserrat"
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
                  transition: "color 0.5s ease"
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
            to="/checkout/confirmation"
            style={{
              display: "block",
              pointerEvents:
                firstName &&
                lastName &&
                emailIsValid &&
                phoneIsValid &&
                appointmentNotesValid
                  ? "auto"
                  : "none"
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
                    ? "rgb(165, 138, 127)"
                    : "#f0f0f0",
                color:
                  firstName &&
                  lastName &&
                  emailIsValid &&
                  phoneIsValid &&
                  appointmentNotesValid
                    ? "rgb(255, 255, 255)"
                    : "rgb(201, 201, 201)",
                transition: "background 0.5s ease, color 0.5s ease"
              }}
            >
              <p>Review Details</p>
            </div>
          </Link>
          <Link to="/availability/timepreference">
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
