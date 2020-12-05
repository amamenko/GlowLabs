import React from "react";

const BurgerX = (props) => {
  return (
    <svg viewBox="0 0 22 28">
      <path
        stroke={
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1200 &&
              (props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin"))
              ? "rgb(239, 240, 243)"
              : props.initialScreenSize >= 768
              ? props.initialScreenHeight >= props.initialScreenSize
                ? "rgb(239, 240, 243)"
                : props.navbarToggle
                ? "rgb(239, 240, 243)"
                : props.scrollValue <= 1
                ? "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : props.initialScreenSize >= 600
              ? props.initialScreenHeight >= props.initialScreenSize
                ? "rgb(239, 240, 243)"
                : props.scrollValue <= 1
                ? props.navbarToggle
                  ? "rgb(239, 240, 243)"
                  : "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : "rgb(239, 240, 243)"
            : props.currentScreenSize >= 1200 &&
              (props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin"))
            ? "rgb(239, 240, 243)"
            : props.currentScreenSize >= 768
            ? props.currentScreenHeight >= props.currentScreenSize
              ? "rgb(239, 240, 243)"
              : props.navbarToggle
              ? "rgb(239, 240, 243)"
              : props.scrollValue <= 1
              ? "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : props.currentScreenSize >= 600
            ? props.currentScreenHeight >= props.currentScreenSize
              ? "rgb(239, 240, 243)"
              : props.scrollValue <= 1
              ? props.navbarToggle
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
        }
        fill={
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1200 &&
              (props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin"))
              ? "rgb(239, 240, 243)"
              : props.initialScreenSize >= 768
              ? props.initialScreenHeight >= props.initialScreenSize
                ? "rgb(239, 240, 243)"
                : props.navbarToggle
                ? "rgb(239, 240, 243)"
                : props.scrollValue <= 1
                ? "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : props.initialScreenSize >= 600
              ? props.initialScreenHeight >= props.initialScreenSize
                ? "rgb(239, 240, 243)"
                : props.scrollValue <= 1
                ? props.navbarToggle
                  ? "rgb(239, 240, 243)"
                  : "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : "rgb(239, 240, 243)"
            : props.currentScreenSize >= 1200 &&
              (props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin"))
            ? "rgb(239, 240, 243)"
            : props.currentScreenSize >= 768
            ? props.currentScreenHeight >= props.currentScreenSize
              ? "rgb(239, 240, 243)"
              : props.navbarToggle
              ? "rgb(239, 240, 243)"
              : props.scrollValue <= 1
              ? "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : props.currentScreenSize >= 600
            ? props.currentScreenHeight >= props.currentScreenSize
              ? "rgb(239, 240, 243)"
              : props.scrollValue <= 1
              ? props.navbarToggle
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
        }
        d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"
      ></path>
    </svg>
  );
};

export default BurgerX;
