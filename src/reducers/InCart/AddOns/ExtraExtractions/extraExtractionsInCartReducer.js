const EXTRACTION_IN_CART = "EXTRACTION_IN_CART";
const EXTRACTION_NOT_IN_CART = "EXTRACTION_NOT_IN_CART";

const extraExtractionsInCartReducer = (state = { in_cart: false }, action) => {
  switch (action.type) {
    case EXTRACTION_IN_CART:
      return { ...state, in_cart: true };
    case EXTRACTION_NOT_IN_CART:
      return { ...state, in_cart: false };
    default:
      return { ...state };
  }
};

export default extraExtractionsInCartReducer;
