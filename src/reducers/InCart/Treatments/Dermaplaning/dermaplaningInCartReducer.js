const DERMAPLANE_IN_CART = "DERMAPLANE_IN_CART";
const DERMAPLANE_NOT_IN_CART = "DERMAPLANE_NOT_IN_CART";

const dermaplaningInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case DERMAPLANE_IN_CART:
      return { ...state, in_cart: true };
    case DERMAPLANE_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default dermaplaningInCartReducer;
