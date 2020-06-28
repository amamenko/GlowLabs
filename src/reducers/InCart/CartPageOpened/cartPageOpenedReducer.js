const CART_PAGE_OPENED = "CART_PAGE_OPENED";
const AVAILABILITY_PAGE_OPENED = "AVAILABILITY_PAGE_OPENED";
const GUEST_CHECKOUT_FORM_PAGE_OPENED = "GUEST_CHECKOUT_FORM_PAGE_OPENED";
const PAYMENT_INFO_PAGE_OPENED = "PAYMENT_INFO_PAGE_OPENED";
const TIME_PREFERENCE_PAGE_OPENED = "TIME_PREFERENCE_PAGE_OPENED";
const CONFIRMATION_PAGE_OPENED = "CONFIRMATION_PAGE_OPENED";
const CART_PAGE_RESET = "CART_PAGE_RESET";

const cartPageOpenedReducer = (state = { cart_page_opened: "" }, action) => {
  switch (action.type) {
    case CART_PAGE_RESET:
      return { ...state, cart_page_opened: "" };
    case CART_PAGE_OPENED:
      return { ...state, cart_page_opened: "Cart" };
    case AVAILABILITY_PAGE_OPENED:
      return { ...state, cart_page_opened: "Availability" };
    case GUEST_CHECKOUT_FORM_PAGE_OPENED:
      return { ...state, cart_page_opened: "GuestCheckout" };
    case PAYMENT_INFO_PAGE_OPENED:
      return { ...state, cart_page_opened: "PaymentInfo" };
    case TIME_PREFERENCE_PAGE_OPENED:
      return { ...state, cart_page_opened: "TimePreference" };
    case CONFIRMATION_PAGE_OPENED:
      return { ...state, cart_page_opened: "ConfirmationPage" };
    default:
      return { ...state };
  }
};

export default cartPageOpenedReducer;
