import React, { Component } from "react";
import { MdMenu } from "react-icons/md";
import { IconContext } from "react-icons";

const BurgerMenu = (props) => {
  return (
    <svg
      stroke="#fff"
      fill="#fff"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style={{ color: "#fff" }}
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
  );
};

export default BurgerMenu;
