const LED_IN_CART = "LED_IN_CART";
const LED_NOT_IN_CART = "LED_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const hydrojellyInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case LED_IN_CART:
      return { ...state, in_cart: true };
    case ADD_ONS_CART_RESET:
    case LED_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default hydrojellyInCartReducer;
