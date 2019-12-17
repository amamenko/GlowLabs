import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import ACTION_BEARD_TOGGLE from "../../../actions/AddOns/Beard/ACTION_BEARD_TOGGLE";
import ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET from "../../../actions/AddOns/ExtraExtractions/ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET";
import ACTION_HYDRO_JELLY_TOGGLE_RESET from "../../../actions/AddOns/HydroJellyMask/ACTION_HYDRO_JELLY_TOGGLE_RESET";
import ACTION_LED_THERAPY_TOGGLE_RESET from "../../../actions/AddOns/LEDTherapy/ACTION_LED_THERAPY_TOGGLE_RESET";
import ACTION_MICROCURRENT_TOGGLE_RESET from "../../../actions/AddOns/Microcurrent/ACTION_MICROCURRENT_TOGGLE_RESET";
import ACTION_MICRODERMABRASION_TOGGLE_RESET from "../../../actions/AddOns/Microdermabrasion/ACTION_MICRODERMABRASION_TOGGLE_RESET";
import ACTION_DERMAROLLING_TOGGLE_RESET from "../../../actions/AddOns/Dermarolling/ACTION_DERMAROLLING_TOGGLE_RESET";
import ACTION_NANONEEDLING_TOGGLE_RESET from "../../../actions/AddOns/Nanoneedling/ACTION_NANONEEDLING_TOGGLE_RESET";
import ACTION_GUASHA_TOGGLE_RESET from "../../../actions/AddOns/GuaSha/ACTION_GUASHA_TOGGLE_RESET";
import ACTION_BEARD_TOGGLE_RESET from "../../../actions/AddOns/Beard/ACTION_BEARD_TOGGLE_RESET";
import "./Beard.css";
import "../../treatments/card_styling.css";

const Beard = () => {
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
    if (!beardToggle) {
      dispatch(ACTION_BEARD_TOGGLE());
      if (extraExtractionsToggle) {
        dispatch(ACTION_EXTRA_EXTRACTIONS_TOGGLE_RESET());
      }
      if (hydroJellyToggle) {
        dispatch(ACTION_HYDRO_JELLY_TOGGLE_RESET());
      }
      if (ledTherapyToggle) {
        dispatch(ACTION_LED_THERAPY_TOGGLE_RESET());
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
    } else {
      dispatch(ACTION_BEARD_TOGGLE_RESET());
    }
  };

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="beard_wrapping" ref={ref}>
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
                      backgroundColor: "rgba(211, 211, 211, 0.4)",
                      boxShadow: "0px -1px 1px 0px rgba(207, 207, 196, 0.1)"
                    }}
                  >
                    <Spring
                      from={{ x: 100, fill: "#fff" }}
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
                            stroke="rgba(191, 191, 191)"
                            strokeWidth="0.5"
                            fill="white"
                          />
                          <g transform="translate(11 -699)">
                            <animated.path
                              className="beard_icon_path"
                              stroke="#000"
                              strokeDasharray="100"
                              strokeDashoffset={`${props.x}`}
                              fill={`${props.fill}`}
                              strokeWidth="0.3"
                              d="M6.097 296.145c-.802-.197-1.92-.757-2.436-1.222-.409-.367-.592-.96-.592-1.919-.001-1.225.14-1.688.727-2.377.155-.18.16-.2.042-.17-.18.046-.346-.212-.453-.706-.143-.659-.118-.916.11-1.137.19-.181.2-.22.201-.714.003-1.465.568-2.448 1.723-3.001.938-.449 2.003-.467 2.891-.048 1.016.479 1.747 1.764 1.75 3.08.001.4.015.438.234.648.202.196.231.264.23.534-.004.384-.153 1.078-.26 1.202a.446.446 0 01-.249.112l-.17.02.277.32c.151.175.357.477.456.67.173.34.18.39.179 1.376 0 .927-.016 1.059-.16 1.406-.196.477-.32.633-.755.949-1.125.814-2.717 1.23-3.745.977zm1.18-4.356c-.207-.113-.312-.113-.565-.002-.191.085-.181.088.266.091.435.003.453-.003.298-.088zm-1.36-.512c.385-.203.419-.209 1.096-.194.63.013.724.031.964.184.146.093.398.187.561.208.283.037.302.029.423-.175.07-.118.212-.319.315-.447l.188-.232.017-1.334c.016-1.312.014-1.339-.145-1.607-.2-.337-.723-.69-1.165-.785-.688-.15-1.075-.272-1.536-.483a6.473 6.473 0 00-.507-.218c-.017 0-.05.074-.074.164-.057.218-.537.714-.83.857-.13.063-.333.135-.453.16-.397.083-.439.257-.438 1.838v1.389l.351.477c.344.468.355.476.593.442.133-.019.42-.129.64-.244zm-1.227-2.041c.217-.231.474-.356.733-.356.23 0 1.195.457 1.058.5-.048.016-.323-.024-.613-.088-.527-.116-.703-.105-1.211.073-.117.041-.113.025.033-.13zm2.705-.027c.637-.408 1.112-.417 1.528-.031.165.153.2.212.11.183-.554-.177-.69-.186-1.173-.077-.708.16-.807.144-.465-.075zm-3.576.222c-.082-.68-.15-.828-.232-.508-.086.33.153 1.341.287 1.213.015-.015-.01-.332-.055-.705zm6.334.52c.023-.08.06-.345.08-.591.03-.344.017-.478-.06-.575-.093-.12-.1-.11-.135.16-.1.783-.104 1.15-.015 1.15.05 0 .108-.065.13-.144z"
                              id="path826"
                            />
                          </g>
                        </svg>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: "1px solid rgbA(211, 211, 211)"
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: "rgba(235, 235, 235, 0.3)",
                      boxShadow: "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>BEARD DEEP CLEANSE</h2>
                      <p
                        className="card_description_paragraph"
                        style={{ fontSize: "0.8rem", lineHeight: "20px" }}
                      >
                        Balance and purify your skin while invigorating and
                        conditioning your beard. Ingrown hairs will be removed,
                        skin hydrated, and hair cleansed.
                      </p>
                      <div
                        className="card_bottom_wrapper"
                        style={{
                          color: "rgb(175, 118, 127)",
                          transition: "ease all 0.5s"
                        }}
                      >
                        <p className="card_toggler" onClick={handleToggle}>
                          {beardToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
                        </p>
                        <span className="card_bottom_spacer" />
                        <FontAwesomeIcon
                          className="card_description_icon"
                          icon={faPlus}
                        />
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

export default Beard;
