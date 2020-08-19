import React from "react";

const BurgerMenu = (props) => {
  return (
    <svg
      stroke={
        !props.currentScreenSize
          ? props.initialScreenSize < 900 &&
            props.initialScreenHeight < props.initialScreenSize
            ? props.scrollValue <= 5
              ? props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin")
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
          : props.currentScreenSize < 900 &&
            props.currentScreenHeight < props.currentScreenSize
          ? props.scrollValue <= 5
            ? props.cartIsActive ||
              props.location.pathname.includes("account") ||
              props.location.pathname.includes("admin")
              ? "rgb(239, 240, 243)"
              : "rgb(44, 44, 52)"
            : "rgb(239, 240, 243)"
          : "rgb(239, 240, 243)"
      }
      fill={
        !props.currentScreenSize
          ? props.initialScreenSize < 900 &&
            props.initialScreenHeight < props.initialScreenSize
            ? props.scrollValue <= 5
              ? props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin")
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
          : props.currentScreenSize < 900 &&
            props.currentScreenHeight < props.currentScreenSize
          ? props.scrollValue <= 5
            ? props.cartIsActive ||
              props.location.pathname.includes("account") ||
              props.location.pathname.includes("admin")
              ? "rgb(239, 240, 243)"
              : "rgb(44, 44, 52)"
            : "rgb(239, 240, 243)"
          : "rgb(239, 240, 243)"
      }
      strokeWidth="0"
      viewBox="0 0 24 24"
      width="100%"
      style={{
        color: !props.currentScreenSize
          ? props.initialScreenSize < 900 &&
            props.initialScreenHeight < props.initialScreenSize
            ? props.scrollValue <= 5
              ? props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin")
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
          : props.currentScreenSize < 900 &&
            props.currentScreenHeight < props.currentScreenSize
          ? props.scrollValue <= 5
            ? props.cartIsActive ||
              props.location.pathname.includes("account") ||
              props.location.pathname.includes("admin")
              ? "rgb(239, 240, 243)"
              : "rgb(44, 44, 52)"
            : "rgb(239, 240, 243)"
          : "rgb(239, 240, 243)",
      }}
    >
      <path
        id="burger_menu_path"
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        stroke={
          !props.currentScreenSize
            ? props.initialScreenSize < 900 &&
              props.initialScreenHeight < props.initialScreenSize
              ? props.scrollValue <= 5
                ? props.cartIsActive ||
                  props.location.pathname.includes("account") ||
                  props.location.pathname.includes("admin")
                  ? "rgb(239, 240, 243)"
                  : "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : "rgb(239, 240, 243)"
            : props.currentScreenSize < 900 &&
              props.currentScreenHeight < props.currentScreenSize
            ? props.scrollValue <= 5
              ? props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin")
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
        }
        fill={
          !props.currentScreenSize
            ? props.initialScreenSize < 900 &&
              props.initialScreenHeight < props.initialScreenSize
              ? props.scrollValue <= 5
                ? props.cartIsActive ||
                  props.location.pathname.includes("account") ||
                  props.location.pathname.includes("admin")
                  ? "rgb(239, 240, 243)"
                  : "rgb(44, 44, 52)"
                : "rgb(239, 240, 243)"
              : "rgb(239, 240, 243)"
            : props.currentScreenSize < 900 &&
              props.currentScreenHeight < props.currentScreenSize
            ? props.scrollValue <= 5
              ? props.cartIsActive ||
                props.location.pathname.includes("account") ||
                props.location.pathname.includes("admin")
                ? "rgb(239, 240, 243)"
                : "rgb(44, 44, 52)"
              : "rgb(239, 240, 243)"
            : "rgb(239, 240, 243)"
        }
      ></path>
    </svg>
  );
};

export default BurgerMenu;
