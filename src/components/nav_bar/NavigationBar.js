import React from "react";
import Hamburger from "./Hamburger";
import "./NavigationBar.css";

const NavigationBar = props => (
  <nav className="navbar">
    <h1>
      <a className="logo" href="/">
        glowlabs.
      </a>
    </h1>
    <div className="spacer" />
    <Hamburger />
  </nav>
);

export default NavigationBar;
