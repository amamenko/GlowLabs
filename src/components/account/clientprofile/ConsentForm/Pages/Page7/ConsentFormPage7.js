import React, { useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import CanvasDraw from "react-canvas-draw";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";

const ConsentFormPage7 = (props) => {
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const signature = useRef(null);

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

  const handleDateChange = (e) => {
    console.log(e.currentTarget);
    if (
      (e.keyCode >= 8 && e.keyCode < 32) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="client_consent_form_container" style={{ height: "100%" }}>
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="client_consent_form_header">
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="client_consent_form_header_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CONSENT FORM</h1>
      </div>
      <h2 className="consent_form_title_designation">Skin Care Consent</h2>
      <p className="consent_form_sign_paragraph">
        By proceeding to use our products, treatments, services, and facilities,
        you represent to us that you are in good health and physical condition
        to use such products, treatments, service and facilities safely, and
        fully accept the risk associated with doing so.
      </p>
      <p className="consent_form_sign_paragraph">
        You confirm (to the best of your knowledge) that the answers you have
        given are correct and that you have not withheld any information that
        may be relevant to your treatment. You are aware that there are often
        inherent risks associated with skin care services and that the service
        that you are about to receive could have unfavorable results including
        but not limited to allergic reaction, irritation, burning, redness,
        scarring, or soreness.
      </p>
      <p className="consent_form_sign_paragraph">
        By signing below, you further agree that you will not hold Glow Labs, or
        its affiliates, or any of its employees responsible for discomfort,
        unfavorable outcome, or result, damages, losses, injury, illness, or
        death howsoever caused, arising out of, or in connection with the use of
        the products, treatments, services, and facilities at Glow Labs (save in
        respect of death or personal injury arising out of the gross negligence
        of Glow Labs or its employees).
      </p>
      <p className="consent_form_sign_paragraph">
        All clients of Glow Labs must secure their personal belongings and
        refrain from leaving cash, jewelry, or valuables of any sort on Glow
        Labs' premises. Glow Labs shall not be liable for any damage, loss,
        theft, or disappearance of any property brought to the premises.
      </p>
      <p className="consent_form_signature_header">Please sign:</p>
      <div className="consent_form_signature_container">
        <div
          className="consent_form_signature_clear_container"
          onClick={() => signature.current.clear()}
        >
          <p>Clear</p>
        </div>
        <CanvasDraw
          className="consent_form_signature"
          onChange={() => signature.current.getSaveData()}
          ref={signature}
          hideGrid={true}
          hideInterface={true}
          brushColor="rgb(44, 44, 52)"
          brushRadius={2}
          lazyRadius={0}
          loadTimeOffset={0}
          canvasHeight="100%"
          canvasWidth="100%"
        />
      </div>
      <p className="consent_form_signature_header">
        Please fill in today's date:
      </p>

      <form className="consent_form_date_container">
        <input
          className="consent_form_date_field"
          onKeyDown={handleDateChange}
          type="text"
          placeholder="MM"
          maxLength="2"
          name="month_field"
        />
        <p>/</p>
        <input
          className="consent_form_date_field"
          onKeyDown={handleDateChange}
          type="text"
          placeholder="DD"
          maxLength="2"
          name="day_field"
        />
        <p>/</p>
        <input
          className="consent_form_date_field"
          onKeyDown={handleDateChange}
          type="text"
          placeholder="YYYY"
          maxLength="4"
          name="year_field"
        />
      </form>
      <div className="consent_form_bottom_button_container">
        <Link
          className="next_page_link_container"
          to="/account/clientprofile/consentform/page7"
        >
          <div
            className="next_page_button"
            style={{
              background: "rgb(44, 44, 52)",
              color: "rgb(255, 255, 255)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
          >
            <p>Submit</p>
          </div>
        </Link>
        <div className="consent_form_previous_page_button">
          <Link to="/account/clientprofile/consentform/page3">
            <p>Previous Page</p>
          </Link>
        </div>
        <p className="consent_form_page_number_info">Page 7 of 7</p>
      </div>
    </div>
  );
};

export default ConsentFormPage7;
