import React, { useRef, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import CanvasDraw from "react-canvas-draw";
import LZString from "lz-string";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import { useMutation, useQuery } from "@apollo/react-hooks";
import updateConsentFormMutation from "../../../../../../graphql/mutations/updateConsentFormMutation";
import getClientQuery from "../../../../../../graphql/queries/getClientQuery";
import { GoChecklist } from "react-icons/go";
import ACTION_CONSENT_FORM_PAGE_7 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_7";
import ACTION_FINAL_BOOK_BUTTON_ACTIVE from "../../../../../../actions/FinalBookButton/ACTION_FINAL_BOOK_BUTTON_ACTIVE";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_BODY_SCROLL_RESET from "../../../../../../actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_CONSENT_FORM_DATE from "../../../../../../actions/ConsentForm/ConsentFormDate/ACTION_CONSENT_FORM_DATE";
import ACTION_CONSENT_FORM_DATE_RESET from "../../../../../../actions/ConsentForm/ConsentFormDate/ACTION_CONSENT_FORM_DATE_RESET";
import ACTION_ANY_ACCUTANE_NO_RESET from "../../../../../../actions/ConsentForm/AnyAccutane/No/ACTION_ANY_ACCUTANE_NO_RESET";
import ACTION_ANY_ACCUTANE_YES_RESET from "../../../../../../actions/ConsentForm/AnyAccutane/Yes/ACTION_ANY_ACCUTANE_YES_RESET";
import ACTION_ANY_ACCUTANE_NOTES_RESET from "../../../../../../actions/ConsentForm/AnyAccutane/Yes/Notes/ACTION_ANY_ACCUTANE_NOTES_RESET";
import ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET from "../../../../../../actions/ConsentForm/AnyChemPeelsLastMonth/No/ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET";
import ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET from "../../../../../../actions/ConsentForm/AnyChemPeelsLastMonth/Yes/ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET";
import ACTION_ANY_FILLERS_OR_BOTOX_NO_RESET from "../../../../../../actions/ConsentForm/AnyFillersOrBotox/No/ACTION_ANY_FILLERS_OR_BOTOX_NO_RESET";
import ACTION_ANY_FILLERS_OR_BOTOX_YES_RESET from "../../../../../../actions/ConsentForm/AnyFillersOrBotox/Yes/ACTION_ANY_FILLERS_OR_BOTOX_YES";
import ACTION_ANY_FILLERS_OR_BOTOX_NOTES_RESET from "../../../../../../actions/ConsentForm/AnyFillersOrBotox/Yes/Notes/ACTION_ANY_FILLERS_OR_BOTOX_NOTES_RESET";
import ACTION_ANY_HEALTH_PROBLEMS_NO_RESET from "../../../../../../actions/ConsentForm/AnyHealthProblems/No/ACTION_ANY_HEALTH_PROBLEMS_NO_RESET";
import ACTION_ANY_HEALTH_PROBLEMS_YES_RESET from "../../../../../../actions/ConsentForm/AnyHealthProblems/Yes/ACTION_ANY_HEALTH_PROBLEMS_YES_RESET";
import ACTION_ANY_HEALTH_PROBLEMS_NOTES_RESET from "../../../../../../actions/ConsentForm/AnyHealthProblems/Yes/Notes/ACTION_ANY_HEALTH_PROBLEMS_NOTES_RESET";
import ACTION_EXFOLIATING_SCRUBS_RESET from "../../../../../../actions/ConsentForm/AnyProductsWithIngredients/ExfoliatingScrubs/ACTION_EXFOLIATING_SCRUBS_RESET";
import ACTION_GLYCOLIC_ACID_RESET from "../../../../../../actions/ConsentForm/AnyProductsWithIngredients/GlycolicAcid/ACTION_GLYCOLIC_ACID_RESET";
import ACTION_LACTIC_ACID_RESET from "../../../../../../actions/ConsentForm/AnyProductsWithIngredients/LacticAcid/ACTION_LACTIC_ACID_RESET";
import ACTION_SALICYCLIC_ACID_RESET from "../../../../../../actions/ConsentForm/AnyProductsWithIngredients/SalicyclicAcid/ACTION_SALICYCLIC_ACID_RESET";
import ACTION_VITAMIN_A_RESET from "../../../../../../actions/ConsentForm/AnyProductsWithIngredients/VitaminA/ACTION_VITAMIN_A_RESET";
import ACTION_ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES_RESET from "../../../../../../actions/ConsentForm/AnythingElseWeShouldKnow/ACTION_ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES_RESET";
import ACTION_ANY_WAXING_LAST_5_DAYS_NO_RESET from "../../../../../../actions/ConsentForm/AnyWaxingLast5Days/No/ACTION_ANY_WAXING_LAST_5_DAYS_NO_RESET";
import ACTION_ANY_WAXING_LAST_5_DAYS_YES_RESET from "../../../../../../actions/ConsentForm/AnyWaxingLast5Days/Yes/ACTION_ANY_WAXING_LAST_5_DAYS_YES_RESET";
import ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET from "../../../../../../actions/ConsentForm/DiagnosedWithRosacea/No/ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET";
import ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET from "../../../../../../actions/ConsentForm/DiagnosedWithRosacea/Yes/ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET";
import ACTION_CONSENT_FORM_PAGE_1 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_1";
import ACTION_LIST_ANY_MEDICATIONS_NOTES_RESET from "../../../../../../actions/ConsentForm/ListAnyMedications/ACTION_LIST_ANY_MEDICATIONS_NOTES_RESET";
import ACTION_PREGNANT_OR_NURSING_NO_RESET from "../../../../../../actions/ConsentForm/PregnantOrNursing/No/ACTION_PREGNANT_OR_NURSING_NO_RESET";
import ACTION_PREGNANT_OR_NURSING_YES_RESET from "../../../../../../actions/ConsentForm/PregnantOrNursing/Yes/ACTION_PREGNANT_OR_NURSING_YES_RESET";
import ACTION_SKIN_FLAKY_OR_ITCH_NO_RESET from "../../../../../../actions/ConsentForm/SkinFlakyOrItch/No/ACTION_SKIN_FLAKY_OR_ITCH_NO_RESET";
import ACTION_SKIN_FLAKY_OR_ITCH_YES_RESET from "../../../../../../actions/ConsentForm/SkinFlakyOrItch/Yes/ACTION_SKIN_FLAKY_OR_ITCH_YES_RESET";
import ACTION_SURGERY_LAST_3_MONTHS_NO_RESET from "../../../../../../actions/ConsentForm/SurgeryLast3Months/No/ACTION_SURGERY_LAST_3_MONTHS_NO_RESET";
import ACTION_SURGERY_LAST_3_MONTHS_YES_RESET from "../../../../../../actions/ConsentForm/SurgeryLast3Months/Yes/ACTION_SURGERY_LAST_3_MONTHS_YES_RESET";
import ACTION_SURGERY_LAST_3_MONTHS_NOTES_RESET from "../../../../../../actions/ConsentForm/SurgeryLast3Months/Yes/Notes/ACTION_SURGERY_LAST_3_MONTHS_NOTES_RESET";
import ACTION_ULTIMATE_SKIN_CARE_GOALS_NOTES_RESET from "../../../../../../actions/ConsentForm/UltimateSkinCareGoals/ACTION_ULTIMATE_SKIN_CARE_GOALS_NOTES_RESET";
import ACTION_LIST_KNOWN_ALLERGIES_NOTES_RESET from "../../../../../../actions/ConsentForm/ListKnownAllergies/ACTION_LIST_KNOWN_ALLERGIES_RESET";
import ACTION_BODY_SCROLL_ALLOW from "../../../../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_FINAL_BOOK_BUTTON_RESET from "../../../../../../actions/FinalBookButton/ACTION_FINAL_BOOK_BUTTON_RESET";
import "../../../../../checkout/ConfirmationPage.css";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";

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
  const guestConsentFormAccessToken = useSelector(
    (state) => state.guestConsentFormAccessToken.access_token
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

  const { data } = useQuery(getClientQuery, {
    fetchPolicy: "no-cache",
    variables: {
      _id: Cookies.get("dummy-token")
        ? jwt.decode(Cookies.get("dummy-token")).id
        : Cookies.get("guest-consent-form-access-token")
        ? jwt.decode(Cookies.get("guest-consent-form-access-token")).id
        : null,
    },
  });

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
        consentFormSignature: LZString.compressToEncodedURIComponent(
          drawingSaveData
        ),
      },
    });
  };

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated && !guestConsentFormAccessToken) {
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
    dispatch(ACTION_BODY_SCROLL_ALLOW());
    dispatch(ACTION_FINAL_BOOK_BUTTON_RESET());
    dispatch(ACTION_ANY_ACCUTANE_NO_RESET());
    dispatch(ACTION_ANY_ACCUTANE_YES_RESET());
    dispatch(ACTION_ANY_ACCUTANE_NOTES_RESET());
    dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET());
    dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET());
    dispatch(ACTION_ANY_FILLERS_OR_BOTOX_NO_RESET());
    dispatch(ACTION_ANY_FILLERS_OR_BOTOX_YES_RESET());
    dispatch(ACTION_ANY_FILLERS_OR_BOTOX_NOTES_RESET());
    dispatch(ACTION_ANY_HEALTH_PROBLEMS_NO_RESET());
    dispatch(ACTION_ANY_HEALTH_PROBLEMS_YES_RESET());
    dispatch(ACTION_ANY_HEALTH_PROBLEMS_NOTES_RESET());
    dispatch(ACTION_EXFOLIATING_SCRUBS_RESET());
    dispatch(ACTION_GLYCOLIC_ACID_RESET());
    dispatch(ACTION_LACTIC_ACID_RESET());
    dispatch(ACTION_SALICYCLIC_ACID_RESET());
    dispatch(ACTION_VITAMIN_A_RESET());
    dispatch(ACTION_ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES_RESET());
    dispatch(ACTION_ANY_WAXING_LAST_5_DAYS_NO_RESET());
    dispatch(ACTION_ANY_WAXING_LAST_5_DAYS_YES_RESET());
    dispatch(ACTION_CONSENT_FORM_DATE_RESET());
    dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET());
    dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET());
    dispatch(ACTION_CONSENT_FORM_PAGE_1());
    dispatch(ACTION_LIST_ANY_MEDICATIONS_NOTES_RESET());
    dispatch(ACTION_LIST_KNOWN_ALLERGIES_NOTES_RESET());
    dispatch(ACTION_PREGNANT_OR_NURSING_NO_RESET());
    dispatch(ACTION_PREGNANT_OR_NURSING_YES_RESET());
    dispatch(ACTION_SKIN_FLAKY_OR_ITCH_NO_RESET());
    dispatch(ACTION_SKIN_FLAKY_OR_ITCH_YES_RESET());
    dispatch(ACTION_SURGERY_LAST_3_MONTHS_NO_RESET());
    dispatch(ACTION_SURGERY_LAST_3_MONTHS_YES_RESET());
    dispatch(ACTION_SURGERY_LAST_3_MONTHS_NOTES_RESET());
    dispatch(ACTION_ULTIMATE_SKIN_CARE_GOALS_NOTES_RESET());
    changeDrawingSaveData("");

    props.clientDataRefetch();
  };

  useEffect(() => {
    if (finalBookButtonActive) {
      props.clientDataRefetch();
    }
  }, [finalBookButtonActive, props]);

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
        {guestConsentFormAccessToken ? null : (
          <Link to="/account/clientprofile">
            <FontAwesomeIcon
              className="client_consent_form_header_back_arrow"
              icon={faChevronLeft}
            />
          </Link>
        )}
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
          <Link
            to="/account/clientprofile/consentform/page6"
            onClick={() => dispatch(ACTION_CONSENT_FORM_DATE_RESET())}
          >
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
        <div className="final_booking_modal">
          <div
            className="final_booking_modal_contents"
            style={{ paddingTop: 0 }}
          >
            <Link
              to={guestConsentFormAccessToken ? "/" : "/account/clientprofile"}
            >
              <FontAwesomeIcon
                className="modal_x"
                icon={faTimes}
                onClick={handleModalBackToClientProfile}
              />
            </Link>
            <div className="modal_consent_form_icon_container">
              <GoChecklist className="modal_consent_form_check_icon" />
            </div>
            <h2 className="modal_statement_of_thanks">Thank you</h2>
            <p className="modal_confirmation_statement">
              {data
                ? data.client !== null
                  ? data.client.firstName[0].toUpperCase() +
                    data.client.firstName.slice(1).toLowerCase()
                  : ""
                : ""}
              , your consent form has been submitted.
            </p>
            <Link
              to={guestConsentFormAccessToken ? "/" : "/account/clientprofile"}
              style={{ zIndex: 999 }}
            >
              <div
                className="dismiss_modal_button"
                onClick={handleModalBackToClientProfile}
              >
                <p>
                  {!props.currentScreenSize
                    ? props.initialScreenSize >= 1200
                      ? guestConsentFormAccessToken
                        ? "BACK TO HOME"
                        : "BACK TO APPOINTMENTS"
                      : guestConsentFormAccessToken
                      ? "BACK TO HOME"
                      : "BACK TO MENU"
                    : props.currentScreenSize >= 1200
                    ? guestConsentFormAccessToken
                      ? "BACK TO HOME"
                      : "BACK TO APPOINTMENTS"
                    : guestConsentFormAccessToken
                    ? "BACK TO HOME"
                    : "BACK TO MENU"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConsentFormPage7;
