import React from "react";
import Hamburger from "./Hamburger";
import "./NavigationBar.css";

const NavigationBar = props => (
  <nav className="navbar">
    <Hamburger />
    <div className="spacer" />
    <h1 className="logo">glowlabs.</h1>
  </nav>
)

export default NavigationBar;