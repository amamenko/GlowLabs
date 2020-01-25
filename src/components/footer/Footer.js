import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneSquare,
  faEnvelopeSquare,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_insta_wrapping">
        <span
          className="footer_insta_svg_wrapper fa-layers fa-fw"
          onClick={() =>
            window.open("https://instagram.com/glow.labs", "_blank")
          }
        >
          <FontAwesomeIcon
            icon={faSquare}
            style={{ color: "rgb(255, 255, 255)" }}
            transform="grow-18"
          />
          <svg
            className="insta_logo"
            width="110%"
            height="10rem"
            viewBox="0 0 13.229 13.229"
          >
            <g transform="translate(0 -283.77)">
              <path
                d="M3.654 296.414a3.257 3.257 0 01-1.897-.912c-.482-.476-.765-.997-.918-1.69l-.053-.242v-6.06l.053-.242c.153-.694.436-1.215.918-1.69a3.264 3.264 0 011.64-.873l.24-.053H9.687l.241.053a3.246 3.246 0 011.66.895c.459.457.75.998.897 1.667l.053.242v6.061l-.053.242c-.29 1.32-1.225 2.26-2.545 2.561l-.23.052-2.944.004c-1.619.003-3.019-.004-3.11-.015zm5.842-1.036c.371-.035.751-.17 1.052-.375a2.89 2.89 0 00.54-.534 2.25 2.25 0 00.402-1.089c.032-.334.032-5.347 0-5.681a2.315 2.315 0 00-.374-1.054 2.89 2.89 0 00-.533-.541 2.24 2.24 0 00-1.087-.403c-.333-.032-5.336-.032-5.67 0a2.24 2.24 0 00-1.085.403 2.89 2.89 0 00-.533.541c-.205.302-.34.682-.375 1.054-.032.334-.032 5.347 0 5.681.037.394.177.772.402 1.089.112.158.388.43.54.534.285.194.687.342 1.01.374.294.028 5.413.03 5.711.003zm-3.087-1.81a3.057 3.057 0 01-2.742-2.554 4.313 4.313 0 010-.949 3.065 3.065 0 012.521-2.526 4.29 4.29 0 01.947 0 3.068 3.068 0 012.521 2.526c.035.21.035.739 0 .949-.213 1.285-1.231 2.313-2.496 2.521a4.77 4.77 0 01-.751.032zm.503-1.057c.45-.039.977-.33 1.284-.71a1.99 1.99 0 00-1.73-3.24 1.988 1.988 0 00-.003 3.958c.103.01.213.015.245.01l.204-.018zm2.645-4.422a.748.748 0 01-.365-.287.714.714 0 01-.123-.449.575.575 0 01.074-.304.754.754 0 011.36-.003c.119.241.1.532-.047.755a.786.786 0 01-.632.34.697.697 0 01-.267-.053z"
                fill="rgb(215, 156, 165)"
                stroke="rgb(215, 156, 165)"
                strokeWidth="0.8px"
                strokeMiterlimit="4"
              />
            </g>
          </svg>
        </span>
      </div>
      <div className="footer_facebook_wrapping">
        <div
          onClick={() =>
            window.open("https://facebook.com/glowlabsLI/", "_blank")
          }
        >
          <FontAwesomeIcon className="footer_icon" icon={faFacebookSquare} />
        </div>
      </div>
      <div className="footer_phone_wrapping">
        <a href="tel:1 (347) 417-3883">
          <FontAwesomeIcon className="footer_icon" icon={faPhoneSquare} />
        </a>
      </div>
      <div className="footer_email_wrapping">
        <a href="mailto:glowlabs@yahoo.com?subject=Help! What do I book?">
          <FontAwesomeIcon className="footer_icon" icon={faEnvelopeSquare} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
