import * as smoothscroll from "smoothscroll-polyfill";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useMutation, useQuery } from "@apollo/react-hooks";
import ReactDOM from "react-dom";
import { Spring, Transition } from "react-spring/renderprops";
import Modal from "react-modal";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ACTION_NAVBAR_NOT_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_NOT_VISIBLE";
import ACTION_NAVBAR_IS_VISIBLE from "./actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_NAVBAR_TOGGLE_RESET from "./actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_NAVBAR_TOGGLE from "./actions/Nav/ACTION_NAVBAR_TOGGLE";
import ACTION_BODY_SCROLL_ALLOW from "./actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "./actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import ACTION_USER_AUTHENTICATED from "./actions/Authenticated/ACTION_USER_AUTHENTICATED";
import ACTION_USER_NOT_AUTHENTICATED from "./actions/Authenticated/ACTION_USER_NOT_AUTHENTICATED";
import ACTION_LOG_OUT_CLICKED_RESET from "./actions/LogOut/ACTION_LOG_OUT_CLICKED_RESET";
import ACTION_FACEBOOK_COMPLETE_REGISTRATION from "./actions/Login/FacebookCompleteRegistration/ACTION_FACEBOOK_COMPLETE_REGISTRATION";
import ACTION_FACEBOOK_COMPLETE_REGISTRATION_RESET from "./actions/Login/FacebookCompleteRegistration/ACTION_FACEBOOK_COMPLETE_REGISTRATION_RESET";
import ACTION_DUMMY_TOKEN from "./actions/Login/DummyToken/ACTION_DUMMY_TOKEN";
import ACTION_DUMMY_TOKEN_RESET from "./actions/Login/DummyToken/ACTION_DUMMY_TOKEN_RESET";
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
import AvailabilityRouter from "./components/availability/AvailabilityRouter";
import PaymentInfo from "./components/payment_info/PaymentInfo";
import CheckoutRouter from "./components/checkout/CheckoutRouter";
import AccountRouter from "./components/account/AccountRouter";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import KeepAlive, { AliveScope } from "react-activation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";
import {
  updateClientInvalidateTokensMutation,
  getClientQuery,
  getEmployeeQuery,
  updateEmployeeInvalidateTokensMutation,
} from "./graphql/queries/queries";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "emotion";
import { BounceLoader } from "react-spinners";
import { Font } from "@react-pdf/renderer";
import AdminRouter from "./components/admin/AdminRouter";
import ACTION_ADMIN_DUMMY_TOKEN from "./actions/Admin/AdminLogin/AdminDummyToken/ACTION_ADMIN_DUMMY_TOKEN";
import ACTION_ADMIN_DUMMY_TOKEN_RESET from "./actions/Admin/AdminLogin/AdminDummyToken/ACTION_ADMIN_DUMMY_TOKEN_RESET";
import ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN from "./actions/Admin/AdminLogin/AdminTemporaryDummyToken/ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN";
import ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN_RESET from "./actions/Admin/AdminLogin/AdminTemporaryDummyToken/ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN_RESET";
import ACTION_ADMIN_AUTHENTICATED from "./actions/Admin/AdminLogin/AdminAuthenticated/ACTION_ADMIN_AUTHENTICATED";
import ACTION_ADMIN_NOT_AUTHENTICATED from "./actions/Admin/AdminLogin/AdminAuthenticated/ACTION_NOT_AUTHENTICATED";
import Availability from "./components/availability/Date/Availability";
import TimePreference from "./components/availability/Time/TimePreference";
import ACTION_CART_IS_NOT_ACTIVE from "./actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import GuestCheckout from "./components/checkout/GuestCheckout";
import ConfirmationPage from "./components/checkout/ConfirmationPage";

require("dotenv").config();
require("intersection-observer");

smoothscroll.polyfill();

const middleware = [thunk];

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => console.log(message));
    }
  },
});

const App = () => {
  const location = useLocation();
  const LandingPageRef = useRef(null);
  const Treatments1Ref = useRef(null);
  const AddOnsRef = useRef(null);
  const InstagramRef = useRef(null);
  const ContactRef = useRef(null);
  const shoppingCartRef = useRef(null);
  // Browser width on initial opening of app
  const [initialScreenSize] = useState(window.innerWidth);
  // Current browser width if different from initial browser width
  const [currentScreenSize, changeCurrentScreenSize] = useState("");
  // Browser height on initial opening of app
  const [initialScreenHeight] = useState(window.innerHeight);
  // Current browser height if different from initial browser height
  const [currentScreenHeight, changeCurrentScreenHeight] = useState("");
  const [previousScrollPosition, setPreviousScrollPosition] = useState(
    window.pageYOffset
  );

  // Needed for large screen frozen position when cart is toggled due to Square form causing re-rendering
  const [
    largeScreenFrozenScrollPosition,
    changeLargeScreenFrozenScrollPosition,
  ] = useState("");

  const navbarVisible = useSelector(
    (state) => state.navbarIsVisibleReducer.visible
  );
  const navbarToggle = useSelector((state) => state.navbarToggle.toggle);
  const scroll = useSelector((state) => state.scrollToggle.scroll);
  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const touchScaling = useSelector(
    (state) => state.fingerTouchScaling.touch_scaling
  );
  const finalBookButtonActive = useSelector(
    (state) => state.finalBookButton.final_book_button_active
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const dummyToken = useSelector((state) => state.dummyToken.dummy_token);
  const adminDummyToken = useSelector(
    (state) => state.adminDummyToken.admin_dummy_token
  );
  const adminTemporaryDummyToken = useSelector(
    (state) => state.adminTemporaryDummyToken.admin_temporary_dummy_token
  );
  const cartPageOpened = useSelector(
    (state) => state.cartPageOpened.cart_page_opened
  );

  const [loadingSpinnerActive, changeLoadingSpinnerActive] = useState(false);

  // For large screen shopping cart slide-in
  const [cartSlideDelay, changeCartSlideDelay] = useState(false);

  const [updateClientInvalidateTokens, { loading: appLoading }] = useMutation(
    updateClientInvalidateTokensMutation
  );

  const [
    updateEmployeeInvalidateTokens,
    { loading: adminLogoutAppLoading },
  ] = useMutation(updateEmployeeInvalidateTokensMutation);

  const dispatch = useDispatch();

  const { data: getClientData, refetch: clientDataRefetch } = useQuery(
    getClientQuery,
    {
      fetchPolicy: "no-cache",
      variables: {
        _id: dummyToken ? dummyToken.id : null,
      },
    }
  );

  const { data: getEmployeeData, refetch: employeeDataRefetch } = useQuery(
    getEmployeeQuery,
    {
      fetchPolicy: "no-cache",
      variables: {
        _id: adminTemporaryDummyToken
          ? adminTemporaryDummyToken.id
          : adminDummyToken
          ? adminDummyToken.id
          : null,
      },
    }
  );

  useMemo(() => {
    if (getClientData) {
      return false;
    }
  }, [getClientData]);

  useMemo(() => {
    if (getEmployeeData) {
      return false;
    }
  }, [getEmployeeData]);

  useEffect(() => {
    if (cartIsActive) {
      if (!navbarVisible) {
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
      }
    }
  }, [cartIsActive, navbarVisible, dispatch]);

  useEffect(() => {
    if (cartIsActive) {
      if (document.body.style.background !== "rgb(255, 255, 255") {
        document.body.style.setProperty("background", "rgb(255, 255, 255)");
      }
    }
  }, [cartIsActive]);

  useEffect(() => {
    let currentDummyToken;
    let temporaryFacebookDummyToken;
    let currentAdminDummyToken;
    let temporaryAdminDummyToken;

    const checkCookies = () => {
      if (
        currentDummyToken !== Cookies.get("dummy-token") ||
        temporaryFacebookDummyToken !==
          Cookies.get("temporary-facebook-dummy-token") ||
        currentAdminDummyToken !== Cookies.get("admin-dummy-token") ||
        temporaryAdminDummyToken !== Cookies.get("temporary-admin-dummy-token")
      ) {
        currentDummyToken = Cookies.get("dummy-token");
        temporaryFacebookDummyToken = Cookies.get(
          "temporary-facebook-dummy-token"
        );
        currentAdminDummyToken = Cookies.get("admin-dummy-token");
        temporaryAdminDummyToken = Cookies.get("temporary-admin-dummy-token");

        if (currentDummyToken) {
          dispatch(ACTION_DUMMY_TOKEN(jwt.decode(currentDummyToken)));
          dispatch(ACTION_USER_AUTHENTICATED());
        } else {
          dispatch(ACTION_DUMMY_TOKEN_RESET());
          dispatch(ACTION_USER_NOT_AUTHENTICATED());
          if (currentAdminDummyToken) {
            dispatch(
              ACTION_ADMIN_DUMMY_TOKEN(jwt.decode(currentAdminDummyToken))
            );
            dispatch(ACTION_ADMIN_AUTHENTICATED());
          } else if (temporaryAdminDummyToken) {
            dispatch(
              ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN(
                jwt.decode(temporaryAdminDummyToken)
              )
            );
            dispatch(ACTION_ADMIN_NOT_AUTHENTICATED());
          } else {
            dispatch(ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN_RESET());
            dispatch(ACTION_ADMIN_NOT_AUTHENTICATED());
            if (temporaryFacebookDummyToken) {
              dispatch(ACTION_FACEBOOK_COMPLETE_REGISTRATION());
            } else {
              dispatch(ACTION_FACEBOOK_COMPLETE_REGISTRATION_RESET());
            }
          }
        }
      }
    };

    setInterval(checkCookies, 100);
  }, [dispatch, employeeDataRefetch]);

  const handleNavbarToggle = () => {
    if (navbarToggle) {
      dispatch(ACTION_NAVBAR_TOGGLE_RESET());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      dispatch(ACTION_BODY_SCROLL_ALLOW());
    } else {
      dispatch(ACTION_NAVBAR_TOGGLE());
      dispatch(ACTION_BODY_SCROLL_RESET());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      toast.dismiss();
    }
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!touchScaling) {
        changeCurrentScreenSize(window.innerWidth);
        changeCurrentScreenHeight(window.innerHeight);
      }
    };

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [currentScreenSize, initialScreenSize, touchScaling]);

  const handleClickToScrollToHome = async (ref) => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }
    window.scrollTo({
      top: LandingPageRef.current.offsetTop - 10,
      behavior: "smooth",
    });
  };

  const handleRedirectClickToHome = () => {
    if (location.pathname !== "/") {
      window.scrollTo({
        top: LandingPageRef.current.offsetTop - 10,
        behavior: "auto",
      });
    }
  };

  const handleClickToScrollToTreatments = async (ref) => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }

    if (await Treatments1Ref.current) {
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
        behavior: "smooth",
      });
    }
  };

  const handleClickToScrollToAddOns = async (ref) => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }

    if (await AddOnsRef.current) {
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
        behavior: "smooth",
      });
    }
  };

  const handleClickToScrollToInstagram = async (ref) => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }

    if (await InstagramRef.current) {
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
        behavior: "smooth",
      });
    }
  };

  const handleClickToScrollToContact = async (ref) => {
    if (CSS.supports(`(-webkit-overflow-scrolling: touch)`)) {
      await import("scroll-behavior-polyfill");
    }

    if (await ContactRef.current) {
      window.scrollTo({
        top:
          currentScreenSize === ""
            ? initialScreenSize >= 1800
              ? ContactRef.current.offsetTop - 310
              : initialScreenSize >= 1200
              ? ContactRef.current.offsetTop - 210
              : previousScrollPosition < 7200
              ? ContactRef.current.offsetTop - 10
              : ContactRef.current.offsetTop - 80
            : currentScreenSize >= 1800
            ? ContactRef.current.offsetTop - 310
            : currentScreenSize >= 1200
            ? ContactRef.current.offsetTop - 210
            : previousScrollPosition < 7200
            ? ContactRef.current.offsetTop - 10
            : ContactRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const ref = {
    LandingPageRef: LandingPageRef,
    Treatments1Ref: Treatments1Ref,
    AddOnsRef: AddOnsRef,
    InstagramRef: InstagramRef,
    ContactRef: ContactRef,
  };

  useEffect(() => {
    if (!cartIsActive) {
      if (
        !location.pathname.includes("account") &&
        !location.pathname.includes("admin")
      ) {
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
      }
    }
  }, [
    previousScrollPosition,
    navbarVisible,
    navbarToggle,
    cartIsActive,
    dispatch,
    location.pathname,
  ]);

  const handleLogout = () => {
    if (adminDummyToken) {
      updateEmployeeInvalidateTokens();
      dispatch(ACTION_ADMIN_NOT_AUTHENTICATED());
    } else {
      updateClientInvalidateTokens();
      dispatch(ACTION_USER_NOT_AUTHENTICATED());
    }

    dispatch(ACTION_DUMMY_TOKEN_RESET());
    dispatch(ACTION_ADMIN_DUMMY_TOKEN_RESET());
  };

  useEffect(() => {
    if (appLoading || adminLogoutAppLoading) {
      changeLoadingSpinnerActive(true);
      const successfulLogout = setTimeout(() => {
        changeLoadingSpinnerActive(false);
        dispatch(ACTION_LOG_OUT_CLICKED_RESET());
        dispatch(ACTION_USER_NOT_AUTHENTICATED());
      }, 1000);
      return () => {
        clearTimeout(successfulLogout);
      };
    } else {
      if (loadingSpinnerActive) {
        const successfulLogout = setTimeout(() => {
          changeLoadingSpinnerActive(false);
          dispatch(ACTION_LOG_OUT_CLICKED_RESET());
          dispatch(ACTION_USER_NOT_AUTHENTICATED());
        }, 1000);
        return () => {
          clearTimeout(successfulLogout);
        };
      }
    }
  }, [appLoading, adminLogoutAppLoading, loadingSpinnerActive, dispatch]);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const registerFont = () => {
    Font.register({
      family: "Montserrat",
      src:
        "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
    });
  };

  useMemo(() => {
    registerFont();
  }, []);

  useMemo(() => {
    if (!cartIsActive) {
      if (largeScreenFrozenScrollPosition !== "") {
        changeLargeScreenFrozenScrollPosition("");
      }
    }
  }, [
    cartIsActive,
    largeScreenFrozenScrollPosition,
    changeLargeScreenFrozenScrollPosition,
  ]);

  const shoppingCartConditionalActiveRendering = () => {
    if (
      !largeScreenFrozenScrollPosition &&
      largeScreenFrozenScrollPosition !== 0
    ) {
      changeLargeScreenFrozenScrollPosition(window.scrollY);
    }

    if (!cartPageOpened || cartPageOpened === "Cart") {
      return (
        <ShoppingCart
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    } else if (cartPageOpened === "Availability") {
      return (
        <Availability
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    } else if (cartPageOpened === "TimePreference") {
      return (
        <TimePreference
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    } else if (cartPageOpened === "GuestCheckout") {
      return (
        <GuestCheckout
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    } else if (cartPageOpened === "PaymentInfo") {
      return (
        <PaymentInfo
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
          getClientData={getClientData ? getClientData : null}
          clientDataRefetch={clientDataRefetch}
          largeScreenFrozenScrollPosition={largeScreenFrozenScrollPosition}
          changeLargeScreenFrozenScrollPosition={
            changeLargeScreenFrozenScrollPosition
          }
        />
      );
    } else if (cartPageOpened === "ConfirmationPage") {
      return (
        <ConfirmationPage
          currentScreenSize={currentScreenSize}
          initialScreenSize={initialScreenSize}
        />
      );
    }
  };

  const largeScreenShoppingCartRender = () => {
    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        return (
          <Transition
            items={cartIsActive}
            from={{ transform: "translate3d(100%, 0, 0)" }}
            enter={{ transform: "translate3d(0, 0, 0)" }}
            leave={{
              transform: "translate3d(100%, 0, 0)",
            }}
          >
            {(cartIsActive) =>
              cartIsActive &&
              ((styleprops) => (
                <div
                  className="large_screen_shopping_cart_container"
                  style={styleprops}
                  ref={shoppingCartRef}
                >
                  {shoppingCartConditionalActiveRendering()}
                </div>
              ))
            }
          </Transition>
        );
      }
    } else if (currentScreenSize >= 1200) {
      return (
        <Transition
          items={cartIsActive}
          from={{ transform: "translate3d(100%, 0, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ transform: "translate3d(100%, 0, 0)" }}
        >
          {(cartIsActive) =>
            cartIsActive &&
            ((props) => (
              <div
                className="large_screen_shopping_cart_container"
                style={props}
                ref={shoppingCartRef}
              >
                {shoppingCartConditionalActiveRendering()}
              </div>
            ))
          }
        </Transition>
      );
    }
  };

  useEffect(() => {
    if (cartIsActive) {
      changeCartSlideDelay(true);
    } else {
      const slideDelay = setTimeout(() => {
        changeCartSlideDelay(false);
      }, 500);

      return () => {
        clearTimeout(slideDelay);
      };
    }
  }, [cartIsActive]);

  // Distort background while shopping cart slider is visible

  const renderSlideInShoppingCartContainer = useCallback(
    (item) => {
      if (cartIsActive) {
        return (
          <div
            className="large_screen_shopping_cart_full_container"
            style={{
              display: cartSlideDelay ? "block" : "none",
              backdropFilter: cartIsActive
                ? "blur(30px) brightness(50%)"
                : "none",
              WebkitBackdropFilter: cartIsActive
                ? "blur(30px) brightness(50%)"
                : "none",
              transition: "backdropFilter 0.5s ease",
            }}
            onClick={(e) => {
              if (
                e.target.className ===
                "large_screen_shopping_cart_full_container"
              ) {
                dispatch(ACTION_CART_IS_NOT_ACTIVE());
              }
            }}
          >
            {item}
          </div>
        );
      }
    },
    [cartIsActive, cartSlideDelay, dispatch]
  );

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];

    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        if (cartIsActive) {
          document.body.classList.add("no_scroll_no_fixed");
          root.classList.add("no_scroll_no_fixed");
        } else {
          document.body.classList.remove("no_scroll_no_fixed");
          root.classList.remove("no_scroll_no_fixed");
        }
      } else {
        document.body.classList.remove("no_scroll_no_fixed");
        root.classList.remove("no_scroll_no_fixed");
      }
    } else {
      if (currentScreenSize >= 1200) {
        if (cartIsActive) {
          document.body.classList.add("no_scroll_no_fixed");
          root.classList.add("no_scroll_no_fixed");
        } else {
          document.body.classList.remove("no_scroll_no_fixed");
          root.classList.remove("no_scroll_no_fixed");
        }
      } else {
        document.body.classList.remove("no_scroll_no_fixed");
        root.classList.remove("no_scroll_no_fixed");
      }
    }
  }, [cartIsActive, dispatch, currentScreenSize, initialScreenSize]);

  return (
    <>
      <Modal
        isOpen={logoutClicked}
        style={{
          content: {
            position: "fixed",
            zIndex: 10000,
            opacity: 0.99,
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={loadingSpinnerActive}
        />
        <Transition
          items={logoutClicked && !loadingSpinnerActive}
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ display: "none" }}
        >
          {(logoutClicked) =>
            logoutClicked &&
            ((props) => (
              <div className="log_out_modal" style={props}>
                <div className="log_out_modal_contents">
                  <FontAwesomeIcon
                    className="modal_x"
                    icon={faTimes}
                    onClick={() => dispatch(ACTION_LOG_OUT_CLICKED_RESET())}
                  />
                  <h2>Are you sure you want to log out?</h2>
                  <span className="logout_buttons_container">
                    <div className="logout_button" onClick={handleLogout}>
                      <p>LOG OUT</p>
                    </div>
                    <div
                      className="cancel_logout_button"
                      onClick={() => dispatch(ACTION_LOG_OUT_CLICKED_RESET())}
                    >
                      <p>CANCEL</p>
                    </div>
                  </span>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
      <Spring
        from={{
          marginTop: !currentScreenSize
            ? "-200px"
            : initialScreenSize >= 600
            ? currentScreenSize >= 600
              ? "-200px"
              : "-100px"
            : currentScreenSize >= 600
            ? "-200px"
            : "-100px",
        }}
        to={{ marginTop: "0px" }}
        config={{
          delay: !currentScreenSize
            ? initialScreenSize >= 600
              ? 3300
              : 2500
            : initialScreenSize >= 600
            ? currentScreenSize >= 600
              ? 3300
              : 2500
            : 2500,
          duration: !currentScreenSize
            ? initialScreenSize >= 600
              ? 2000
              : 1500
            : initialScreenSize >= 600
            ? currentScreenSize >= 600
              ? 2000
              : 1500
            : 1500,
        }}
        immediate={location.pathname.includes("account")}
      >
        {(styles) => (
          <header
            className="header"
            style={{
              marginTop: splashScreenComplete
                ? !currentScreenSize
                  ? initialScreenSize >= 1200
                    ? `${styles.marginTop}`
                    : navbarVisible
                    ? "0px"
                    : "-200px"
                  : currentScreenSize >= 1200
                  ? `${styles.marginTop}`
                  : navbarVisible
                  ? "0px"
                  : "-200px"
                : `${styles.marginTop}`,
              transition: "margin-top 0.5s ease",
              height: !currentScreenSize
                ? initialScreenSize <= 1000 &&
                  initialScreenSize >= 600 &&
                  initialScreenSize > initialScreenHeight
                  ? window.scrollY <= 1
                    ? "30vh"
                    : "15vh"
                  : "8vh"
                : currentScreenSize <= 1000 &&
                  currentScreenSize >= 600 &&
                  currentScreenSize > currentScreenHeight
                ? window.scrollY <= 1
                  ? "30vh"
                  : "15vh"
                : "8vh",
              paddingTop: !currentScreenSize
                ? initialScreenSize <= 1000 &&
                  initialScreenSize >= 600 &&
                  initialScreenSize > initialScreenHeight
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh"
                : currentScreenSize <= 1000 &&
                  currentScreenSize >= 600 &&
                  currentScreenSize > currentScreenHeight
                ? window.scrollY <= 1
                  ? "15vh"
                  : "0vh"
                : "0vh",
              paddingBottom: !currentScreenSize
                ? initialScreenSize <= 1000 &&
                  initialScreenSize >= 600 &&
                  initialScreenSize > initialScreenHeight
                  ? window.scrollY <= 1
                    ? "15vh"
                    : "0vh"
                  : "0vh"
                : currentScreenSize <= 1000 &&
                  currentScreenSize >= 600 &&
                  currentScreenSize > currentScreenHeight
                ? window.scrollY <= 1
                  ? "15vh"
                  : "0vh"
                : "0vh",
              zIndex: finalBookButtonActive || logoutClicked ? "auto" : 500,
              display: loginIsActive ? "none" : "flex",
            }}
          >
            <NavigationBar
              scroll={scroll}
              handleNavbarToggle={handleNavbarToggle}
              navbarToggle={navbarToggle}
              currentScreenSize={currentScreenSize}
              initialScreenSize={initialScreenSize}
              currentScreenHeight={currentScreenHeight}
              initialScreenHeight={initialScreenHeight}
              handleClickToScrollToHome={handleClickToScrollToHome}
              handleClickToScrollToTreatments={handleClickToScrollToTreatments}
              handleClickToScrollToAddOns={handleClickToScrollToAddOns}
              handleClickToScrollToInstagram={handleClickToScrollToInstagram}
              handleClickToScrollToContact={handleClickToScrollToContact}
              adminDummyToken={adminDummyToken}
              getEmployeeData={getEmployeeData}
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
        handleRedirectClickToHome={handleRedirectClickToHome}
        handleClickToScrollToTreatments={handleClickToScrollToTreatments}
        handleClickToScrollToAddOns={handleClickToScrollToAddOns}
        handleClickToScrollToInstagram={handleClickToScrollToInstagram}
        handleClickToScrollToContact={handleClickToScrollToContact}
        ref={ref}
      />

      {renderSlideInShoppingCartContainer(largeScreenShoppingCartRender())}

      <Switch>
        <Route exact path="/">
          <KeepAlive saveScrollPosition="screen">
            <div className="main_container">
              <LandingPage
                currentScreenSize={currentScreenSize}
                initialScreenSize={initialScreenSize}
                currentScreenHeight={currentScreenHeight}
                initialScreenHeight={initialScreenHeight}
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

        <Route path="/cart" component={ShoppingCart} />

        <Route path="/availability" component={AvailabilityRouter} />

        <Route path="/checkout" component={CheckoutRouter} />

        <Route
          render={() =>
            location.pathname.includes("account") ? (
              <AccountRouter
                path="/account"
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                getClientData={getClientData ? getClientData : null}
                clientDataRefetch={clientDataRefetch}
              />
            ) : location.pathname.includes("admin") ? (
              <AdminRouter
                path="/admin"
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
                getEmployeeData={getEmployeeData ? getEmployeeData : null}
                employeeDataRefetch={employeeDataRefetch}
              />
            ) : (
              <PaymentInfo
                exact
                path="/paymentinfo"
                getClientData={getClientData ? getClientData : null}
                clientDataRefetch={clientDataRefetch}
              />
            )
          }
        />
      </Switch>
    </>
  );
};

const rootElement = document.getElementById("root");
Modal.setAppElement(rootElement);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AliveScope>
          <App />
        </AliveScope>
      </ApolloProvider>
    </Provider>
  </Router>,
  rootElement
);
