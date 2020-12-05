const QUICKIE_IN_CART = "QUICKIE_IN_CART";
const QUICKIE_NOT_IN_CART = "QUICKIE_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const quickieInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case QUICKIE_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case QUICKIE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default quickieInCartReducer;
