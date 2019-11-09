import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import "./Clarify.css";

const Clarify = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  return (
    <div className="clarify_wrapping" ref={ref}>
      {inView ? (
        <Spring
          from={{ position: "relative", opacity: 0 }}
          to={{ position: "relative", opacity: 1 }}
          config={{ duration: 1000 }}
        >
          {props => (
            <section className="clarify_card" style={props}>
              <div className="clarify_card_image">
                <Spring
                  from={{ x: 200, fill: "white" }}
                  to={{ x: 0, fill: "rgb(207, 207, 196, 0.4)" }}
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
                        stroke="rgb(235, 178, 187)"
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
                <div className="clarify_border_right" />
              </div>
              <div className="clarify_description">
                <div className="clarify_description_inner_wrapper">
                  <h2 style={{ fontWeight: 400 }}>CLARIFY</h2>
                  <p
                    className="clarify_description_subheader"
                    style={{ opacity: 0.6 }}
                  >
                    Acne-fighting
                  </p>
                  <p
                    className="clarify_description_paragraph"
                    style={{ fontSize: "0.8rem", lineHeight: "20px" }}
                  >
                    Dealing with pimples and irritation? Clarify employs
                    deep-tissue cleansing to remove excess oils, prevent
                    breakouts and soothe skin.
                  </p>
                  <div className="clarify_card_bottom_wrapper">
                    <p>LEARN MORE</p>
                    <span className="clarify_card_bottom_spacer" />
                    <FontAwesomeIcon
                      className="clarify_suitcase_icon"
                      icon={faSuitcase}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </Spring>
      ) : null}
    </div>
  );
};

export default Clarify;