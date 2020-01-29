import * as smoothscroll from "smoothscroll-polyfill";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import ReactDOM from "react-dom";
import { Spring } from "react-spring/renderprops";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_NOT_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_NOT_VISIBLE";
import ACTION_NAVBAR_IS_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_NAVBAR_TOGGLE_RESET from "./actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_NAVBAR_TOGGLE from "./actions/Nav/ACTION_NAVBAR_TOGGLE";
import ACTION_BODY_SCROLL_ALLOW from "./actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "./actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";
import NavigationBar from "./components/nav_bar/NavigationBar";
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
import Contact from "./components/contact/Contact";
import ShoppingCart from "./components/shopping_cart/ShoppingCart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import KeepAlive, { AliveScope } from "react-activation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";

require("dotenv").config();
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
  const ContactRef = useRef(null);
  const [initialScreenSize] = useState(window.innerWidth);
  const [currentScreenSize, changeCurrentScreenSize] = useState("");
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );

  const navbarVisible = useSelector(
    state => state.navbarIsVisibleReducer.visible
  );
  const navbarToggle = useSelector(state => state.navbarToggle.toggle);
  const scroll = useSelector(state => state.scrollToggle.scroll);

  const dispatch = useDispatch();

  const handleNavbarToggle = () => {
    if (navbarToggle) {
      dispatch(ACTION_NAVBAR_TOGGLE_RESET());
      dispatch(ACTION_BODY_SCROLL_ALLOW());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
    } else {
      dispatch(ACTION_NAVBAR_TOGGLE());
      dispatch(ACTION_BODY_SCROLL_RESET());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      toast.dismiss();
    }
  };

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
    window.addEventListener("scroll", () => {});
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
    window.addEventListener("scroll", () => {});
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
    window.addEventListener("scroll", () => {});
  };

  const handleClickToScrollToInstagram = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? InstagramRef.current.offsetTop - 280
            : initialScreenSize >= 1200
            ? InstagramRef.current.offsetTop - 250
            : initialScreenSize >= 600
            ? previousScrollPosition < 3700
              ? InstagramRef.current.offsetTop - 150
              : InstagramRef.current.offsetTop - 220
            : previousScrollPosition < 6400
            ? InstagramRef.current.offsetTop - 290
            : InstagramRef.current.offsetTop - 350
          : currentScreenSize >= 1800
          ? InstagramRef.current.offsetTop - 280
          : currentScreenSize >= 1200
          ? InstagramRef.current.offsetTop - 250
          : currentScreenSize >= 600
          ? previousScrollPosition < 3700
            ? InstagramRef.current.offsetTop - 150
            : InstagramRef.current.offsetTop - 220
          : previousScrollPosition < 6400
          ? InstagramRef.current.offsetTop - 290
          : InstagramRef.current.offsetTop - 350,
      behavior: "smooth"
    });
    window.addEventListener("scroll", () => {});
  };

  const handleClickToScrollToContact = async ref => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top:
        currentScreenSize === ""
          ? initialScreenSize >= 1800
            ? ContactRef.current.offsetTop - 260
            : initialScreenSize >= 1200
            ? ContactRef.current.offsetTop - 80
            : previousScrollPosition < 7200
            ? ContactRef.current.offsetTop - 10
            : ContactRef.current.offsetTop - 80
          : currentScreenSize >= 1800
          ? ContactRef.current.offsetTop - 260
          : currentScreenSize >= 1200
          ? ContactRef.current.offsetTop - 80
          : previousScrollPosition < 7200
          ? ContactRef.current.offsetTop - 10
          : ContactRef.current.offsetTop - 80,
      behavior: "smooth"
    });
    window.addEventListener("scroll", () => {});
  };

  const ref = {
    LandingPageRef: LandingPageRef,
    Treatments1Ref: Treatments1Ref,
    AddOnsRef: AddOnsRef,
    InstagramRef: InstagramRef,
    ContactRef: ContactRef
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
          if (navbarToggle) {
            dispatch(ACTION_NAVBAR_IS_VISIBLE());
          } else {
            dispatch(ACTION_NAVBAR_NOT_VISIBLE());
          }
        }
      } else {
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
      }
      setPreviousScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [previousScrollPosition, navbarVisible, navbarToggle, dispatch]);

  return (
    <>
      <Spring
        from={{
          marginTop: initialScreenSize >= 600 ? "-200px" : "-100px"
        }}
        to={{ marginTop: "0px" }}
        config={{
          delay: initialScreenSize >= 600 ? 4600 : 2500,
          duration: initialScreenSize >= 600 ? 1000 : 1500
        }}
      >
        {styles => (
          <header
            className="header"
            style={{
              marginTop:
                currentScreenSize === ""
                  ? initialScreenSize >= 1200
                    ? `${styles.marginTop}`
                    : navbarVisible
                    ? `${styles.marginTop}`
                    : "-200px"
                  : currentScreenSize >= 1200
                  ? `${styles.marginTop}`
                  : navbarVisible
                  ? `${styles.marginTop}`
                  : "-200px",
              transition: "margin-top 0.5s ease",
              height:
                currentScreenSize === ""
                  ? initialScreenSize <= 1000 && initialScreenSize >= 600
                    ? window.scrollY <= 1
                      ? "30vh"
                      : "15vh"
                    : "8vh"
                  : currentScreenSize <= 1000 && currentScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "30vh"
                    : "15vh"
                  : "8vh",
              paddingTop:
                currentScreenSize === ""
                  ? initialScreenSize <= 1000 && initialScreenSize >= 600
                    ? window.scrollY <= 1
                      ? "15vh"
                      : "0vh"
                    : "0vh"
                  : currentScreenSize <= 1000 && currentScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh",
              paddingBottom:
                currentScreenSize === ""
                  ? initialScreenSize <= 1000 && initialScreenSize >= 600
                    ? window.scrollY <= 1
                      ? "15vh"
                      : "0vh"
                    : "0vh"
                  : currentScreenSize <= 1000 && currentScreenSize >= 600
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh"
            }}
          >
            <NavigationBar
              scroll={scroll}
              handleNavbarToggle={handleNavbarToggle}
              navbarToggle={navbarToggle}
              currentScreenSize={currentScreenSize}
              initialScreenSize={initialScreenSize}
              handleClickToScrollToHome={handleClickToScrollToHome}
              handleClickToScrollToTreatments={handleClickToScrollToTreatments}
              handleClickToScrollToAddOns={handleClickToScrollToAddOns}
              handleClickToScrollToInstagram={handleClickToScrollToInstagram}
              handleClickToScrollToContact={handleClickToScrollToContact}
              ref={ref}
            />
          </header>
        )}
      </Spring>

      <ToastContainer
        toastClassName="toast_container"
        position={"bottom-right"}
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnVisibilityChange
        draggable={true}
        draggablePercent={20}
      />

      <NavigationMenu
        currentScreenSize={currentScreenSize}
        initialScreenSize={initialScreenSize}
        handleClickToScrollToHome={handleClickToScrollToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        handleClickToScrollToAddOns={handleClickToScrollToAddOns}
        handleClickToScrollToInstagram={handleClickToScrollToInstagram}
        handleClickToScrollToContact={handleClickToScrollToContact}
        ref={ref}
      />

      <Switch>
        <Route exact path="/">
          <KeepAlive saveScrollPosition="screen">
            <div className="main_container">
              <LandingPage
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                handleClickToScrollToHome={handleClickToScrollToHome}
                handleClickToScrollToTreatments={
                  handleClickToScrollToTreatments
                }
                handleClickToScrollToAddOns={handleClickToScrollToAddOns}
                handleClickToScrollToInstagram={handleClickToScrollToInstagram}
                handleClickToScrollToContact={handleClickToScrollToContact}
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
              <Contact
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                ContactRef={ContactRef}
              />
            </div>
          </KeepAlive>
        </Route>
        <Route path="/cart">
          <ShoppingCart />
        </Route>
      </Switch>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <AliveScope>
        <App />
      </AliveScope>
    </Provider>
  </Router>,
  rootElement
);
