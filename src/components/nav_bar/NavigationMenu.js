import React, { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_TOGGLE_RESET from "../../actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";

const NavigationMenu = React.forwardRef((props, ref) => {
  const {
    LandingPageRef,
    Treatments1Ref,
    AddOnsRef,
    InstagramRef,
    ContactRef
  } = ref;
  const Nav_Ref = useRef(null);
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);
  const scroll = useSelector(state => state.scrollToggle.scroll);

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

  const navMenuScrollToHome = () => {
    navbarItemSelect();
    clearTimeout(navbarItemSelect());
    setTimeout(() => {
      props.handleClickToScrollToHome(LandingPageRef);
    }, 300);
  };

  const navMenuScrollToTreatments = () => {
    navbarItemSelect();
    clearTimeout(navbarItemSelect());
    setTimeout(() => {
      props.handleClickToScrollToTreatments(Treatments1Ref);
    }, 300);
  };

  const navMenuScrollToAddOns = () => {
    navbarItemSelect();
    clearTimeout(navbarItemSelect());
    setTimeout(() => {
      props.handleClickToScrollToAddOns(AddOnsRef);
    }, 300);
  };

  const navMenuScrollToInstagram = () => {
    navbarItemSelect();
    clearTimeout(navbarItemSelect());
    setTimeout(() => {
      props.handleClickToScrollToInstagram(InstagramRef);
    }, 300);
  };

  const navMenuScrollToContact = () => {
    navbarItemSelect();
    clearTimeout(navbarItemSelect());
    setTimeout(() => {
      props.handleClickToScrollToContact(ContactRef);
    }, 300);
  };

  return (
    <div
      className="nav_menu"
      ref={Nav_Ref}
      style={{
        backgroundColor: "rgb(255, 198, 207)",
        left: navbarToggle ? 0 : 950,
        transition:
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 600
              ? scroll
                ? "all 0.7s ease"
                : "all 0s"
              : "all 0.7s ease"
            : props.currentScreenSize >= 600
            ? scroll
              ? "all 0.7s ease"
              : "all 0s"
            : "all 0.7s ease"
      }}
    >
      <ul className="navbar_items">
        <li onClick={() => navMenuScrollToHome()}>Home</li>
        <li onClick={() => navMenuScrollToTreatments()}>Treatments</li>
        <li onClick={() => navMenuScrollToAddOns()}>Add-Ons</li>
      </ul>
      <ul className="navbar_items">
        <li onClick={() => navMenuScrollToInstagram()}>Follow Us</li>
        <li onClick={() => navMenuScrollToContact()}>Contact</li>
        <li className="navbar_social_media_icons">
          <a target="_self" href="https://instagram.com/glow.labs">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a target="_self" href="https://facebook.com/glowlabsLI/">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
      </ul>
    </div>
  );
});

export default NavigationMenu;
