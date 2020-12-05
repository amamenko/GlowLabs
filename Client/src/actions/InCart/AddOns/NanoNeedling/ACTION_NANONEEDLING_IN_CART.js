const NANONEEDLING_IN_CART = "NANONEEDLING_IN_CART";

const ACTION_NANONEEDLING_IN_CART = () => {
  return {
    type: NANONEEDLING_IN_CART,
    payload: {
      name: "NanoNeedling",
      price: 20,
      duration: 10
    }
  };
};

export default ACTION_NANONEEDLING_IN_CART;
