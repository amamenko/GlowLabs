const QUENCH_IN_CART = "QUENCH_IN_CART";
const QUENCH_NOT_IN_CART = "QUENCH_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const quenchInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case QUENCH_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case QUENCH_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default quenchInCartReducer;
