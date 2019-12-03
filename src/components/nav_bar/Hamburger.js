import React from "react";

const Hamburger = props => (
  <div
    className="burger"
    onClick={props.onClick}
    style={{ justifyContent: props.navbarToggle ? "center" : "space-evenly" }}
  >
    <div
      className="burger_line"
      style={{
        position: props.navbarToggle ? "absolute" : "relative",
        left: props.navbarToggle ? "auto" : "null",
        right: props.navbarToggle ? "1.5rem" : "0rem",
        marginRight: props.navbarToggle ? "0rem" : "1.5rem",
        transform: props.navbarToggle ? "rotate(-225deg)" : "rotate(0)"
      }}
    ></div>
    <div
      className="burger_line"
      style={{
        position: props.navbarToggle ? "absolute" : "relative",
        left: props.navbarToggle ? "auto" : "null",
        right: props.navbarToggle ? "1.5rem" : "0rem",
        marginRight: props.navbarToggle ? "0rem" : "1.5rem",
        transform: props.navbarToggle ? "rotate(45deg)" : "rotate(0)"
      }}
    ></div>
  </div>
);

export default Hamburger;
