const HYDROJELLY_IN_CART = "HYDROJELLY_IN_CART";
const HYDROJELLY_NOT_IN_CART = "HYDROJELLY_NOT_IN_CART";
const ADD_ONS_CART_RESET = "ADD_ONS_CART_RESET";

const hydrojellyInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case HYDROJELLY_IN_CART:
      return { ...state, in_cart: true };
    case ADD_ONS_CART_RESET:
    case HYDROJELLY_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default hydrojellyInCartReducer;
