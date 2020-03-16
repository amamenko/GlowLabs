const BEARD_IN_CART = "BEARD_IN_CART";
const BEARD_NOT_IN_CART = "BEARD_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const beardInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case BEARD_IN_CART:
      return { ...state, in_cart: true };
    case ADD_ONS_CART_RESET:
    case BEARD_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default beardInCartReducer;
