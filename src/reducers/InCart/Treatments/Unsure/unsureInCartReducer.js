const UNSURE_IN_CART = "UNSURE_IN_CART";
const UNSURE_NOT_IN_CART = "UNSURE_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const unsureInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case UNSURE_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case UNSURE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default unsureInCartReducer;
