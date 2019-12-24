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
import "./styles.css";

require("intersection-observer");

smoothscroll.polyfill();

const middleware = [thunk];

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => {
  const Treatments1Ref = useRef(null);
  const LandingPageRef = useRef(null);
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

  const handleClickToScrollToHome = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top: LandingPageRef.current.offsetTop,
      behavior: "smooth"
    });
  };

  const ref = {
    Treatments1Ref: Treatments1Ref,
    LandingPageRef: LandingPageRef
  };

  return (
    <>
      <NavigationMenu
        handleClickToScrollToHome={handleClickToScrollToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        ref={ref}
      />
      <LandingPage
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        handleClickToScrollToHome={handleClickToScrollToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        ref={ref}
      />
      <TreatmentsPage1
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        Treatments1Ref={Treatments1Ref}
      />
      <TreatmentsPage2 initialScreenSize={initialScreenSize} />
      <TreatmentsPage3 initialScreenSize={initialScreenSize} />
      <TreatmentsPage4 initialScreenSize={initialScreenSize} />
      <AddOnsPage1 />
      <AddOnsPage2 />
      <AddOnsPage3 />
      <AddOnsPage4 />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
