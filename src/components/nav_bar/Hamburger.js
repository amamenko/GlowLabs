import React from "react";

const Hamburger = (props) => {
  const responsiveLeft = () => {
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

  const responsiveMarginLeft = () => {
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
            : "center",
      }}
    >
      <div
        className="burger_line"
        style={{
          position: props.navbarToggle ? "absolute" : "relative",
          right: props.navbarToggle ? "auto" : "null",
          left: responsiveLeft(),
          marginLeft: responsiveMarginLeft(),
          transform: props.navbarToggle ? "rotate(-225deg)" : "rotate(0)",
          background:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 600
                ? window.scrollY <= 1
                  ? "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)"
              : props.currentScreenSize >= 600
              ? window.scrollY <= 1
                ? "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : "rgb(239, 240, 243)",
        }}
      />
      <div
        className="burger_line"
        style={{
          position: props.navbarToggle ? "absolute" : "relative",
          right: props.navbarToggle ? "auto" : "null",
          left: responsiveLeft(),
          marginLeft: responsiveMarginLeft(),
          transform: props.navbarToggle ? "rotate(45deg)" : "rotate(0)",
          background:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 600
                ? window.scrollY <= 1
                  ? "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)"
              : props.currentScreenSize >= 600
              ? window.scrollY <= 1
                ? "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : "rgb(239, 240, 243)",
        }}
      />
    </div>
  );
};

export default Hamburger;
