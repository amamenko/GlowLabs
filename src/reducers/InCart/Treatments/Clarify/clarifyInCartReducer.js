const CLARIFY_IN_CART = "CLARIFY_IN_CART";
const CLARIFY_NOT_IN_CART = "CLARIFY_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const clarifyInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case CLARIFY_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case CLARIFY_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default clarifyInCartReducer;
