import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { InView } from "react-intersection-observer";
import ACTION_REJUVENATE_TOGGLE from "../../../actions/Treatments/Rejuvenate/ACTION_REJUVENATE_TOGGLE";
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
import "./Rejuvenate.css";

const Rejuvenate = () => {
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

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!rejuvenateToggle) {
      dispatch(ACTION_REJUVENATE_TOGGLE());
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
      dispatch(ACTION_REJUVENATE_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (rejuvenateToggle) {
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
                <p>$80</p>
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
          Fine-lines, pigmentation and elasticity loss all come with aging skin.
          Rejuvenate can help pause and even reverse these issues.
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
    if (rejuvenateToggle) {
      return (
        <SuitcaseBounce state="suitcaseBounce">
          {styles => (
            <FontAwesomeIcon
              className="card_suitcase_icon"
              style={styles}
              icon={faSuitcase}
            />
          )}
        </SuitcaseBounce>
      );
    } else {
      return (
        <FontAwesomeIcon
          className="card_suitcase_icon"
          style={{
            color: rejuvenateToggle
              ? "rgb(155, 98, 107)"
              : "rgb(175, 118, 127)",
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
        <div className="rejuvenate_wrapping" ref={ref}>
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
                      backgroundColor: rejuvenateToggle
                        ? "rgb(255, 198, 207)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: rejuvenateToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <Spring
                      from={{ x: 250, fill: "white" }}
                      to={{ x: 0, fill: "rgba(177, 156, 217, 0.4)" }}
                      config={{ delay: 300, duration: 1000 }}
                    >
                      {props => (
                        <svg
                          className="card_svg"
                          width="100%"
                          height="15rem"
                          viewBox="0 0 50.006 50.006"
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="23"
                            stroke={
                              rejuvenateToggle
                                ? "rgb(235, 178, 187)"
                                : "rgba(191, 191, 191)"
                            }
                            strokeWidth="0.5"
                            fill="white"
                          />
                          <g fill="none" transform="translate(13, 12)">
                            <animated.path
                              strokeDasharray="250"
                              strokeDashoffset={`${props.x}`}
                              fill={`${props.fill}`}
                              stroke="black"
                              strokeWidth="0.8"
                              className="rejuvenate_icon_path"
                              d="M12.764 36.56a11.521 11.521 0 01-2.147-.552c-.74-.279-2.073-1.064-2.738-1.611-.688-.567-1.671-1.689-2.195-2.504-.754-1.175-1.36-2.756-1.646-4.295-.184-.99-.182-2.97.003-3.971.375-2.024 1.17-3.78 2.365-5.223 1.457-1.762 3.222-2.874 5.387-3.397.564-.136.818-.156 1.972-.156 1.166 0 1.402.019 1.972.16 2.11.52 3.814 1.636 5.868 3.839 1.024 1.099 2.268 2.709 4.281 5.54 1.095 1.541 1.431 1.972 2.678 3.436 3.675 4.314 5.933 5.566 8.752 4.854 2.008-.508 3.649-1.962 4.504-3.992.414-.982.567-1.681.602-2.75.046-1.366-.158-2.417-.707-3.638-.673-1.5-1.766-2.692-3.092-3.371-1.368-.7-3.32-.75-4.94-.126-.71.275-1.167.532-1.844 1.04-.82.615-1.19.987-2.846 2.867-.87.986-1.603 1.784-1.631 1.772-.028-.011-.447-.571-.932-1.245l-.88-1.225.362-.474c.711-.93 2.318-2.75 3.071-3.476 3.047-2.94 5.803-3.892 8.977-3.1.884.221 1.558.5 2.445 1.012 2.741 1.583 4.595 4.32 5.217 7.704.188 1.022.19 2.99.004 3.992-.19 1.031-.386 1.676-.805 2.655-1.3 3.037-3.773 5.183-6.856 5.948-.683.17-.843.184-2.094.182-1.175 0-1.433-.021-1.957-.153-1.724-.432-3.236-1.305-4.843-2.794-.518-.48-2.3-2.487-2.978-3.354-.534-.682-1.401-1.855-2.495-3.374-3.386-4.704-5.957-7.249-8.12-8.039-1.704-.622-3.807-.239-5.415.988-1.03.785-1.735 1.714-2.25 2.96-.392.95-.53 1.588-.567 2.643-.051 1.396.149 2.44.704 3.677.849 1.892 2.31 3.23 4.095 3.753.755.222 2.312.218 3.191-.008 1.307-.334 2.367-.947 3.592-2.076.242-.224 1.119-1.202 1.947-2.174l1.506-1.767.878 1.262c.484.694.879 1.29.879 1.326 0 .112-1.895 2.364-2.688 3.194-2.13 2.229-3.985 3.447-5.956 3.912-.686.162-1.96.224-2.63.13z"
                            />
                          </g>
                        </svg>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: rejuvenateToggle
                          ? "1px solid rgbA(155, 98, 107, 0.4)"
                          : "1px solid rgbA(211, 211, 211)"
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: rejuvenateToggle
                        ? "rgba(255, 198, 207, 0.2)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: rejuvenateToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s"
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>REJUVENATE</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.6 }}
                      >
                        Anti-aging
                      </p>
                      {cardDescriptionHandler()}
                      <div
                        className="card_bottom_wrapper"
                        style={{
                          color: rejuvenateToggle
                            ? "rgb(155, 98, 107)"
                            : "rgb(175, 118, 127)",
                          transition: "ease all 0.5s"
                        }}
                      >
                        <p className="card_toggler" onClick={handleToggle}>
                          {rejuvenateToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
                        </p>
                        <span className="card_bottom_spacer" />
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

export default Rejuvenate;
