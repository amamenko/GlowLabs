const NANONEEDLING_NOT_IN_CART = "NANONEEDLING_NOT_IN_CART";

const ACTION_NANONEEDLING_NOT_IN_CART = () => {
  return {
    type: NANONEEDLING_NOT_IN_CART,
    payload: {
      name: "NanoNeedling"
    }
  };
};

export default ACTION_NANONEEDLING_NOT_IN_CART;
