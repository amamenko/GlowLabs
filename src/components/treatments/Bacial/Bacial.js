import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import "./Bacial.css";

const Bacial = () => (
  <section className="bacial_card">
    <div className="bacial_card_image">
      <Spring from={{ x: 200 }} to={{ x: 0 }} config={{ duration: 1500 }}>
        {props => (
          <svg
            className="bacial_svg"
            width="100%"
            height="15rem"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="25"
              stroke="rgb(71, 170, 194)"
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
                strokeDasharray="200"
                strokeDashoffset={`${props.x}`}
                className="bacial_icon_path"
                d="M6.953 276.362l35.653-.064-17.396-18.032-3.872 6.694-1.533-2.274-2.446 4.323-5.109 4.324-.134-1.921z"
                strokeWidth=".5"
              />
              <animated.path
                transform="translate(2, -140)"
                strokeDasharray="200"
                strokeDashoffset={`${props.x}`}
                className="bacial_icon_path"
                d="M8.136 274.808l3.066-3.203.134 1.217 3.415-2.562.806 1.12 2.205-3.138 1.586 3.01 2.608-4.387.216 5.092 2.742-9.576 1.264 4.676.269-4.004 2.796 6.246.188-3.043 11.938 8.904-15.621-16.462-.296-.289-.054-.032-4.033 7.11-1.56-2.402-2.016 3.876-5.78 4.74-.135-1.89z"
                strokeWidth=".265"
              />
            </g>
          </svg>
        )}
      </Spring>
    </div>
    <div className="bacial_description">
      <h2 style={{ fontWeight: 400 }}>BACIAL</h2>
      <p className="bacial_description_subheader" style={{ opacity: 0.5 }}>
        Back acne-fighting
      </p>
      <p style={{ fontSize: "0.8rem" }}>
        For those seeking acne treatment for their backs, the Bacial is a
        perfect choice and employs many of the same skin cleansing techniques
        and antibacterial ingredients as the Clarify facial.
      </p>
      <p className="bacial_card_toggler">
        LEARN MORE
        <span className="bacial_card_bottom_spacer" />
        <FontAwesomeIcon className="bacial_suitcase_icon" icon={faSuitcase} />
      </p>
    </div>
  </section>
);

export default Bacial;
