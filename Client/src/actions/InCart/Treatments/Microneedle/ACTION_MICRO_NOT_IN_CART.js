const MICRO_NOT_IN_CART = "MICRO_NOT_IN_CART";

const ACTION_MICRO_NOT_IN_CART = () => {
  return {
    type: MICRO_NOT_IN_CART,
    payload: {
      name: "Microneedling"
    }
  };
};

export default ACTION_MICRO_NOT_IN_CART;
