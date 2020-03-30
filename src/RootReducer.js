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
import splashScreenHalfwayReducer from "./reducers/SplashScreenHalfway/splashScreenHalfwayReducer";
import fingerTouchScalingReducer from "./reducers/FingerTouchScaling/fingerTouchScalingReducer";
import loadingSpinnerReducer from "./reducers/LoadingSpinner/loadingSpinnerReducer";
import finalBookButtonReducer from "./reducers/FinalBookButton/finalBookButtonReducer";
import loginIsActiveReducer from "./reducers/Login/loginIsActiveReducer";
import createAccountEmailReducer from "./reducers/CreateAccount/CreateAccountEmail/createAccountEmailReducer";
import createAccountPhoneNumberReducer from "./reducers/CreateAccount/CreateAccountPhoneNumber/createAccountPhoneNumberReducer";
import createAccountFirstNameReducer from "./reducers/CreateAccount/CreateAccountFirstName/createAccountFirstNameReducer";
import createAccountLastNameReducer from "./reducers/CreateAccount/CreateAccountLastName/createAccountLastNameReducer";
import createAccountPasswordReducer from "./reducers/CreateAccount/CreateAccountPassword/createAccountPasswordReducer";
import createAccountConfirmPasswordReducer from "./reducers/CreateAccount/CreateAccountConfirmPassword/createAccountConfirmPasswordReducer";
import createAccountEmailValidReducer from "./reducers/CreateAccount/CreateAccountEmail/Validation/Valid/createAccountEmailValidReducer";
import createAccountEmailInvalidReducer from "./reducers/CreateAccount/CreateAccountEmail/Validation/Invalid/createAccountEmailInvalidReducer";
import createAccountPhoneNumberValidReducer from "./reducers/CreateAccount/CreateAccountPhoneNumber/Validation/Valid/createAccountPhoneNumberValid";
import createAccountPhoneNumberInvalidReducer from "./reducers/CreateAccount/CreateAccountPhoneNumber/Validation/Invalid/createAccountPhoneNumberInvalid";
import createAccountPasswordValidReducer from "./reducers/CreateAccount/CreateAccountPassword/Validation/Valid/createAccountPasswordValidReducer";
import createAccountPasswordInvalidReducer from "./reducers/CreateAccount/CreateAccountPassword/Validation/Invalid/createAccountPasswordInvalidReducer";
import createAccountConfirmPasswordValidReducer from "./reducers/CreateAccount/CreateAccountConfirmPassword/Validation/Valid/createAccountConfirmPasswordValidReducer";
import createAccountConfirmPasswordInvalidReducer from "./reducers/CreateAccount/CreateAccountConfirmPassword/Validation/Invalid/createAccountConfirmPasswordInvalidReducer";
import loginEmailReducer from "./reducers/Login/LoginEmail/loginEmailReducer";
import loginPasswordReducer from "./reducers/Login/LoginPassword/loginPasswordReducer";
import loginEmailInvalidReducer from "./reducers/Login/LoginEmail/Invalid/loginEmailInvalidReducer";
import loginPasswordInvalidReducer from "./reducers/Login/LoginPassword/Invalid/loginPasswordInvalidReducer";
import registeredClientFoundReducer from "./reducers/Login/RegisteredClientFound/registeredClientFoundReducer";
import userAuthenticatedReducer from "./reducers/Authenticated/userAuthenticatedReducer";
import surgeryLast3MonthsNoReducer from "./reducers/ConsentForm/SurgeryLast3Months/No/surgeryLast3MonthsNoReducer";
import surgeryLast3MonthsYesReducer from "./reducers/ConsentForm/SurgeryLast3Months/Yes/surgeryLast3MonthsYesReducer";
import surgeryLast3MonthsNotesReducer from "./reducers/ConsentForm/SurgeryLast3Months/Yes/Notes/surgeryLast3MonthsNotesReducer";
import anyHealthProblemsNoReducer from "./reducers/ConsentForm/AnyHealthProblems/No/anyHealthProblemsNoReducer";
import anyHealthProblemsYesReducer from "./reducers/ConsentForm/AnyHealthProblems/Yes/anyHealthProblemsYesReducer";
import anyHealthProblemsNotesReducer from "./reducers/ConsentForm/AnyHealthProblems/Yes/Notes/anyHealthProblemsNotesReducer";
import anyChemPeelsLastMonthNoReducer from "./reducers/ConsentForm/AnyChemPeelsLastMonth/No/anyChemPeelsLastMonthNoReducer";
import anyChemPeelsLastMonthYesReducer from "./reducers/ConsentForm/AnyChemPeelsLastMonth/Yes/anyChemPeelsLastMonthYesReducer";
import anyWaxingLast5DaysNoReducer from "./reducers/ConsentForm/AnyWaxingLast5Days/No/anyWaxingLast5DaysNoReducer";
import anyWaxingLast5DaysYesReducer from "./reducers/ConsentForm/AnyWaxingLast5Days/Yes/anyWaxingLast5DaysYesReducer";
import listAnyMedicationsNotesReducer from "./reducers/ConsentForm/ListAnyMedicationsNotes/listAnyMedicationsNotesReducer";

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
  splashScreenHalfway: splashScreenHalfwayReducer,
  splashScreenComplete: splashScreenCompleteReducer,
  fingerTouchScaling: fingerTouchScalingReducer,
  loadingSpinnerActive: loadingSpinnerReducer,

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
  finalBookButton: finalBookButtonReducer,

  // Create Account Reducers
  createAccountEmail: createAccountEmailReducer,
  createAccountEmailValid: createAccountEmailValidReducer,
  createAccountEmailInvalid: createAccountEmailInvalidReducer,
  createAccountPhoneNumber: createAccountPhoneNumberReducer,
  createAccountPhoneNumberValid: createAccountPhoneNumberValidReducer,
  createAccountPhoneNumberInvalid: createAccountPhoneNumberInvalidReducer,
  createAccountFirstName: createAccountFirstNameReducer,
  createAccountLastName: createAccountLastNameReducer,
  createAccountPassword: createAccountPasswordReducer,
  createAccountPasswordValid: createAccountPasswordValidReducer,
  createAccountPasswordInvalid: createAccountPasswordInvalidReducer,
  createAccountConfirmPassword: createAccountConfirmPasswordReducer,
  createAccountConfirmPasswordValid: createAccountConfirmPasswordValidReducer,
  createAccountConfirmPasswordInvalid: createAccountConfirmPasswordInvalidReducer,

  // Login Form Reducers,
  loginEmail: loginEmailReducer,
  loginEmailInvalid: loginEmailInvalidReducer,
  loginPassword: loginPasswordReducer,
  loginPasswordInvalid: loginPasswordInvalidReducer,
  registeredClientFound: registeredClientFoundReducer,
  userAuthenticated: userAuthenticatedReducer,

  // Consent Form Reducers,
  surgeryLast3MonthsNo: surgeryLast3MonthsNoReducer,
  surgeryLast3MonthsYes: surgeryLast3MonthsYesReducer,
  surgeryLast3MonthsNotes: surgeryLast3MonthsNotesReducer,
  anyHealthProblemsNo: anyHealthProblemsNoReducer,
  anyHealthProblemsYes: anyHealthProblemsYesReducer,
  anyHealthProblemsNotes: anyHealthProblemsNotesReducer,
  listAnyMedicationsNotes: listAnyMedicationsNotesReducer,
  anyChemPeelsLastMonthNo: anyChemPeelsLastMonthNoReducer,
  anyChemPeelsLastMonthYes: anyChemPeelsLastMonthYesReducer,
  anyWaxingLast5DaysNo: anyWaxingLast5DaysNoReducer,
  anyWaxingLast5DaysYes: anyWaxingLast5DaysYesReducer,

  // Guest Checout Form Reducers
  loginIsActive: loginIsActiveReducer,
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
