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
import anyAccutaneNoReducer from "./reducers/ConsentForm/AnyAccutane/No/anyAccutaneNoReducer";
import anyAccutaneYesReducer from "./reducers/ConsentForm/AnyAccutane/Yes/anyAccutaneYesReducer";
import anyAccutaneNotesReducer from "./reducers/ConsentForm/AnyAccutane/Yes/Notes/anyAccutaneNotesReducer";
import ingredientGlycolicAcidReducer from "./reducers/ConsentForm/AnyProductsWithIngredients/IngredientGlycolicAcid/ingredientGlycolicAcidReducer";
import ingredientLacticAcidReducer from "./reducers/ConsentForm/AnyProductsWithIngredients/IngredientLacticAcid/ingredientLacticAcidReducer";
import ingredientSalicyclicAcidReducer from "./reducers/ConsentForm/AnyProductsWithIngredients/IngredientSalicyclicAcid/ingredientSalicyclicAcidReducer";
import ingredientExfoliatingScrubsReducer from "./reducers/ConsentForm/AnyProductsWithIngredients/IngredientExfoliatingScrubs/ingredientExfoliatingScrubsReducer";
import ingredientVitaminAReducer from "./reducers/ConsentForm/AnyProductsWithIngredients/IngredientVitaminA/ingredientVitaminAReducer";
import anyFillersOrBotoxNoReducer from "./reducers/ConsentForm/AnyFillersOrBotox/No/anyFillersOrBotoxNoReducer";
import anyFillersOrBotoxYesReducer from "./reducers/ConsentForm/AnyFillersOrBotox/Yes/anyFillersOrBotoxYesReducer";
import anyFillersOrBotoxNotesReducer from "./reducers/ConsentForm/AnyFillersOrBotox/Yes/Notes/anyFillersOrBotoxNotesReducer";
import listKnownAllergiesNotesReducer from "./reducers/ConsentForm/ListKnownAllergies/listKnownAllergiesReducer";
import skinFlakyOrItchNoReducer from "./reducers/ConsentForm/SkinFlakyOrItch/No/skinFlakyOrItchNoReducer";
import skinFlakyOrItchYesReducer from "./reducers/ConsentForm/SkinFlakyOrItch/Yes/skinFlakyOrItchYesReducer";
import diagnosedWithRosaceaNoReducer from "./reducers/ConsentForm/DiagnosedWithRosacea/No/diagnosedWithRosaceaNoReducer";
import diagnosedWithRosaceaYesReducer from "./reducers/ConsentForm/DiagnosedWithRosacea/Yes/diagnosedWithRosaceaYesReducer";
import pregnantOrNursingNoReducer from "./reducers/ConsentForm/PregnantOrNursing/No/pregnantOrNursingNoReducer";
import pregnantOrNursingYesReducer from "./reducers/ConsentForm/PregnantOrNursing/Yes/pregnantOrNursingYesReducer";
import ultimateSkinCareGoalsNotesReducer from "./reducers/ConsentForm/UltimateSkinCareGoals/ultimateSkinCareGoalsReducer";
import anythingElseWeShouldKnowNotesReducer from "./reducers/ConsentForm/AnythingElseWeShouldKnow/anythingElseWeShouldKnowReducer";
import consentFormLastPageOpenedReducer from "./reducers/ConsentForm/LastPageOpened/consentFormLastPageOpenedReducer";
import consentFormDateReducer from "./reducers/ConsentForm/ConsentFormDate/consentFormDateReducer";
import consentFormLastUpdatedReducer from "./reducers/ConsentForm/LastUpdated/consentFormLastUpdatedReducer";
import consentFormAnythingChangedReducer from "./reducers/FinalBookButton/ConsentFormAnythingChanged/consentFormAnythingChangedReducer";
import logoutClickedReducer from "./reducers/LogOut/logoutClickedReducer";
import facebookCompleteRegistrationReducer from "./reducers/Login/FacebookCompleteRegistration/facebookCompleteRegistrationReducer";
import dummyTokenReducer from "./reducers/Login/DummyToken/dummyTokenReducer";
import consentFormPDFReducer from "./reducers/ConsentForm/ConsentFormPDF/consentFormPDFReducer";
import morningCleanserProductFrequencyReducer from "./reducers/MyRoutine/Morning/Cleanser/ProductFrequency/morningCleanserProductFrequencyReducer";
import morningCleanserProductLinkReducer from "./reducers/MyRoutine/Morning/Cleanser/ProductLink/morningCleanserProductLinkReducer";
import morningCleanserProductNameReducer from "./reducers/MyRoutine/Morning/Cleanser/ProductName/morningCleanserProductNameReducer";
import morningCleanserProductUseNotesReducer from "./reducers/MyRoutine/Morning/Cleanser/ProductUseNotes/morningCleanserProductUseNotesReducer";
import morningMoisturizerProductFrequencyReducer from "./reducers/MyRoutine/Morning/Moisturizer/ProductFrequency/morningMoisturizerProductFrequencyReducer";
import morningMoisturizerProductLinkReducer from "./reducers/MyRoutine/Morning/Moisturizer/ProductLink/morningMoisturizerProductLinkReducer";
import morningMoisturizerProductNameReducer from "./reducers/MyRoutine/Morning/Moisturizer/ProductName/morningMoisturizerProductNameReducer";
import morningMoisturizerProductUseNotesReducer from "./reducers/MyRoutine/Morning/Moisturizer/ProductUseNotes/morningMoisturizerProductUseNotesReducer";
import morningSerumProductFrequencyReducer from "./reducers/MyRoutine/Morning/Serum/ProductFrequency/morningSerumProductFrequencyReducer";
import morningSerumProductLinkReducer from "./reducers/MyRoutine/Morning/Serum/ProductLink/morningSerumProductLinkReducer";
import morningSerumProductNameReducer from "./reducers/MyRoutine/Morning/Serum/ProductName/morningSerumProductNameReducer";
import morningSerumProductUseNotesReducer from "./reducers/MyRoutine/Morning/Serum/ProductUseNotes/morningSerumProductUseNotesReducer";
import spfProductFrequencyReducer from "./reducers/MyRoutine/Morning/SPF/ProductFrequency/spfProductFrequencyReducer";
import spfProductLinkReducer from "./reducers/MyRoutine/Morning/SPF/ProductLink/spfProductLinkReducer";
import spfProductNameReducer from "./reducers/MyRoutine/Morning/SPF/ProductName/spfProductNameReducer";
import spfProductUseNotesReducer from "./reducers/MyRoutine/Morning/SPF/ProductUseNotes/spfProductUseNotesReducer";
import morningTonerProductFrequencyReducer from "./reducers/MyRoutine/Morning/Toner/ProductFrequency/morningTonerProductFrequencyReducer";
import morningTonerProductLinkReducer from "./reducers/MyRoutine/Morning/Toner/ProductLink/morningTonerProductLinkReducer";
import morningTonerProductNameReducer from "./reducers/MyRoutine/Morning/Toner/ProductName/morningTonerProductNameReducer";
import morningTonerProductUseNotesReducer from "./reducers/MyRoutine/Morning/Toner/ProductUseNotes/morningTonerProductUseNotesReducer";
import oilCleanserProductFrequencyReducer from "./reducers/MyRoutine/Evening/OilCleanser/ProductFrequency/oilCleanserProductFrequencyReducer";
import oilCleanserProductLinkReducer from "./reducers/MyRoutine/Evening/OilCleanser/ProductLink/oilCleanserProductLinkReducer";
import oilCleanserProductNameReducer from "./reducers/MyRoutine/Evening/OilCleanser/ProductName/oilCleanserProductNameReducer";
import oilCleanserProductUseNotesReducer from "./reducers/MyRoutine/Evening/OilCleanser/ProductUseNotes/oilCleanserProductUseNotesReducer";
import eveningCleanserProductFrequencyReducer from "./reducers/MyRoutine/Evening/Cleanser/ProductFrequency/eveningCleanserProductFrequencyReducer";
import eveningCleanserProductLinkReducer from "./reducers/MyRoutine/Evening/Cleanser/ProductLink/eveningCleanserProductLinkReducer";
import eveningCleanserProductNameReducer from "./reducers/MyRoutine/Evening/Cleanser/ProductName/eveningCleanserProductNameReducer";
import eveningCleanserProductUseNotesReducer from "./reducers/MyRoutine/Evening/Cleanser/ProductUseNotes/eveningCleanserProductUseNotesReducer";
import exfoliatorProductFrequencyReducer from "./reducers/MyRoutine/Evening/Exfoliator/ProductFrequency/exfoliatorProductFrequencyReducer";
import exfoliatorProductLinkReducer from "./reducers/MyRoutine/Evening/Exfoliator/ProductLink/exfoliatorProductLinkReducer";
import exfoliatorProductNameReducer from "./reducers/MyRoutine/Evening/Exfoliator/ProductName/exfoliatorProductNameReducer";
import exfoliatorProductUseNotesReducer from "./reducers/MyRoutine/Evening/Exfoliator/ProductUseNotes/exfoliatorProductUseNotesReducer";
import treatmentMaskProductFrequencyReducer from "./reducers/MyRoutine/Evening/TreatmentMask/ProductFrequency/treatmentMaskProductFrequencyReducer";
import treatmentMaskProductLinkReducer from "./reducers/MyRoutine/Evening/TreatmentMask/ProductLink/treatmentMaskProductLinkReducer";
import treatmentMaskProductNameReducer from "./reducers/MyRoutine/Evening/TreatmentMask/ProductName/treatmentMaskProductNameReducer";
import treatmentMaskProductUseNotesReducer from "./reducers/MyRoutine/Evening/TreatmentMask/ProductUseNotes/treatmentMaskProductUseNotesReducer";
import eveningTonerProductFrequencyReducer from "./reducers/MyRoutine/Evening/Toner/ProductFrequency/eveningTonerProductFrequencyReducer";
import eveningTonerProductLinkReducer from "./reducers/MyRoutine/Evening/Toner/ProductLink/eveningTonerProductLinkReducer";
import eveningTonerProductNameReducer from "./reducers/MyRoutine/Evening/Toner/ProductName/eveningTonerProductNameReducer";
import eveningTonerProductUseNotesReducer from "./reducers/MyRoutine/Evening/Toner/ProductUseNotes/eveningTonerProductUseNotesReducer";
import eveningSerumProductFrequencyReducer from "./reducers/MyRoutine/Evening/Serum/ProductFrequency/eveningSerumProductFrequencyReducer";
import eveningSerumProductLinkReducer from "./reducers/MyRoutine/Evening/Serum/ProductLink/eveningSerumProductLinkReducer";
import eveningSerumProductNameReducer from "./reducers/MyRoutine/Evening/Serum/ProductName/eveningSerumProductNameReducer";
import eveningSerumProductUseNotesReducer from "./reducers/MyRoutine/Evening/Serum/ProductUseNotes/eveningSerumProductUseNotesReducer";
import eveningMoisturizerProductFrequencyReducer from "./reducers/MyRoutine/Evening/Moisturizer/ProductFrequency/eveningMoisturizerProductFrequencyReducer";
import eveningMoisturizerProductLinkReducer from "./reducers/MyRoutine/Evening/Moisturizer/ProductLink/eveningMoisturizerProductLinkReducer";
import eveningMoisturizerProductNameReducer from "./reducers/MyRoutine/Evening/Moisturizer/ProductName/eveningMoisturizerProductNameReducer";
import eveningMoisturizerProductUseNotesReducer from "./reducers/MyRoutine/Evening/Moisturizer/ProductUseNotes/eveningMoisturizerProductUseNotesReducer";
import nightMaskProductFrequencyReducer from "./reducers/MyRoutine/Evening/NightMask/ProductFrequency/nightMaskProductFrequencyReducer";
import nightMaskProductLinkReducer from "./reducers/MyRoutine/Evening/NightMask/ProductLink/nightMaskProductLinkReducer";
import nightMaskProductNameReducer from "./reducers/MyRoutine/Evening/NightMask/ProductName/nightMaskProductNameReducer";
import nightMaskProductUseNotesReducer from "./reducers/MyRoutine/Evening/NightMask/ProductUseNotes/nightMaskProductUseNotesReducer";
import oilProductFrequencyReducer from "./reducers/MyRoutine/Evening/Oil/ProductFrequency/oilProductFrequencyReducer";
import oilProductLinkReducer from "./reducers/MyRoutine/Evening/Oil/ProductLink/oilProductLinkReducer";
import oilProductNameReducer from "./reducers/MyRoutine/Evening/Oil/ProductName/oilProductNameReducer";
import oilProductUseNotesReducer from "./reducers/MyRoutine/Evening/Oil/ProductUseNotes/oilProductUseNotesReducer";
import spotTreatmentProductFrequencyReducer from "./reducers/MyRoutine/Evening/SpotTreatment/ProductFrequency/spotTreatmentProductFrequencyReducer";
import spotTreatmentProductLinkReducer from "./reducers/MyRoutine/Evening/SpotTreatment/ProductLink/spotTreatmentProductLinkReducer";
import spotTreatmentProductNameReducer from "./reducers/MyRoutine/Evening/SpotTreatment/ProductName/spotTreatmentProductNameReducer";
import spotTreatmentProductUseNotesReducer from "./reducers/MyRoutine/Evening/SpotTreatment/ProductUseNotes/spotTreatmentProductUseNotesReducer";
import eveningRXProductFrequencyReducer from "./reducers/MyRoutine/Evening/RX/ProductFrequency/eveningRXProductFrequencyReducer";
import eveningRXProductLinkReducer from "./reducers/MyRoutine/Evening/RX/ProductLink/eveningRXProductLinkReducer";
import eveningRXProductNameReducer from "./reducers/MyRoutine/Evening/RX/ProductName/eveningRXProductNameReducer";
import eveningRXProductUseNotesReducer from "./reducers/MyRoutine/Evening/RX/ProductUseNotes/eveningRXProductUseNotesReducer";
import morningRXProductFrequencyReducer from "./reducers/MyRoutine/Morning/RX/ProductFrequency/morningRXProductFrequencyReducer";
import morningRXProductLinkReducer from "./reducers/MyRoutine/Morning/RX/ProductLink/morningRXProductLinkReducer";
import morningRXProductNameReducer from "./reducers/MyRoutine/Morning/RX/ProductName/morningRXProductNameReducer";
import morningRXProductUseNotesReducer from "./reducers/MyRoutine/Morning/RX/ProductUseNotes/morningRXProductUseNotesReducer";
import morningEyeCreamProductFrequencyReducer from "./reducers/MyRoutine/Morning/EyeCream/ProductFrequency/morningEyeCreamProductFrequencyReducer";
import morningEyeCreamProductLinkReducer from "./reducers/MyRoutine/Morning/EyeCream/ProductLink/morningEyeCreamProductLinkReducer";
import morningEyeCreamProductNameReducer from "./reducers/MyRoutine/Morning/EyeCream/ProductName/morningEyeCreamProductNameReducer";
import morningEyeCreamProductUseNotesReducer from "./reducers/MyRoutine/Morning/EyeCream/ProductUseNotes/morningEyeCreamProductUseNotesReducer";
import eveningEyeCreamProductFrequencyReducer from "./reducers/MyRoutine/Evening/EyeCream/ProductFrequency/eveningEyeCreamProductFrequencyReducer";
import eveningEyeCreamProductLinkReducer from "./reducers/MyRoutine/Evening/EyeCream/ProductLink/eveningEyeCreamProductLinkReducer";
import eveningEyeCreamProductUseNotesReducer from "./reducers/MyRoutine/Evening/EyeCream/ProductUseNotes/eveningEyeCreamProductUseNotesReducer";
import eveningEyeCreamProductNameReducer from "./reducers/MyRoutine/Evening/EyeCream/ProductName/eveningEyeCreamProductNameReducer";
import saveCardCheckedReducer from "./reducers/PaymentInfo/SaveCardChecked/saveCardCheckedReducer";
import squareCustomerIDReducer from "./reducers/PaymentInfo/SquareCustomerID/squareCustomerIDReducer";
import bookedWithCardIDReducer from "./reducers/PaymentInfo/BookedWithCardID/bookedWithCardIDReducer";

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
  logoutClicked: logoutClickedReducer,
  facebookCompleteRegistration: facebookCompleteRegistrationReducer,
  dummyToken: dummyTokenReducer,

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
  anyAccutaneNo: anyAccutaneNoReducer,
  anyAccutaneYes: anyAccutaneYesReducer,
  anyAccutaneNotes: anyAccutaneNotesReducer,
  ingredientGlycolicAcid: ingredientGlycolicAcidReducer,
  ingredientLacticAcid: ingredientLacticAcidReducer,
  ingredientSalicyclicAcid: ingredientSalicyclicAcidReducer,
  ingredientExfoliatingScrubs: ingredientExfoliatingScrubsReducer,
  ingredientVitaminA: ingredientVitaminAReducer,
  anyFillersOrBotoxNo: anyFillersOrBotoxNoReducer,
  anyFillersOrBotoxYes: anyFillersOrBotoxYesReducer,
  anyFillersOrBotoxNotes: anyFillersOrBotoxNotesReducer,
  listKnownAllergiesNotes: listKnownAllergiesNotesReducer,
  skinFlakyOrItchNo: skinFlakyOrItchNoReducer,
  skinFlakyOrItchYes: skinFlakyOrItchYesReducer,
  diagnosedWithRosaceaNo: diagnosedWithRosaceaNoReducer,
  diagnosedWithRosaceaYes: diagnosedWithRosaceaYesReducer,
  pregnantOrNursingNo: pregnantOrNursingNoReducer,
  pregnantOrNursingYes: pregnantOrNursingYesReducer,
  ultimateSkinCareGoals: ultimateSkinCareGoalsNotesReducer,
  anythingElseWeShouldKnow: anythingElseWeShouldKnowNotesReducer,
  consentFormLastPageOpened: consentFormLastPageOpenedReducer,
  consentFormDate: consentFormDateReducer,
  consentFormLastUpdated: consentFormLastUpdatedReducer,
  consentFormAnythingChanged: consentFormAnythingChangedReducer,
  consentFormPDF: consentFormPDFReducer,

  // My Routine Morning Section Products Reducers,
  morningCleanserProductFrequency: morningCleanserProductFrequencyReducer,
  morningCleanserProductLink: morningCleanserProductLinkReducer,
  morningCleanserProductName: morningCleanserProductNameReducer,
  morningCleanserProductUseNotes: morningCleanserProductUseNotesReducer,

  morningMoisturizerProductFrequency: morningMoisturizerProductFrequencyReducer,
  morningMoisturizerProductLink: morningMoisturizerProductLinkReducer,
  morningMoisturizerProductName: morningMoisturizerProductNameReducer,
  morningMoisturizerProductUseNotes: morningMoisturizerProductUseNotesReducer,

  morningSerumProductFrequency: morningSerumProductFrequencyReducer,
  morningSerumProductLink: morningSerumProductLinkReducer,
  morningSerumProductName: morningSerumProductNameReducer,
  morningSerumProductUseNotes: morningSerumProductUseNotesReducer,

  spfProductFrequency: spfProductFrequencyReducer,
  spfProductLink: spfProductLinkReducer,
  spfProductName: spfProductNameReducer,
  spfProductUseNotes: spfProductUseNotesReducer,

  morningTonerProductFrequency: morningTonerProductFrequencyReducer,
  morningTonerProductLink: morningTonerProductLinkReducer,
  morningTonerProductName: morningTonerProductNameReducer,
  morningTonerProductUseNotes: morningTonerProductUseNotesReducer,

  morningRXProductFrequency: morningRXProductFrequencyReducer,
  morningRXProductLink: morningRXProductLinkReducer,
  morningRXProductName: morningRXProductNameReducer,
  morningRXProductUseNotes: morningRXProductUseNotesReducer,

  morningEyeCreamProductFrequency: morningEyeCreamProductFrequencyReducer,
  morningEyeCreamProductLink: morningEyeCreamProductLinkReducer,
  morningEyeCreamProductName: morningEyeCreamProductNameReducer,
  morningEyeCreamProductUseNotes: morningEyeCreamProductUseNotesReducer,

  // My Routine Afternoon / Evening Section Products Reducers,
  oilCleanserProductFrequency: oilCleanserProductFrequencyReducer,
  oilCleanserProductLink: oilCleanserProductLinkReducer,
  oilCleanserProductName: oilCleanserProductNameReducer,
  oilCleanserProductUseNotes: oilCleanserProductUseNotesReducer,

  eveningCleanserProductFrequency: eveningCleanserProductFrequencyReducer,
  eveningCleanserProductLink: eveningCleanserProductLinkReducer,
  eveningCleanserProductName: eveningCleanserProductNameReducer,
  eveningCleanserProductUseNotes: eveningCleanserProductUseNotesReducer,

  exfoliatorProductFrequency: exfoliatorProductFrequencyReducer,
  exfoliatorProductLink: exfoliatorProductLinkReducer,
  exfoliatorProductName: exfoliatorProductNameReducer,
  exfoliatorProductUseNotes: exfoliatorProductUseNotesReducer,

  treatmentMaskProductFrequency: treatmentMaskProductFrequencyReducer,
  treatmentMaskProductLink: treatmentMaskProductLinkReducer,
  treatmentMaskProductName: treatmentMaskProductNameReducer,
  treatmentMaskProductUseNotes: treatmentMaskProductUseNotesReducer,

  eveningTonerProductFrequency: eveningTonerProductFrequencyReducer,
  eveningTonerProductLink: eveningTonerProductLinkReducer,
  eveningTonerProductName: eveningTonerProductNameReducer,
  eveningTonerProductUseNotes: eveningTonerProductUseNotesReducer,

  eveningSerumProductFrequency: eveningSerumProductFrequencyReducer,
  eveningSerumProductLink: eveningSerumProductLinkReducer,
  eveningSerumProductName: eveningSerumProductNameReducer,
  eveningSerumProductUseNotes: eveningSerumProductUseNotesReducer,

  eveningMoisturizerProductFrequency: eveningMoisturizerProductFrequencyReducer,
  eveningMoisturizerProductLink: eveningMoisturizerProductLinkReducer,
  eveningMoisturizerProductName: eveningMoisturizerProductNameReducer,
  eveningMoisturizerProductUseNotes: eveningMoisturizerProductUseNotesReducer,

  nightMaskProductFrequency: nightMaskProductFrequencyReducer,
  nightMaskProductLink: nightMaskProductLinkReducer,
  nightMaskProductName: nightMaskProductNameReducer,
  nightMaskProductUseNotes: nightMaskProductUseNotesReducer,

  oilProductFrequency: oilProductFrequencyReducer,
  oilProductLink: oilProductLinkReducer,
  oilProductName: oilProductNameReducer,
  oilProductUseNotes: oilProductUseNotesReducer,

  spotTreatmentProductFrequency: spotTreatmentProductFrequencyReducer,
  spotTreatmentProductLink: spotTreatmentProductLinkReducer,
  spotTreatmentProductName: spotTreatmentProductNameReducer,
  spotTreatmentProductUseNotes: spotTreatmentProductUseNotesReducer,

  eveningRXProductFrequency: eveningRXProductFrequencyReducer,
  eveningRXProductLink: eveningRXProductLinkReducer,
  eveningRXProductName: eveningRXProductNameReducer,
  eveningRXProductUseNotes: eveningRXProductUseNotesReducer,

  eveningEyeCreamProductFrequency: eveningEyeCreamProductFrequencyReducer,
  eveningEyeCreamProductLink: eveningEyeCreamProductLinkReducer,
  eveningEyeCreamProductName: eveningEyeCreamProductNameReducer,
  eveningEyeCreamProductUseNotes: eveningEyeCreamProductUseNotesReducer,

  // Payment Info Reducers
  saveCardChecked: saveCardCheckedReducer,
  squareCustomerID: squareCustomerIDReducer,
  bookedWithCardID: bookedWithCardIDReducer,

  // Guest Checkout Form Reducers
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
  continueToBookingSummaryActive: continueToBookingSummaryReducer,
});

export default RootReducer;
