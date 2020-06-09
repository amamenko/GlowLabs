import React, { useEffect, useCallback } from "react";
import "./ShoppingCart.css";
import { Link, useLocation, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import ACTION_CART_IS_NOT_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import ACTION_AVAILABILITY_CLICKED from "../../actions/AvailabilityClicked/ACTION_AVAILABILITY_CLICKED";
import { useDispatch, useSelector } from "react-redux";
import CalmCard from "./Treatment_Cards/Calm/CalmCard";
import ClarifyCard from "./Treatment_Cards/Clarify/ClarifyCard";
import CBDCard from "./Treatment_Cards/CBD/CBDCard";
import GlowCard from "./Treatment_Cards/Glow/GlowCard";
import DermaplaningCard from "./Treatment_Cards/Dermaplaning/DermaplaningCard";
import ChemicalPeelCard from "./Treatment_Cards/ChemicalPeel/ChemicalPeelCard";
import BacialCard from "./Treatment_Cards/Bacial/BacialCard";
import MicroneedleCard from "./Treatment_Cards/Microneedle/MicroneedleCard";
import RejuvenateCard from "./Treatment_Cards/Rejuvenate/RejuvenateCard";
import QuickieCard from "./Treatment_Cards/Quickie/QuickieCard";
import QuenchCard from "./Treatment_Cards/Quench/QuenchCard";
import ExtraExtractionsCard from "./Add_On_Cards/ExtraExtractions/ExtraExtractionsCard";
import HydroJellyMaskCard from "./Add_On_Cards/HydroJellyMask/HydroJellyMaskCard";
import LEDTherapyCard from "./Add_On_Cards/LEDTherapy/LEDTherapyCard";
import MicrocurrentCard from "./Add_On_Cards/Microcurrent/MicrocurrentCard";
import MicrodermabrasionCard from "./Add_On_Cards/Microdermabrasion/MicrodermabrasionCard";
import DermarollingCard from "./Add_On_Cards/Dermarolling/DermarollingCard";
import NanoNeedlingCard from "./Add_On_Cards/NanoNeedling/NanoNeedlingCard";
import GuaShaCard from "./Add_On_Cards/GuaSha/GuaShaCard";
import BeardCard from "./Add_On_Cards/Beard/BeardCard";
import NoFacialSelected from "./Treatment_Cards/NoFacialSelected";
import ACTION_TOTAL_PRICE from "../../actions/TotalPrice/ACTION_TOTAL_PRICE";
import { FormGroup, Input } from "reactstrap";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  // In Cart states
  // Treatments
  const calmInCart = useSelector((state) => state.calmInCart.in_cart);
  const clarifyInCart = useSelector((state) => state.clarifyInCart.in_cart);
  const bacialInCart = useSelector((state) => state.bacialInCart.in_cart);
  const glowInCart = useSelector((state) => state.glowInCart.in_cart);
  const cbdInCart = useSelector((state) => state.cbdInCart.in_cart);
  const chemicalPeelInCart = useSelector(
    (state) => state.chemicalPeelInCart.in_cart
  );
  const dermaplaningInCart = useSelector(
    (state) => state.dermaplaningInCart.in_cart
  );
  const microneedleInCart = useSelector(
    (state) => state.microneedleInCart.in_cart
  );
  const quenchInCart = useSelector((state) => state.quenchInCart.in_cart);
  const quickieInCart = useSelector((state) => state.quickieInCart.in_cart);
  const rejuvenateInCart = useSelector(
    (state) => state.rejuvenateInCart.in_cart
  );

  const addOnsArr = useSelector((state) => state.addOnsArr.add_ons_arr);
  const treatmentsArr = useSelector(
    (state) => state.treatmentsArr.treatments_arr
  );
  const counter = useSelector((state) => state.counterReducer.counter);
  const availabilityClicked = useSelector(
    (state) => state.availabilityClicked.availabilityClicked
  );
  const totalPrice = useSelector((state) => state.totalPrice.totalPrice);
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const backToHome = () => {
    dispatch(ACTION_CART_IS_NOT_ACTIVE());
  };

  const availabilityHasBeenClicked = () => {
    if (!availabilityClicked) {
      dispatch(ACTION_AVAILABILITY_CLICKED());
      document.body.style.setProperty("background", "rgb(255, 255, 255)");
    }
  };

  const renderCartFacials = () => {
    if (counter === 0) {
      return (
        <>
          <div className="empty_cart_container">
            <FontAwesomeIcon
              className="empty_shopping_cart"
              color="rgba(211, 211, 211, 0.6)"
              icon={faShoppingCart}
            />
            <h3>No items in your cart</h3>
          </div>
          <p className="cart_statement">
            You do not have any facial treatments or add-ons in your cart right
            now
          </p>
        </>
      );
    } else {
      if (calmInCart) {
        return <CalmCard />;
      } else if (clarifyInCart) {
        return <ClarifyCard />;
      } else if (cbdInCart) {
        return <CBDCard />;
      } else if (glowInCart) {
        return <GlowCard />;
      } else if (dermaplaningInCart) {
        return <DermaplaningCard />;
      } else if (chemicalPeelInCart) {
        return <ChemicalPeelCard />;
      } else if (bacialInCart) {
        return <BacialCard />;
      } else if (microneedleInCart) {
        return <MicroneedleCard />;
      } else if (rejuvenateInCart) {
        return <RejuvenateCard />;
      } else if (quickieInCart) {
        return <QuickieCard />;
      } else if (quenchInCart) {
        return <QuenchCard />;
      } else {
        if (addOnsArr.length > 0) {
          return <NoFacialSelected addOnsArr={addOnsArr} />;
        }
      }
    }
  };

  const addOnsCardComponentsArr = [
    { name: "ExtraExtractions", component: <ExtraExtractionsCard /> },
    { name: "HydroJelly", component: <HydroJellyMaskCard /> },
    { name: "LED", component: <LEDTherapyCard /> },
    { name: "Microcurrent", component: <MicrocurrentCard /> },
    { name: "Microdermabrasion", component: <MicrodermabrasionCard /> },
    { name: "Dermarolling", component: <DermarollingCard /> },
    { name: "NanoNeedling", component: <NanoNeedlingCard /> },
    { name: "GuaSha", component: <GuaShaCard /> },
    { name: "Beard", component: <BeardCard /> },
  ];

  const componentNames = addOnsArr.map((item) => item.name);

  const renderCartAddOns = () => {
    let componentsArr = [];
    for (let i = 0; i < addOnsCardComponentsArr.length; i++) {
      if (componentNames.indexOf(addOnsCardComponentsArr[i].name) > -1) {
        componentsArr.push(addOnsCardComponentsArr[i].component);
      }
    }
    return componentsArr.map((item, index) => <div key={index}>{item}</div>);
  };

  const calculateSubtotal = useCallback(() => {
    let treatmentsPriceArr = [];
    let addOnsPriceArr = [];
    let cartSubtotal = null;

    if (treatmentsArr.length > 0) {
      treatmentsPriceArr = [treatmentsArr[0].price];
    }

    if (addOnsArr.length > 0) {
      addOnsPriceArr = addOnsArr.map((item) => item.price);
    }
    let totalPricesArr = addOnsPriceArr.concat(treatmentsPriceArr);

    if (totalPricesArr.length > 0) {
      cartSubtotal = totalPricesArr.reduce((a, b) => a + b);

      dispatch(ACTION_TOTAL_PRICE(cartSubtotal));
    }
  }, [addOnsArr, treatmentsArr, dispatch]);

  calculateSubtotal();

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="shopping_cart_container">
      {redirectToHome()}
      <div
        className="shopping_cart_header"
        style={{
          borderBottom: counter === 0 ? "1px solid rgb(44, 44, 52)" : "none",
        }}
      >
        <Link to="/" onClick={backToHome}>
          <FontAwesomeIcon
            className="shopping_cart_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>MY CART</h1>
        <Link to="/availability">
          <FontAwesomeIcon
            className="shopping_cart_forward_arrow"
            style={{ display: availabilityClicked ? "block" : "none" }}
            icon={faChevronRight}
          />
        </Link>
      </div>
      <div
        className="cart_header"
        style={{ display: counter === 0 ? "none" : "flex" }}
      >
        <h2>MY FACIAL</h2>
      </div>
      {renderCartFacials()}
      <div
        className="cart_header"
        style={{ display: addOnsArr.length === 0 ? "none" : "flex" }}
      >
        <h2>MY ADD-ON{addOnsArr.length > 1 ? "S" : null}</h2>
      </div>
      {renderCartAddOns()}
      <div
        className="cart_subtotal"
        style={{ display: counter === 0 ? "none" : "flex" }}
      >
        <p>Cart Subtotal</p>
        <p>${totalPrice}</p>
      </div>
      {treatmentsArr.length === 0 ? null : (
        <div className="esthetician_preference_dropdown">
          <FormGroup className="esthetician_preference_formgroup">
            <p>
              Would you like to book an appointment with a particular
              esthetician?
            </p>
            <div className="esthetician_preference_dropdown_input_field">
              <FontAwesomeIcon
                className="esthetician_preference_dropdown_icon"
                icon={faChevronCircleDown}
              />
              <Input
                className="esthetician_preference_input"
                type="select"
                name="select"
                id="esthetician_preference"
              >
                <option>No preference</option>
                <option>Daiana G.</option>
                <option>Ruth</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </div>
          </FormGroup>
        </div>
      )}
      <Link to="/availability" onClick={availabilityHasBeenClicked}>
        <div
          className="search_availability_button"
          style={{
            display: treatmentsArr.length === 0 ? "none" : "flex",
            marginTop: counter === 0 ? "0vh" : "2vh",
          }}
        >
          <p>Search Availability</p>
        </div>
      </Link>
      <Link to="/" onClick={backToHome}>
        <div
          className="continue_shopping_button"
          style={{ marginTop: counter === 0 ? "0vh" : "1.5rem" }}
        >
          <p>Continue Shopping</p>
        </div>
      </Link>
    </div>
  );
};

export default ShoppingCart;
