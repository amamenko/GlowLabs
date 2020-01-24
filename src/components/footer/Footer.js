import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneSquare,
  faEnvelopeSquare
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_insta_wrapping">
        <div
          onClick={() =>
            window.open("https://instagram.com/glow.labs", "_blank")
          }
        >
          <FontAwesomeIcon className="footer_icon" icon={faInstagram} />
        </div>
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
