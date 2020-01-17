const CHEM_PEEL_IN_CART = "CHEM_PEEL_IN_CART";
const CHEM_PEEL_NOT_IN_CART = "CHEM_PEEL_NOT_IN_CART";

const chemicalPeelInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case CHEM_PEEL_IN_CART:
      return { ...state, in_cart: true };
    case CHEM_PEEL_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default chemicalPeelInCartReducer;
