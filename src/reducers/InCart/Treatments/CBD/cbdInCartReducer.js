const CBD_IN_CART = "CBD_IN_CART";
const CBD_NOT_IN_CART = "CBD_NOT_IN_CART";

const cbdInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case CBD_IN_CART:
      return { ...state, in_cart: true };
    case CBD_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default cbdInCartReducer;
