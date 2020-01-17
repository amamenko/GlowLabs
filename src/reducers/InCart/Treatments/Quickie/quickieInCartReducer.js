const QUICKIE_IN_CART = "QUICKIE_IN_CART";
const QUICKIE_NOT_IN_CART = "QUICKIE_NOT_IN_CART";

const quickieInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case QUICKIE_IN_CART:
      return { ...state, in_cart: true };
    case QUICKIE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default quickieInCartReducer;
