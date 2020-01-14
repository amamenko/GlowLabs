import * as smoothscroll from "smoothscroll-polyfill";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";
import LandingPage from "./components/landing_page/LandingPage";
import TreatmentsPage1 from "./components/treatments_pages/Page_1/TreatmentsPage1";
import TreatmentsPage2 from "./components/treatments_pages/Page_2/TreatmentsPage2";
import TreatmentsPage3 from "./components/treatments_pages/Page_3/TreatmentsPage3";
import TreatmentsPage4 from "./components/treatments_pages/Page_4/TreatmentsPage4";
import TreatmentsPage5 from "./components/treatments_pages/Page_5/TreatmentsPage5";
import TreatmentsPage6 from "./components/treatments_pages/Page_6/TreatmentsPage6";
import NavigationMenu from "./components/nav_bar/NavigationMenu";
import AddOnsPage1 from "./components/add_ons_pages/Page_1/AddOnsPage1";
import AddOnsPage2 from "./components/add_ons_pages/Page_2/AddOnsPage2";
import AddOnsPage3 from "./components/add_ons_pages/Page_3/AddOnsPage3";
import AddOnsPage4 from "./components/add_ons_pages/Page_4/AddOnsPage4";
import AddOnsPage5 from "./components/add_ons_pages/Page_5/AddOnsPage5";
import Instagram from "./components/instagram/Instagram";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./styles.css";

require("intersection-observer");

smoothscroll.polyfill();

const middleware = [thunk];

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => {
  const LandingPageRef = useRef(null);
  const Treatments1Ref = useRef(null);
  const AddOnsRef = useRef(null);
  const InstagramRef = useRef(null);
  const [initialScreenSize] = useState(window.innerWidth);
  const [currentScreenSize, changeCurrentScreenSize] = useState("");
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );
  const [navbarVisible, setNavbarVisible] = useState(true);

  useLayoutEffect(() => {
    const updateSize = () => {
      changeCurrentScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [currentScreenSize, initialScreenSize]);

  const handleClickToScrollToHome = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top: LandingPageRef.current.offsetTop - 10,
      behavior: "smooth"
    });
  };

  const handleClickToScrollToTreatments = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? Treatments1Ref.current.offsetTop - 105
            : initialScreenSize >= 1200
            ? Treatments1Ref.current.offsetTop - 50
            : initialScreenSize >= 600
            ? previousScrollPosition < 450
              ? Treatments1Ref.current.offsetTop
              : Treatments1Ref.current.offsetTop - 40
            : previousScrollPosition < 650
            ? Treatments1Ref.current.offsetTop - 10
            : Treatments1Ref.current.offsetTop - 80
          : currentScreenSize >= 1800
          ? Treatments1Ref.current.offsetTop - 105
          : currentScreenSize >= 1200
          ? Treatments1Ref.current.offsetTop - 50
          : currentScreenSize >= 600
          ? previousScrollPosition < 450
            ? Treatments1Ref.current.offsetTop
            : Treatments1Ref.current.offsetTop - 40
          : previousScrollPosition < 650
          ? Treatments1Ref.current.offsetTop - 10
          : Treatments1Ref.current.offsetTop - 80,
      behavior: "smooth"
    });
  };

  const handleClickToScrollToAddOns = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? AddOnsRef.current.offsetTop - 105
            : initialScreenSize >= 1200
            ? AddOnsRef.current.offsetTop - 50
            : initialScreenSize >= 600
            ? previousScrollPosition < 2000
              ? AddOnsRef.current.offsetTop
              : AddOnsRef.current.offsetTop - 60
            : previousScrollPosition < 3900
            ? AddOnsRef.current.offsetTop - 5
            : AddOnsRef.current.offsetTop - 70
          : currentScreenSize >= 1800
          ? AddOnsRef.current.offsetTop - 105
          : currentScreenSize >= 1200
          ? AddOnsRef.current.offsetTop - 50
          : currentScreenSize >= 600
          ? previousScrollPosition < 2000
            ? AddOnsRef.current.offsetTop
            : AddOnsRef.current.offsetTop - 60
          : previousScrollPosition < 3900
          ? AddOnsRef.current.offsetTop - 5
          : AddOnsRef.current.offsetTop - 70,
      behavior: "smooth"
    });
  };

  const handleClickToScrollToInstagram = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? InstagramRef.current.offsetTop - 300
            : initialScreenSize >= 1200
            ? InstagramRef.current.offsetTop - 80
            : InstagramRef.current.offsetTop - 170
          : currentScreenSize >= 1800
          ? InstagramRef.current.offsetTop - 300
          : currentScreenSize >= 1200
          ? InstagramRef.current.offsetTop - 80
          : InstagramRef.current.offsetTop - 170,
      behavior: "smooth"
    });
  };

  const ref = {
    LandingPageRef: LandingPageRef,
    Treatments1Ref: Treatments1Ref,
    AddOnsRef: AddOnsRef,
    InstagramRef: InstagramRef
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (
        previousScrollPosition < currentScrollPosition &&
        previousScrollPosition > 0 &&
        currentScrollPosition > 0
      ) {
        if (navbarVisible) {
          setNavbarVisible(false);
        }
      } else {
        setNavbarVisible(true);
      }
      setPreviousScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [previousScrollPosition, navbarVisible]);

  return (
    <div className="main_container">
      <ReactNotification />
      <NavigationMenu
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        handleClickToScrollToHome={handleClickToScrollToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        handleClickToScrollToAddOns={handleClickToScrollToAddOns}
        handleClickToScrollToInstagram={handleClickToScrollToInstagram}
        ref={ref}
      />
      <LandingPage
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        handleClickToScrollToHome={handleClickToScrollToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        handleClickToScrollToAddOns={handleClickToScrollToAddOns}
        handleClickToScrollToInstagram={handleClickToScrollToInstagram}
        navbarVisible={navbarVisible}
        ref={ref}
      />
      <TreatmentsPage1
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        Treatments1Ref={Treatments1Ref}
      />
      <TreatmentsPage2
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <TreatmentsPage3
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <TreatmentsPage4
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <TreatmentsPage5
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <TreatmentsPage6
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <AddOnsPage1
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        AddOnsRef={AddOnsRef}
      />
      <AddOnsPage2
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <AddOnsPage3
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <AddOnsPage4
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <AddOnsPage5
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <Instagram
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        InstagramRef={InstagramRef}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
