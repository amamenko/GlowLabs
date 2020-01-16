const BEARD_IN_CART = "BEARD_IN_CART";
const BEARD_NOT_IN_CART = "BEARD_NOT_IN_CART";

const beardInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case BEARD_IN_CART:
      return { ...state, in_cart: true };
    case BEARD_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default beardInCartReducer;
