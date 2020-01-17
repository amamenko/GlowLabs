const QUENCH_IN_CART = "QUENCH_IN_CART";
const QUENCH_NOT_IN_CART = "QUENCH_NOT_IN_CART";

const quenchInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case QUENCH_IN_CART:
      return { ...state, in_cart: true };
    case QUENCH_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default quenchInCartReducer;
