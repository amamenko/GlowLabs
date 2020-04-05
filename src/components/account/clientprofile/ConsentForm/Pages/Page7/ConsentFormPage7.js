import React, { useRef, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Transition, Spring } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ACTION_CONSENT_FORM_PAGE_7 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_7";
import ACTION_FINAL_BOOK_BUTTON_ACTIVE from "../../../../../../actions/FinalBookButton/ACTION_FINAL_BOOK_BUTTON_ACTIVE";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_BODY_SCROLL_RESET from "../../../../../../actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import CanvasDraw from "react-canvas-draw";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";
import Modal from "react-modal";
import { css } from "emotion";
import { BounceLoader } from "react-spinners";
import { useMutation } from "@apollo/react-hooks";
import { updateConsentFormMutation } from "../../../../../../graphql/queries/queries";
import ACTION_CONSENT_FORM_DATE from "../../../../../../actions/ConsentForm/ConsentFormDate/ACTION_CONSENT_FORM_DATE";
import ACTION_CONSENT_FORM_DATE_RESET from "../../../../../../actions/ConsentForm/ConsentFormDate/ACTION_CONSENT_FORM_DATE_RESET";

const ConsentFormPage7 = (props) => {
  const dispatch = useDispatch();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const finalBookButtonActive = useSelector(
    (state) => state.finalBookButton.final_book_button_active
  );
  const consentFormDate = useSelector(
    (state) => state.consentFormDate.consent_form_date
  );
  const surgeryLast3MonthsYes = useSelector(
    (state) => state.surgeryLast3MonthsYes.surgery_last_3_months_yes_active
  );
  const surgeryLast3MonthsNotes = useSelector(
    (state) => state.surgeryLast3MonthsNotes.surgery_last_3_months_notes
  );
  const anyHealthProblemsYes = useSelector(
    (state) => state.anyHealthProblemsYes.any_health_problems_yes_active
  );
  const anyHealthProblemsNotes = useSelector(
    (state) => state.anyHealthProblemsNotes.any_health_problems_notes
  );
  const listAnyMedicationsNotes = useSelector(
    (state) => state.listAnyMedicationsNotes.list_any_medications_notes
  );
  const anyChemPeelsLastMonthYes = useSelector(
    (state) =>
      state.anyChemPeelsLastMonthYes.any_chem_peels_last_month_yes_active
  );
  const anyWaxingLast5DaysYes = useSelector(
    (state) => state.anyWaxingLast5DaysYes.any_waxing_last_5_days_yes_active
  );
  const anyAccutaneYes = useSelector(
    (state) => state.anyAccutaneYes.any_accutane_yes_active
  );
  const anyAccutaneNotes = useSelector(
    (state) => state.anyAccutaneNotes.any_accutane_notes
  );
  const ingredientGlycolicAcid = useSelector(
    (state) => state.ingredientGlycolicAcid.glycolic_acid_active
  );
  const ingredientLacticAcid = useSelector(
    (state) => state.ingredientLacticAcid.lactic_acid_active
  );
  const ingredientSalicyclicAcid = useSelector(
    (state) => state.ingredientSalicyclicAcid.salicyclic_acid_active
  );
  const ingredientExfoliatingScrubs = useSelector(
    (state) => state.ingredientExfoliatingScrubs.exfoliating_scrubs_active
  );
  const ingredientVitaminA = useSelector(
    (state) => state.ingredientVitaminA.vitamin_a_active
  );
  const anyFillersOrBotoxYes = useSelector(
    (state) => state.anyFillersOrBotoxYes.any_fillers_or_botox_yes_active
  );
  const anyFillersOrBotoxNotes = useSelector(
    (state) => state.anyFillersOrBotoxNotes.any_fillers_or_botox_notes
  );
  const listKnownAllergiesNotes = useSelector(
    (state) => state.listKnownAllergiesNotes.list_known_allergies_notes
  );
  const skinFlakyOrItchYes = useSelector(
    (state) => state.skinFlakyOrItchYes.skin_flaky_or_itch_yes_active
  );
  const diagnosedWithRosaceaYes = useSelector(
    (state) => state.diagnosedWithRosaceaYes.diagnosed_with_rosacea_yes_active
  );
  const pregnantOrNursingYes = useSelector(
    (state) => state.pregnantOrNursingYes.pregnant_or_nursing_yes_active
  );
  const ultimateSkinCareGoals = useSelector(
    (state) => state.ultimateSkinCareGoals.ultimate_skin_care_goals_notes
  );
  const anythingElseWeShouldKnow = useSelector(
    (state) => state.anythingElseWeShouldKnow.anything_else_we_should_know_notes
  );
  const [finalBookingModalActive, changeFinalBookingModalActive] = useState(
    false
  );

  const [drawingSaveData, changeDrawingSaveData] = useState("");
  const [consentFormMonth, changeConsentFormMonth] = useState(null);
  const [consentFormDay, changeConsentFormDay] = useState(null);
  const [consentFormYear, changeConsentFormYear] = useState(null);

  const [updateConsentForm, { loading: appLoading }] = useMutation(
    updateConsentFormMutation
  );

  const signature = useRef(null);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (consentFormMonth && consentFormDay && consentFormYear) {
      if (
        consentFormMonth.toString().length === 2 &&
        consentFormDay.toString().length === 2 &&
        consentFormYear.toString().length === 4
      ) {
        if (consentFormDate === "") {
          dispatch(
            ACTION_CONSENT_FORM_DATE(
              `${consentFormMonth}/${consentFormDay}/${consentFormYear}`
            )
          );
        }
      } else {
        if (consentFormDate) {
          dispatch(ACTION_CONSENT_FORM_DATE_RESET());
        }
      }
    }
  }, [
    consentFormDate,
    consentFormDay,
    consentFormMonth,
    consentFormYear,
    dispatch,
  ]);

  const handleSubmitConsentForm = (e) => {
    e.preventDefault();

    if (!finalBookButtonActive) {
      dispatch(ACTION_FINAL_BOOK_BUTTON_ACTIVE());
    }

    updateConsentForm({
      variables: {
        date: consentFormDate,
        surgeryLast3Months: surgeryLast3MonthsYes,
        surgeryLast3MonthsNotes: surgeryLast3MonthsNotes,
        anyHealthProblems: anyHealthProblemsYes,
        anyHealthProblemsNotes: anyHealthProblemsNotes,
        listAnyMedications: listAnyMedicationsNotes,
        chemPeelsLastMonth: anyChemPeelsLastMonthYes,
        waxingOnFaceLast5Days: anyWaxingLast5DaysYes,
        accutaneOrPrescription: anyAccutaneYes,
        accutaneOrPrescriptionNotes: anyAccutaneNotes,
        anyProductsContainingSalicyclicAcid: ingredientSalicyclicAcid,
        anyProductsContainingGlycolicAcid: ingredientGlycolicAcid,
        anyProductsContainingLacticAcid: ingredientLacticAcid,
        anyProductsContainingExfoliatingScrubs: ingredientExfoliatingScrubs,
        anyProductsContainingVitaminA: ingredientVitaminA,
        fillersOrBotox: anyFillersOrBotoxYes,
        fillersOrBotoxNotes: anyFillersOrBotoxNotes,
        listKnownAllergies: listKnownAllergiesNotes,
        skinFlakyOrItch: skinFlakyOrItchYes,
        everDiagnosedWithRosacea: diagnosedWithRosaceaYes,
        pregnantOrNursing: pregnantOrNursingYes,
        ultimateSkinCareGoals: ultimateSkinCareGoals,
        anythingElseWeShouldKnow: anythingElseWeShouldKnow,
        consentFormSignature: drawingSaveData,
      },
    });
  };

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

  const handleMonthChange = (e) => {
    changeConsentFormMonth(e.currentTarget.value);
  };

  const handleDayChange = (e) => {
    changeConsentFormDay(e.currentTarget.value);
  };

  const handleYearChange = (e) => {
    changeConsentFormYear(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(ACTION_CONSENT_FORM_PAGE_7());
  }, [dispatch]);

  const handleModalBackToClientProfile = () => {
    console.log("ok");
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();

    if (!finalBookButtonActive) {
      dispatch(ACTION_FINAL_BOOK_BUTTON_ACTIVE());
    }
  };

  useEffect(() => {
    if (appLoading) {
      if (!loadingSpinnerActive) {
        dispatch(ACTION_LOADING_SPINNER_ACTIVE());
        dispatch(ACTION_BODY_SCROLL_RESET());
      }
    } else {
      const bookingComplete = setTimeout(() => {
        dispatch(ACTION_LOADING_SPINNER_RESET());
        changeFinalBookingModalActive(true);
      }, 3000);

      return () => {
        if (finalBookingModalActive) {
          clearTimeout(bookingComplete);
        }
      };
    }
  }, [appLoading, dispatch, loadingSpinnerActive, finalBookingModalActive]);

  const handleSignatureClearButtonPress = () => {
    signature.current.clear();
    changeDrawingSaveData("");
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
          onClick={handleSignatureClearButtonPress}
        >
          <p>Clear</p>
        </div>
        <CanvasDraw
          className="consent_form_signature"
          onChange={() =>
            changeDrawingSaveData(signature.current.getSaveData())
          }
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
          onChange={handleMonthChange}
          type="text"
          placeholder="MM"
          maxLength="2"
          name="month_field"
        />
        <p>/</p>
        <input
          className="consent_form_date_field"
          onKeyDown={handleDateChange}
          onChange={handleDayChange}
          type="text"
          placeholder="DD"
          maxLength="2"
          name="day_field"
        />
        <p>/</p>
        <input
          className="consent_form_date_field"
          onKeyDown={handleDateChange}
          onChange={handleYearChange}
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
          style={{
            pointerEvents: consentFormDate && drawingSaveData ? "auto" : "none",
          }}
        >
          <div
            className="next_page_button"
            onClick={handleSubmitConsentForm}
            style={{
              background:
                consentFormDate && drawingSaveData
                  ? "rgb(44, 44, 52)"
                  : "#f0f0f0",
              color:
                consentFormDate && drawingSaveData
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
          >
            <p>Submit</p>
          </div>
        </Link>
        <div className="consent_form_previous_page_button">
          <Link to="/account/clientprofile/consentform/page6">
            <p>Previous Page</p>
          </Link>
        </div>
        <p className="consent_form_page_number_info">Page 7 of 7</p>
      </div>
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
            background: "rgba(0, 0, 0, 0.5)",
          },
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
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ transform: "translate3d(0, -65%, 0)" }}
        >
          {(finalBookingModalActive) =>
            finalBookingModalActive &&
            ((props) => (
              <div className="final_booking_modal" style={props}>
                <div className="final_booking_modal_contents">
                  <Link to="/">
                    <FontAwesomeIcon
                      className="modal_x"
                      icon={faTimes}
                      onClick={handleModalBackToClientProfile}
                    />
                  </Link>
                  <div className="modal_calendar_icon_container">
                    <svg
                      className="modal_calendar_icon"
                      width="100%"
                      height="6rem"
                      viewBox="0 0 13.229 13.229"
                    >
                      <path d="M1.637 12.36a.469.469 0 01-.263-.288c-.036-.131-.035-9.665 0-9.796a.484.484 0 01.287-.294c.058-.017.358-.027.814-.027h.721v-.264c0-.319.027-.423.142-.54.117-.12.214-.145.568-.145.284 0 .308.004.424.066.1.054.135.09.188.193.06.117.064.146.064.408v.282h4.156v-.264c0-.319.028-.423.142-.54.117-.12.214-.145.569-.145.284 0 .307.004.423.066.1.054.136.09.188.193.06.117.064.146.064.408v.282h.722c.455 0 .755.01.813.027a.484.484 0 01.287.294c.036.134.036 9.665 0 9.799a.484.484 0 01-.287.294c-.066.019-1.49.026-5.01.025-4.18 0-4.933-.006-5.012-.034zm9.873-4.117V4.565h-9.7v7.356h9.7zm0-4.983v-.83h-1.386v.282c0 .262-.005.29-.064.408a.366.366 0 01-.188.193c-.117.063-.138.066-.44.066-.304 0-.325-.004-.442-.066a.366.366 0 01-.187-.193c-.06-.117-.065-.146-.065-.408V2.43H4.582v.282c0 .262-.005.29-.064.408a.366.366 0 01-.188.193c-.117.063-.138.066-.44.066-.304 0-.325-.004-.442-.066a.366.366 0 01-.187-.193c-.06-.117-.065-.146-.065-.408V2.43H1.811v1.66h9.699zM4.12 2.192v-.711h-.462v1.423h.462zm5.542 0v-.711H9.2v1.423h.462z" />
                    </svg>
                    <Spring
                      from={{ x: 100 }}
                      to={{ x: 0 }}
                      config={{ delay: 500, duration: 2000 }}
                    >
                      {(styles) => (
                        <svg
                          width="100%"
                          height="0.5rem"
                          className="modal_checkmark"
                          viewBox="0 0 13.229 13.229"
                        >
                          <path
                            d="M2.851 7.56l2.45 2.482 5.36-6.958"
                            fill="none"
                            stroke="rgb(55, 55, 55)"
                            strokeDasharray="100"
                            strokeDashoffset={`${styles.x}`}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          />
                        </svg>
                      )}
                    </Spring>
                  </div>
                  <p className="modal_confirmation_statement">
                    Wow, your appointment has been confirmed.
                  </p>
                  <div className="modal_date_time_container">
                    <div className="modal_bold_details_container">
                      <p className="modal_appointment_time">Okay</p>
                      <p className="modal_appointment_spacer">|</p>
                      <p className="modal_appointment_provider">Glow Labs</p>
                    </div>
                    <div className="modal_bottom_info_container">
                      <p className="modal_full_date_info">Alright</p>
                      <div className="modal_address_container">
                        <p>561 WILLOW AVENUE</p>
                        <p>|</p>
                        <p>CEDARHURST, NY</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/">
                    <div
                      className="dismiss_modal_button"
                      onClick={handleModalBackToClientProfile}
                    >
                      <p>BACK TO HOME</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
    </div>
  );
};

export default ConsentFormPage7;
