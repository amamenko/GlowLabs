import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSquare,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import ACTION_MICROCURRENT_TOGGLE from "../../../actions/AddOns/Microcurrent/ACTION_MICROCURRENT_TOGGLE";
import ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET from "../../../actions/AddOns/ExtraExtractions/ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET";
import ACTION_HYDRO_JELLY_TOGGLE_RESET from "../../../actions/AddOns/HydroJellyMask/ACTION_HYDRO_JELLY_TOGGLE_RESET";
import ACTION_LED_THERAPY_TOGGLE_RESET from "../../../actions/AddOns/LEDTherapy/ACTION_LED_THERAPY_TOGGLE_RESET";
import ACTION_MICROCURRENT_TOGGLE_RESET from "../../../actions/AddOns/Microcurrent/ACTION_MICROCURRENT_TOGGLE_RESET";
import ACTION_MICRODERMABRASION_TOGGLE_RESET from "../../../actions/AddOns/Microdermabrasion/ACTION_MICRODERMABRASION_TOGGLE_RESET";
import ACTION_DERMAROLLING_TOGGLE_RESET from "../../../actions/AddOns/Dermarolling/ACTION_DERMAROLLING_TOGGLE_RESET";
import ACTION_NANONEEDLING_TOGGLE_RESET from "../../../actions/AddOns/Nanoneedling/ACTION_NANONEEDLING_TOGGLE_RESET";
import ACTION_GUASHA_TOGGLE_RESET from "../../../actions/AddOns/GuaSha/ACTION_GUASHA_TOGGLE_RESET";
import ACTION_BEARD_TOGGLE_RESET from "../../../actions/AddOns/Beard/ACTION_BEARD_TOGGLE_RESET";
import ACTION_MICROCURRENT_IN_CART from "../../../actions/InCart/AddOns/Microcurrent/ACTION_MICROCURRENT_IN_CART";
import ACTION_MICROCURRENT_NOT_IN_CART from "../../../actions/InCart/AddOns/Microcurrent/ACTION_MICROCURRENT_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import { toast } from "react-toastify";
import MicrocurrentNotification from "./MicrocurrentNotification";
import MicrocurrentRemovedNotification from "./MicrocurrentRemovedNotification";
import MicrocurrentRejuvenateErrorNotification from "./MicrocurrentRejuvenateErrorNotification";
import AddOnsChemPeelErrorNotification from "../AddOnsChemPeelErrorNotification";
import AddOnsMicroneedlingErrorNotification from "../AddOnsMicroneedlingErrorNotification";
import "./Microcurrent.css";
import "../../treatments/card_styling.css";

const Microcurrent = (props) => {
  const extraExtractionsToggle = useSelector(
    (state) => state.extraExtractionsToggle.toggle
  );
  const hydroJellyToggle = useSelector(
    (state) => state.hydroJellyToggle.toggle
  );
  const ledTherapyToggle = useSelector(
    (state) => state.ledTherapyToggle.toggle
  );
  const microcurrentToggle = useSelector(
    (state) => state.microcurrentToggle.toggle
  );
  const microdermabrasionToggle = useSelector(
    (state) => state.microdermabrasionToggle.toggle
  );
  const dermarollingToggle = useSelector(
    (state) => state.dermarollingToggle.toggle
  );
  const nanoneedlingToggle = useSelector(
    (state) => state.nanoneedlingToggle.toggle
  );
  const guashaToggle = useSelector((state) => state.guashaToggle.toggle);
  const beardToggle = useSelector((state) => state.beardToggle.toggle);

  // In Cart states
  const microcurrentInCart = useSelector(
    (state) => state.microcurrentInCart.in_cart
  );
  const rejuvenateInCart = useSelector(
    (state) => state.rejuvenateInCart.in_cart
  );
  const microneedleInCart = useSelector(
    (state) => state.microneedleInCart.in_cart
  );
  const chemicalPeelInCart = useSelector(
    (state) => state.chemicalPeelInCart.in_cart
  );
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!microcurrentToggle) {
      dispatch(ACTION_MICROCURRENT_TOGGLE());
      if (extraExtractionsToggle) {
        dispatch(ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET());
      }
      if (hydroJellyToggle) {
        dispatch(ACTION_HYDRO_JELLY_TOGGLE_RESET());
      }
      if (ledTherapyToggle) {
        dispatch(ACTION_LED_THERAPY_TOGGLE_RESET());
      }
      if (microdermabrasionToggle) {
        dispatch(ACTION_MICRODERMABRASION_TOGGLE_RESET());
      }
      if (dermarollingToggle) {
        dispatch(ACTION_DERMAROLLING_TOGGLE_RESET());
      }
      if (nanoneedlingToggle) {
        dispatch(ACTION_NANONEEDLING_TOGGLE_RESET());
      }
      if (guashaToggle) {
        dispatch(ACTION_GUASHA_TOGGLE_RESET());
      }
      if (beardToggle) {
        dispatch(ACTION_BEARD_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_MICROCURRENT_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (microcurrentToggle) {
      return (
        <>
          <div className="card_description_add_on_paragraph_toggle">
            <div className="card_description_icon_wrapper_container">
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faClock}
                />
                <p className="card_description_paragraph_title">Duration</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>10 minutes</p>
              </div>
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faTag}
                />
                <p className="card_description_paragraph_title">Price</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>$15</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          This painless “natural” facelift helps erase fine lines and wrinkles
          while firming skin. It improves muscle tone, reduces puffiness,
          increases cellular activity, and tightens pores.
        </p>
      );
    }
  };

  const PlusBounce = Keyframes.Spring({
    plusBounce: [
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
              display: microcurrentInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (microcurrentInCart ? `${styles.x}` : 0) : 0
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

  const chemPeelAddOnErrorToastId = "chem_peel_add_on_error";
  const microneedlingAddOnErrorToastId = "microneedling_add_on_error";
  const microcurrentRejuvenateErrorToastId = "microcurrent_rejuvenate_error";

  const addToCart = () => {
    if (chemicalPeelInCart || saltCaveInCart) {
      if (!toast.isActive(chemPeelAddOnErrorToastId)) {
        toast.dismiss();
        toast(<AddOnsChemPeelErrorNotification />, {
          className: "toast_error_container",
          toastId: chemPeelAddOnErrorToastId,
        });
      }
    } else {
      if (rejuvenateInCart) {
        if (!toast.isActive(microcurrentRejuvenateErrorToastId)) {
          toast.dismiss();
          toast(
            <MicrocurrentRejuvenateErrorNotification
              currentScreenSize={props.currentScreenSize}
              initialScreenSize={props.initialScreenSize}
            />,
            {
              className: "toast_error_container",
              toastId: microcurrentRejuvenateErrorToastId,
              autoClose: 6000,
            }
          );
        }
      } else {
        if (microneedleInCart) {
          if (!toast.isActive(microneedlingAddOnErrorToastId)) {
            toast.dismiss();
            toast(
              <AddOnsMicroneedlingErrorNotification
                currentScreenSize={props.currentScreenSize}
                initialScreenSize={props.initialScreenSize}
              />,
              {
                className: "toast_error_container",
                toastId: microneedlingAddOnErrorToastId,
                autoClose: 6000,
              }
            );
          }
        } else {
          if (microcurrentInCart) {
            toast.dismiss();
            dispatch(ACTION_MICROCURRENT_NOT_IN_CART());
            dispatch(ACTION_DECREMENT_COUNTER());
            dispatch(ACTION_NAVBAR_IS_VISIBLE());

            props.resetAllCartStatesExceptTreatments();
            toast(
              <MicrocurrentRemovedNotification
                currentScreenSize={props.currentScreenSize}
                initialScreenSize={props.initialScreenSize}
              />,
              {
                className: "toast_removed_container",
              }
            );
          } else {
            toast.dismiss();
            dispatch(ACTION_MICROCURRENT_IN_CART());
            dispatch(ACTION_INCREMENT_COUNTER());
            dispatch(ACTION_NAVBAR_IS_VISIBLE());
            changeCartClicked(true);
            setTimeout(() => changeCartClicked(false), 200);

            props.resetAllCartStatesExceptTreatments();
            toast(
              <MicrocurrentNotification
                currentScreenSize={props.currentScreenSize}
                initialScreenSize={props.initialScreenSize}
              />
            );
          }
        }
      }
    }
  };

  const addOnBounce = () => {
    return (
      <PlusBounce state="plusBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw"
            style={
              microcurrentToggle
                ? microcurrentInCart
                  ? { position: "relative" }
                  : rejuvenateInCart | microneedleInCart | chemicalPeelInCart ||
                    saltCaveInCart
                  ? { position: "relative" }
                  : styles
                : { position: "relative" }
            }
            onClick={() => addToCart()}
          >
            <FontAwesomeIcon
              color={
                microcurrentToggle
                  ? microcurrentInCart
                    ? "rgb(119, 221, 119, 0.6)"
                    : rejuvenateInCart |
                        microneedleInCart |
                        chemicalPeelInCart || saltCaveInCart
                    ? "rgb(211, 211, 211)"
                    : "rgba(0, 129, 177, 0.4)"
                  : microcurrentInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : rejuvenateInCart | microneedleInCart | chemicalPeelInCart ||
                    saltCaveInCart
                  ? "rgb(211, 211, 211)"
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
              className="small_screen_card_description_plus"
              style={{ display: microcurrentInCart ? "none" : "block" }}
              color={
                rejuvenateInCart | microneedleInCart | chemicalPeelInCart ||
                saltCaveInCart
                  ? "rgb(151, 151, 151)"
                  : "rgb(0, 129, 177)"
              }
              icon={faPlus}
            />
          </span>
        )}
      </PlusBounce>
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
          <p className="big_screen_price">$15</p>
        </div>
        <div className="big_screen_duration_wrapper">
          <FontAwesomeIcon
            className="big_screen_card_description_icon"
            icon={faClock}
          />
          <p className="big_screen_duration">10 minutes</p>
        </div>
      </div>
    );
  };

  const smallScreenBottomWrapperRender = () => {
    return (
      <div
        className="card_bottom_wrapper"
        style={{
          color: microcurrentToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {microcurrentToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
        </p>
        <span className="card_bottom_spacer" />
        {addOnBounce()}
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

  const renderAddOnButton = () => {
    if (microcurrentInCart) {
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
            icon={faPlus}
          />
          <p className="big_screen_card_add_on_button">ADD TO FACIAL</p>
        </>
      );
    }
  };

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="card_container" ref={ref}>
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
                      backgroundColor: microcurrentToggle
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: microcurrentToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <Spring
                      from={{ x: 200, fill: "#fff" }}
                      to={{ x: 0, fill: "#000" }}
                      config={{ duration: 2500 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => addToCart()}
                            style={{
                              background: bookNowButtonHovered
                                ? microcurrentInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : rejuvenateInCart |
                                      microneedleInCart |
                                      chemicalPeelInCart || saltCaveInCart
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : microcurrentInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : rejuvenateInCart |
                                    microneedleInCart |
                                    chemicalPeelInCart || saltCaveInCart
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? microcurrentInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : rejuvenateInCart |
                                      microneedleInCart |
                                      chemicalPeelInCart || saltCaveInCart
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : microcurrentInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : rejuvenateInCart |
                                    microneedleInCart |
                                    chemicalPeelInCart || saltCaveInCart
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? microcurrentInCart
                                  ? "rgb(0, 0, 0)"
                                  : rejuvenateInCart |
                                      microneedleInCart |
                                      chemicalPeelInCart || saltCaveInCart
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : microcurrentInCart
                                ? "rgb(0, 0, 0)"
                                : rejuvenateInCart |
                                    microneedleInCart |
                                    chemicalPeelInCart || saltCaveInCart
                                ? "rgb(141, 141, 141)"
                                : "rgb(0, 129, 177)",
                              cursor:
                                rejuvenateInCart |
                                  microneedleInCart |
                                  chemicalPeelInCart || saltCaveInCart
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
                            {renderAddOnButton()}
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
                                    ? "22.25"
                                    : "26"
                                  : props.currentScreenSize >= 1200
                                  ? "22.25"
                                  : "26"
                              }
                              stroke={
                                microcurrentToggle
                                  ? "rgb(25, 154, 202)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g transform="translate(12 11)">
                              <animated.path
                                className="microcurrent_icon_path"
                                stroke="#000"
                                strokeDasharray="200"
                                strokeDashoffset={`${styles.x}`}
                                fill={`${styles.fill}`}
                                strokeWidth="0.3"
                                d="M23.72 51.65c-1.025-.293-1.817-.75-3.538-2.04-2.247-1.687-3.944-3.145-5.689-4.891-2.792-2.794-4.472-5.18-5.435-7.723-.497-1.31-1.342-5.26-1.601-7.48-.256-2.188-.313-2.628-.346-2.66-.019-.02-.487.443-1.04 1.028-1.225 1.297-1.739 2.25-1.997 3.704-.142.806-.147 1.062-.032 1.871.204 1.445.62 2.309 1.796 3.733.316.383.706.964.867 1.293.268.545.293.692.292 1.733-.001.992-.033 1.197-.245 1.603-.134.256-.315.547-.402.646-.232.263-.61.226-.81-.08-.163-.247-.158-.29.111-.889.246-.548.277-.73.242-1.42-.049-.966-.173-1.23-1.175-2.496-1.374-1.736-1.806-2.911-1.803-4.912.002-1.429.196-2.339.718-3.372.439-.868.675-1.172 1.936-2.496C6.8 25.51 7.004 25.19 7.52 23.726c.597-1.69.619-1.746 1.268-3.236a26.326 26.326 0 012.532-4.519c1.782-2.522 5.028-5.671 7.233-7.016 1.382-.843 3.827-1.98 4.259-1.98.363 0 .635.362.517.688-.078.216-.335.37-1.337.8-2.754 1.182-4.087 2.092-6.605 4.509-2.935 2.816-4.825 5.779-6.375 9.99-.29.79-.602 1.612-.693 1.827-.152.359-.151.546.012 2.326.262 2.862.76 5.788 1.375 8.088l.317 1.19c.03.113.276.68.546 1.258 1.494 3.198 4.68 6.714 9.458 10.437 2.575 2.006 3.267 2.392 4.718 2.626.677.109.91.102 1.654-.048 1.172-.236 1.857-.595 3.527-1.846 1.883-1.412 2.854-2.26 4.518-3.941.763-.772 1.465-1.404 1.56-1.404.248 0 .516.334.516.64 0 .559-3.582 3.898-6.36 5.929-1.93 1.412-2.992 1.812-4.77 1.8-.651-.006-1.255-.075-1.67-.194zm.288-7.128c-.468-.1-.748-.254-1.467-.805-.633-.485-.778-.738-.607-1.058.207-.386.502-.37 1.102.057 1.043.742 1.1.759 2.552.76 1.462 0 1.814-.092 2.426-.629.56-.492.797-.57 1.108-.366.425.278.342.592-.3 1.14-.942.805-1.326.927-3.004.955-.797.013-1.61-.011-1.81-.054zm10.191-1.614c-.533-.19-.863-.442-1.265-.965-.9-1.174-.585-2.86.7-3.737.433-.295.617-.352 1.28-.395.69-.044.836-.019 1.352.234.59.288 1.216.976 1.353 1.486.06.222.105.238.492.176.395-.064 1.853-.289 4.008-.62 1.447-.221 2.212-.72 2.48-1.613.232-.774-.31-1.698-1.232-2.099-.338-.147-5.127-1.102-5.526-1.102-.084 0-.237.188-.34.417-.207.457-.777 1.023-1.311 1.3-.542.28-1.668.25-2.292-.064-1.159-.583-1.75-1.936-1.363-3.122.848-2.603 4.383-2.505 5.162.143.035.118.213.197.549.243.273.038.8.13 1.169.205.37.074 1.09.213 1.603.308 1.92.358 2.495.501 2.969.739.719.36 1.175.807 1.499 1.467.644 1.313.187 2.754-1.145 3.606-.597.382-1.079.523-2.581.756-.75.116-1.758.276-2.242.356-.483.08-1.1.174-1.37.21-.335.045-.49.115-.49.219 0 .263-.382.906-.741 1.25-.724.693-1.796.93-2.718.602zm1.675-1.19c.942-.574 1.001-1.784.124-2.521-.267-.225-.424-.271-.93-.271-.532 0-.655.04-.968.315-1.095.962-.471 2.683.972 2.683.282 0 .598-.081.802-.206zm-.077-6.81c.43-.228.822-.864.824-1.337.003-.433-.324-1.078-.657-1.296-.762-.5-1.841-.214-2.23.59-.272.562-.268.843.02 1.404.396.773 1.276 1.048 2.043.64zM23.9 41.719c-1.434-.228-3.097-.938-3.097-1.322 0-.184.684-1.125 1.188-1.633.802-.81 1.84-1.07 2.845-.716.557.197.82.195 1.666-.01 1.301-.316 2.17.058 3.236 1.394.798 1 .778 1.188-.17 1.607-1.088.481-2.19.701-3.698.738-.768.018-1.654-.007-1.97-.058zm3.728-1.231c.426-.108.88-.236 1.008-.286l.233-.09-.311-.378a2.135 2.135 0 00-.78-.556c-.44-.168-.513-.169-1.178-.008-.872.21-1.177.213-1.825.017-1-.304-1.652-.142-2.194.543l-.33.415.853.225c.47.123.9.24.956.261.057.02.709.04 1.448.045.992.005 1.548-.045 2.12-.188zm15.26 1.068c-.201-.201-.211-.599-.019-.759.08-.066.446-.203.814-.305.868-.24 1.47-.6 2.055-1.226 1.837-1.963.728-4.903-2.12-5.62-.781-.196-1.032-.835-.435-1.107.316-.144 1.02.033 1.952.492.74.364 1.699 1.24 2.058 1.879l.224.398h1.668l-.036-.64c-.047-.836.1-1.3.555-1.741l.37-.359 1.967-.032c2.135-.035 2.262-.006 2.262.504 0 .537-.264.614-2.122.614-1.155 0-1.7.037-1.787.124-.161.161-.177 6.303-.017 6.603.1.185.232.2 1.752.2 1.955 0 2.174.057 2.174.563 0 .25-.06.393-.2.468-.278.148-3.677.14-3.969-.01-.706-.363-1.001-.942-1.001-1.964v-.71H47.39l-.434.617c-.664.948-1.67 1.649-2.881 2.007-.705.21-.983.21-1.19.005zm6.162-4.438l-.035-.673H47.81l-.035.673-.035.672h1.345zM24.57 34.9c-.444-.106-1.317-.597-1.805-1.014-.322-.276-.412-.425-.412-.686 0-.183.056-.389.124-.457.2-.2.675-.148.842.09.178.255 1.159.905 1.494.99.13.034.502.04.827.016.458-.035.724-.131 1.182-.427.326-.21.642-.475.702-.588.21-.393 1.033-.172 1.033.277 0 .318-.343.717-1 1.164-.957.65-1.998.872-2.987.635zm16.857-2.08c-.17-.188-.177-.257-.06-.645.475-1.587 1.068-4.116 1.2-5.127.25-1.899.223-2.206-.297-3.492-2.306-5.709-5.567-9.982-10.044-13.163-1.155-.822-3.928-2.484-6.233-3.737-1.86-1.012-2.033-1.17-1.784-1.635.258-.483.713-.29 4.71 1.986 4.967 2.83 8.065 5.496 10.626 9.142a35.797 35.797 0 013.352 5.974c.939 2.17.914 2.075.9 3.413-.006.682-.09 1.682-.186 2.223-.354 1.991-1.062 4.62-1.357 5.041-.202.29-.575.298-.827.02zm-27.323-5.636c-.126-.088-.23-.255-.23-.371 0-.22.348-.78.606-.977.121-.092.058-.182-.347-.49-.422-.323-.574-.379-1.03-.379-.309 0-.618.064-.734.152-.308.233-.843.201-.982-.058-.183-.343-.036-.652.442-.926.37-.212.58-.253 1.284-.253.838 0 .846.003 1.581.504 1.684 1.15 2.65 1.274 4.92.63.739-.21 1.447-.406 1.574-.434.386-.086.743.057.81.326.122.481-.08.625-1.37.984-.672.186-1.451.403-1.731.482-.605.17-2.016.188-2.578.032-.521-.144-.898.01-1.318.54-.344.434-.542.487-.897.239zm21.647-.2c-.403-.53-.798-.707-1.276-.574-.58.161-2.05.13-2.757-.06-1.516-.404-2.709-.796-2.876-.944-.238-.211-.23-.466.023-.695.224-.203.551-.183 1.502.088 2.36.675 3.047.75 4.07.443.304-.092.953-.435 1.441-.764l.888-.596h.833c.698 0 .91.042 1.299.26.495.276.662.68.408.987-.159.191-.712.186-.97-.01-.114-.086-.423-.152-.71-.152-.424 0-.597.064-1.023.376-.298.22-.466.406-.401.446.225.14.628.775.628.991 0 .274-.305.565-.59.565-.122 0-.331-.156-.489-.362zm-15.087-6.817c-.977-.876-2.207-1.28-4.183-1.376a15.716 15.716 0 00-2.236.07c-.877.104-1.11.102-1.289-.01-.284-.178-.285-.616-.002-.873.197-.178.43-.2 2.457-.232 1.993-.032 2.34-.012 3.152.18 1.156.275 2.121.75 2.825 1.39.406.37.551.576.551.781 0 .67-.572.7-1.275.07zm7.07.257c-.188-.35-.117-.584.302-1 1.349-1.335 3.476-1.9 6.57-1.746 1.512.076 2.07.185 2.162.423.12.316.059.556-.185.716-.206.135-.355.144-.905.055-1.011-.164-3.167-.133-4.145.06-1.059.209-2.196.746-2.722 1.284-.45.462-.896.547-1.077.208z"
                              />
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: microcurrentToggle
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: microcurrentToggle
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.1)",
                      boxShadow: microcurrentToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>MICROCURRENT</h2>
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

export default Microcurrent;
