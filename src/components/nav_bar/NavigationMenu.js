import React, { useRef, useState, useMemo, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_TOGGLE_RESET from "../../actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import ACTION_CART_IS_NOT_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";

const NavigationMenu = React.forwardRef((props, ref) => {
  let location = useLocation();
  const {
    LandingPageRef,
    Treatments1Ref,
    AddOnsRef,
    InstagramRef,
    ContactRef,
  } = ref;
  const Nav_Ref = useRef(null);
  const navbarToggle = useSelector((state) => state.navbarToggle.toggle);
  const scroll = useSelector((state) => state.scrollToggle.scroll);

  const [homeClicked, changeHomeClicked] = useState(false);

  const dispatch = useDispatch();

  useMemo(() => {
    const NavRefTarget = Nav_Ref.current;
    clearAllBodyScrollLocks();

    if (navbarToggle) {
      dispatch(ACTION_BODY_SCROLL_RESET());
      const handleDisableScroll = (el) => {
        disableBodyScroll({ targetElement: el });
      };

      handleDisableScroll(NavRefTarget);
    } else {
      dispatch(ACTION_BODY_SCROLL_ALLOW());
      const handleEnableScroll = (el) => {
        enableBodyScroll({ targetElement: el });
      };

      handleEnableScroll(NavRefTarget);
    }
  }, [navbarToggle, dispatch]);

  const navbarItemSelect = () => {
    dispatch(ACTION_NAVBAR_TOGGLE_RESET());
    dispatch(ACTION_BODY_SCROLL_ALLOW());
  };

  const redirectToHome = () => {
    if (homeClicked) {
      return <Redirect to="/" />;
    }
  };

  const navMenuScrollToHome = () => {
    navbarItemSelect();
    dispatch(ACTION_CART_IS_NOT_ACTIVE());

    setTimeout(() => {
      props.handleClickToScrollToHome(LandingPageRef);
    }, 300);

    changeHomeClicked(true);

    document.body.classList.remove("no_scroll");
    document.body.style.setProperty("overflow", "scroll");
  };

  useEffect(() => {
    if (homeClicked) {
      const clickedReset = setTimeout(() => {
        changeHomeClicked(false);
      }, 100);

      return () => {
        clearTimeout(clickedReset);
      };
    }
  }, [homeClicked, location.pathname]);

  const navMenuScrollToTreatments = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToTreatments(Treatments1Ref);
    }, 300);
  };

  const navMenuScrollToAddOns = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToAddOns(AddOnsRef);
    }, 300);
  };

  const navMenuScrollToInstagram = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToInstagram(InstagramRef);
    }, 300);
  };

  const navMenuScrollToContact = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToContact(ContactRef);
    }, 300);
  };

  return (
    <div
      className="nav_menu"
      ref={Nav_Ref}
      style={{
        backgroundColor: "rgb(44, 44, 52)",
        right: navbarToggle ? 0 : 1200,
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
            : "all 0.7s ease",
      }}
    >
      {redirectToHome()}
      <ul className="navbar_items">
        <li onClick={() => navMenuScrollToHome()}>Home</li>
        <li onClick={() => navMenuScrollToTreatments()}>Facial</li>
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
