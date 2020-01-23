import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = props => {
  return (
    <div className="footer_container">
      <div className="footer_insta_wrapping">
        <a target="_self" href="https://instagram.com/glow.labs">
          <FontAwesomeIcon className="footer_icon" icon={faInstagram} />
          <p>Instagram</p>
        </a>
      </div>
      <div className="footer_facebook_wrapping">
        <a target="_self" href="https://facebook.com/glowlabsLI/">
          <FontAwesomeIcon className="footer_icon" icon={faFacebook} />
          <p>Facebook</p>
        </a>
      </div>
    </div>
  );
};

export default Footer;
