const MICROCURRENT_IN_CART = "MICROCURRENT_IN_CART";
const MICROCURRENT_NOT_IN_CART = "MICROCURRENT_NOT_IN_CART";

const microcurrentInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case MICROCURRENT_IN_CART:
      return { ...state, in_cart: true };
    case MICROCURRENT_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default microcurrentInCartReducer;
