const NANONEEDLING_IN_CART = "NANONEEDLING_IN_CART";
const NANONEEDLING_NOT_IN_CART = "NANONEEDLING_NOT_IN_CART";

const nanoneedlingInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case NANONEEDLING_IN_CART:
      return { ...state, in_cart: true };
    case NANONEEDLING_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default nanoneedlingInCartReducer;
