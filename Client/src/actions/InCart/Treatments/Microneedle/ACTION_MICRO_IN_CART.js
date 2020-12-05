const MICRO_IN_CART = "MICRO_IN_CART";

const ACTION_MICRO_IN_CART = () => {
  return {
    type: MICRO_IN_CART,
    payload: {
      name: "Microneedling",
      price: 200,
      duration: 50,
    },
  };
};

export default ACTION_MICRO_IN_CART;
