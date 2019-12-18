import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import ACTION_LED_THERAPY_TOGGLE from "../../../actions/AddOns/LEDTherapy/ACTION_LED_THERAPY_TOGGLE";
import ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET from "../../../actions/AddOns/ExtraExtractions/ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET";
import ACTION_HYDRO_JELLY_TOGGLE_RESET from "../../../actions/AddOns/HydroJellyMask/ACTION_HYDRO_JELLY_TOGGLE_RESET";
import ACTION_LED_THERAPY_TOGGLE_RESET from "../../../actions/AddOns/LEDTherapy/ACTION_LED_THERAPY_TOGGLE_RESET";
import ACTION_MICROCURRENT_TOGGLE_RESET from "../../../actions/AddOns/Microcurrent/ACTION_MICROCURRENT_TOGGLE_RESET";
import ACTION_MICRODERMABRASION_TOGGLE_RESET from "../../../actions/AddOns/Microdermabrasion/ACTION_MICRODERMABRASION_TOGGLE_RESET";
import ACTION_DERMAROLLING_TOGGLE_RESET from "../../../actions/AddOns/Dermarolling/ACTION_DERMAROLLING_TOGGLE_RESET";
import ACTION_NANONEEDLING_TOGGLE_RESET from "../../../actions/AddOns/Nanoneedling/ACTION_NANONEEDLING_TOGGLE_RESET";
import ACTION_GUASHA_TOGGLE_RESET from "../../../actions/AddOns/GuaSha/ACTION_GUASHA_TOGGLE_RESET";
import ACTION_BEARD_TOGGLE_RESET from "../../../actions/AddOns/Beard/ACTION_BEARD_TOGGLE_RESET";
import "./LEDTherapy.css";
import "../../treatments/card_styling.css";

const LEDTherapy = () => {
  const extraExtractionsToggle = useSelector(
    state => state.extraExtractionsToggle.toggle
  );
  const hydroJellyToggle = useSelector(state => state.hydroJellyToggle.toggle);
  const ledTherapyToggle = useSelector(state => state.ledTherapyToggle.toggle);
  const microcurrentToggle = useSelector(
    state => state.microcurrentToggle.toggle
  );
  const microdermabrasionToggle = useSelector(
    state => state.microdermabrasionToggle.toggle
  );
  const dermarollingToggle = useSelector(
    state => state.dermarollingToggle.toggle
  );
  const nanoneedlingToggle = useSelector(
    state => state.nanoneedlingToggle.toggle
  );
  const guashaToggle = useSelector(state => state.guashaToggle.toggle);
  const beardToggle = useSelector(state => state.beardToggle.toggle);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!ledTherapyToggle) {
      dispatch(ACTION_LED_THERAPY_TOGGLE());
      if (extraExtractionsToggle) {
        dispatch(ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET());
      }
      if (hydroJellyToggle) {
        dispatch(ACTION_HYDRO_JELLY_TOGGLE_RESET());
      }
      if (microcurrentToggle) {
        dispatch(ACTION_MICROCURRENT_TOGGLE_RESET());
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
      dispatch(ACTION_LED_THERAPY_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (ledTherapyToggle) {
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
        <p
          className="card_description_paragraph"
          style={{ fontSize: "0.8rem", lineHeight: "20px" }}
        >
          Light waves trigger skin's natural intracellular reactions. Red light
          strengthens cellular structure while blue light produces oxygen
          radicals that kill P. acnes bacteria.
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
        marginTop: "-5px",
        color: "rgb(155, 98, 107)",
        config: { duration: 300 }
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "-5",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 }
      },
      {
        marginTop: "-3px",
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

  const addOnBounce = () => {
    if (ledTherapyToggle) {
      return (
        <SuitcaseBounce state="suitcaseBounce">
          {styles => (
            <FontAwesomeIcon
              className="card_suitcase_icon"
              style={styles}
              icon={faPlus}
            />
          )}
        </SuitcaseBounce>
      );
    } else {
      return (
        <FontAwesomeIcon
          className="card_suitcase_icon"
          style={{
            color: ledTherapyToggle
              ? "rgb(155, 98, 107)"
              : "rgb(175, 118, 127)",
            transition: "ease all 0.5s"
          }}
          icon={faPlus}
        />
      );
    }
  };

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="led_therapy_wrapping" ref={ref}>
          {inView ? (
            <Spring
              from={{ position: "relative", opacity: 0 }}
              to={{ position: "relative", opacity: 1 }}
              config={{ duration: 1000 }}
            >
              {props => (
                <section className="card" style={props}>
                  <div
                    className="card_image"
                    style={{
                      backgroundColor: ledTherapyToggle
                        ? "rgb(255, 198, 207)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: ledTherapyToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <Spring
                      from={{ x: 200, fill: "#fff" }}
                      to={{ x: 0, fill: "#000" }}
                      config={{ duration: 2500 }}
                    >
                      {props => (
                        <svg
                          width="100%"
                          height="15rem"
                          viewBox="0 0 56.356 56.356"
                          className="card_svg"
                        >
                          <circle
                            cx="28"
                            cy="28"
                            r="26"
                            stroke={
                              ledTherapyToggle
                                ? "rgb(235, 178, 187)"
                                : "rgba(191, 191, 191)"
                            }
                            strokeWidth="0.5"
                            fill="white"
                          />
                          <g transform="translate(11 11)">
                            <animated.path
                              className="led_therapy_icon_path"
                              strokeDasharray="200"
                              stroke="#000"
                              strokeDashoffset={`${props.x}`}
                              strokeWidth="0.4"
                              fill={`${props.fill}`}
                              d="M23.743 52.05c-1.497-.896-1.552-1.055-1.63-4.665-.069-3.2-.086-3.303-.592-3.565-.73-.38-1.163-1.331-1.574-3.457-.772-4.006-2.2-8.233-4.668-13.816-1.486-3.361-1.8-4.384-2.002-6.537-.255-2.71.601-6.19 2.154-8.75.407-.67 1.549-2.012 2.537-2.98 1.496-1.467 2.148-1.926 3.897-2.744 4.679-2.187 9.305-2.196 13.95-.024 1.628.762 2.409 1.301 3.807 2.631 2.794 2.658 4.192 5.356 4.72 9.104.44 3.123.067 4.836-2.156 9.913-2.426 5.543-4.015 10.434-4.64 14.282-.19 1.177-.677 2.035-1.354 2.386-.484.251-.506.389-.574 3.562-.069 3.175-.092 3.323-.628 3.885-1.01 1.06-1.628 1.176-6.284 1.175-3.791 0-4.373-.047-4.963-.4zm9.966-1.595l.501-.486-2.983-.108c-2.461-.089-3.023-.17-3.216-.467-.17-.261-.153-.454.06-.702.24-.28.825-.342 3.271-.342h2.98v-1.499l-3.039-.06c-2.55-.05-3.076-.118-3.272-.42-.17-.26-.153-.453.06-.701.24-.281.825-.342 3.271-.342h2.98v-1.08H23.409v.54c0 .49.086.54.946.543 1.189.004 1.563.23 1.467.885-.067.458-.204.522-1.244.58-1.168.065-1.17.066-1.17.798s.002.734 1.17.799c1.087.06 1.174.106 1.239.651.074.62-.14.734-1.629.866l-.668.059.501.486c.485.47.637.485 4.844.485 4.207 0 4.358-.015 4.844-.485zm1.905-7.99c.129-.15.488-1.486.798-2.969.711-3.402 1.96-7.196 3.806-11.559.795-1.877 1.401-3.455 1.349-3.506-.053-.051-2.18.016-4.729.149-5.856.305-10.09.305-15.946 0-2.547-.133-4.68-.196-4.737-.14-.058.056.25.908.685 1.894 2.207 4.998 3.689 9.409 4.565 13.592.26 1.244.58 2.385.71 2.536.34.398 13.16.4 13.5.002zm-12.26-3.891c-.21-.162-.739-2.023-1.386-4.876-.962-4.24-1.019-4.643-.69-4.962.756-.733 1.08-.09 2.06 4.093 1.313 5.596 1.302 5.515.787 5.782-.309.16-.528.15-.77-.037zm3.385.055c-.398-.238-1.167-9.15-.842-9.761.238-.448.703-.49 1.041-.095.198.231.918 7.37.924 9.154.002.567-.659.98-1.123.702zm3.305-.069c-.437-.424.23-9.561.72-9.862.448-.275.564-.26.885.115.222.259.208 1.239-.065 4.867-.374 4.971-.625 5.767-1.54 4.88zm3.432.033c-.395-.383-.358-.66.735-5.401a515.85 515.85 0 001.002-4.395c0-.151.723-.273 1.002-.17.49.183.428.735-.582 5.202-1.06 4.69-1.418 5.48-2.157 4.764zm7.305-15.68l1.67-.144.286-1.295c.176-.798.241-2.024.169-3.195-.346-5.596-3.845-10.13-9.421-12.206-1.358-.506-1.8-.56-4.62-.56-2.82 0-3.26.054-4.619.56-2.18.812-3.837 1.839-5.38 3.334-2.417 2.343-3.84 5.358-4.066 8.613-.116 1.686.184 4.334.53 4.666.543.522 19.994.695 25.451.227z"
                            />
                          </g>
                        </svg>
                      )}
                    </Spring>

                    <div
                      className="card_border_right"
                      style={{
                        borderRight: ledTherapyToggle
                          ? "1px solid rgbA(155, 98, 107, 0.4)"
                          : "1px solid rgbA(211, 211, 211)"
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: ledTherapyToggle
                        ? "rgba(255, 198, 207, 0.2)"
                        : "rgba(235, 235, 235, 0.1)",
                      boxShadow: ledTherapyToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>LED THERAPY</h2>
                      {cardDescriptionHandler()}
                      <div
                        className="card_bottom_wrapper"
                        style={{
                          color: ledTherapyToggle
                            ? "rgb(155, 98, 107)"
                            : "rgb(175, 118, 127)",
                          transition: "ease all 0.5s"
                        }}
                      >
                        <p className="card_toggler" onClick={handleToggle}>
                          {ledTherapyToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
                        </p>
                        <span className="card_bottom_spacer" />
                        {addOnBounce()}
                      </div>
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

export default LEDTherapy;