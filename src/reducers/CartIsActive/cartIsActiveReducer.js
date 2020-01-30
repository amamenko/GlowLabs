const CART_IS_ACTIVE = "CART_IS_ACTIVE";
const CART_IS_NOT_ACTIVE = "CART_IS_NOT_ACTIVE";

const cartIsActiveReducer = (state = { cartIsActive: false }, action) => {
  switch (action.type) {
    case CART_IS_ACTIVE:
      return { ...state, cartIsActive: true };
    case CART_IS_NOT_ACTIVE:
      return { ...state, cartIsActive: false };
    default:
      return { ...state };
  }
};

export default cartIsActiveReducer;
