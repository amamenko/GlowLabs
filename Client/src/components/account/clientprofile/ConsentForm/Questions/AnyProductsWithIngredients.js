import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { Spring } from "react-spring/renderprops";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_GLYCOLIC_ACID_RESET from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/GlycolicAcid/ACTION_GLYCOLIC_ACID_RESET";
import ACTION_GLYCOLIC_ACID from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/GlycolicAcid/ACTION_GLYCOLIC_ACID";
import ACTION_LACTIC_ACID_RESET from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/LacticAcid/ACTION_LACTIC_ACID_RESET";
import ACTION_LACTIC_ACID from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/LacticAcid/ACTION_LACTIC_ACID";
import ACTION_SALICYCLIC_ACID_RESET from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/SalicyclicAcid/ACTION_SALICYCLIC_ACID_RESET";
import ACTION_SALICYCLIC_ACID from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/SalicyclicAcid/ACTION_SALICYCLIC_ACID";
import ACTION_EXFOLIATING_SCRUBS_RESET from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/ExfoliatingScrubs/ACTION_EXFOLIATING_SCRUBS_RESET";
import ACTION_EXFOLIATING_SCRUBS from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/ExfoliatingScrubs/ACTION_EXFOLIATING_SCRUBS";
import ACTION_VITAMIN_A_RESET from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/VitaminA/ACTION_VITAMIN_A_RESET";
import ACTION_VITAMIN_A from "../../../../../actions/ConsentForm/AnyProductsWithIngredients/VitaminA/ACTION_VITAMIN_A";

const AnyProductsWithIngredients = (props) => {
  const dispatch = useDispatch();

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

  const [pageOpened, changePageOpened] = useState(false);

  useEffect(() => {
    changePageOpened(true);
    const pageNowOpen = setTimeout(() => {
      changePageOpened(false);
    }, 500);
    return () => {
      clearTimeout(pageNowOpen);
    };
  }, []);

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1600
                  ? "1rem"
                  : props.initialScreenSize >= 1200
                  ? "0.5rem"
                  : "100%"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
                ? "1rem"
                : props.currentScreenSize >= 1200
                ? "0.5rem"
                : "100%"
            }
            height={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1600
                  ? "1.3rem"
                  : props.initialScreenSize >= 1200
                  ? "0.5rem"
                  : props.initialScreenSize >= 360
                  ? "2rem"
                  : "1rem"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
                ? "1.3rem"
                : props.currentScreenSize >= 1200
                ? "0.5rem"
                : props.currentScreenSize >= 360
                ? "2rem"
                : "1rem"
            }
            style={{
              display: "block",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={pageOpened ? 0 : `${styles.x}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        )}
      </Spring>
    );
  };

  const handleGlycolicAcidClicked = () => {
    if (ingredientGlycolicAcid) {
      dispatch(ACTION_GLYCOLIC_ACID_RESET());
    } else {
      dispatch(ACTION_GLYCOLIC_ACID());
    }
  };

  const handleLacticAcidClicked = () => {
    if (ingredientLacticAcid) {
      dispatch(ACTION_LACTIC_ACID_RESET());
    } else {
      dispatch(ACTION_LACTIC_ACID());
    }
  };

  const handleSalicyclicAcidClicked = () => {
    if (ingredientSalicyclicAcid) {
      dispatch(ACTION_SALICYCLIC_ACID_RESET());
    } else {
      dispatch(ACTION_SALICYCLIC_ACID());
    }
  };

  const handleExfoliatingScrubsClicked = () => {
    if (ingredientExfoliatingScrubs) {
      dispatch(ACTION_EXFOLIATING_SCRUBS_RESET());
    } else {
      dispatch(ACTION_EXFOLIATING_SCRUBS());
    }
  };

  const handleVitaminAClicked = () => {
    if (ingredientVitaminA) {
      dispatch(ACTION_VITAMIN_A_RESET());
    } else {
      dispatch(ACTION_VITAMIN_A());
    }
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Are you currently using any products that contain the following
        ingredients?
      </p>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleSalicyclicAcidClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {ingredientSalicyclicAcid ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">
          Salicyclic acid
        </p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </div>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleGlycolicAcidClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {ingredientGlycolicAcid ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">
          Glycolic acid
        </p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </div>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleLacticAcidClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {ingredientLacticAcid ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">Lactic acid</p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </div>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleExfoliatingScrubsClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {ingredientExfoliatingScrubs ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">
          Exfoliating Scrubs
        </p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </div>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleVitaminAClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {ingredientVitaminA ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">
          Vitamin A (Retinol)
        </p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </div>
    </div>
  );
};

export default AnyProductsWithIngredients;
