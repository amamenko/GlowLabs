const GLOW_IN_CART = "GLOW_IN_CART";
const GLOW_NOT_IN_CART = "GLOW_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const glowInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case GLOW_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case GLOW_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default glowInCartReducer;
