const DERMAPLANE_IN_CART = "DERMAPLANE_IN_CART";
const DERMAPLANE_NOT_IN_CART = "DERMAPLANE_NOT_IN_CART";
const TREATMENTS_CART_RESET = "TREATMENTS_CART_RESET";

const dermaplaningInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case DERMAPLANE_IN_CART:
      return { ...state, in_cart: true };
    case TREATMENTS_CART_RESET:
    case DERMAPLANE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default dermaplaningInCartReducer;
