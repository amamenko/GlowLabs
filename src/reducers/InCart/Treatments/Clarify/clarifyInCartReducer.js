const CLARIFY_IN_CART = "CLARIFY_IN_CART";
const CLARIFY_NOT_IN_CART = "CLARIFY_NOT_IN_CART";

const clarifyInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case CLARIFY_IN_CART:
      return { ...state, in_cart: true };
    case CLARIFY_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default clarifyInCartReducer;
