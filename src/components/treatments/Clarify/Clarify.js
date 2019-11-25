import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import ACTION_CLARIFY_TOGGLE from "../../../actions/Treatments/Clarify/ACTION_CLARIFY_TOGGLE";
import ACTION_CLARIFY_TOGGLE_RESET from "../../../actions/Treatments/Clarify/ACTION_CLARIFY_TOGGLE_RESET";
import ACTION_CALM_TOGGLE_RESET from "../../../actions/Treatments/Calm/ACTION_CALM_TOGGLE_RESET";
import ACTION_GLOW_TOGGLE_RESET from "../../../actions/Treatments/Glow/ACTION_GLOW_TOGGLE_RESET";
import ACTION_BACIAL_TOGGLE_RESET from "../../../actions/Treatments/Bacial/ACTION_BACIAL_TOGGLE_RESET";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import "./Clarify.css";

const Clarify = () => {
  const clarifyToggle = useSelector(state => state.clarifyToggle.toggle);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!clarifyToggle) {
      dispatch(ACTION_CLARIFY_TOGGLE());
      dispatch(ACTION_CALM_TOGGLE_RESET());
      dispatch(ACTION_BACIAL_TOGGLE_RESET());
      dispatch(ACTION_GLOW_TOGGLE_RESET());
    } else {
      dispatch(ACTION_CLARIFY_TOGGLE_RESET());
    }
  };

  console.log(clarifyToggle);

  const cardDescriptionHandler = () => {
    if (clarifyToggle) {
      return (
        <>
          <div className="clarify_description_paragraph_toggle">
            <div className="clarify_description_icon_wrapper_container">
              <div className="clarify_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="clarify_description_icon"
                  icon={faClock}
                />
                <p className="clarify_description_paragraph_title">Duration</p>
              </div>
              <div className="clarify_description_paragraph_value">
                <p>50 minutes</p>
              </div>
              <div className="clarify_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="clarify_description_icon"
                  icon={faTag}
                />
                <p className="clarify_description_paragraph_title">Price</p>
              </div>
              <div className="clarify_description_paragraph_value">
                <p>$70</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p
          className="clarify_description_paragraph"
          style={{ fontSize: "0.8rem", lineHeight: "20px" }}
        >
          Dealing with pimples and irritation? Clarify employs deep-tissue
          cleansing to remove excess oils, prevent breakouts and soothe skin.
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

  const bookButtonBounce = () => {
    if (clarifyToggle) {
      return (
        <SuitcaseBounce state="suitcaseBounce">
          {styles => (
            <FontAwesomeIcon
              className="clarify_suitcase_icon"
              style={styles}
              icon={faSuitcase}
            />
          )}
        </SuitcaseBounce>
      );
    } else {
      return (
        <FontAwesomeIcon
          className="clarify_suitcase_icon"
          style={{
            color: clarifyToggle ? "rgb(155, 98, 107)" : "rgb(175, 118, 127)",
            transition: "ease all 0.5s"
          }}
          icon={faSuitcase}
        />
      );
    }
  };

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="clarify_wrapping" ref={ref}>
          {inView ? (
            <Spring
              from={{ position: "relative", opacity: 0 }}
              to={{ position: "relative", opacity: 1 }}
              config={{ duration: 1000 }}
            >
              {props => (
                <section className="clarify_card" style={props}>
                  <div
                    className="clarify_card_image"
                    style={{
                      backgroundColor: clarifyToggle
                        ? "rgb(255, 198, 207)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: clarifyToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <Spring
                      from={{ x: 200, fill: "white" }}
                      to={{ x: 0, fill: "rgb(207, 207, 196, 0.3)" }}
                      config={{ delay: 300, duration: 1500 }}
                    >
                      {props => (
                        <svg
                          className="clarify_svg"
                          width="100%"
                          height="15rem"
                          viewBox="0 0 50.006 50.006"
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="23"
                            stroke={
                              clarifyToggle
                                ? "rgb(235, 178, 187)"
                                : "rgba(191, 191, 191)"
                            }
                            strokeWidth="0.5"
                            fill="white"
                          />
                          <g fill="none" transform="translate(13, 12)">
                            <animated.path
                              fill={`${props.fill}`}
                              strokeDasharray="200"
                              strokeDashoffset={`${props.x}`}
                              className="clarify_icon_path"
                              d="M9.257 37.6l29.142.04 1.265-.197 1.112-.511 1.15-.944.805-1.297.767-1.77.077-1.69-.153-1.336-.384-1.455-.613-.943-.92-.944-.576-.432-.69-.55-.038-.355v-1.14l-.192-.864-.383-.59-.614-.826-.844-.51-.92-.433-.958.039-.767.157-.652.393-.269.079v-.786l-.191-1.062-.537-1.336-.499-.826-.575-.707-.958-.826-1.112-.511-.767-.157h-.92l-.997.196-.882.315-.614.471-.805.55-.384.512-.536-.747-.499-.983-1.073-1.376-1.15-1.1-1.113-.787-1.265-.55-1.342-.275h-1.227l-1.38.117-1.266.394-1.15.55-.997.865-.997 1.1-.614 1.062-.805 1.455-.575 1.376-.345 1.336.038 1.258.077 1.337.153 1.376.537 1.14-1.265.354-1.342.668-.959.904-.805 1.022L5 29.148l-.384 1.297.039 1.376.153 1.062.345 1.218.46 1.101.844.983.92.707.959.512z"
                              stroke="#000"
                              strokeWidth="0.8"
                            />
                            <animated.path
                              strokeDasharray="200"
                              strokeDashoffset={`${props.x}`}
                              d="M8.304 35.53c-.339-1.946-.71-5.773 1.362-10.234s5.892-8.774 10.861-11.369c4.97-2.595 10.994-3.103 14.08-1.341 3.087 1.762 3.311 5.051 1.8 10.028-1.513 4.976-4.786 11.274-5.288 15.62-.503 4.346 1.765 6.74.253 7.684-1.512.945-6.804.441-10.71-.849s-8.065-4.713-9.889-6.12-2.13-1.473-2.469-3.42z"
                            />
                          </g>
                        </svg>
                      )}
                    </Spring>
                    <div
                      className="clarify_border_right"
                      style={{
                        borderRight: clarifyToggle
                          ? "1px solid rgbA(155, 98, 107, 0.4)"
                          : "1px solid rgbA(211, 211, 211)"
                      }}
                    />
                  </div>
                  <div
                    className="clarify_description"
                    style={{
                      backgroundColor: clarifyToggle
                        ? "rgba(255, 198, 207, 0.2)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: clarifyToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <div className="clarify_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>CLARIFY</h2>
                      <p
                        className="clarify_description_subheader"
                        style={{ opacity: 0.7 }}
                      >
                        Acne-fighting
                      </p>
                      {cardDescriptionHandler()}
                      <div
                        className="clarify_card_bottom_wrapper"
                        style={{
                          color: clarifyToggle
                            ? "rgb(155, 98, 107)"
                            : "rgb(175, 118, 127)",
                          transition: "ease all 0.5s"
                        }}
                      >
                        <p
                          className="clarify_card_toggler"
                          onClick={handleToggle}
                        >
                          {clarifyToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
                        </p>
                        <span className="clarify_card_bottom_spacer" />
                        {bookButtonBounce()}
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

export default Clarify;
