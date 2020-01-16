const GUASHA_IN_CART = "GUASHA_IN_CART";
const GUASHA_NOT_IN_CART = "GUASHA_NOT_IN_CART";

const guashaInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case GUASHA_IN_CART:
      return { ...state, in_cart: true };
    case GUASHA_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default guashaInCartReducer;
