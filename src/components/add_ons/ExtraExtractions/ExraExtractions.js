import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import "./ExtraExtractions.css";
import "../../treatments/card_styling.css";

const ExtraExtractions = () => {
  const dispatch = useDispatch();

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="extra_extractions_wrapping" ref={ref}>
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
                      from={{ x: 400 }}
                      to={{ x: 0 }}
                      config={{ duration: 3000 }}
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
                          <g transform="translate(10.5 10)">
                            <animated.path
                              className="extra_extractions_icon_path"
                              strokeDasharray="400"
                              strokeDashoffset={`${props.x}`}
                              stroke="#000"
                              strokeWidth="1.2"
                              d="M24.135 49.56c-.073-.145-.11-3.025-.11-8.554v-8.334h-7.857c-5.21 0-7.925-.04-8.062-.117-.198-.113-.207-.278-.207-4.075s.009-3.962.207-4.074c.137-.078 2.851-.118 8.062-.118h7.856v-8.334c0-5.528.038-8.408.111-8.554.106-.21.262-.219 3.84-.219 3.58 0 3.735.01 3.841.22.074.145.11 3.025.11 8.553v8.334h7.883c6.27 0 7.92.03 8.07.147.175.135.188.442.179 4.05-.01 3.507-.029 3.918-.189 4.045-.139.11-1.92.142-8.06.142h-7.882v8.335c0 5.528-.037 8.408-.11 8.553-.107.21-.263.22-3.841.22-3.579 0-3.735-.01-3.841-.22z"
                              fill="none"
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
                      <h2 style={{ fontWeight: 400 }}>EXTRA EXTRACTIONS</h2>
                      <p
                        className="card_description_paragraph"
                        style={{ fontSize: "0.8rem", lineHeight: "20px" }}
                      >
                        Extractions are one of the most important parts of a
                        facial for those with acne. Ensure you get extra
                        cleaning without booking an extra facial with this
                        add-on.
                      </p>
                      <div
                        className="card_bottom_wrapper"
                        style={{
                          color: "rgb(175, 118, 127)",
                          transition: "ease all 0.5s"
                        }}
                      >
                        <p className="card_toggler">LEARN MORE</p>
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

export default ExtraExtractions;
