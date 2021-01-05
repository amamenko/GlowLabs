import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faSquare,
  faClock,
  faTag,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import { InView } from "react-intersection-observer";
import ACTION_MICRONEEDLE_TOGGLE from "../../../actions/Treatments/Microneedle/ACTION_MICRONEEDLE_TOGGLE";
import ACTION_CALM_TOGGLE_RESET from "../../../actions/Treatments/Calm/ACTION_CALM_TOGGLE_RESET";
import ACTION_CLARIFY_TOGGLE_RESET from "../../../actions/Treatments/Clarify/ACTION_CLARIFY_TOGGLE_RESET";
import ACTION_BACIAL_TOGGLE_RESET from "../../../actions/Treatments/Bacial/ACTION_BACIAL_TOGGLE_RESET";
import ACTION_GLOW_TOGGLE_RESET from "../../../actions/Treatments/Glow/ACTION_GLOW_TOGGLE_RESET";
import ACTION_REJUVENATE_TOGGLE_RESET from "../../../actions/Treatments/Rejuvenate/ACTION_REJUVENATE_TOGGLE_RESET";
import ACTION_QUENCH_TOGGLE_RESET from "../../../actions/Treatments/Quench/ACTION_QUENCH_TOGGLE_RESET";
import ACTION_QUICKIE_TOGGLE_RESET from "../../../actions/Treatments/Quickie/ACTION_QUICKIE_TOGGLE_RESET";
import ACTION_CHEMICAL_PEEL_TOGGLE_RESET from "../../../actions/Treatments/ChemicalPeel/ACTION_CHEMICAL_PEEL_TOGGLE_RESET";
import ACTION_DERMAPLANING_TOGGLE_RESET from "../../../actions/Treatments/Dermaplaning/ACTION_DERMAPLANING_TOGGLE_RESET";
import ACTION_CBD_TOGGLE_RESET from "../../../actions/Treatments/CBD/ACTION_CBD_TOGGLE_RESET";
import ACTION_MICRONEEDLE_TOGGLE_RESET from "../../../actions/Treatments/Microneedle/ACTION_MICRONEEDLE_TOGGLE_RESET";
import ACTION_MICRO_IN_CART from "../../../actions/InCart/Treatments/Microneedle/ACTION_MICRO_IN_CART";
import ACTION_MICRO_NOT_IN_CART from "../../../actions/InCart/Treatments/Microneedle/ACTION_MICRO_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_SELECTED_DAY_RESET from "../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";

// Add-Ons Reset Actions
import ACTION_BEARD_NOT_IN_CART from "../../../actions/InCart/AddOns/Beard/ACTION_BEARD_NOT_IN_CART";
import ACTION_DERMAROLLING_NOT_IN_CART from "../../../actions/InCart/AddOns/Dermarolling/ACTION_DERMAROLLING_NOT_IN_CART";
import ACTION_EXTRACTION_NOT_IN_CART from "../../../actions/InCart/AddOns/ExtraExtractions/ACTION_EXTRACTION_NOT_IN_CART";
import ACTION_GUASHA_NOT_IN_CART from "../../../actions/InCart/AddOns/GuaSha/ACTION_GUASHA_NOT_IN_CART";
import ACTION_HYDROJELLY_NOT_IN_CART from "../../../actions/InCart/AddOns/HydroJellyMask/ACTION_HYDROJELLY_NOT_IN_CART";
import ACTION_MICROCURRENT_NOT_IN_CART from "../../../actions/InCart/AddOns/Microcurrent/ACTION_MICROCURRENT_NOT_IN_CART";
import ACTION_MICRODERMABRASION_NOT_IN_CART from "../../../actions/InCart/AddOns/Microdermabrasion/ACTION_MICRODERMABRASION_NOT_IN_CART";
import ACTION_NANONEEDLING_NOT_IN_CART from "../../../actions/InCart/AddOns/NanoNeedling/ACTION_NANONEEDLING_NOT_IN_CART";

import { toast } from "react-toastify";
import MicroneedleNotification from "./MicroneedleNotification";
import MicroneedleRemovedNotification from "./MicroneedleRemovedNotification";
import FacialInCartErrorNotification from "../FacialInCartErrorNotification";
import "./Microneedle.css";
import ACTION_SALT_CAVE_TOGGLE_RESET from "../../../actions/Treatments/SaltCave/ACTION_SALT_CAVE_TOGGLE_RESET";
import ACTION_JET_HYDRO_PEEL_TOGGLE_RESET from "../../../actions/Treatments/JetHydroPeel/ACTION_JET_HYDRO_PEEL_TOGGLE_RESET";

const Microneedle = (props) => {
  // "Learn More" states
  const calmToggle = useSelector((state) => state.calmToggle.toggle);
  const clarifyToggle = useSelector((state) => state.clarifyToggle.toggle);
  const bacialToggle = useSelector((state) => state.bacialToggle.toggle);
  const glowToggle = useSelector((state) => state.glowToggle.toggle);
  const rejuvenateToggle = useSelector(
    (state) => state.rejuvenateToggle.toggle
  );
  const quenchToggle = useSelector((state) => state.quenchToggle.toggle);
  const quickieToggle = useSelector((state) => state.quickieToggle.toggle);
  const chemicalpeelToggle = useSelector(
    (state) => state.chemicalpeelToggle.toggle
  );
  const dermaplaningToggle = useSelector(
    (state) => state.dermaplaningToggle.toggle
  );
  const cbdToggle = useSelector((state) => state.cbdToggle.toggle);
  const microneedleToggle = useSelector(
    (state) => state.microneedleToggle.toggle
  );
  const saltCaveToggle = useSelector((state) => state.saltCaveToggle.toggle);
  const jetHydroPeelToggle = useSelector(
    (state) => state.jetHydroPeelToggle.toggle
  );

  // In Cart states
  const calmInCart = useSelector((state) => state.calmInCart.in_cart);
  const clarifyInCart = useSelector((state) => state.clarifyInCart.in_cart);
  const bacialInCart = useSelector((state) => state.bacialInCart.in_cart);
  const glowInCart = useSelector((state) => state.glowInCart.in_cart);
  const cbdInCart = useSelector((state) => state.cbdInCart.in_cart);
  const chemicalPeelInCart = useSelector(
    (state) => state.chemicalPeelInCart.in_cart
  );
  const dermaplaningInCart = useSelector(
    (state) => state.dermaplaningInCart.in_cart
  );
  const microneedleInCart = useSelector(
    (state) => state.microneedleInCart.in_cart
  );
  const quenchInCart = useSelector((state) => state.quenchInCart.in_cart);
  const quickieInCart = useSelector((state) => state.quickieInCart.in_cart);
  const rejuvenateInCart = useSelector(
    (state) => state.rejuvenateInCart.in_cart
  );
  const unsureInCart = useSelector((state) => state.unsureInCart.in_cart);
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

  // Add-Ons
  const beardInCart = useSelector((state) => state.beardInCart.in_cart);
  const dermarollingInCart = useSelector(
    (state) => state.dermarollingInCart.in_cart
  );
  const extraExtractionsInCart = useSelector(
    (state) => state.extraExtractionsInCart.in_cart
  );
  const guashaInCart = useSelector((state) => state.guashaInCart.in_cart);
  const hydroJellyInCart = useSelector(
    (state) => state.hydroJellyInCart.in_cart
  );
  const microcurrentInCart = useSelector(
    (state) => state.microcurrentInCart.in_cart
  );
  const microdermabrasionInCart = useSelector(
    (state) => state.microdermabrasionInCart.in_cart
  );
  const nanoneedlingInCart = useSelector(
    (state) => state.nanoneedlingInCart.in_cart
  );

  // Cart States
  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!microneedleToggle) {
      dispatch(ACTION_MICRONEEDLE_TOGGLE());
      if (calmToggle) {
        dispatch(ACTION_CALM_TOGGLE_RESET());
      }
      if (clarifyToggle) {
        dispatch(ACTION_CLARIFY_TOGGLE_RESET());
      }
      if (bacialToggle) {
        dispatch(ACTION_BACIAL_TOGGLE_RESET());
      }
      if (glowToggle) {
        dispatch(ACTION_GLOW_TOGGLE_RESET());
      }
      if (rejuvenateToggle) {
        dispatch(ACTION_REJUVENATE_TOGGLE_RESET());
      }
      if (quenchToggle) {
        dispatch(ACTION_QUENCH_TOGGLE_RESET());
      }
      if (quickieToggle) {
        dispatch(ACTION_QUICKIE_TOGGLE_RESET());
      }
      if (chemicalpeelToggle) {
        dispatch(ACTION_CHEMICAL_PEEL_TOGGLE_RESET());
      }
      if (dermaplaningToggle) {
        dispatch(ACTION_DERMAPLANING_TOGGLE_RESET());
      }
      if (cbdToggle) {
        dispatch(ACTION_CBD_TOGGLE_RESET());
      }
      if (saltCaveToggle) {
        dispatch(ACTION_SALT_CAVE_TOGGLE_RESET());
      }
      if (jetHydroPeelToggle) {
        dispatch(ACTION_JET_HYDRO_PEEL_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_MICRONEEDLE_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (microneedleToggle) {
      return (
        <>
          <div className="card_description_microneedle_toggle">
            <div
              className="card_description_icon_wrapper_container"
              style={{
                paddingTop:
                  props.currentScreenSize === ""
                    ? props.initialScreenSize >= 600 &&
                      props.initialScreenSize <= 1200
                      ? microneedleToggle
                        ? "0.2rem"
                        : "0.7rem"
                      : "0rem"
                    : props.currentScreenSize >= 600 &&
                      props.currentScreenSize <= 1200
                    ? microneedleToggle
                      ? "0.2rem"
                      : "0.7rem"
                    : "0rem",
              }}
            >
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faClock}
                />
                <p className="card_description_paragraph_title">Duration</p>
              </div>
              <div className="card_description_paragraph_value microneedle_paragraph_value">
                <p>50 minutes</p>
              </div>
              <div
                className="card_description_paragraph_icon_wrapper"
                style={{ paddingTop: "0px" }}
              >
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faTag}
                />
                <p className="card_description_paragraph_title">Price</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>$200</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          Collagen production is stimulated via LED and hydrating mask to treat
          scarring and stretch marks.
        </p>
      );
    }
  };

  const SuitcaseBounce = Keyframes.Spring({
    suitcaseBounce: [
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 100 },
      },
      {
        marginTop: "-9px",
        color: "rgb(155, 98, 107)",
        config: { duration: 300 },
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "-6",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "-4px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
    ],
  });

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1400
                  ? "1rem"
                  : props.initialScreenSize >= 1200
                  ? "1rem"
                  : "100%"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1400
                ? "1rem"
                : props.currentScreenSize >= 1200
                ? "1rem"
                : "100%"
            }
            height={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 2200
                  ? "2rem"
                  : props.initialScreenSize >= 1800
                  ? "1.3rem"
                  : props.initialScreenSize >= 1600
                  ? "1.3rem"
                  : props.initialScreenSize >= 1200
                  ? "1.1rem"
                  : props.initialScreenSize >= 360
                  ? "2rem"
                  : "1rem"
                : props.currentScreenSize >= 2200
                ? "2rem"
                : props.currentScreenSize >= 1800
                ? "1.3rem"
                : props.currentScreenSize >= 1600
                ? "1.3rem"
                : props.currentScreenSize >= 1200
                ? "1.1rem"
                : props.currentScreenSize >= 360
                ? "2rem"
                : "1rem"
            }
            style={{
              marginTop:
                props.currentScreenSize === ""
                  ? props.initialScreenSize >= 2200
                    ? "-0.2rem"
                    : props.initialScreenSize >= 1800
                    ? "0"
                    : props.initialScreenSize >= 1600
                    ? "-0.2rem"
                    : props.initialScreenSize >= 1200
                    ? "-0.1rem"
                    : props.initialScreenSize >= 360
                    ? "-0.5rem"
                    : "0rem"
                  : props.currentScreenSize >= 2200
                  ? "-0.2rem"
                  : props.currentScreenSize >= 1800
                  ? "0"
                  : props.currentScreenSize >= 1600
                  ? "-0.2rem"
                  : props.currentScreenSize >= 1200
                  ? "-0.1rem"
                  : props.currentScreenSize >= 360
                  ? "-0.5rem"
                  : "0rem",
              display: microneedleInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (microneedleInCart ? `${styles.x}` : 0) : 0
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        )}
      </Spring>
    );
  };

  const inCartToastId = "facial_already_in_cart";

  const addToCart = () => {
    if (
      calmInCart |
        cbdInCart |
        chemicalPeelInCart |
        clarifyInCart |
        dermaplaningInCart |
        bacialInCart |
        glowInCart |
        quenchInCart |
        quickieInCart |
        rejuvenateInCart ||
      unsureInCart ||
      saltCaveInCart
    ) {
      if (!toast.isActive(inCartToastId)) {
        toast.dismiss();
        toast(
          <FacialInCartErrorNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          {
            className: "toast_error_container",
            toastId: inCartToastId,
          }
        );
      }
    } else {
      if (microneedleInCart) {
        toast.dismiss();
        dispatch(ACTION_MICRO_NOT_IN_CART());
        dispatch(ACTION_DECREMENT_COUNTER());
        dispatch(ACTION_SELECTED_DAY_RESET());
        dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());

        props.resetAllCartStates();
        toast(
          <MicroneedleRemovedNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          {
            className: "toast_removed_container",
          }
        );
      } else {
        toast.dismiss();
        dispatch(ACTION_MICRO_IN_CART());
        dispatch(ACTION_INCREMENT_COUNTER());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        changeCartClicked(true);
        setTimeout(() => changeCartClicked(false), 200);
        toast(
          <MicroneedleNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          { autoClose: 6000 }
        );
        if (beardInCart) {
          dispatch(ACTION_BEARD_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (dermarollingInCart) {
          dispatch(ACTION_DERMAROLLING_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (extraExtractionsInCart) {
          dispatch(ACTION_EXTRACTION_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (guashaInCart) {
          dispatch(ACTION_GUASHA_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (hydroJellyInCart) {
          dispatch(ACTION_HYDROJELLY_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (microcurrentInCart) {
          dispatch(ACTION_MICROCURRENT_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (microdermabrasionInCart) {
          dispatch(ACTION_MICRODERMABRASION_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (nanoneedlingInCart) {
          dispatch(ACTION_NANONEEDLING_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
      }
    }
  };

  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw"
            style={
              microneedleToggle
                ? clarifyInCart |
                    bacialInCart |
                    cbdInCart |
                    chemicalPeelInCart |
                    calmInCart |
                    dermaplaningInCart |
                    glowInCart |
                    microneedleInCart |
                    quenchInCart |
                    quickieInCart |
                    rejuvenateInCart ||
                  unsureInCart ||
                  saltCaveInCart
                  ? { position: "relative" }
                  : styles
                : { position: "relative" }
            }
            onClick={() => addToCart()}
          >
            <FontAwesomeIcon
              color={
                microneedleToggle
                  ? microneedleInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : bacialInCart |
                        cbdInCart |
                        chemicalPeelInCart |
                        calmInCart |
                        dermaplaningInCart |
                        clarifyInCart |
                        glowInCart |
                        quenchInCart |
                        quickieInCart |
                        rejuvenateInCart ||
                      unsureInCart ||
                      saltCaveInCart
                    ? "rgba(211, 211, 211, 0.8"
                    : "rgba(0, 129, 177, 0.4)"
                  : microneedleInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : bacialInCart |
                      cbdInCart |
                      chemicalPeelInCart |
                      calmInCart |
                      dermaplaningInCart |
                      clarifyInCart |
                      glowInCart |
                      quenchInCart |
                      quickieInCart |
                      rejuvenateInCart ||
                    unsureInCart ||
                    saltCaveInCart
                  ? "rgba(211, 211, 211, 0.8)"
                  : "rgba(0, 129, 177, 0.3)"
              }
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
            {checkMark()}
            <FontAwesomeIcon
              className="small_screen_card_description_suitcase"
              style={{ display: microneedleInCart ? "none" : "block" }}
              color={
                bacialInCart |
                  cbdInCart |
                  chemicalPeelInCart |
                  calmInCart |
                  dermaplaningInCart |
                  clarifyInCart |
                  glowInCart |
                  quenchInCart |
                  quickieInCart |
                  rejuvenateInCart ||
                unsureInCart ||
                saltCaveInCart
                  ? "rgb(151, 151, 151)"
                  : "rgb(0, 129, 177)"
              }
              icon={faSuitcase}
            />
          </span>
        )}
      </SuitcaseBounce>
    );
  };

  const bigScreenBottomWrapperRender = () => {
    return (
      <div className="big_screen_entire_bottom_wrapper">
        <div className="big_screen_price_wrapper">
          <FontAwesomeIcon
            className="big_screen_card_description_icon"
            icon={faTag}
          />
          <p className="big_screen_price">$200</p>
        </div>
        <div className="big_screen_duration_wrapper">
          <FontAwesomeIcon
            className="big_screen_card_description_icon"
            icon={faClock}
          />
          <p className="big_screen_duration">50 minutes</p>
        </div>
      </div>
    );
  };

  const smallScreenBottomWrapperRender = () => {
    return (
      <div
        className="card_bottom_wrapper"
        style={{
          color: microneedleToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          paddingTop:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 600 &&
                props.initialScreenSize <= 1200
                ? microneedleToggle
                  ? "0.2rem"
                  : "0.7rem"
                : "0rem"
              : props.currentScreenSize >= 600 &&
                props.currentScreenSize <= 1200
              ? microneedleToggle
                ? "0.2rem"
                : "0.7rem"
              : "0rem",
          transition: "color 0.5s ease",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {microneedleToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
        </p>
        <span className="card_bottom_spacer" />
        {bookButtonBounce()}
      </div>
    );
  };

  const dynamicScreenSizeBottomCardRender = () => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        return bigScreenBottomWrapperRender();
      } else {
        return smallScreenBottomWrapperRender();
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        return bigScreenBottomWrapperRender();
      } else {
        return smallScreenBottomWrapperRender();
      }
    }
  };

  const bigScreenAddToCartButton = () => {
    if (microneedleInCart) {
      return (
        <>
          {checkMark()}
          <p className="big_screen_in_cart">IN CART</p>
        </>
      );
    } else {
      return (
        <>
          <FontAwesomeIcon
            className="big_screen_card_description_suitcase"
            icon={faSuitcase}
          />
          <p>BOOK NOW</p>
        </>
      );
    }
  };

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div
          className="card_container"
          ref={ref}
          style={{ display: props.cbdMicroneedlingRendered }}
        >
          {inView ? (
            <Spring
              from={{ position: "relative", opacity: 0 }}
              to={{ position: "relative", opacity: 1 }}
              config={{ duration: 1000 }}
            >
              {(styleprops) => (
                <section className="card" style={styleprops}>
                  <div
                    className="card_image"
                    style={{
                      backgroundColor: microneedleToggle
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: microneedleToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGem}
                      className="facial_advanced_treatment_icon"
                      style={{
                        color: microneedleToggle
                          ? "rgb(0, 0, 0)"
                          : "rgb(111, 111, 111)",
                      }}
                    />
                    <Spring
                      from={{ x: 300, fill: "white" }}
                      to={{ x: 0, fill: "rgba(253, 253, 150, 0.3)" }}
                      config={{ delay: 300, duration: 1000 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => addToCart()}
                            style={{
                              background: bookNowButtonHovered
                                ? microneedleInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      clarifyInCart |
                                      glowInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : microneedleInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    clarifyInCart |
                                    glowInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? microneedleInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      clarifyInCart |
                                      glowInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : microneedleInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    clarifyInCart |
                                    glowInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? microneedleInCart
                                  ? "rgb(0, 0, 0)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      clarifyInCart |
                                      glowInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : microneedleInCart
                                ? "rgb(0, 0, 0)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    clarifyInCart |
                                    glowInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "rgb(141, 141, 141)"
                                : "rgb(0, 129, 177)",
                              cursor:
                                bacialInCart |
                                  cbdInCart |
                                  chemicalPeelInCart |
                                  calmInCart |
                                  dermaplaningInCart |
                                  clarifyInCart |
                                  glowInCart |
                                  quenchInCart |
                                  quickieInCart |
                                  rejuvenateInCart ||
                                unsureInCart ||
                                saltCaveInCart
                                  ? "auto"
                                  : "pointer",
                              transition: "all 0.5s ease",
                            }}
                            onMouseEnter={() =>
                              changeBookNowButtonHovered(true)
                            }
                            onMouseLeave={() =>
                              changeBookNowButtonHovered(false)
                            }
                          >
                            {bigScreenAddToCartButton()}
                          </div>
                          <svg
                            className="card_svg"
                            width="100%"
                            height="15rem"
                            viewBox="0 0 132.292 132.292"
                          >
                            <circle
                              cx="66.146"
                              cy="66.146"
                              r={
                                props.currentScreenSize === ""
                                  ? props.initialScreenSize >= 1200
                                    ? "51.646"
                                    : "60.146"
                                  : props.currentScreenSize >= 1200
                                  ? "51.646"
                                  : "60.146"
                              }
                              stroke={
                                microneedleToggle
                                  ? "rgb(25, 154, 202)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g
                              fill={`${styles.fill}`}
                              stroke="#000"
                              strokeWidth="1.8"
                              transform="translate(37, 35)"
                            >
                              <animated.path
                                strokeDasharray="300"
                                strokeDashoffset={`${styles.x}`}
                                className="microneedle_icon_path"
                                d="M40.498 121.36l.187-.675.436-4.606.499-4.79.498-4.237.374-4.053.437-3.316 1.121-5.896.873-3.5 1.122-3.07 1.433-3.071 1.434-2.456 1.37-1.843 1.496-1.596 2.306-2.027 2.057-1.29 2.804-1.473 2.68-1.229 3.054-.92 4.05-1.106 3.18-.676 1.931-.43 1.808-.43.935-.06-.063-.185-.124-.123-2.12-.184-2.056-.307-2.992-.492-3.49-.798-3.303-.982-2.866-1.044-2.556-1.106-1.87-1.167-2.18-1.596-1.434-1.351-1.371-1.413-1.247-1.903-.934-1.781-1.371-2.702-.873-2.64-.935-3.685-.623-3.132-.81-3.93-.436-3.992-.437-3.316-.935-7.124-.498-4.114-.312-2.763-.25-1.229-.248 1.597-.437 3.746-1.06 9.334-.498 4.974-.685 3.93-.748 4.3-.997 4.114-.81 2.824-1.31 3.194-1.495 2.518-1.87 2.579-1.87 1.78-2.43 1.782-2.493 1.473-2.68 1.044-2.056.676-2.556.798-2.742.614-2.306.553-2.991.553-1.994.245H4.91l-.498.185.062.368 1.122.062 1.496.307 1.496.246 1.682.307 2.618.737 2.617.736 2.68.86 2.493.921 2.992 1.413 3.116 1.842 2.493 2.21 1.558 1.843 1.87 2.825 1.246 2.518 1.184 3.009.56 1.78.686 2.948.686 3.316.748 3.808.311 2.64.499 3.93.499 3.562.374 3.746z"
                              />
                              <animated.path
                                strokeDasharray="300"
                                strokeDashoffset={`${styles.x}`}
                                className="microneedle_icon_path"
                                d="M40.498 121.36l.187-.675.436-4.606.499-4.79.498-4.237.374-4.053.437-3.316 1.121-5.896.873-3.5 1.122-3.07 1.433-3.071 1.434-2.456 1.37-1.843 1.496-1.596 2.306-2.027 2.057-1.29 2.804-1.473 2.68-1.229 3.054-.92 4.05-1.106 3.18-.676 1.931-.43 1.808-.43.935-.06-.063-.185-.124-.123-2.12-.184-2.056-.307-2.992-.492-3.49-.798-3.303-.982-2.866-1.044-2.556-1.106-1.87-1.167-2.18-1.596-1.434-1.351-1.371-1.413-1.247-1.903-.934-1.781-1.371-2.702-.873-2.64-.935-3.685-.623-3.132-.81-3.93-.436-3.992-.437-3.316-.935-7.124-.498-4.114-.312-2.763-.25-1.229-.248 1.597-.437 3.746-1.06 9.334-.498 4.974-.685 3.93-.748 4.3-.997 4.114-.81 2.824-1.31 3.194-1.495 2.518-1.87 2.579-1.87 1.78-2.43 1.782-2.493 1.473-2.68 1.044-2.056.676-2.556.798-2.742.614-2.306.553-2.991.553-1.994.245H4.91l-.498.185.062.368 1.122.062 1.496.307 1.496.246 1.682.307 2.618.737 2.617.736 2.68.86 2.493.921 2.992 1.413 3.116 1.842 2.493 2.21 1.558 1.843 1.87 2.825 1.246 2.518 1.184 3.009.56 1.78.686 2.948.686 3.316.748 3.808.311 2.64.499 3.93.499 3.562.374 3.746z"
                              />
                              <animated.path
                                strokeDasharray="300"
                                strokeDashoffset={`${styles.x}`}
                                className="microneedle_icon_path"
                                d="M40.498 121.36l.187-.675.436-4.606.499-4.79.498-4.237.374-4.053.437-3.316 1.121-5.896.873-3.5 1.122-3.07 1.433-3.071 1.434-2.456 1.37-1.843 1.496-1.596 2.306-2.027 2.057-1.29 2.804-1.473 2.68-1.229 3.054-.92 4.05-1.106 3.18-.676 1.931-.43 1.808-.43.935-.06-.063-.185-.124-.123-2.12-.184-2.056-.307-2.992-.492-3.49-.798-3.303-.982-2.866-1.044-2.556-1.106-1.87-1.167-2.18-1.596-1.434-1.351-1.371-1.413-1.247-1.903-.934-1.781-1.371-2.702-.873-2.64-.935-3.685-.623-3.132-.81-3.93-.436-3.992-.437-3.316-.935-7.124-.498-4.114-.312-2.763-.25-1.229-.248 1.597-.437 3.746-1.06 9.334-.498 4.974-.685 3.93-.748 4.3-.997 4.114-.81 2.824-1.31 3.194-1.495 2.518-1.87 2.579-1.87 1.78-2.43 1.782-2.493 1.473-2.68 1.044-2.056.676-2.556.798-2.742.614-2.306.553-2.991.553-1.994.245H4.91l-.498.185.062.368 1.122.062 1.496.307 1.496.246 1.682.307 2.618.737 2.617.736 2.68.86 2.493.921 2.992 1.413 3.116 1.842 2.493 2.21 1.558 1.843 1.87 2.825 1.246 2.518 1.184 3.009.56 1.78.686 2.948.686 3.316.748 3.808.311 2.64.499 3.93.499 3.562.374 3.746zM111.87 74.93l.097-.372.226-2.535.26-2.636.258-2.332.194-2.231.227-1.825.582-3.245.453-1.927.582-1.69.745-1.69.744-1.352.711-1.014.777-.879 1.197-1.115 1.068-.71 1.456-.811 1.39-.676 1.586-.507 2.103-.608 1.65-.372 1.003-.237.938-.236.486-.034-.033-.102-.064-.067-1.1-.101-1.068-.17-1.553-.27-1.812-.439-1.715-.54-1.488-.575-1.326-.609-.971-.642-1.132-.879-.745-.743-.711-.778-.647-1.048-.486-.98-.711-1.487-.453-1.453-.486-2.028-.323-1.724-.42-2.163-.227-2.197-.227-1.826-.485-3.92-.259-2.265-.162-1.521-.13-.676-.129.879-.226 2.062-.55 5.137-.259 2.738-.356 2.163-.388 2.366-.518 2.265-.42 1.555-.68 1.757-.776 1.386-.97 1.42-.971.98-1.262.98-1.294.811-1.392.575-1.067.372-1.327.44-1.423.337-1.197.304-1.553.305-1.036.135h-.68l-.258.101.032.203.583.034.776.169.777.135.873.17 1.36.405 1.358.405 1.391.474 1.294.507 1.553.777 1.618 1.014 1.294 1.217.81 1.014.97 1.555.647 1.385.614 1.657.292.98.356 1.622.355 1.825.389 2.096.161 1.453.26 2.164.258 1.96.194 2.062zM80.951 93.62c.573-.08 1.719-.239 2.791-.47s2.071-.536 2.967-.912c.896-.377 1.69-.826 2.358-1.361a7.35 7.35 0 001.69-1.932c.476-.774.888-1.701 1.202-2.671s.538-2.012.736-3.184c.198-1.172.375-2.49.566-4.054.19-1.564.396-3.372.543-4.29.147-.92.236-.949.309-.566.073.382.132 1.18.235 2.216.103 1.035.25 2.308.455 3.828s.47 3.286.793 4.712.705 2.51 1.036 3.264c.33.752.61 1.172.977 1.592s.822.84 1.234 1.158c.411.318.778.535 1.33.803.55.268 1.284.586 2.2.883.917.296 2.022.572 2.911.731s1.565.203 1.902.282c.338.08.338.166.162.239-.177.073-.529.116-1.315.275-.786.16-2.005.434-2.989.738s-1.733.637-2.49 1.043c-.757.405-1.52.882-2.181 1.512s-1.22 1.411-1.601 2.034a7.734 7.734 0 00-.809 1.737 28.16 28.16 0 00-.653 2.315c-.199.826-.36 1.636-.492 2.54a61.672 61.672 0 00-.323 2.802 74.368 74.368 0 00-.213 2.49c-.052.795-.081 1.591-.17 1.99-.087.397-.234.397-.322.18s-.118-.651-.199-1.548a152.27 152.27 0 00-.345-3.41 37.472 37.472 0 00-.501-3.277c-.237-1.187-.572-2.592-.895-3.605-.323-1.013-.631-1.62-.91-2.12s-.53-.89-.911-1.346a9.704 9.704 0 00-1.44-1.397 8.692 8.692 0 00-1.703-1.008c-.586-.27-1.161-.483-1.756-.7s-1.197-.434-1.8-.602-1.175-.28-1.674-.353c-.5-.073-.91-.102-1.11-.174-.198-.073-.183-.188-.175-.246.007-.058.007-.058.58-.138zM57.925 124.44a68.045 68.045 0 00-.125-1.375c-.059-.572-.132-1.18-.251-1.794s-.278-1.21-.483-1.723c-.206-.514-.456-.934-.793-1.274-.338-.34-.764-.6-1.205-.796s-.896-.326-1.285-.413c-.39-.087-.713-.13-.918-.159-.206-.029-.294-.043-.338-.102-.045-.058-.045-.159-.03-.231.015-.072.045-.116.19-.123.146-.007.413.022.706.006.294-.016.588-.071.926-.173.337-.101.705-.246 1.043-.42s.646-.376.874-.593.374-.449.524-.693c.15-.244.291-.48.386-.733.096-.253.14-.514.235-.948.096-.434.243-1.042.331-1.78.088-.738.117-1.607.176-2.041.06-.434.147-.434.22-.434.074 0 .133 0 .155.158.022.159.007.478.015.993.007.514.036 1.222.146 1.946.11.724.301 1.462.5 2.02.198.557.404.933.646 1.23.243.297.522.514.838.695.315.18.668.325 1.006.448.338.123.66.225 1.028.275.367.051.779.051.97.109.19.058.161.173.11.246-.052.072-.125.101-.243.123a5.204 5.204 0 01-.448.05c-.169.015-.345.03-.52.069a4.493 4.493 0 00-.567.178c-.242.087-.565.203-.903.391-.338.188-.69.449-.955.68-.264.232-.44.434-.565.63a2.788 2.788 0 00-.27.58 8.834 8.834 0 00-.224.7c-.075.275-.145.58-.219 1-.073.42-.147.94-.213 1.44s-.125.977-.168 1.324c-.043.348-.074.593-.118.702-.044.109-.103.094-.132.087-.03-.007-.03-.007-.052-.275zM66.611 35.22c-.062-.47-.187-1.413-.301-2.405s-.218-2.037-.436-3.153c-.219-1.115-.551-2.303-.925-3.295s-.79-1.791-1.246-2.354c-.457-.563-.956-.89-1.6-1.208-.644-.317-1.433-.624-2.244-.878s-1.682-.463-2.253-.616-.863-.256-.655-.348c.208-.092.914-.174 1.652-.297.737-.123 1.506-.287 2.223-.553a8.142 8.142 0 001.942-1.044c.56-.41 1.018-.86 1.433-1.453s.79-1.33 1.07-2.303.468-2.18.654-3.582.374-3 .501-3.94c.127-.941.185-1.188.227-1.27.041-.082.062.02.083.41.02.39.041 1.064.135 1.883.093.819.26 1.78.47 2.886s.454 2.313.755 3.378c.302 1.064.655 1.965 1.102 2.65.446.686.986 1.157 1.672 1.546.686.389 1.517.696 2.41.952.893.256 1.849.46 2.43.583.582.123.79.164.831.215.042.051-.083.113-.457.207-.374.095-.955.213-1.693.418a18.9 18.9 0 00-2.295.788c-.686.297-1.184.604-1.662 1.003-.478.4-.935.89-1.247 1.34-.311.45-.477.86-.706 1.413-.229.553-.52 1.248-.706 2.037-.187.788-.27 1.668-.374 2.548-.104.88-.229 1.76-.353 2.58-.125.818-.25 1.576-.312 1.954-.062.38-.062.379-.125-.092zM81.018 63.38c-.052-.44-.156-1.32-.239-2.2-.083-.88-.145-1.761-.322-2.641s-.467-1.76-.769-2.395-.612-1.024-.997-1.351c-.384-.328-.841-.594-1.36-.83-.52-.235-1.101-.44-1.61-.613-.51-.174-.945-.317-.873-.41.073-.092.655-.133 1.195-.235a6.742 6.742 0 001.433-.44c.395-.174.686-.359.997-.645a5.03 5.03 0 00.945-1.198 7.66 7.66 0 00.77-1.965c.196-.788.321-1.71.446-2.62.124-.91.249-1.812.344-2.425.096-.614.154-.902.227-.564.073.337.156 1.32.25 2.19s.197 1.628.332 2.344c.135.717.3 1.392.498 1.996.198.604.426 1.136.754 1.553.327.416.773.73 1.315 1.003.541.273 1.224.525 1.723.679s.83.215 1.1.256c.27.04.479.06.551.132.073.072.01.195-.218.287-.23.092-.623.154-1.05.277a9.159 9.159 0 00-1.297.501c-.416.194-.79.4-1.133.645-.343.246-.654.532-.903.829s-.437.603-.613 1.003c-.177.4-.343.89-.489 1.566-.145.676-.27 1.535-.425 2.518-.156.982-.343 2.087-.437 2.64-.093.553-.093.553-.145.113z"
                              />
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <p
                      className="facial_advanced_treatment_designation"
                      style={{
                        color: microneedleToggle
                          ? "rgb(0, 0, 0)"
                          : "rgb(111, 111, 111)",
                      }}
                    >
                      Advanced Treatment
                    </p>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: microneedleToggle
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: microneedleToggle
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: microneedleToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>MICRONEEDLE INFUSION</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.6 }}
                      >
                        Repairing
                      </p>
                      {cardDescriptionHandler()}
                      {dynamicScreenSizeBottomCardRender()}
                    </div>
                  </div>
                </section>
              )}
            </Spring>
          ) : null}
        </div>
      )}
    </InView>
  );
};

export default Microneedle;
