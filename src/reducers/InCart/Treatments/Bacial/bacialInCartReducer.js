const BACIAL_IN_CART = "BACIAL_IN_CART";
const BACIAL_NOT_IN_CART = "BACIAL_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const bacialInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case BACIAL_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case BACIAL_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default bacialInCartReducer;
