const REJUVENATE_IN_CART = "REJUVENATE_IN_CART";
const REJUVENATE_NOT_IN_CART = "REJUVENATE_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const rejuvenateInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case REJUVENATE_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case REJUVENATE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default rejuvenateInCartReducer;
