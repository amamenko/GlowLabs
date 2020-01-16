const MICRODERMABRASION_IN_CART = "MICRODERMABRASION_IN_CART";
const MICRODERMABRASION_NOT_IN_CART = "MICRODERMABRASION_NOT_IN_CART";

const microdermabrasionInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case MICRODERMABRASION_IN_CART:
      return { ...state, in_cart: true };
    case MICRODERMABRASION_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default microdermabrasionInCartReducer;
