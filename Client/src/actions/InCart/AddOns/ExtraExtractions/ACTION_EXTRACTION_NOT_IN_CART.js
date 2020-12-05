const EXTRACTION_NOT_IN_CART = "EXTRACTION_NOT_IN_CART";

const ACTION_EXTRACTION_NOT_IN_CART = () => {
  return {
    type: EXTRACTION_NOT_IN_CART,
    payload: {
      name: "ExtraExtractions"
    }
  };
};

export default ACTION_EXTRACTION_NOT_IN_CART;
