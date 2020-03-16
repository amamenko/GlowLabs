const DERMAROLLING_IN_CART = "DERMAROLLING_IN_CART";
const DERMAROLLING_NOT_IN_CART = "DERMAROLLING_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const dermarollingInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case DERMAROLLING_IN_CART:
      return { ...state, in_cart: true };
    case ADD_ONS_CART_RESET:
    case DERMAROLLING_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default dermarollingInCartReducer;
