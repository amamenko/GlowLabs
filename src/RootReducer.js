import { combineReducers } from "redux";
import calmToggleReducer from "./reducers/Treatments/Calm/calmToggleReducer";
import clarifyToggleReducer from "./reducers/Treatments/Clarify/clarifyToggleReducer";
import bacialToggleReducer from "./reducers/Treatments/Bacial/bacialToggleReducer";
import glowToggleReducer from "./reducers/Treatments/Glow/glowToggleReducer";
import rejuvenateToggleReducer from "./reducers/Treatments/Rejuvenate/rejuvenateToggleReducer";
import quenchToggleReducer from "./reducers/Treatments/Quench/quenchToggleReducer";
import quickieToggleReducer from "./reducers/Treatments/Quickie/quickieToggleReducer";
import chemicalpeelToggleReducer from "./reducers/Treatments/ChemicalPeel/chemicalpeelToggleReducer";
import dermaplaningToggleReducer from "./reducers/Treatments/Dermaplaning/dermaplaningToggleReducer";
import cbdToggleReducer from "./reducers/Treatments/CBD/cbdToggleReducer";
import microneedleToggleReducer from "./reducers/Treatments/Microneedle/microneedleToggleReducer";
import navbarToggleReducer from "./reducers/Nav/navbarToggleReducer";
import bodyScrollReducer from "./reducers/Body_Scroll/bodyScrollReducer";
import beardToggleReducer from "./reducers/AddOns/Beard/beardToggleReducer";
import dermarollingToggleReducer from "./reducers/AddOns/Dermarolling/dermarollingToggleReducer";
import extraExtractionsToggleReducer from "./reducers/AddOns/ExtraExtractions/extraExtractionsToggleReducer";
import guashaToggleReducer from "./reducers/AddOns/GuaSha/guashaToggleReducer";
import hydroJellyToggleReducer from "./reducers/AddOns/HydroJellyMask/hydroJellyToggleReducer";
import ledTherapyToggle from "./reducers/AddOns/LEDTherapy/ledTherapyToggleReducer";
import microcurrentToggleReducer from "./reducers/AddOns/Microcurrent/microcurrentToggleReducer";
import microdermabrasionToggleReducer from "./reducers/AddOns/Microdermabrasion/microdermabrasionToggleReducer";
import nanoneedlingToggleReducer from "./reducers/AddOns/Nanoneedling/nanoneedlingToggleReducer";
import scrollReducer from "./reducers/Scroll/scrollReducer";
import navbarIsVisibleReducer from "./reducers/NavbarIsVisible/navbarIsVisibleReducer";
import calmInCartReducer from "./reducers/InCart/Treatments/Calm/calmInCartReducer";
import clarifyInCartReducer from "./reducers/InCart/Treatments/Clarify/clarifyInCartReducer";
import bacialInCartReducer from "./reducers/InCart/Treatments/Bacial/bacialInCartReducer";
import glowInCartReducer from "./reducers/InCart/Treatments/Glow/glowInCartReducer";
import cbdInCartReducer from "./reducers/InCart/Treatments/CBD/cbdInCartReducer";
import chemicalPeelInCartReducer from "./reducers/InCart/Treatments/ChemicalPeel/chemicalPeelInCartReducer";
import dermaplaningInCartReducer from "./reducers/InCart/Treatments/Dermaplaning/dermaplaningInCartReducer";
import microneedleInCartReducer from "./reducers/InCart/Treatments/Microneedle/microneedleInCartReducer";
import quenchInCartReducer from "./reducers/InCart/Treatments/Quench/quenchInCartReducer";
import quickieInCartReducer from "./reducers/InCart/Treatments/Quickie/quickieInCartReducer";
import rejuvenateInCartReducer from "./reducers/InCart/Treatments/Rejuvenate/rejuvenateInCartReducer";
import beardInCartReducer from "./reducers/InCart/AddOns/Beard/beardInCartReducer";
import dermarollingInCartReducer from "./reducers/InCart/AddOns/Dermarolling/dermarollingInCartReducer";
import extraExtractionsInCartReducer from "./reducers/InCart/AddOns/ExtraExtractions/extraExtractionsInCartReducer";
import guashaInCartReducer from "./reducers/InCart/AddOns/GuaSha/guashaInCartReducer";
import hydroJellyInCartReducer from "./reducers/InCart/AddOns/HydroJellyMask/hydrojellyInCartReducer";
import ledInCartReducer from "./reducers/InCart/AddOns/LEDTherapy/ledInCartReducer";
import microcurrentInCartReducer from "./reducers/InCart/AddOns/Microcurrent/microcurrentInCartReducer";
import microdermabrasionInCartReducer from "./reducers/InCart/AddOns/Microdermabrasion/microdermabrasionInCartReducer";
import nanoneedlingInCartReducer from "./reducers/InCart/AddOns/NanoNeedling/nanoneedlingInCartReducer";
import addOnsArrReducer from "./reducers/InCart/AddOns/addOnsArrReducer";
import counterReducer from "./reducers/Counter/counterReducer";
import cartIsActiveReducer from "./reducers/CartIsActive/cartIsActiveReducer";
import selectedDayReducer from "./reducers/SelectedDay/selectedDayReducer";
import reformattedDayReducer from "./reducers/SelectedDay/ReformattedDay/reformattedDayReducer";
import reformattedDayCloneReducer from "./reducers/SelectedDay/ReformattedDayClone/reformattedDayCloneReducer";
import dayOfTheWeekReducer from "./reducers/SelectedDay/DayOfTheWeek/dayOfTheWeekReducer";
import availabilityClickedReducer from "./reducers/AvailabilityClicked/availabilityClickedReducer";
import selectTimeActiveReducer from "./reducers/SelectTimeActive/selectTimeActiveReducer";
import selectedTimeReducer from "./reducers/SelectedTime/selectedTimeReducer";
import treatmentsArrReducer from "./reducers/InCart/Treatments/treatmentsArrReducer";
import afternoonCollapseReducer from "./reducers/SelectedTime/CollapseIsOpen/Afternoon/afternoonCollapseReducer";
import lateAfternoonCollapseReducer from "./reducers/SelectedTime/CollapseIsOpen/LateAfternoon/lateAfternoonCollapseReducer";
import morningCollapseReducer from "./reducers/SelectedTime/CollapseIsOpen/Morning/morningCollapseReducer";
import eveningCollapseReducer from "./reducers/SelectedTime/CollapseIsOpen/Evening/eveningCollapseReducer";
import firstNameReducer from "./reducers/GuestCheckoutForm/FirstName/firstNameReducer";
import lastNameReducer from "./reducers/GuestCheckoutForm/LastName/lastNameReducer";
import continueToCheckoutButtonReducer from "./reducers/ContinueToCheckoutButtonActive/continueToCheckoutReducer";
import emailReducer from "./reducers/GuestCheckoutForm/Email/emailReducer";
import emailValidReducer from "./reducers/EmailValidation/Valid/emailValidReducer";
import emailInvalidReducer from "./reducers/EmailValidation/Invalid/emailInvalidReducer";
import phoneNumberReducer from "./reducers/GuestCheckoutForm/PhoneNumber/phoneNumberReducer";
import phoneValidReducer from "./reducers/PhoneNumberValidation/Valid/phoneValidReducer";
import phoneInvalidReducer from "./reducers/PhoneNumberValidation/Invalid/phoneInvalidReducer";
import appointmentNotesReducer from "./reducers/GuestCheckoutForm/AppointmentNotes/appointmentNotesReducer";
import continueToBookingSummaryReducer from "./reducers/ContinueToBookingSummaryButtonActive/continueToBookingSummaryReducer";
import appointmentNotesValidationReducer from "./reducers/GuestCheckoutForm/AppointmentNotes/AppointmentNotesValidation/appointmentNotesValidationReducer";
import appointmentEndTimeReducer from "./reducers/AppointmentEndTime/appointmentEndTimeReducer";
import totalPriceReducer from "./reducers/TotalPrice/totalPriceReducer";
import totalDurationReducer from "./reducers/TotalDuration/totalDurationReducer";
import splashScreenCompleteReducer from "./reducers/SplashScreenComplete/splashScreenCompleteReducer";

const RootReducer = combineReducers({
  // Reducers for "LEARN MORE" button on treatments/add-ons on mobile
  // Treatments
  calmToggle: calmToggleReducer,
  clarifyToggle: clarifyToggleReducer,
  bacialToggle: bacialToggleReducer,
  glowToggle: glowToggleReducer,
  rejuvenateToggle: rejuvenateToggleReducer,
  quenchToggle: quenchToggleReducer,
  quickieToggle: quickieToggleReducer,
  chemicalpeelToggle: chemicalpeelToggleReducer,
  dermaplaningToggle: dermaplaningToggleReducer,
  cbdToggle: cbdToggleReducer,
  microneedleToggle: microneedleToggleReducer,

  // Add-Ons
  beardToggle: beardToggleReducer,
  dermarollingToggle: dermarollingToggleReducer,
  extraExtractionsToggle: extraExtractionsToggleReducer,
  guashaToggle: guashaToggleReducer,
  hydroJellyToggle: hydroJellyToggleReducer,
  ledTherapyToggle: ledTherapyToggle,
  microcurrentToggle: microcurrentToggleReducer,
  microdermabrasionToggle: microdermabrasionToggleReducer,
  nanoneedlingToggle: nanoneedlingToggleReducer,

  // Reducers for adding and removing treatments/add-ons to and from cart
  // Treatments
  calmInCart: calmInCartReducer,
  clarifyInCart: clarifyInCartReducer,
  bacialInCart: bacialInCartReducer,
  glowInCart: glowInCartReducer,
  cbdInCart: cbdInCartReducer,
  chemicalPeelInCart: chemicalPeelInCartReducer,
  dermaplaningInCart: dermaplaningInCartReducer,
  microneedleInCart: microneedleInCartReducer,
  quenchInCart: quenchInCartReducer,
  quickieInCart: quickieInCartReducer,
  rejuvenateInCart: rejuvenateInCartReducer,
  treatmentsArr: treatmentsArrReducer,

  // Add-Ons
  beardInCart: beardInCartReducer,
  dermarollingInCart: dermarollingInCartReducer,
  extraExtractionsInCart: extraExtractionsInCartReducer,
  guashaInCart: guashaInCartReducer,
  hydroJellyInCart: hydroJellyInCartReducer,
  ledInCart: ledInCartReducer,
  microcurrentInCart: microcurrentInCartReducer,
  microdermabrasionInCart: microdermabrasionInCartReducer,
  nanoneedlingInCart: nanoneedlingInCartReducer,
  addOnsArr: addOnsArrReducer,

  // Reducers for navbar/body interactions
  navbarToggle: navbarToggleReducer,
  bodyScrollToggle: bodyScrollReducer,
  scrollToggle: scrollReducer,
  navbarIsVisibleReducer: navbarIsVisibleReducer,
  splashScreenComplete: splashScreenCompleteReducer,

  // Cart Reducers
  cartIsActive: cartIsActiveReducer,
  availabilityClicked: availabilityClickedReducer,
  selectedDay: selectedDayReducer,
  reformattedDay: reformattedDayReducer,
  reformattedDayClone: reformattedDayCloneReducer,
  dayOfTheWeek: dayOfTheWeekReducer,
  selectTimeActive: selectTimeActiveReducer,
  selectedTime: selectedTimeReducer,
  appointmentEndTime: appointmentEndTimeReducer,
  totalPrice: totalPriceReducer,
  totalDuration: totalDurationReducer,
  counterReducer: counterReducer,
  afternoonCollapse: afternoonCollapseReducer,
  lateAfternoonCollapse: lateAfternoonCollapseReducer,
  morningCollapse: morningCollapseReducer,
  eveningCollapse: eveningCollapseReducer,

  // Guest Checkout Form Reducers
  firstName: firstNameReducer,
  lastName: lastNameReducer,
  email: emailReducer,
  emailIsValid: emailValidReducer,
  emailIsInvalid: emailInvalidReducer,
  continueToCheckoutButton: continueToCheckoutButtonReducer,
  phoneNumber: phoneNumberReducer,
  phoneIsValid: phoneValidReducer,
  phoneIsInvalid: phoneInvalidReducer,
  appointmentNotes: appointmentNotesReducer,
  appointmentNotesValid: appointmentNotesValidationReducer,
  continueToBookingSummaryActive: continueToBookingSummaryReducer
});

export default RootReducer;
