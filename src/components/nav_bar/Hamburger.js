import React from "react";

const Hamburger = props => {
  const responsiveRight = () => {
    return props.navbarToggle
      ? props.currentScreenSize === ""
        ? props.initialScreenSize >= 600
          ? "3.1rem"
          : "1.5rem"
        : props.currentScreenSize >= 600
        ? "3.1rem"
        : "1.5rem"
      : "0rem";
  };

  const responsiveMarginRight = () => {
    return props.navbarToggle
      ? "0rem"
      : props.currentScreenSize === ""
      ? props.initialScreenSize >= 600
        ? "3.1rem"
        : "1.5rem"
      : props.currentScreenSize >= 600
      ? "3.1rem"
      : "1.5rem";
  };
  return (
    <div
      className="burger"
      onClick={props.onClick}
      style={{
        justifyContent: props.navbarToggle ? "center" : "space-evenly",
        alignItems:
          props.currentScreenSize === ""
            ? props.initialScreenSize <= 1000 && props.initialScreenSize >= 600
              ? window.scrollY <= 5
                ? "flex-start"
                : "center"
              : "center"
            : props.currentScreenSize <= 1000 && props.currentScreenSize >= 600
            ? window.scrollY <= 5
              ? "flex-start"
              : "center"
            : "center"
      }}
    >
      <div
        className="burger_line"
        style={{
          position: props.navbarToggle ? "absolute" : "relative",
          left: props.navbarToggle ? "auto" : "null",
          right: responsiveRight(),
          marginRight: responsiveMarginRight(),
          transform: props.navbarToggle ? "rotate(-225deg)" : "rotate(0)"
        }}
      ></div>
      <div
        className="burger_line"
        style={{
          position: props.navbarToggle ? "absolute" : "relative",
          left: props.navbarToggle ? "auto" : "null",
          right: responsiveRight(),
          marginRight: responsiveMarginRight(),
          transform: props.navbarToggle ? "rotate(45deg)" : "rotate(0)"
        }}
      ></div>
    </div>
  );
};

export default Hamburger;
