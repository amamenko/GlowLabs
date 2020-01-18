const MICRO_IN_CART = "MICRO_IN_CART";
const MICRO_NOT_IN_CART = "MICRO_NOT_IN_CART";

const microneedleInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case MICRO_IN_CART:
      return { ...state, in_cart: true };
    case MICRO_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default microneedleInCartReducer;
