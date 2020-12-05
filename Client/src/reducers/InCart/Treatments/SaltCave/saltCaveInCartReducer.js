const SALT_CAVE_IN_CART = "SALT_CAVE_IN_CART";
const SALT_CAVE_NOT_IN_CART = "SALT_CAVE_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const saltCaveInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case SALT_CAVE_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case SALT_CAVE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default saltCaveInCartReducer;
