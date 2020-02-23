const EXTRACTION_IN_CART = "EXTRACTION_IN_CART";

const ACTION_EXTRACTION_IN_CART = () => {
  return {
    type: EXTRACTION_IN_CART,
    payload: {
      name: "ExtraExtractions",
      price: 10,
      duration: 10
    }
  };
};

export default ACTION_EXTRACTION_IN_CART;
