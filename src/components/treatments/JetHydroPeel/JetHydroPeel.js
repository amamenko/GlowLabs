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
import ACTION_GLOW_TOGGLE from "../../../actions/Treatments/Glow/ACTION_GLOW_TOGGLE";
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
import ACTION_GLOW_IN_CART from "../../../actions/InCart/Treatments/Glow/ACTION_GLOW_IN_CART";
import ACTION_GLOW_NOT_IN_CART from "../../../actions/InCart/Treatments/Glow/ACTION_GLOW_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_SELECTED_DAY_RESET from "../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import { toast } from "react-toastify";
import FacialInCartErrorNotification from "../FacialInCartErrorNotification";
import "./JetHydroPeel.css";
import ACTION_SALT_CAVE_TOGGLE_RESET from "../../../actions/Treatments/SaltCave/ACTION_SALT_CAVE_TOGGLE_RESET";

const JetHydroPeel = (props) => {
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

  // Cart States
  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!glowToggle) {
      dispatch(ACTION_GLOW_TOGGLE());
      if (calmToggle) {
        dispatch(ACTION_CALM_TOGGLE_RESET());
      }
      if (clarifyToggle) {
        dispatch(ACTION_CLARIFY_TOGGLE_RESET());
      }
      if (bacialToggle) {
        dispatch(ACTION_BACIAL_TOGGLE_RESET());
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
      if (microneedleToggle) {
        dispatch(ACTION_MICRONEEDLE_TOGGLE_RESET());
      }
      if (saltCaveToggle) {
        dispatch(ACTION_SALT_CAVE_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_GLOW_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (glowToggle) {
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
                <p>50 minutes</p>
              </div>
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faTag}
                />
                <p className="card_description_paragraph_title">Price</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>$250</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          This non-invasive treatment combines oxygen and saline to unclog pores
          and extract impurities while simulataneously infusing skin with
          condition-specific serums.
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
                  : props.initialScreenSize >= 1600
                  ? "1rem"
                  : props.initialScreenSize >= 1200
                  ? "1rem"
                  : "100%"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
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
              display: glowInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (glowInCart ? `${styles.x}` : 0) : 0
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

  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw"
            style={
              glowToggle
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
          >
            <FontAwesomeIcon
              color={
                glowToggle
                  ? glowInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : bacialInCart |
                        cbdInCart |
                        chemicalPeelInCart |
                        calmInCart |
                        dermaplaningInCart |
                        clarifyInCart |
                        microneedleInCart |
                        quenchInCart |
                        quickieInCart |
                        rejuvenateInCart ||
                      unsureInCart ||
                      saltCaveInCart
                    ? "rgba(211, 211, 211, 0.8"
                    : "rgba(0, 129, 177, 0.4)"
                  : glowInCart
                  ? "rgb(119, 221, 119, 0.6)"
                  : bacialInCart |
                      cbdInCart |
                      chemicalPeelInCart |
                      calmInCart |
                      dermaplaningInCart |
                      clarifyInCart |
                      microneedleInCart |
                      quenchInCart |
                      quickieInCart |
                      rejuvenateInCart ||
                    unsureInCart ||
                    saltCaveInCart
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
              style={{ display: glowInCart ? "none" : "block" }}
              color={
                bacialInCart |
                  cbdInCart |
                  chemicalPeelInCart |
                  calmInCart |
                  dermaplaningInCart |
                  clarifyInCart |
                  microneedleInCart |
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
          <p className="big_screen_price">$250</p>
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
          color: glowToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {glowToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
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
    if (glowInCart) {
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
        <div className="jet_hydro_peel_wrapping" ref={ref}>
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
                      backgroundColor: glowToggle
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: glowToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <Spring
                      from={{ x: 210, fill1: "white", fill2: "white" }}
                      to={{
                        x: 0,
                        fill1: "#ffc9a9",
                        fill2: "#5cd7ff",
                      }}
                      config={{ delay: 300, duration: 1000 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            style={{
                              background: bookNowButtonHovered
                                ? glowInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      clarifyInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : glowInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    clarifyInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? glowInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      clarifyInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : glowInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    clarifyInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? glowInCart
                                  ? "rgb(0, 0, 0)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      clarifyInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : glowInCart
                                ? "rgb(0, 0, 0)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    clarifyInCart |
                                    microneedleInCart |
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
                                  microneedleInCart |
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
                                glowToggle
                                  ? "rgb(25, 154, 202)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g transform="translate(13 12)">
                              <animated.path
                                className="jet_hydro_peel_icon_path"
                                fill="#fff"
                                strokeWidth="1"
                                strokeDasharray="210"
                                strokeDashoffset={`${styles.x}`}
                                stroke="#000"
                                d="M2.023 25.08c.454-.28 5.707.389 7.57.964.954.295 3.125 1.172 4.825 1.95 4.606 2.108 5.751 2.36 10.746 2.36 4.994 0 6.14-.252 10.746-2.36 1.7-.778 3.87-1.655 4.825-1.95 1.863-.575 7.116-1.244 7.57-.964.183.113.275 3.655.275 10.577 0 8.598-.064 10.268-.365 10.383-.606.233-.958-.222-.958-1.518v-1.229l-4.697-.18c-5.115-.196-6.925-.385-12.04-1.257-3.568-.608-4.549-1.001-3.966-1.592.267-.271 1.185-.197 4.762.383 5.343.866 9.288 1.24 13.096 1.24h2.845V26.225l-1.654.18c-2.945.32-4.821.876-8.564 2.533-5.43 2.404-6.782 2.712-11.875 2.712s-6.445-.308-11.875-2.712c-3.742-1.657-5.618-2.212-8.563-2.533l-1.654-.18V40.3l.728.003c.4.001 2.751.124 5.225.272 5.133.308 8.11.71 14.731 1.986 6.605 1.274 10.214 1.705 15.828 1.89 2.815.093 3.572.526 6.823.616 5.875 1.92-4.426.79-6.668.705-5.675-.196-9.632-.663-15.976-1.886-7.592-1.464-14.285-2.242-19.435-2.259l-1.257-.004C1.333 42.221.931 27.71 2.023 25.08zm19.965 9.715c-.553-.131-.794-.348-.794-.715 0-.497.15-.522 2.646-.436 4.921.17 7.538-.455 14.06-3.353 2.934-1.304 3.898-1.469 4.01-.686.063.44-.14.615-1.018.878-.603.18-2.528.984-4.279 1.785-4.23 1.935-6.423 2.48-10.525 2.61-1.819.058-3.664.02-4.1-.083zm-8.863-2.743c-2.26-1.017-4.4-1.777-5.821-2.066-1.87-.38-2.25-.542-2.25-.959 0-.432.184-.494 1.339-.448 1.741.07 4.526.98 8.393 2.745 2.197 1.003 3.094 1.542 3.04 1.826-.142.746-1.112.52-4.701-1.098zm4.511-4.121c-1.595-3.006-2.439-6.385-.747-10.253 1.13-2.583 3.363-6.476 5.843-10.186 1.944-2.91 2.201-3.2 2.672-3.01.794.32 6.619 9.866 8.045 13.184 1.211 2.817 1.43 5.64.609 7.817-.599 1.586-2.908 5.451-3.484 5.451-.758 0-.858-.791 1.225-4.01 1.176-1.817 1.801-4.168 1.415-5.89-.39-1.743-1.452-4.112-3.223-7.193-1.62-2.819-4.611-7.408-4.828-7.408-.217 0-3.207 4.589-4.854 7.449-2.256 3.916-3.298 6.599-3.275 8.426.023 1.785.62 3.52 1.657 4.813.431.537 2.982 3.829 2.982 4.055 0 .749-2.407-.176-4.037-3.245zm5.807-3.77c0-.993-.047-1.059-.772-1.059-1.465 0-1.609-.179-1.609-1.997v-1.677l1.125-.08c1.119-.082 1.124-.088 1.205-1.207l.082-1.124h3.378l.082 1.124c.08 1.12.087 1.125 1.206 1.206l1.124.081v1.677c0 1.818-.144 1.997-1.609 1.997-.724 0-.772.066-.772 1.059v1.058h-3.44zm2.381-1.323v-1.059h1.059c.882 0 1.058-.088 1.058-.529 0-.383-.176-.529-.64-.529-1.19 0-1.477-.262-1.477-1.351 0-.922-.069-1.03-.661-1.03-.592 0-.661.108-.661 1.03 0 1.09-.287 1.351-1.477 1.351-.464 0-.64.146-.64.53 0 .44.176.528 1.058.528h1.059v1.059c0 .952.066 1.058.661 1.058s.661-.106.661-1.058z"
                              />
                              <g>
                                <animated.path
                                  className="jet_hydro_peel_icon_path"
                                  d="M22.458 30.28a33.379 33.379 0 01-1.015-.067l-.384-.035-.619-.826c-.34-.454-.906-1.195-1.257-1.646-.81-1.044-.985-1.302-1.288-1.911a8.283 8.283 0 01-.684-2.019c-.09-.448-.107-.682-.108-1.447 0-.785.015-.98.109-1.403.444-2 1.655-4.598 3.836-8.232 1.585-2.642 3.899-6.138 4.107-6.207.076-.026.514.577 1.535 2.115 4.09 6.159 6.458 10.907 6.603 13.237.089 1.436-.466 3.356-1.411 4.888-1.03 1.667-1.508 2.541-1.68 3.072-.064.197-.102.247-.205.268-.356.074-1.35.172-2.16.214-1.005.05-4.385.051-5.379 0zm4.451-5.951c.011-.6.036-.934.074-1.002.083-.146.286-.192.947-.217.639-.025.845-.076 1.042-.259.25-.231.282-.45.303-2.02l.02-1.43-.834-.056c-.868-.059-1.154-.11-1.288-.23-.115-.101-.177-.445-.24-1.323l-.055-.771-1.713-.013-1.714-.012-.031.457c-.06.862-.124 1.419-.178 1.537-.107.236-.392.301-1.618.373l-.576.033.019 1.479c.02 1.604.039 1.732.28 1.974.183.182.418.237 1.17.271.577.027.652.04.745.133.13.13.169.425.174 1.31l.004.666h3.453z"
                                  fill="#fff"
                                  strokeDasharray="210"
                                  strokeDashoffset={`${styles.x}`}
                                  stroke="#000"
                                  strokeWidth="0.2"
                                />
                                <animated.path
                                  className="jet_hydro_peel_icon_path"
                                  d="M46.873 45.18c-.556-.168-1.172-.256-2.128-.305-1.473-.076-2.205-.136-2.801-.232-.778-.125-1.424-.176-2.929-.234-5.156-.198-8.5-.598-14.546-1.738-8.388-1.582-10.112-1.804-17.165-2.216a131.877 131.877 0 00-3.122-.148l-1.087-.03V33.27c0-4.805.015-7.008.048-7.008.202 0 2.677.308 3.243.403 1.993.336 3.804.946 7.069 2.38 3.918 1.721 5.674 2.275 7.928 2.501 1.467.148 5.208.172 6.947.046 2.661-.193 4.213-.654 8.487-2.523 4.276-1.87 5.745-2.296 9.272-2.689a64.226 64.226 0 011.111-.118c.032 0 .048 2.549.048 7.818v7.819l-2.514-.03c-2.636-.03-3.504-.067-5.39-.222-2.257-.186-4.47-.464-7.601-.955-3.34-.524-3.971-.602-4.625-.578-.417.015-.453.024-.588.153-.102.098-.143.181-.143.29 0 .482 1.166.833 4.794 1.44 4.977.831 6.342.954 13.833 1.238 1.203.046 2.196.093 2.207.104.03.029.055 1.96.027 1.954a30.456 30.456 0 01-.375-.112zM26.948 34.866c3.646-.2 5.516-.703 9.878-2.659 1.577-.707 2.894-1.262 3.616-1.525l.916-.335c.407-.15.573-.321.573-.596 0-.488-.229-.669-.784-.621-.633.054-1.377.321-3.605 1.292-4.777 2.082-6.994 2.783-9.874 3.12-.585.069-1.137.082-3.458.083-3.22.002-3.015-.027-3.015.444 0 .227.021.301.119.417.151.18.547.33 1.002.378.522.055 3.635.057 4.632.002zm-9.206-1.448a.408.408 0 00-.043-.548c-.687-.65-4.913-2.57-7.706-3.502-1.704-.57-2.639-.765-3.812-.8-.683-.02-.79-.012-.934.063-.188.098-.253.298-.181.557.08.292.433.43 1.957.768.476.105.981.224 1.123.264 1.528.43 2.745.891 5.38 2.042 1.548.675 2.538 1.067 3.038 1.203.555.15 1.034.131 1.178-.047z"
                                  fill={`${styles.fill1}`}
                                  strokeDasharray="210"
                                  strokeDashoffset={`${styles.x}`}
                                  stroke="#000"
                                  strokeWidth="0.2"
                                />
                                <animated.path
                                  className="jet_hydro_peel_icon_path"
                                  d="M24.653 23.65c-.053-.1-.097-.557-.097-1.017v-.835l-.95-.046c-.78-.037-.973-.076-1.076-.217-.316-.432.033-.791.768-.791.963 0 1.256-.345 1.258-1.48 0-.712.104-.859.608-.859s.608.147.609.86c0 1.134.294 1.479 1.257 1.479.735 0 1.084.359.768.79-.103.142-.295.18-1.076.218l-.95.046v.835c0 1.063-.068 1.198-.608 1.198-.314 0-.438-.044-.511-.181z"
                                  fill={`${styles.fill2}`}
                                  strokeDasharray="210"
                                  strokeDashoffset={`${styles.x}`}
                                  stroke="#000"
                                  strokeWidth="0.2"
                                />
                              </g>
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: glowToggle
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgbA(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: glowToggle
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: glowToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>JET HYDRO PEEL</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.6 }}
                      >
                        Exfoliating and Infusing
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

export default JetHydroPeel;
