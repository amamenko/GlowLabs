import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import "./Dermaplaning.css";

const Dermaplaning = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  return (
    <div className="dermaplaning_wrapping" ref={ref}>
      {inView ? (
        <Spring
          from={{ position: "relative", opacity: 0 }}
          to={{ position: "relative", opacity: 1 }}
          config={{ duration: 1000 }}
        >
          {props => (
            <section className="dermaplaning_card" style={props}>
              <div className="dermaplaning_card_image">
                <Spring
                  from={{
                    x: 200,
                    fill1: "white",
                    fill2: "white",
                    fill3: "white",
                    fill4: "white"
                  }}
                  to={{
                    x: 0,
                    fill1: "rgba(160, 75, 58, 0.7)",
                    fill2: "rgba(193, 94, 52, 0.7)",
                    fill3: "rgba(232, 154, 74, 0.7)",
                    fill4: "rgba(231, 155, 73, 0.7)"
                  }}
                  config={{ delay: 300, duration: 4000 }}
                >
                  {props => (
                    <svg
                      className="dermaplaning_svg"
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
                      <animated.g
                        fill="rgba(253, 253, 150, 0.7)"
                        stroke="#000"
                        strokeLinejoin="round"
                        strokeWidth="0.5"
                        transform="translate(5, 7)"
                      >
                        <animated.path
                          fill={`${props.fill1}`}
                          strokeDasharray="200"
                          strokeDashoffset={`${props.x}`}
                          className="dermaplaning_icon_path"
                          d="M14.791 27.9l.55.724.706.752.81.752.785.668 1.152.752 1.36.724 1.072.39 1.02.278.89.195 1.047.167 1.125.028 1.203-.056.916-.139 1.23-.306 1.255-.418 1.15-.501.786-.446.758-.501.55-.418.758-.64.576-.585.654-.696.445-.613.497-.668-.105-.056-.288-.083-.34-.084-.418-.055-.785-.112h-.602l-.785.056-.81.111-.733.14-.68.194-.628.168-.707.222-.784.25-.759.224-.994.278-.968.195-.89.14-.863.11-.994.14-1.072.056h-.89l-1.073-.056-.915-.111-.916-.14-.837-.167-.785-.223-.628-.222-.654-.279z"
                        />
                        <animated.path
                          fill={`${props.fill2}`}
                          strokeDasharray="200"
                          strokeDashoffset={`${props.x}`}
                          className="dermaplaning_icon_path"
                          d="M14.791 27.9l.863.056.654.055.733.028.654.028.837-.028.916-.055.941-.084 1.1-.111.836-.167 1.099-.195.968-.14.994-.25 1.073-.25 1.124-.28 1.256-.333 1.125-.335.785-.278 1.02-.334 1.439-.53 1.308-.528 1.151-.418 1.073-.306.863-.167.288-.028-.079.25-.104.335-.157.557-.236.612-.288.557-.13.418-.157.223-.21.334-.444.807-.105-.055-.628-.168-1.203-.167h-.602l-1.203.084-1.125.223-.811.222-.602.14-.654.195-.47.194-.602.168-.393.11-1.02.307-.68.14-.707.11-.81.14-.812.084-.706.111-.628.028h-.706l-.628.028-1.073-.056-.627-.084-.838-.139-1.203-.195-.602-.195-.837-.25z"
                        />
                        <animated.path
                          fill={`${props.fill3}`}
                          strokeDasharray="200"
                          strokeDashoffset={`${props.x}`}
                          className="dermaplaning_icon_path"
                          d="M14.791 27.9l-.314-.473-.262-.362-.261-.418-.314-.557-.235-.446-.262-.612-.288-.724-.13-.362-.236-.724-.157-.64.13-.056.524.083.47.028h.55l.523.084.471.083.524.112.627.083.707.111.418.028.785.167.628.167 1.125.279.785.25.81.251.655.223.732.223.654.25.837.306.471.251.654.279.654.306.497.306.445.167v.028l-.55.14-.549.166-.942.223-.575.167-.785.084-.759.111-.654.14-.706.166-.863.084-.89.056-.863.055-1.177.084-.654-.028-.602-.028-.628-.024z"
                        />
                        <animated.path
                          fill={`${props.fill4}`}
                          strokeDasharray="200"
                          strokeDashoffset={`${props.x}`}
                          className="dermaplaning_icon_path"
                          d="M23.764 25.03l1.099-.223.968-.223.915-.222.707-.167 1.072-.14.733-.083.628-.084.941-.027.994.027.864.084.654.028.654.083.392.084-.47.195-.733.278-.654.25-.68.28-.811.278-.89.278-.785.25-.68.224-.758.194-.916.195-.445-.195-.497-.306-.706-.334z"
                        />
                        <animated.path
                          strokeDasharray="200"
                          strokeDashoffset={`${props.x}`}
                          className="dermaplaning_icon_path"
                          d="M29.048 23.97l.392-.473.288-.362.262-.335.261-.445.183-.362.262-.64.21-.641.13-.668.026-.752-.026-.724-.078-.668-.21-.724-.287-.697-.314-.64-.445-.64-.55-.585-.366-.334-.497-.335-.418-.306-.628-.25-.759-.223-.863-.14-.706-.027-.733.055-.759.195-.627.25-.471.252-.654.473-.55.529-.523.613-.418.612-.34.696-.262.92-.13.668-.053.529v.612l.052.64.157.725.157.557.21.612.26.613.263.445.313.474.34.417.288.335.262.11.392.112.707.25.968.335 1.49-.306 1.1-.307 1.098-.222.837-.112z"
                        />
                      </animated.g>
                    </svg>
                  )}
                </Spring>
                <div className="dermaplaning_border_right" />
              </div>
              <div className="dermaplaning_description">
                <div className="dermaplaning_description_inner_wrapper">
                  <h2 style={{ fontWeight: 400 }}>DERMAPLANING</h2>
                  <p
                    className="dermaplaning_description_subheader"
                    style={{ opacity: 0.6 }}
                  >
                    Exfoliating
                  </p>
                  <p
                    className="dermaplaning_description_paragraph"
                    style={{ fontSize: "0.8rem", lineHeight: "20px" }}
                  >
                    Dermaplaning minimizes fine lines on skin by shaving its
                    surface, removing the top layer of dead skin along with fine
                    hair.
                  </p>
                  <div className="dermaplaning_card_bottom_wrapper">
                    <p>LEARN MORE</p>
                    <span className="dermaplaning_card_bottom_spacer" />
                    <FontAwesomeIcon
                      className="dermaplaning_suitcase_icon"
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

export default Dermaplaning;