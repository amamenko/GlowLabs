const GUASHA_IN_CART = "GUASHA_IN_CART";
const GUASHA_NOT_IN_CART = "GUASHA_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const guashaInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case GUASHA_IN_CART:
      return { ...state, in_cart: true };
    case ADD_ONS_CART_RESET:
    case GUASHA_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default guashaInCartReducer;
