import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import "./Rejuvenate.css";

const Rejuvenate = () => (
  <section className="rejuvenate_card">
    <div className="rejuvenate_card_image">
      <Spring from={{ x: 200 }} to={{ x: 0 }} config={{ duration: 1500 }}>
        {props => (
          <svg
            className="rejuvenate_svg"
            height="15rem"
            viewBox="0 0 50.006 50.006"
          >
            <circle
              cx="25"
              cy="25"
              r="23"
              stroke="rgb(213, 202, 230)"
              strokeWidth="0.5"
              fill="white"
            />
            <g fill="none" transform="translate(13, -110)">
              <animated.path
                strokeDasharray="200"
                strokeDashoffset={`${props.x}`}
                className="rejuvenate_icon_path"
                d="M24.091 272.328c-.389.428-1.166 1.283-2.111 2.239-.946.955-2.05 2.001-3.008 2.785-.959.783-1.767 1.3-2.468 1.669-.7.368-1.293.588-1.909.724a9.319 9.319 0 01-1.855.195 7.955 7.955 0 01-1.74-.144 5.871 5.871 0 01-1.767-.665 7.503 7.503 0 01-1.743-1.42 7.848 7.848 0 01-1.413-2.133c-.373-.838-.627-1.814-.75-2.771a11.602 11.602 0 01-.027-2.703 7.797 7.797 0 01.492-2.063 6.77 6.77 0 01.905-1.588c.37-.491.808-.966 1.352-1.388a7.469 7.469 0 011.897-1.06 6.772 6.772 0 012.17-.44 6.798 6.798 0 012.256.309c.747.232 1.478.597 2.221 1a25.55 25.55 0 012.194 1.316c.697.475 1.336.983 2.152 1.686.816.703 1.809 1.601 2.582 2.39.774.787 1.328 1.465 1.994 2.185.666.72 1.444 1.482 2.233 2.245.789.762 1.59 1.525 2.613 2.296 1.024.77 2.271 1.55 3.36 1.999 1.09.449 2.021.568 2.888.606.866.038 1.666-.004 2.436-.119.77-.114 1.509-.3 2.202-.72.692-.42 1.34-1.072 1.84-1.838.5-.767.854-1.648 1.131-2.339.277-.69.477-1.19.608-1.656.131-.466.193-.898.197-1.376a5.421 5.421 0 00-.235-1.627c-.185-.622-.5-1.343-.95-2.139-.451-.796-1.036-1.669-1.57-2.252a4.912 4.912 0 00-1.514-1.132 7.414 7.414 0 00-1.505-.585 7.25 7.25 0 00-1.609-.207 6.742 6.742 0 00-1.96.203c-.761.195-1.662.56-2.528 1.012-.866.454-1.697.996-2.43 1.523a27.5 27.5 0 00-2.02 1.608c-.643.559-1.29 1.16-1.994 1.825s-1.466 1.394-1.847 1.758c-.381.364-.381.364-.77.792z"
                fill="none"
                stroke="#000"
                strokeWidth="1.2"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
              />
            </g>
          </svg>
        )}
      </Spring>
    </div>
    <div className="rejuvenate_description">
      <h2 style={{ fontWeight: 400 }}>Rejuvenate</h2>
      <p className="rejuvenate_description_subheader" style={{ opacity: 0.5 }}>
        Anti-aging
      </p>
      <p style={{ fontSize: "0.8rem" }}>
        Fine-lines, pigmentation and elasticity loss all come with aging skin.
        Lines and wrinkles can make you appear older than you feel. Rejuvenate
        can help pause and reverse the signs of aging.
      </p>
      <p className="rejuvenate_card_toggler">
        LEARN MORE
        <span className="rejuvenate_card_bottom_spacer" />
        <FontAwesomeIcon
          className="rejuvenate_suitcase_icon"
          icon={faSuitcase}
        />
      </p>
    </div>
  </section>
);

export default Rejuvenate;
