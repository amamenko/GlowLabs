import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faClock,
  faTag,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import { InView } from "react-intersection-observer";
import ACTION_BACIAL_TOGGLE from "../../../actions/Treatments/Bacial/ACTION_BACIAL_TOGGLE";
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
import ACTION_BACIAL_IN_CART from "../../../actions/InCart/Treatments/Bacial/ACTION_BACIAL_IN_CART";
import ACTION_BACIAL_NOT_IN_CART from "../../../actions/InCart/Treatments/Bacial/ACTION_BACIAL_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import { toast } from "react-toastify";
import BacialNotification from "./BacialNotification";
import BacialRemovedNotification from "./BacialRemovedNotification";
import FacialInCartErrorNotification from "../FacialInCartErrorNotification";
import "./Bacial.css";
import "../../treatments_pages/Page_1/TreatmentsPage1.css";

const Bacial = props => {
  // "Learn More" states
  const calmToggle = useSelector(state => state.calmToggle.toggle);
  const clarifyToggle = useSelector(state => state.clarifyToggle.toggle);
  const bacialToggle = useSelector(state => state.bacialToggle.toggle);
  const glowToggle = useSelector(state => state.glowToggle.toggle);
  const rejuvenateToggle = useSelector(state => state.rejuvenateToggle.toggle);
  const quenchToggle = useSelector(state => state.quenchToggle.toggle);
  const quickieToggle = useSelector(state => state.quickieToggle.toggle);
  const chemicalpeelToggle = useSelector(
    state => state.chemicalpeelToggle.toggle
  );
  const dermaplaningToggle = useSelector(
    state => state.dermaplaningToggle.toggle
  );
  const cbdToggle = useSelector(state => state.cbdToggle.toggle);
  const microneedleToggle = useSelector(
    state => state.microneedleToggle.toggle
  );

  // In Cart states
  const calmInCart = useSelector(state => state.calmInCart.in_cart);
  const clarifyInCart = useSelector(state => state.clarifyInCart.in_cart);
  const bacialInCart = useSelector(state => state.bacialInCart.in_cart);
  const glowInCart = useSelector(state => state.glowInCart.in_cart);
  const cbdInCart = useSelector(state => state.cbdInCart.in_cart);
  const chemicalPeelInCart = useSelector(
    state => state.chemicalPeelInCart.in_cart
  );
  const dermaplaningInCart = useSelector(
    state => state.dermaplaningInCart.in_cart
  );
  const microneedleInCart = useSelector(
    state => state.microneedleInCart.in_cart
  );
  const quenchInCart = useSelector(state => state.quenchInCart.in_cart);
  const quickieInCart = useSelector(state => state.quickieInCart.in_cart);
  const rejuvenateInCart = useSelector(state => state.rejuvenateInCart.in_cart);

  const [cartClicked, changeCartClicked] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!bacialToggle) {
      dispatch(ACTION_BACIAL_TOGGLE());
      if (calmToggle) {
        dispatch(ACTION_CALM_TOGGLE_RESET());
      }
      if (clarifyToggle) {
        dispatch(ACTION_CLARIFY_TOGGLE_RESET());
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
    } else {
      dispatch(ACTION_BACIAL_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (bacialToggle) {
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
                <p>$70</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          Bacial is a back treatment that uses many of the same skin cleansing
          techniques and antibacterial ingredients as the Clarify facial.
        </p>
      );
    }
  };

  const SuitcaseBounce = Keyframes.Spring({
    suitcaseBounce: [
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 100 }
      },
      {
        marginTop: "-9px",
        color: "rgb(155, 98, 107)",
        config: { duration: 300 }
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "-6",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "-4px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      }
    ]
  });

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {styles => (
          <svg
            width="100%"
            height="2rem"
            style={{
              marginTop: "-0.5rem",
              display: bacialInCart ? "block" : "none"
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (bacialInCart ? `${styles.x}` : 0) : 0
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
      glowInCart |
      microneedleInCart |
      quenchInCart |
      quickieInCart |
      rejuvenateInCart
    ) {
      if (!toast.isActive(inCartToastId)) {
        toast.dismiss();
        toast(<FacialInCartErrorNotification />, {
          className: "toast_error_container",
          toastId: inCartToastId
        });
      }
    } else {
      if (bacialInCart) {
        toast.dismiss();
        dispatch(ACTION_BACIAL_NOT_IN_CART());
        dispatch(ACTION_DECREMENT_COUNTER());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        toast(<BacialRemovedNotification />, {
          className: "toast_removed_container"
        });
      } else {
        toast.dismiss();
        dispatch(ACTION_BACIAL_IN_CART());
        dispatch(ACTION_INCREMENT_COUNTER());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        changeCartClicked(true);
        setTimeout(() => changeCartClicked(false), 200);
        toast(<BacialNotification />);
      }
    }
  };

  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {styles => (
          <span
            className="fa-layers fa-fw"
            style={
              bacialToggle
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
                  rejuvenateInCart
                  ? { position: "relative" }
                  : styles
                : { position: "relative" }
            }
            onClick={() => addToCart()}
          >
            <FontAwesomeIcon
              color={
                bacialToggle
                  ? bacialInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : clarifyInCart |
                      cbdInCart |
                      chemicalPeelInCart |
                      calmInCart |
                      dermaplaningInCart |
                      glowInCart |
                      microneedleInCart |
                      quenchInCart |
                      quickieInCart |
                      rejuvenateInCart
                    ? "rgba(211, 211, 211, 0.8"
                    : "rgba(255, 198, 207, 0.8)"
                  : bacialInCart
                  ? "rgb(119, 221, 119, 0.6)"
                  : clarifyInCart |
                    cbdInCart |
                    chemicalPeelInCart |
                    calmInCart |
                    dermaplaningInCart |
                    glowInCart |
                    microneedleInCart |
                    quenchInCart |
                    quickieInCart |
                    rejuvenateInCart
                  ? "rgba(211, 211, 211, 0.8"
                  : "rgba(255, 198, 207, 0.6)"
              }
              transform="grow-20"
              icon={faSquare}
            />
            {checkMark()}
            <FontAwesomeIcon
              style={{ display: bacialInCart ? "none" : "block" }}
              color={
                clarifyInCart |
                cbdInCart |
                chemicalPeelInCart |
                calmInCart |
                dermaplaningInCart |
                glowInCart |
                microneedleInCart |
                quenchInCart |
                quickieInCart |
                rejuvenateInCart
                  ? "rgb(151, 151, 151)"
                  : "rgb(175, 118, 127)"
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
          <p className="big_screen_price">$70</p>
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
          color: bacialToggle ? "rgb(155, 98, 107)" : "rgb(175, 118, 127)",
          transition: "ease all 0.5s"
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {bacialToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
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

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="bacial_wrapping" ref={ref}>
          {inView ? (
            <Spring
              from={{ position: "relative", opacity: 0 }}
              to={{ position: "relative", opacity: 1 }}
              config={{ duration: 1000 }}
            >
              {styleprops => (
                <section className="card" style={styleprops}>
                  <div
                    className="card_image"
                    style={{
                      backgroundColor: bacialToggle
                        ? "rgb(255, 198, 207)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: bacialToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <Spring
                      from={{ x: 200, fill: "#fff" }}
                      to={{ x: 0, fill: "rgba(150,221,225, 0.5)" }}
                      config={{ delay: 300, duration: 1500 }}
                    >
                      {styles => (
                        <>
                          <div className="big_screen_book_now_wrapper">
                            <FontAwesomeIcon
                              className="big_screen_card_description_suitcase"
                              icon={faSuitcase}
                            />
                            <p>BOOK NOW</p>
                          </div>
                          <svg
                            className="card_svg"
                            width="100%"
                            height="15rem"
                            viewBox="0 0 56 56"
                          >
                            <circle
                              cx="28"
                              cy="28"
                              r={
                                props.currentScreenSize === ""
                                  ? props.initialScreenSize >= 1200
                                    ? "22"
                                    : "25"
                                  : props.currentScreenSize >= 1200
                                  ? "22"
                                  : "25"
                              }
                              stroke={
                                bacialToggle
                                  ? "rgb(235, 178, 187)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g
                              id="layer1"
                              fill="none"
                              stroke="#000"
                              transform="translate(10, -174)"
                            >
                              <animated.path
                                fill={`${styles.fill}`}
                                strokeDasharray="200"
                                strokeDashoffset={`${styles.x}`}
                                className="bacial_icon_path"
                                d="M6.953 276.362l35.653-.064-17.396-18.032-3.872 6.694-1.533-2.274-2.446 4.323-5.109 4.324-.134-1.921z"
                                strokeWidth=".5"
                              />
                              <animated.path
                                fill="#fff"
                                transform="translate(2, -140)"
                                strokeDasharray="200"
                                strokeDashoffset={`${styles.x}`}
                                className="bacial_icon_path"
                                d="M8.136 274.808l3.066-3.203.134 1.217 3.415-2.562.806 1.12 2.205-3.138 1.586 3.01 2.608-4.387.216 5.092 2.742-9.576 1.264 4.676.269-4.004 2.796 6.246.188-3.043 11.938 8.904-15.621-16.462-.296-.289-.054-.032-4.033 7.11-1.56-2.402-2.016 3.876-5.78 4.74-.135-1.89z"
                                strokeWidth=".265"
                              />
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: bacialToggle
                          ? "1px solid rgbA(155, 98, 107, 0.4)"
                          : "1px solid rgbA(211, 211, 211)"
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: bacialToggle
                        ? "rgba(255, 198, 207, 0.2)"
                        : "rgba(235, 235, 235, 0.1)",
                      boxShadow: bacialToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>BACIAL</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.6 }}
                      >
                        Back acne-fighting
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

export default Bacial;
