import * as smoothscroll from "smoothscroll-polyfill";
import React, { useRef, useState, useLayoutEffect } from "react";
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
import NavigationMenu from "./components/nav_bar/NavigationMenu";
import AddOnsPage1 from "./components/add_ons_pages/Page_1/AddOnsPage1";
import AddOnsPage2 from "./components/add_ons_pages/Page_2/AddOnsPage2";
import AddOnsPage3 from "./components/add_ons_pages/Page_3/AddOnsPage3";
import AddOnsPage4 from "./components/add_ons_pages/Page_4/AddOnsPage4";
import Instagram from "./components/instagram/Instagram";
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
            : Treatments1Ref.current.offsetTop - 80
          : currentScreenSize >= 1800
          ? Treatments1Ref.current.offsetTop - 105
          : currentScreenSize >= 1200
          ? Treatments1Ref.current.offsetTop - 50
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
            : AddOnsRef.current.offsetTop - 70
          : currentScreenSize >= 1800
          ? AddOnsRef.current.offsetTop - 105
          : currentScreenSize >= 1200
          ? AddOnsRef.current.offsetTop - 50
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
            : InstagramRef.current.offsetTop - 235
          : currentScreenSize >= 1800
          ? InstagramRef.current.offsetTop - 300
          : currentScreenSize >= 1200
          ? InstagramRef.current.offsetTop - 80
          : InstagramRef.current.offsetTop - 235,
      behavior: "smooth"
    });
  };

  const ref = {
    LandingPageRef: LandingPageRef,
    Treatments1Ref: Treatments1Ref,
    AddOnsRef: AddOnsRef,
    InstagramRef: InstagramRef
  };

  return (
    <div className="main_container">
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
