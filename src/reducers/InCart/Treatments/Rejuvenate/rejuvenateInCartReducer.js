const REJUVENATE_IN_CART = "REJUVENATE_IN_CART";
const REJUVENATE_NOT_IN_CART = "REJUVENATE_NOT_IN_CART";

const rejuvenateInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case REJUVENATE_IN_CART:
      return { ...state, in_cart: true };
    case REJUVENATE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default rejuvenateInCartReducer;
