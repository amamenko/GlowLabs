const MICRONEEDLE_IN_CART = "MICRONEEDLE_IN_CART";
const MICRONEEDLE_NOT_IN_CART = "MICRONEEDLE_NOT_IN_CART";

const microneedleInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case MICRONEEDLE_IN_CART:
      return { ...state, in_cart: true };
    case MICRONEEDLE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default microneedleInCartReducer;
