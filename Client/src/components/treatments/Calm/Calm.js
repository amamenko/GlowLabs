import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import ACTION_CALM_TOGGLE from "../../../actions/Treatments/Calm/ACTION_CALM_TOGGLE";
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
import ACTION_CALM_IN_CART from "../../../actions/InCart/Treatments/Calm/ACTION_CALM_IN_CART";
import ACTION_CALM_NOT_IN_CART from "../../../actions/InCart/Treatments/Calm/ACTION_CALM_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_SELECTED_DAY_RESET from "../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faSquare,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import CalmNotification from "./CalmNotification";
import CalmRemovedNotification from "./CalmRemovedNotification";
import FacialInCartErrorNotification from "../FacialInCartErrorNotification";
import "./Calm.css";
import "../../treatments/card_styling.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { sticky } from "tippy.js";
import ACTION_SALT_CAVE_TOGGLE_RESET from "../../../actions/Treatments/SaltCave/ACTION_SALT_CAVE_TOGGLE_RESET";
import ACTION_JET_HYDRO_PEEL_TOGGLE_RESET from "../../../actions/Treatments/JetHydroPeel/ACTION_JET_HYDRO_PEEL_TOGGLE_RESET";
import NotSurePopUp from "../../treatments_pages/Page_2/NotSurePopUp/NotSurePopUp";
import ACTION_UNSURE_POP_UP_TRIGGERED from "../../../actions/UnsurePopUp/ACTION_UNSURE_POP_UP_TRIGGERED";
import { useLocation } from "react-router-dom";

const Calm = (props) => {
  const BookNowButtonRef = useRef(null);

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
  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
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
  const counter = useSelector((state) => state.counterReducer.counter);

  const unsurePopUpTriggered = useSelector(
    (state) => state.unsurePopUpTriggered.unsure_pop_up_triggered
  );

  // Cart States
  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

  // Pop-Up States
  const [calmClicked, changeCalmClicked] = useState(false);
  const [scrollFreeze, changeScrollFreeze] = useState("");
  const [tooltipShow, changeTooltipShow] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleToggle = () => {
    if (!calmToggle) {
      dispatch(ACTION_CALM_TOGGLE());
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
      if (microneedleToggle) {
        dispatch(ACTION_MICRONEEDLE_TOGGLE_RESET());
      }
      if (saltCaveToggle) {
        dispatch(ACTION_SALT_CAVE_TOGGLE_RESET());
      }
      if (jetHydroPeelToggle) {
        dispatch(ACTION_JET_HYDRO_PEEL_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_CALM_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (calmToggle) {
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
                <p>$105</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          Calm reduces inflammation of sensitive skin caused by the environment,
          rosacea, acne, laser treatments or natural disposition.
        </p>
      );
    }
  };

  const SuitcaseBounce = Keyframes.Spring({
    suitcaseBounce: [
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
        config: { duration: 100 },
      },
      {
        marginTop: "-9px",
        color: "rgb(45, 38, 27)",
        config: { duration: 300 },
      },
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "-6",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "-4px",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
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
              display: calmInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (calmInCart ? `${styles.x}` : 0) : 0
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

  const resetStates = props.resetAllCartStates;

  const addToCart = useCallback(() => {
    if (
      bacialInCart |
        cbdInCart |
        chemicalPeelInCart |
        clarifyInCart |
        dermaplaningInCart |
        glowInCart |
        microneedleInCart |
        quenchInCart |
        quickieInCart |
        rejuvenateInCart ||
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
      if (calmInCart) {
        toast.dismiss();
        dispatch(ACTION_CALM_NOT_IN_CART());
        dispatch(ACTION_DECREMENT_COUNTER());
        dispatch(ACTION_SELECTED_DAY_RESET());
        dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());

        resetStates();
        toast(
          <CalmRemovedNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          {
            className: "toast_removed_container",
          }
        );
      } else {
        toast.dismiss();
        dispatch(ACTION_CALM_IN_CART());
        dispatch(ACTION_INCREMENT_COUNTER());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        changeCartClicked(true);
        setTimeout(() => changeCartClicked(false), 200);
        toast(
          <CalmNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />
        );
      }
    }
  }, [
    bacialInCart,
    calmInCart,
    cbdInCart,
    chemicalPeelInCart,
    clarifyInCart,
    dermaplaningInCart,
    unsureInCart,
    dispatch,
    glowInCart,
    microneedleInCart,
    props.currentScreenSize,
    props.initialScreenSize,
    quenchInCart,
    quickieInCart,
    rejuvenateInCart,
    resetStates,
  ]);

  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw calm_suitcase_wrapping calm_suitcase_selector"
            style={
              calmToggle
                ? calmInCart |
                    bacialInCart |
                    cbdInCart |
                    chemicalPeelInCart |
                    clarifyInCart |
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
            onClick={addToCart}
          >
            <FontAwesomeIcon
              color={
                calmToggle
                  ? calmInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : bacialInCart |
                        cbdInCart |
                        chemicalPeelInCart |
                        clarifyInCart |
                        dermaplaningInCart |
                        glowInCart |
                        microneedleInCart |
                        quenchInCart |
                        quickieInCart |
                        rejuvenateInCart ||
                      unsureInCart ||
                      saltCaveInCart
                    ? "rgba(211, 211, 211, 0.8)"
                    : "rgba(0, 129, 177, 0.4)"
                  : calmInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : bacialInCart |
                      cbdInCart |
                      chemicalPeelInCart |
                      clarifyInCart |
                      dermaplaningInCart |
                      glowInCart |
                      microneedleInCart |
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
              style={{ display: calmInCart ? "none" : "block" }}
              color={
                bacialInCart |
                  cbdInCart |
                  chemicalPeelInCart |
                  clarifyInCart |
                  dermaplaningInCart |
                  glowInCart |
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
          <p className="big_screen_price">$105</p>
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
          color: calmToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {calmToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
        </p>
        <span className="card_bottom_spacer" />
        <div className="book_button_bounce_container" ref={BookNowButtonRef}>
          {bookButtonBounce()}
        </div>
        <Tippy
          // options
          content="Click here to book now"
          placement="bottom-end"
          showOnCreate={true}
          sticky={true}
          animation="fade"
          arrow={true}
          trigger="manual"
          className={tooltipShow ? "tooltip_shown" : "tooltip_not_shown"}
          reference={BookNowButtonRef}
          zIndex={100}
          hideOnClick={true}
          delay={2000}
          plugins={[sticky]}
          onAfterUpdate={() => {
            if (scrollFreeze !== "") {
              if (props.scrollValue !== scrollFreeze || counter > 0) {
                changeTooltipShow(false);
              }
            } else {
              if (counter > 0) {
                changeTooltipShow(false);
              }
            }
          }}
          onShown={() => changeScrollFreeze(props.scrollValue)}
          popperOptions={{
            modifiers: [
              {
                name: "flip",
                options: {
                  fallbackPlacements: ["bottom"],
                },
              },
              {
                name: "preventOverflow",
                options: {
                  enabled: false,
                  rootBoundary: "document",
                },
              },
              {
                name: "hide",
                options: {
                  enabled: false,
                },
              },
            ],
          }}
        />
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
    if (calmInCart) {
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

  const handleCalmClicked = (e) => {
    if (!calmClicked) {
      changeCalmClicked(true);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      if (unsurePopUpTriggered === 1) {
        if (
          !calmInCart &&
          !bacialInCart &&
          !cbdInCart &&
          !chemicalPeelInCart &&
          !clarifyInCart &&
          !dermaplaningInCart &&
          !glowInCart &&
          !microneedleInCart &&
          !quenchInCart &&
          !quickieInCart &&
          !rejuvenateInCart &&
          !unsureInCart &&
          !saltCaveInCart &&
          !cartIsActive &&
          location.pathname === "/"
        ) {
          toast.dismiss();
          const unsureToastDeployDelay = setTimeout(() => {
            toast(
              <NotSurePopUp
                currentScreenSize={props.currentScreenSize}
                initialScreenSize={props.initialScreenSize}
              />,
              {
                className: "toast_container",
                autoClose: false,
                closeButton: false,
              }
            );
          }, 3000);

          return () => {
            clearTimeout(unsureToastDeployDelay);
          };
        } else {
          dispatch(ACTION_UNSURE_POP_UP_TRIGGERED());
        }
      }
    } else {
      toast.dismiss();
    }
  }, [
    bacialInCart,
    calmInCart,
    cbdInCart,
    chemicalPeelInCart,
    clarifyInCart,
    dermaplaningInCart,
    glowInCart,
    microneedleInCart,
    unsureInCart,
    props.currentScreenSize,
    props.initialScreenSize,
    quenchInCart,
    quickieInCart,
    rejuvenateInCart,
    unsurePopUpTriggered,
    cartIsActive,
    saltCaveInCart,
    dispatch,
    location.pathname,
  ]);

  return (
    <InView
      threshold={0.2}
      triggerOnce={true}
      onChange={(inView) => {
        if (inView) {
          if (unsurePopUpTriggered < 2) {
            dispatch(ACTION_UNSURE_POP_UP_TRIGGERED());
          }
        }
      }}
    >
      {({ inView, ref }) => (
        <div className="card_container" ref={ref} onClick={handleCalmClicked}>
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
                      backgroundColor: calmToggle
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: calmToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <Spring
                      from={{ x: 500, fill: "white" }}
                      to={{ x: 0, fill: "rgba(186, 225, 253, 0.7)" }}
                      config={{ delay: 300, duration: 3000 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => addToCart()}
                            style={{
                              background: bookNowButtonHovered
                                ? calmInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
                                      dermaplaningInCart |
                                      glowInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : calmInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
                                    dermaplaningInCart |
                                    glowInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? calmInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
                                      dermaplaningInCart |
                                      glowInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : calmInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
                                    dermaplaningInCart |
                                    glowInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? calmInCart
                                  ? "rgb(0, 0, 0)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
                                      dermaplaningInCart |
                                      glowInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : calmInCart
                                ? "rgb(0, 0, 0)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
                                    dermaplaningInCart |
                                    glowInCart |
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
                                  clarifyInCart |
                                  dermaplaningInCart |
                                  glowInCart |
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
                            width="100%"
                            height="15rem"
                            viewBox="0 0 56.356 56.356"
                            className="card_svg"
                          >
                            <circle
                              cx="28"
                              cy="28"
                              r={
                                props.currentScreenSize === ""
                                  ? props.initialScreenSize >= 1200
                                    ? "22"
                                    : "26"
                                  : props.currentScreenSize >= 1200
                                  ? "22"
                                  : "26"
                              }
                              stroke={
                                calmToggle
                                  ? "rgb(25, 154, 202)"
                                  : "rgb(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g
                              id="layer1"
                              transform="translate(14.5 -102)"
                              strokeMiterlimit="4"
                              fill={`${styles.fill}`}
                            >
                              <animated.path
                                className="calm_icon_path"
                                strokeDasharray="500"
                                strokeDashoffset={`${styles.x}`}
                                d="M71.967 97.24v-2.91c0-.089.021-.18 0-.265-.068-.271-.265-.515-.265-.794 0-.197.303-.336.265-.53-.063-.311-.411-.498-.53-.793-.504-1.26.853.353-.264-1.323-.208-.311-.601-.473-.794-.794-.09-.151.043-.358 0-.529-.048-.191-.217-.338-.264-.53-.043-.17.078-.37 0-.528-.862-1.723-.266.527-.794-1.059-.265-.793.529.53 0-.793-.118-.296-.339-.54-.53-.794-.074-.1-.264-.14-.264-.265 0-.197.327-.342.265-.529-.063-.187-.467-.077-.53-.264-.062-.188.203-.342.265-.53.057-.17 0-1.034 0-1.323V80.306c0-.088-.049-.191 0-.264.138-.208.39-.322.53-.53.048-.073-.029-.18 0-.264.062-.187.154-.365.264-.53.069-.103.225-.146.264-.264.056-.167-.097-.382 0-.529.11-.164.39-.125.53-.265.139-.139.155-.365.264-.529.808-1.212-.43 1.125.53-.794.088-.176.088-.44.264-.529.111-.055.176.353.264.265.198-.197.11-.562.265-.794.049-.073.202.063.265 0 .14-.14.125-.39.264-.529.063-.062.265-.088.265 0s-.304.079-.265 0c.112-.223.353-.353.53-.53l-.265.265c.176-.176.292-.45.529-.529.118-.04.265.14.265.265 0 .088-.304.079-.265 0 .112-.223.353-.353.53-.53.087-.088-.265.14-.265.265 0 .088.176 0 .264 0h.265c.088 0 .264-.088.264 0s-.327.063-.264 0c.14-.14.365-.155.529-.264.104-.07.14-.265.264-.265.125 0 .147.225.265.265.167.055.353 0 .53 0 .176 0 .404.124.528 0 .125-.125-.167-.474 0-.53.265-.088.524.197.794.265.13.033 1.26.031 1.323 0 .223-.111.293-.45.53-.53.118-.039.146.226.264.265a.858.858 0 00.529 0c.118-.039.144-.234.265-.264.256-.064.534.052.793 0 .194-.039.338-.217.53-.265.17-.042.358.043.529 0 .191-.047.338-.216.529-.264.009-.002.792.001.794 0 .139-.14.073-.482.264-.53.27-.067.52.32.794.265.245-.049.287-.469.53-.529.19-.048.337.312.528.265.242-.06.306-.418.53-.53.157-.078.352 0 .529 0 .088 0 .19.05.264 0 .208-.138.293-.45.53-.529.118-.04.143.295.264.265.308-.077.498-.411.794-.53.163-.065.356.035.529 0 .273-.054.523-.196.794-.264.085-.021.18.028.264 0 .187-.062.342-.202.53-.265.083-.027.19.05.264 0 .207-.138.292-.45.53-.529.117-.04.139.265.264.265.197 0 .338-.217.529-.265.342-.085.723.112 1.058 0 .118-.04.153-.208.265-.264.071-.036 1.473 0 1.587 0h-.264.529c.088 0 .264-.088.264 0s-.352 0-.264 0h.529c.088 0-.327-.063-.265 0 .14.14.39.125.53.264.139.14.125.39.264.53.14.139.365.155.53.264.103.07.176.176.264.265.088.088.264.14.264.264 0 .197-.176.353-.264.53.176.264.452.485.53.793.03.121-.29.142-.266.265.078.387.494.665.53 1.058.056.621-.317 1.23-.265 1.852 1.074 2.685.265-.037.265 2.646 0 .364.204.7.264 1.058.03.174 0 .353 0 .53v1.322c0 .53.087 1.066 0 1.588-.02.123-.244.141-.264.264-.073.435.14.905 0 1.323-.14.419-.63.65-.794 1.059-.046.116.31.149.264.264-.163.41-.596.664-.793 1.059-.706 1.41 1.171-.592-.265 1.323-.39.519-.404.01-.794.529-.19.254-.387.51-.529.793-.04.08.063.203 0 .265-.225.225-.545.33-.794.53-.194.155-.33.379-.529.528-.157.119-.39.126-.529.265-.14.14-.088.441-.264.53-.237.117-.558-.12-.794 0-.177.087-.107.41-.265.528-.223.168-.57.098-.794.265-.157.118-.1.42-.264.53-.147.097-.365-.066-.53 0-.59.235-1.018.773-1.587 1.057-.25.125-.554.122-.794.265-.213.128-.352.353-.529.53-.264.087-.544.139-.793.264-.112.056-.143.24-.265.264-.346.07-.724-.111-1.058 0-.237.08-.353.353-.53.53-.088.088-.143.234-.264.264-.257.064-.53 0-.794 0-.176 0-.371-.079-.529 0-.223.112-.287.469-.53.53-.19.047-.341-.328-.528-.265-.187.062-.074.481-.265.529-.27.067-.52-.21-.794-.265a1.22 1.22 0 00-.529 0c-.191.048-.342.202-.529.265-.084.028-.176 0-.265 0-.44 0-.89-.087-1.323 0-.193.039-.331.264-.529.264-.279 0-.523-.197-.793-.264-.086-.022-.177 0-.265 0-.176 0-.356-.035-.53 0-.273.055-.522.197-.793.264-.085.022-.176 0-.265 0h-1.587c-.088 0 .343-.039.265 0-.425.213-.882.353-1.323.53z"
                                id="path842"
                                paintOrder="normal"
                                strokeLinejoin="bevel"
                                strokeLinecap="round"
                                strokeWidth="1"
                                stroke="none"
                              />
                              <animated.path
                                className="calm_icon_path"
                                strokeDasharray="500"
                                strokeDashoffset={`${styles.x}`}
                                d="M17.46 294.508c-.978-.316-1.829-1.092-2.267-2.069-.62-1.382-.212-3.174.932-4.087.288-.23 1.199-.739 2.025-1.13 1.133-.538 1.453-.74 1.304-.823-.108-.06-1.713-.764-3.565-1.563-1.853-.799-3.639-1.588-3.968-1.753-1.403-.705-2.342-2.195-2.34-3.716 0-.48.06-1.087.134-1.35.13-.469.123-.487-.394-.927-.615-.524-1.115-1.504-1.116-2.19-.003-1.12.172-1.383 2.455-3.688 2.394-2.415 3.133-3.282 4.164-4.88l1.49-2.317c2.208-3.44 5.97-5.898 10.156-6.635 1.188-.21 3.781-.208 5.004.003 3.08.531 6.059 2.067 8.245 4.252.997.997 1.664 1.886 2.712 3.617 1.306 2.157 2.193 3.252 4.677 5.773 2.465 2.502 2.634 2.75 2.631 3.874-.002.687-.501 1.667-1.117 2.191-.516.44-.524.458-.393.927.074.263.134.877.134 1.364 0 .767-.059 1.005-.444 1.772-.469.932-1.055 1.512-2.015 1.993-.287.144-2.022.906-3.855 1.694-1.834.788-3.43 1.486-3.545 1.55-.168.094.106.271 1.335.864 1.9.916 2.4 1.305 2.848 2.217.848 1.725.113 3.878-1.642 4.811-.39.208-.723.267-1.507.27l-1.006.003-4.78-2.047-4.78-2.047-4.772 2.044c-4.396 1.883-4.836 2.046-5.598 2.074-.455.016-.969-.016-1.141-.072zm3.505-22.016v-5.319l-.766 1.18c-1.406 2.166-3.454 4.457-5.363 6-.395.32-.507.472-.376.512.103.032.44.123.75.202.31.08 1.689.728 3.065 1.441 1.376.714 2.544 1.298 2.596 1.3.052.002.094-2.39.094-5.316zm18.683 4.021c1.388-.713 2.856-1.392 3.264-1.509l.74-.211-.553-.447c-.978-.79-2.87-2.67-3.652-3.632a32.858 32.858 0 01-1.615-2.234l-.853-1.3v5.315c0 2.924.033 5.316.073 5.316.04 0 1.208-.584 2.596-1.298zm-12.457-21.602c-.95-.303-1.836-.882-2.565-1.678-3.14-3.429-1.194-8.889 3.45-9.681 2.899-.495 5.827 1.427 6.584 4.322.778 2.971-.99 6.127-3.948 7.042-.99.307-2.547.305-3.521-.006z"
                                id="path829"
                                strokeWidth="1"
                                stroke="#000"
                              />
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: calmToggle
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: calmToggle
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.3)",
                      boxShadow: calmToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>CALM</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.7 }}
                      >
                        Soothing
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

export default Calm;
