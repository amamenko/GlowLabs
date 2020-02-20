import React from "react";
import { Link } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
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

  const firstName = useSelector(state => state.firstName.first_name);
  const lastName = useSelector(state => state.lastName.last_name);
  const email = useSelector(state => state.email.email);
  const emailIsValid = useSelector(state => state.emailIsValid.email_valid);
  const emailIsInvalid = useSelector(
    state => state.emailIsInvalid.email_invalid
  );
  const phoneNumber = useSelector(state => state.phoneNumber.phone_number);

  const handleFirstName = e => {
    dispatch(ACTION_FIRST_NAME(e.currentTarget.value));
  };

  const handleLastName = e => {
    dispatch(ACTION_LAST_NAME(e.currentTarget.value));
  };

  const handlePhoneNumber = e => {
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
    console.log(e.currentTarget.value);
    let currentTyping = e.currentTarget.value;

    console.log(currentTyping.length);

    dispatch(ACTION_PHONE_NUMBER_RESET());
    if (currentTyping.length === 3) {
      currentTyping = currentTyping.split("");
      currentTyping.unshift("(");
      currentTyping.push(") ");

      currentTyping = currentTyping.join("");
    } else {
      if (currentTyping.indexOf("(") === 0 && currentTyping.indexOf(")") < 0) {
        currentTyping = currentTyping.split("");
        currentTyping.splice(currentTyping.indexOf("("), 1);

        currentTyping = currentTyping.join("");
      } else {
        if (currentTyping.length === 9 && currentTyping.indexOf("-") < 0) {
          currentTyping = currentTyping.split("");
          currentTyping.push("-");

          currentTyping = currentTyping.join("");
        } else {
          if (currentTyping.indexOf("-") > 0 && currentTyping.length === 9) {
            currentTyping = currentTyping.split("");
            currentTyping.splice(currentTyping.indexOf("-"), 1);

            currentTyping = currentTyping.join("");
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

  return (
    <div className="checkout_container">
      <div className="checkout_container_header">
        <Link to="/availability/timepreference">
          <FontAwesomeIcon
            className="checkout_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CHECKOUT</h1>
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
              style={{ display: "block" }}
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
              onKeyDown={phoneNumberKeyTyping}
              defaultValue={phoneNumber}
              onChange={phoneNumberTyping}
              onBlur={handlePhoneNumber}
              className="input_field"
            />
          </FormGroup>
          <FormGroup>
            <Label for="appointmentNotes">Appointment Notes</Label>
            <Input
              type="textarea"
              className="form_appointment_notes"
              style={{ fontFamily: "Montserrat" }}
              name="appointmentNotes"
            />
            <FormText
              className="form_appointment_notes_caption"
              style={{ color: "rgb(151, 151, 151)" }}
            >
              To protect your privacy, do not include any privileged material
              such as personal health information.
            </FormText>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default GuestCheckout;
