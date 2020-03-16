const NANONEEDLING_IN_CART = "NANONEEDLING_IN_CART";
const NANONEEDLING_NOT_IN_CART = "NANONEEDLING_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const nanoneedlingInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case NANONEEDLING_IN_CART:
      return { ...state, in_cart: true };
    case ADD_ONS_CART_RESET:
    case NANONEEDLING_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default nanoneedlingInCartReducer;
