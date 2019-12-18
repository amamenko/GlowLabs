import React, { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_TOGGLE_RESET from "../../actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";

const NavigationMenu = () => {
  const Nav_Ref = useRef(null);
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);

  const dispatch = useDispatch();

  useEffect(() => {
    if (navbarToggle) {
      disableBodyScroll(Nav_Ref.current);
    } else {
      enableBodyScroll(Nav_Ref.current);
    }
  }, [navbarToggle]);

  const navbarItemSelect = () => {
    setTimeout(() => {
      dispatch(ACTION_NAVBAR_TOGGLE_RESET());
      dispatch(ACTION_BODY_SCROLL_ALLOW());
    }, 200);
  };

  return (
    <div
      className="nav_menu"
      ref={Nav_Ref}
      style={{
        backgroundColor: "rgb(255, 198, 207)",
        left: navbarToggle ? 0 : 500,
        transition: "all 0.4s ease"
      }}
    >
      <ul className="navbar_items">
        <li onClick={navbarItemSelect}>Home</li>
        <li onClick={navbarItemSelect}>Treatments</li>
        <li onClick={navbarItemSelect}>Add-Ons</li>
        <li onClick={navbarItemSelect}>Real Clients</li>
        <li onClick={navbarItemSelect}>About</li>
      </ul>
    </div>
  );
};

export default NavigationMenu;