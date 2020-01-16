const LED_IN_CART = "LED_IN_CART";
const LED_NOT_IN_CART = "LED_NOT_IN_CART";

const hydrojellyInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case LED_IN_CART:
      return { ...state, in_cart: true };
    case LED_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default hydrojellyInCartReducer;
