const QUENCH_IN_CART = "QUENCH_IN_CART";

const ACTION_QUENCH_IN_CART = () => {
  return {
    type: QUENCH_IN_CART,
    payload: {
      name: "Quench",
      price: 70
    }
  };
};

export default ACTION_QUENCH_IN_CART;
