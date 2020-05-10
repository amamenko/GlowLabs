import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useLocation } from "react-router-dom";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import MorningCleanser from "./Morning/MorningCleanser";
import MorningToner from "./Morning/MorningToner";
import MorningSerum from "./Morning/MorningSerum";
import MorningMoisturizer from "./Morning/MorningMoisturizer";
import MorningSPF from "./Morning/MorningSPF";
import EveningOilCleanser from "./Evening/EveningOilCleanser";
import EveningCleanser from "./Evening/EveningCleanser";
import EveningExfoliator from "./Evening/EveningExfoliator";
import EveningTreatmentMask from "./Evening/EveningTreatmentMask";
import EveningToner from "./Evening/EveningToner";
import EveningSerum from "./Evening/EveningSerum";
import EveningMoisturizer from "./Evening/EveningMoisturizer";
import EveningNightMask from "./Evening/EveningNightMask";
import EveningOil from "./Evening/EveningOil";
import EveningSpotTreatment from "./Evening/EveningSpotTreatment";
import ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS from "../../../../../actions/MyRoutine/Morning/Cleanser/ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS";
import ACTION_RESET_ALL_MORNING_MOISTURIZER_FIELDS from "../../../../../actions/MyRoutine/Morning/Moisturizer/ACTION_RESET_ALL_MORNING_MOISTURIZER_FIELDS";
import ACTION_RESET_ALL_MORNING_SERUM_FIELDS from "../../../../../actions/MyRoutine/Morning/Serum/ACTION_RESET_ALL_MORNING_SERUM_FIELDS";
import ACTION_RESET_ALL_SPF_FIELDS from "../../../../../actions/MyRoutine/Morning/SPF/ACTION_RESET_ALL_SPF_FIELDS";
import ACTION_RESET_ALL_MORNING_TONER_FIELDS from "../../../../../actions/MyRoutine/Morning/Toner/ACTION_RESET_ALL_MORNING_TONER_FIELDS";
import ACTION_RESET_ALL_OIL_CLEANSER_FIELDS from "../../../../../actions/MyRoutine/Evening/OilCleanser/ACTION_RESET_ALL_OIL_CLEANSER_FIELDS";
import ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS from "../../../../../actions/MyRoutine/Evening/Cleanser/ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS";
import ACTION_RESET_ALL_EXFOLIATOR_FIELDS from "../../../../../actions/MyRoutine/Evening/Exfoliator/ACTION_RESET_ALL_EXFOLIATOR_FIELDS";
import ACTION_RESET_ALL_TREATMENT_MASK_FIELDS from "../../../../../actions/MyRoutine/Evening/TreatmentMask/ACTION_RESET_ALL_TREATMENT_MASK_FIELDS";
import ACTION_RESET_ALL_EVENING_TONER_FIELDS from "../../../../../actions/MyRoutine/Evening/Toner/ACTION_RESET_ALL_EVENING_TONER_FIELDS";
import ACTION_RESET_ALL_EVENING_SERUM_FIELDS from "../../../../../actions/MyRoutine/Evening/Serum/ACTION_RESET_ALL_EVENING_SERUM_FIELDS";
import ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS from "../../../../../actions/MyRoutine/Evening/Moisturizer/ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS";
import ACTION_RESET_ALL_NIGHT_MASK_FIELDS from "../../../../../actions/MyRoutine/Evening/NightMask/ACTION_RESET_ALL_NIGHT_MASK_FIELDS";
import ACTION_RESET_ALL_OIL_FIELDS from "../../../../../actions/MyRoutine/Evening/Oil/ACTION_RESET_ALL_OIL_FIELDS";
import ACTION_RESET_ALL_SPOT_TREATMENT_FIELDS from "../../../../../actions/MyRoutine/Evening/SpotTreatment/ACTION_RESET_ALL_SPOT_TREATMENT_FIELDS";
import MorningRX from "./Morning/MorningRX";
import EveningRX from "./Evening/EveningRX";
import MorningEyeCream from "./Morning/MorningEyeCream";
import EveningEyeCream from "./Evening/EveningEyeCream";
import "./SkinCareRoutine.css";

const MyRoutine = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const selectedItemBackRef = useRef(null);
  const individualItemMorningRef = useRef(null);
  const individualItemEveningRef = useRef(null);
  const addProductRef = useRef(null);
  const submitProductRef = useRef(null);
  const pageContainerRef = useRef(null);
  const [itemToggled, changeItemToggled] = useState("");
  const [addProductClicked, changeAddProductClicked] = useState(false);

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

  useEffect(() => {
    const checkModalRef = setInterval(() => {
      let currentRef;

      if (selectedItemBackRef) {
        if (submitProductRef) {
          if (submitProductRef.current) {
            currentRef = submitProductRef.current;
          } else {
            currentRef = selectedItemBackRef.current;
          }
        }
      }
      if (currentRef) {
        if (itemToggled) {
          disableBodyScroll({ targetElement: currentRef });
        } else {
          enableBodyScroll({ targetElement: currentRef });
        }
      }
    }, 100);
    return () => {
      clearInterval(checkModalRef);
      clearAllBodyScrollLocks();
    };
  }, [itemToggled, addProductClicked]);

  // Allows click only if selected item modal is not active

  const handleItemToggled = (e, item) => {
    if (
      (e.currentTarget && individualItemMorningRef) ||
      (e.currentTarget && individualItemEveningRef)
    ) {
      if (
        individualItemMorningRef.current ||
        individualItemEveningRef.current
      ) {
        if (
          individualItemMorningRef.current.className ===
            e.currentTarget.className ||
          individualItemEveningRef.current.className ===
            e.currentTarget.className
        ) {
          if (selectedItemBackRef) {
            if (!selectedItemBackRef.current) {
              if (item) {
                if (item) {
                  changeItemToggled(item);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled item

  const handleAppointmentUntoggled = (e) => {
    if (e.currentTarget && selectedItemBackRef) {
      if (selectedItemBackRef.current) {
        if (
          selectedItemBackRef.current.className === e.currentTarget.className
        ) {
          changeItemToggled("");

          // Reset all morning field states
          dispatch(ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS());
          dispatch(ACTION_RESET_ALL_MORNING_MOISTURIZER_FIELDS());
          dispatch(ACTION_RESET_ALL_MORNING_SERUM_FIELDS());
          dispatch(ACTION_RESET_ALL_SPF_FIELDS());
          dispatch(ACTION_RESET_ALL_MORNING_TONER_FIELDS());

          // Reset all afternoon / evening field states
          dispatch(ACTION_RESET_ALL_OIL_CLEANSER_FIELDS());
          dispatch(ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS());
          dispatch(ACTION_RESET_ALL_EXFOLIATOR_FIELDS());
          dispatch(ACTION_RESET_ALL_TREATMENT_MASK_FIELDS());
          dispatch(ACTION_RESET_ALL_EVENING_TONER_FIELDS());
          dispatch(ACTION_RESET_ALL_EVENING_SERUM_FIELDS());
          dispatch(ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS());
          dispatch(ACTION_RESET_ALL_NIGHT_MASK_FIELDS());
          dispatch(ACTION_RESET_ALL_OIL_FIELDS());
          dispatch(ACTION_RESET_ALL_SPOT_TREATMENT_FIELDS());

          if (addProductClicked) {
            changeAddProductClicked(false);
          }
        }
      }
    }
  };

  // Function for add product button click

  const handleAddProductToggle = (e) => {
    if (e.currentTarget && addProductRef) {
      if (addProductRef.current) {
        if (addProductRef.current.className === e.currentTarget.className) {
          changeAddProductClicked(true);
          if (selectedItemBackRef) {
            if (selectedItemBackRef.current) {
              selectedItemBackRef.current.scrollIntoView({
                block: "end",
                inline: "nearest",
                behavior: "auto",
              });
            }
          }
        }
      }
    }
  };

  const handleBackToOverview = () => {
    if (selectedItemBackRef) {
      if (selectedItemBackRef.current) {
        selectedItemBackRef.current.scrollIntoView({
          block: "end",
          inline: "nearest",
          behavior: "auto",
        });
      }
    }
    changeAddProductClicked(false);

    // Reset all morning field states
    dispatch(ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS());
    dispatch(ACTION_RESET_ALL_MORNING_MOISTURIZER_FIELDS());
    dispatch(ACTION_RESET_ALL_MORNING_SERUM_FIELDS());
    dispatch(ACTION_RESET_ALL_SPF_FIELDS());
    dispatch(ACTION_RESET_ALL_MORNING_TONER_FIELDS());

    // Reset all afternoon / evening field states
    dispatch(ACTION_RESET_ALL_OIL_CLEANSER_FIELDS());
    dispatch(ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS());
    dispatch(ACTION_RESET_ALL_EXFOLIATOR_FIELDS());
    dispatch(ACTION_RESET_ALL_TREATMENT_MASK_FIELDS());
    dispatch(ACTION_RESET_ALL_EVENING_TONER_FIELDS());
    dispatch(ACTION_RESET_ALL_EVENING_SERUM_FIELDS());
    dispatch(ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS());
    dispatch(ACTION_RESET_ALL_NIGHT_MASK_FIELDS());
    dispatch(ACTION_RESET_ALL_OIL_FIELDS());
    dispatch(ACTION_RESET_ALL_SPOT_TREATMENT_FIELDS());
  };

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div
      className="skin_care_routine_container"
      style={{
        zIndex: logoutClicked ? -1 : "auto",
      }}
    >
      {redirectToHome()}
      {redirectToLogInPage()}
      <div
        className="skin_care_routine_header"
        style={{ zIndex: logoutClicked ? 0 : 3 }}
      >
        <Link to="/account/clientprofile/profile">
          <FontAwesomeIcon
            className="skin_care_routine_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>SKIN CARE ROUTINE</h1>
      </div>
      <div
        className="skin_care_routine_sub_header"
        style={{ zIndex: logoutClicked ? -1 : 2 }}
      >
        <Link
          to="/account/clientprofile/profile/routine"
          className="skin_care_routine_sub_header_container_link"
        >
          <div className="skin_care_routine_recommended_container_not_active">
            <h2>RECOMMENDED</h2>
          </div>
        </Link>
        <div className="skin_care_routine_my_routine_container_active">
          <h2>MY ROUTINE</h2>
        </div>
      </div>
      <div className="skin_care_routine_top_caption" ref={pageContainerRef}>
        <p>
          Keep us updated on what skin care products you're using and how you're
          using them
        </p>
      </div>
      <div className="skin_care_routine_content_container">
        <div className="skin_care_routine_morning_content_container">
          <div className="skin_care_routine_morning_header">
            <h2>Morning</h2>
          </div>
          <div className="skin_care_routine_morning_items_container">
            <MorningCleanser
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <MorningToner
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <MorningSerum
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <MorningMoisturizer
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <MorningSPF
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <MorningRX
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <MorningEyeCream
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
          </div>
        </div>
        <div className="skin_care_routine_evening_content_container">
          <div className="skin_care_routine_evening_header">
            <h2>Afternoon / Evening</h2>
          </div>
          <div className="skin_care_routine_evening_items_container">
            <EveningOilCleanser
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningCleanser
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningExfoliator
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningTreatmentMask
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningToner
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningSerum
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningMoisturizer
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningNightMask
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningOil
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningSpotTreatment
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningRX
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
            <EveningEyeCream
              handleBackToOverview={handleBackToOverview}
              handleItemToggled={handleItemToggled}
              handleAddProductToggle={handleAddProductToggle}
              handleAppointmentUntoggled={handleAppointmentUntoggled}
              addProductClicked={addProductClicked}
              itemToggled={itemToggled}
              changeItemToggled={changeItemToggled}
              individualItemMorningRef={individualItemMorningRef}
              pageContainerRef={pageContainerRef}
              selectedItemBackRef={selectedItemBackRef}
              addProductRef={addProductRef}
              getClientData={props.getClientData}
              clientDataRefetch={props.clientDataRefetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoutine;
