import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faSquare,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { InView } from "react-intersection-observer";
import ACTION_QUICKIE_TOGGLE from "../../../actions/Treatments/Quickie/ACTION_QUICKIE_TOGGLE";
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
import ACTION_QUICKIE_IN_CART from "../../../actions/InCart/Treatments/Quickie/ACTION_QUICKIE_IN_CART";
import ACTION_QUICKIE_NOT_IN_CART from "../../../actions/InCart/Treatments/Quickie/ACTION_QUICKIE_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_AVAILABILITY_RESET from "../../../actions/AvailabilityClicked/ACTION_AVAILABILITY_RESET";
import ACTION_SELECTED_DAY_RESET from "../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import ACTION_REFORMATTED_DAY_RESET from "../../../actions/SelectedDay/ReformattedDay/ACTION_REFORMATTED_DAY_RESET";
import ACTION_SELECTED_TIME_RESET from "../../../actions/SelectedTime/ACTION_SELECTED_TIME_RESET";

import { toast } from "react-toastify";
import QuickieNotification from "./QuickieNotification";
import QuickieRemovedNotification from "./QuickieRemovedNotification";
import FacialInCartErrorNotification from "../FacialInCartErrorNotification";
import "./Quickie.css";
import ACTION_JET_HYDRO_PEEL_TOGGLE_RESET from "../../../actions/Treatments/JetHydroPeel/ACTION_JET_HYDRO_PEEL_TOGGLE_RESET";

const Quickie = (props) => {
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

  // Cart States
  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);
  const reformattedDay = useSelector(
    (state) => state.reformattedDay.reformattedDay
  );
  const selectedTime = useSelector((state) => state.selectedTime.selectedTime);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!quickieToggle) {
      dispatch(ACTION_QUICKIE_TOGGLE());
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
      if (chemicalpeelToggle) {
        dispatch(ACTION_CHEMICAL_PEEL_TOGGLE_RESET());
      }
      if (dermaplaningToggle) {
        dispatch(ACTION_DERMAPLANING_TOGGLE_RESET());
      }
      if (cbdToggle) {
        dispatch(ACTION_CBD_TOGGLE_RESET());
      }
      if (microneedleToggle) {
        dispatch(ACTION_MICRONEEDLE_TOGGLE_RESET());
      }
      if (jetHydroPeelToggle) {
        dispatch(ACTION_JET_HYDRO_PEEL_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_QUICKIE_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (quickieToggle) {
      return (
        <>
          <div className="card_description_paragraph_toggle">
            <div className="card_description_icon_wrapper_container">
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faClock}
                />
                <p className="card_description_paragraph_title">Duration</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>30 minutes</p>
              </div>
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faTag}
                />
                <p className="card_description_paragraph_title">Price</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>$50</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          Quickie is an all-encompassing, fast, focused treatment meant to give
          you a boost for a night out or big event.
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
              display: quickieInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (quickieInCart ? `${styles.x}` : 0) : 0
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
        microneedleInCart |
        rejuvenateInCart |
        quenchInCart |
        glowInCart ||
      unsureInCart
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
      if (quickieInCart) {
        toast.dismiss();
        dispatch(ACTION_QUICKIE_NOT_IN_CART());
        dispatch(ACTION_DECREMENT_COUNTER());
        dispatch(ACTION_AVAILABILITY_RESET());
        dispatch(ACTION_SELECTED_DAY_RESET());
        dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        if (reformattedDay) {
          dispatch(ACTION_REFORMATTED_DAY_RESET());
        }
        if (selectedTime) {
          dispatch(ACTION_SELECTED_TIME_RESET());
        }
        toast(
          <QuickieRemovedNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          {
            className: "toast_removed_container",
          }
        );
      } else {
        toast.dismiss();
        dispatch(ACTION_QUICKIE_IN_CART());
        dispatch(ACTION_INCREMENT_COUNTER());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        changeCartClicked(true);
        setTimeout(() => changeCartClicked(false), 200);
        toast(
          <QuickieNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />
        );
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
              quickieToggle
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
                    rejuvenateInCart || unsureInCart
                  ? { position: "relative" }
                  : styles
                : { position: "relative" }
            }
            onClick={() => addToCart()}
          >
            <FontAwesomeIcon
              color={
                quickieToggle
                  ? quickieInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : calmInCart |
                        cbdInCart |
                        chemicalPeelInCart |
                        clarifyInCart |
                        dermaplaningInCart |
                        bacialInCart |
                        microneedleInCart |
                        rejuvenateInCart |
                        quenchInCart |
                        glowInCart || unsureInCart
                    ? "rgba(211, 211, 211, 0.8"
                    : "rgba(0, 129, 177, 0.4)"
                  : quickieInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : calmInCart |
                      cbdInCart |
                      chemicalPeelInCart |
                      clarifyInCart |
                      dermaplaningInCart |
                      bacialInCart |
                      microneedleInCart |
                      rejuvenateInCart |
                      quenchInCart |
                      glowInCart || unsureInCart
                  ? "rgba(211, 211, 211, 0.8"
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
              style={{ display: quickieInCart ? "none" : "block" }}
              color={
                calmInCart |
                  cbdInCart |
                  chemicalPeelInCart |
                  clarifyInCart |
                  dermaplaningInCart |
                  bacialInCart |
                  microneedleInCart |
                  rejuvenateInCart |
                  quenchInCart |
                  glowInCart || unsureInCart
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
          <p className="big_screen_price">$50</p>
        </div>
        <div className="big_screen_duration_wrapper">
          <FontAwesomeIcon
            className="big_screen_card_description_icon"
            icon={faClock}
          />
          <p className="big_screen_duration">30 minutes</p>
        </div>
      </div>
    );
  };

  const smallScreenBottomWrapperRender = () => {
    return (
      <div
        className="card_bottom_wrapper"
        style={{
          color: quickieToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {quickieToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
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
    if (quickieInCart) {
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
          style={{ display: props.quickieChemPeelRendered }}
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
                      backgroundColor: quickieToggle
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: quickieToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <Spring
                      from={{ x: 200, fill1: "white", fill2: "white" }}
                      to={{
                        x: 0,
                        fill1: "rgba(255, 179, 71, 0.4)",
                        fill2: "rgba(255, 179, 71, 0.9)",
                      }}
                      config={{ duration: 2000 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => addToCart()}
                            style={{
                              background: bookNowButtonHovered
                                ? quickieInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : calmInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
                                      dermaplaningInCart |
                                      bacialInCart |
                                      microneedleInCart |
                                      rejuvenateInCart |
                                      quenchInCart |
                                      glowInCart || unsureInCart
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : quickieInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : calmInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
                                    dermaplaningInCart |
                                    bacialInCart |
                                    microneedleInCart |
                                    rejuvenateInCart |
                                    quenchInCart |
                                    glowInCart || unsureInCart
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? quickieInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : calmInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
                                      dermaplaningInCart |
                                      bacialInCart |
                                      microneedleInCart |
                                      rejuvenateInCart |
                                      quenchInCart |
                                      glowInCart || unsureInCart
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : quickieInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : calmInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
                                    dermaplaningInCart |
                                    bacialInCart |
                                    microneedleInCart |
                                    rejuvenateInCart |
                                    quenchInCart |
                                    glowInCart || unsureInCart
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? quickieInCart
                                  ? "rgb(0, 0, 0)"
                                  : calmInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
                                      dermaplaningInCart |
                                      bacialInCart |
                                      microneedleInCart |
                                      rejuvenateInCart |
                                      quenchInCart |
                                      glowInCart || unsureInCart
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : quickieInCart
                                ? "rgb(0, 0, 0)"
                                : calmInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
                                    dermaplaningInCart |
                                    bacialInCart |
                                    microneedleInCart |
                                    rejuvenateInCart |
                                    quenchInCart |
                                    glowInCart || unsureInCart
                                ? "rgb(141, 141, 141)"
                                : "rgb(0, 129, 177)",
                              cursor:
                                calmInCart |
                                  cbdInCart |
                                  chemicalPeelInCart |
                                  clarifyInCart |
                                  dermaplaningInCart |
                                  bacialInCart |
                                  microneedleInCart |
                                  rejuvenateInCart |
                                  quenchInCart |
                                  glowInCart || unsureInCart
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
                            viewBox="0 0 50.006 50.006"
                          >
                            <circle
                              cx="25"
                              cy="25"
                              r={
                                props.currentScreenSize === ""
                                  ? props.initialScreenSize >= 1200
                                    ? "20"
                                    : "23"
                                  : props.currentScreenSize >= 1200
                                  ? "20"
                                  : "23"
                              }
                              stroke={
                                quickieToggle
                                  ? "rgb(25, 154, 202)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g
                              transform="translate(13 -112)"
                              fill="none"
                              stroke="#000"
                              strokeWidth="0.8"
                              strokeLinecap="butt"
                              strokeLinejoin="miter"
                              strokeOpacity="1"
                              strokeMiterlimit="4"
                              strokeDasharray="none"
                            >
                              <animated.path
                                fill={`${styles.fill1}`}
                                strokeDasharray="200"
                                strokeDashoffset={`${styles.x}`}
                                className="quickie_icon_path"
                                d="M27.014 289.39c-.286.008-.859.022-1.423.03-.565.006-1.122.006-1.62-.03a11.64 11.64 0 01-1.445-.205c-.512-.1-1.1-.227-1.732-.44a19.108 19.108 0 01-1.875-.774 15.631 15.631 0 01-1.468-.76c-.452-.269-.904-.581-1.318-.9a12.47 12.47 0 01-1.209-1.062 15.089 15.089 0 01-1.306-1.473 13.757 13.757 0 01-1.113-1.714 14.512 14.512 0 01-.95-2.062c-.294-.795-.565-1.732-.7-2.64a12.527 12.527 0 01-.106-2.4c.03-.61.09-.95.21-1.518.121-.568.302-1.363.528-2.073.226-.71.497-1.334.843-1.98a14.51 14.51 0 011.21-1.891 12.63 12.63 0 011.384-1.526c.47-.444.96-.849 1.427-1.204a19.55 19.55 0 011.375-.956c.456-.29.93-.563 1.376-.784.447-.22.864-.389 1.308-.545.444-.156.911-.298 1.28-.383.369-.085.64-.114.836-.142.196-.029.316-.057.384-.071.068-.015.083-.015.098-.407.015-.393.03-1.198-.023-1.588-.052-.39-.173-.376-.316-.376-.143 0-.309-.014-.46-.028a1.466 1.466 0 01-.391-.071c-.105-.043-.18-.114-.233-.256-.053-.142-.083-.355-.098-.603a13.25 13.25 0 01-.008-.994 28.3 28.3 0 01.053-1.476c.03-.377.075-.49.15-.568a.656.656 0 01.31-.156c.127-.036.278-.064 1.474-.071a322.54 322.54 0 014.58.021c1.136.014 1.167.028 1.212.085a.779.779 0 01.135.27c.03.113.03.241.038.802.007.562.022 1.554.007 2.122-.015.568-.06.71-.15.802-.09.093-.226.135-.377.156-.15.022-.316.022-.49.022-.172 0-.353 0-.443.37-.09.368-.09 1.106.03 1.51.12.405.361.476.557.519.196.042.346.057.595.113.248.057.595.157 1.016.298.422.142.919.327 1.363.526.444.198.836.411 1.167.61.332.199.603.383.784.447.18.064.27.007.309-.248.037-.255.022-.738.406-1.327.384-.59 1.167-1.3 1.589-1.683.421-.383.482-.44.557-.474a.495.495 0 01.286-.03c.09.022.166.079.617.504.452.426 1.28 1.221 1.695 1.675.414.455.414.568.391.675-.022.106-.067.205-.463.6a48.388 48.388 0 01-1.555 1.45c-.399.356-.444.37-.64.384-.197.015-.542.029-.643.158-.1.13.056.396.274.659.219.262.505.532.746.816.24.284.436.582.677.944.241.362.527.788.791 1.256.264.469.504.98.708 1.49.203.512.369 1.023.513 1.64.144.617.262 1.313.323 1.96.06.645.06 1.227.03 1.838-.03.61-.09 1.249-.188 1.795-.098.547-.234 1.001-.362 1.399-.128.397-.248.738-.452 1.185-.203.447-.49 1-.805 1.526a16.055 16.055 0 01-1.017 1.483 15.76 15.76 0 01-1.122 1.313 12.15 12.15 0 01-1.355 1.236c-.497.383-1.04.723-1.529 1.022-.49.298-.926.553-1.43.78-.505.228-1.077.426-1.506.575-.43.15-.716.249-1.115.355-.4.107-.911.22-1.25.298-.339.078-.504.121-.587.142-.083.022-.083.022-.37.029z"
                              />
                              <animated.path
                                fill="white"
                                strokeDasharray="200"
                                strokeDashoffset={`${styles.x}`}
                                className="quickie_icon_path"
                                d="M14.521 271.291a18.9 18.9 0 01.738-1.384 8.93 8.93 0 011.01-1.363c.368-.411.775-.795 1.16-1.128.383-.334.745-.618 1.159-.909.414-.29.88-.589 1.37-.823.49-.234 1.002-.405 1.408-.554.407-.149.708-.276 1.1-.397.391-.12.873-.234 1.385-.312.512-.078 1.054-.121 1.612-.135.557-.014 1.13 0 1.77.085.639.085 1.347.241 1.995.468.647.228 1.234.526 1.874.895.64.369 1.333.809 1.936 1.299a12.93 12.93 0 011.52 1.49c.407.462.709.845 1.047 1.413.34.568.716 1.32.987 2.037.27.717.437 1.398.534 2.065.098.667.128 1.32.106 1.988a9.988 9.988 0 01-.256 2.001 10.015 10.015 0 01-.67 1.86 11.434 11.434 0 01-.926 1.64c-.354.518-.76 1.014-1.198 1.476a9.394 9.394 0 01-1.43 1.256c-.528.37-1.115.681-1.657.951-.542.27-1.039.497-1.521.674-.482.178-.949.306-1.408.412-.46.107-.911.192-1.43.242-.52.05-1.108.063-1.718.056a12.608 12.608 0 01-1.897-.142 10.015 10.015 0 01-2.026-.56 13.15 13.15 0 01-2.018-1.001 11.322 11.322 0 01-1.672-1.242 13.295 13.295 0 01-1.483-1.54 8.96 8.96 0 01-1.07-1.676 13.79 13.79 0 01-.79-1.952 8.557 8.557 0 01-.361-1.746 12.283 12.283 0 01-.053-1.725c.023-.518.083-.93.143-1.306.06-.376.12-.716.218-1.064.098-.348.234-.703.302-.88.067-.178.067-.178.21-.469z"
                              />
                              <animated.path
                                fill={`${styles.fill2}`}
                                strokeDasharray="200"
                                strokeDashoffset={`${styles.x}`}
                                className="quickie_icon_path"
                                d="M24.499 276.274c-.046-.078-.136-.234-.204-.405a1.022 1.022 0 01-.082-.54c.03-.184.135-.368 1.18-1.368 1.046-1 3.037-2.819 4.098-3.784 1.062-.965 1.198-1.08 1.34-1.15.143-.07.294-.1.452-.092.158.007.324.05.452.113a.77.77 0 01.294.256c.075.106.135.234.173.39.037.156.053.34.015.547-.038.206-.128.433-1.153 1.47s-2.98 2.88-4.02 3.846c-1.04.965-1.16 1.05-1.31 1.1-.151.05-.332.064-.512.05a1.234 1.234 0 01-.475-.12.441.441 0 01-.18-.192c-.023-.043-.023-.043-.068-.121z"
                              />
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: quickieToggle
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: quickieToggle
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: quickieToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>QUICKIE</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.6 }}
                      >
                        Speedy Results
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

export default Quickie;
