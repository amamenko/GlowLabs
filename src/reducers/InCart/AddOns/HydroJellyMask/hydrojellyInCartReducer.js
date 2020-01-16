const HYDROJELLY_IN_CART = "HYDROJELLY_IN_CART";
const HYDROJELLY_NOT_IN_CART = "HYDROJELLY_NOT_IN_CART";

const hydrojellyInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case HYDROJELLY_IN_CART:
      return { ...state, in_cart: true };
    case HYDROJELLY_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default hydrojellyInCartReducer;
