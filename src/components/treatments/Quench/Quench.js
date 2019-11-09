import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import "./Quench.css";

const Quench = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  return (
    <div className="quench_wrapping" ref={ref}>
      {inView ? (
        <Spring
          from={{ position: "relative", opacity: 0 }}
          to={{ position: "relative", opacity: 1 }}
          config={{ duration: 1000 }}
        >
          {props => (
            <section className="quench_card" style={props}>
              <div className="quench_card_image">
                <Spring
                  from={{ x: 200 }}
                  to={{ x: 0 }}
                  config={{ delay: 300, duration: 10000 }}
                >
                  {props => (
                    <svg
                      className="quench_svg"
                      width="100%"
                      height="15rem"
                      viewBox="0 0 50.006 50.006"
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="23"
                        stroke="rgb(163, 190, 194)"
                        strokeWidth="0.5"
                        fill="white"
                      />
                      <g
                        fill="none"
                        stroke="#000"
                        stroke-width="0.5"
                        transform="translate(0, 2)"
                      >
                        <animated.path
                          strokeDasharray="200"
                          strokeDashoffset={`${props.x}`}
                          className="quench_icon_path"
                          fill="none"
                          stroke="#000"
                          d="M17.64 18.69c.123.028.245.056.35.094s.196.09.293.148c.098.059.203.125.281.173l.204.12c.075.044.175.105.294.172.118.066.26.14.385.192.125.053.237.087.348.109.111.022.223.033.356.041.134.008.29.014.451.003.162-.01.33-.039.482-.084.152-.046.281-.105.404-.163s.234-.115.371-.192c.138-.077.308-.179.456-.262a3.27 3.27 0 01.409-.203 2.235 2.235 0 01.793-.156 2.667 2.667 0 01.716.078c.111.025.217.053.32.094.103.042.203.098.326.179.122.08.267.186.403.286.137.1.265.195.384.26.119.063.232.097.357.119.125.022.265.033.395.039.131.006.254.006.393-.003.139-.008.295-.025.46-.058.164-.032.347-.084.506-.15.158-.068.298-.151.42-.226l.34-.212a3.58 3.58 0 01.35-.2 2.374 2.374 0 01.857-.212c.168-.008.358.003.531.05.174.049.333.131.49.198s.305.117.43.186c.126.07.226.16.351.232.126.072.276.128.415.172a4.882 4.882 0 00.705.167c.086.011.136.011.192.011M17.64 22.8c.123.028.245.056.35.094s.196.09.293.148c.098.059.203.126.281.173l.204.12c.075.044.175.105.294.172.118.066.26.14.385.192.125.053.237.087.348.109.111.022.223.033.356.041.134.008.29.014.451.003.162-.01.33-.039.482-.084.152-.046.281-.105.404-.163s.234-.115.371-.192c.138-.077.308-.179.456-.262a3.27 3.27 0 01.409-.203 2.235 2.235 0 01.793-.156 2.667 2.667 0 01.716.078c.111.025.217.053.32.094.103.042.203.098.326.179.122.08.267.186.403.286.137.1.265.195.384.26.119.063.232.097.357.119.125.022.265.033.395.039.131.006.254.006.393-.003.139-.008.295-.025.46-.058.164-.032.347-.084.506-.15.158-.068.298-.151.42-.226l.34-.212a3.58 3.58 0 01.35-.2 2.374 2.374 0 01.857-.212c.168-.008.358.003.531.05.174.049.333.131.49.198s.305.117.43.186c.126.07.226.16.351.232.126.072.276.128.415.172a4.882 4.882 0 00.705.167c.086.011.136.011.192.011M17.623 27.02c.123.028.245.056.35.094s.196.09.293.148c.098.059.203.125.281.173l.204.12c.075.044.175.105.294.172.118.066.26.14.385.192.125.053.237.087.348.109.111.022.223.033.356.041.134.008.29.014.451.003.162-.01.33-.039.482-.084.152-.046.281-.105.404-.163s.234-.115.371-.192c.138-.077.308-.179.456-.262a3.27 3.27 0 01.409-.203 2.235 2.235 0 01.793-.156 2.667 2.667 0 01.716.078c.111.025.217.053.32.094.103.042.203.098.326.179.122.08.267.186.403.286.137.1.265.195.384.26.119.063.232.097.357.119.125.022.265.033.395.039.131.006.254.006.393-.003.139-.008.295-.025.46-.058.164-.032.347-.084.506-.15.158-.068.298-.151.42-.226l.34-.212a3.58 3.58 0 01.35-.2 2.374 2.374 0 01.857-.212c.168-.008.358.003.531.05.174.049.333.131.49.198.155.067.305.117.43.186.126.07.226.16.351.232s.276.128.415.172a4.882 4.882 0 00.705.167c.086.011.136.011.192.011"
                        />
                      </g>
                    </svg>
                  )}
                </Spring>
                <div className="quench_border_right" />
              </div>
              <div className="quench_description">
                <div className="quench_description_inner_wrapper">
                  <h2 style={{ fontWeight: 400 }}>QUENCH</h2>
                  <p
                    className="quench_description_subheader"
                    style={{ opacity: 0.6 }}
                  >
                    Hydrating
                  </p>
                  <p
                    className="quench_description_paragraph"
                    style={{ fontSize: "0.8rem", lineHeight: "20px" }}
                  >
                    Quench helps dehydrated, dry and irritated skin look dewy,
                    glowing and healthy by bringing water content back in.
                  </p>
                  <div className="quench_card_bottom_wrapper">
                    <p>LEARN MORE</p>
                    <span className="quench_card_bottom_spacer" />
                    <FontAwesomeIcon
                      className="quench_suitcase_icon"
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

export default Quench;
