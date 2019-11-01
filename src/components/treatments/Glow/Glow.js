import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import "./Glow.css";

const Glow = () => (
  <section className="glow_card">
    <div className="glow_card_image">
      <Spring from={{ x: 200 }} to={{ x: 0 }} config={{ duration: 1000 }}>
        {props => (
          <svg className="glow_svg" height="15rem" viewBox="0 0 50.006 50.006">
            <circle
              cx="25"
              cy="25"
              r="23"
              stroke="rgb(235, 199, 134)"
              strokeWidth="0.5"
              fill="white"
            />
            <g transform="translate(12.5, 12.5)">
              <animated.path
                transform="translate(200 200)"
                strokeDasharray="200"
                strokeDashoffset={`${props.x}`}
                className="glow_icon_path"
                d="M19.923 34.14l-.046-2.276-1.006-1.776-1.007-1.638-.914-1.548-1.281-2.049-1.053-2.458-.686-2.094-.411-2.003.228-2.55.595-1.957 1.144-2.094 1.51-1.548 1.92-1.229 1.785-.637 2.012-.501 2.288-.228 1.967.091 1.784.273 1.876.592 1.326.683 1.418 1.047 1.418 1.275.961 1.684.87 1.776.045 1.73.091 1.593-.411 1.82-.412 1.73-.686 1.685-.778 1.73-1.006 1.457-.824 1.138-.549.956-.732 1.457-.732 1.547-.228 1.184-.183 1.001v.365l-1.052-.091-1.739-.046h-.869l.32-.637.137-1.047.183-1.047.275-1.366.32-1.775.183-1.503.412-1.82.183-1.64.046-1.183.32-.728.549-.456.594-.273h.504l.274.273.137.32v.545l-.091.729-.55.41-.823.136-.594.046-1.19-.091-1.235-.638-1.006-.637-.686-.637-.778-.956-.274-1.047.274-1.002.732-.228.778-.09.594.09.412.501.092.546-.046.683-.229.547-.549.637-.274.273-.87.637-.777.638-1.327.592-1.235.09h-.823l-.87-.455-.228-.41-.092-.591.137-.592.64-.273h.504l.412.364.457.5.23.684.228 1.73.274 1.547.32 1.503.275 1.547.229 1.548.366 1.912.091 1.002.046 1.047 6.679.136.091 1.912-.045 1.32-.138 1.275-.823 1.23-1.876 1.274-1.006.683s-.94.24-1.418.228c-.437-.011-1.281-.274-1.281-.274l-.96-.682-1.83-1.23-.687-.819.412.273-.366-.318 3.248.09 2.424.046 2.013-.045h1.739l.457-.501.046-1.776-1.052-.09h-8.235l-1.006-.046.32 2.367-.366-2.367 10.34.045.045-2.64-9.973-.091-.457-.546.091 3.232z"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.8"
                paintOrder="markers stroke fill"
              />
            </g>
          </svg>
        )}
      </Spring>
    </div>
    <div className="glow_description">
      <h2 style={{ fontWeight: 400 }}>Glow</h2>
      <p className="glow_description_subheader" style={{ opacity: 0.5 }}>
        Brightening
      </p>
      <p style={{ fontSize: "0.8rem" }}>
        Accelerate brightening, improve skin tone, enhance skin clarity and
        create a fresher, healthier appearance with this effective treatment.
        Hyper-pigmentation and sun damage don’t stand a chance.
      </p>
      <p className="glow_card_toggler">
        LEARN MORE
        <span className="glow_card_bottom_spacer" />
        <FontAwesomeIcon className="glow_suitcase_icon" icon={faSuitcase} />
      </p>
    </div>
  </section>
);

export default Glow;
