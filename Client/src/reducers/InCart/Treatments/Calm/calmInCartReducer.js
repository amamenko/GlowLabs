const CALM_IN_CART = "CALM_IN_CART";
const CALM_NOT_IN_CART = "CALM_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const calmInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case CALM_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case CALM_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default calmInCartReducer;
