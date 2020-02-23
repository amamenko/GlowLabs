const MICROCURRENT_IN_CART = "MICROCURRENT_IN_CART";

const ACTION_MICROCURRENT_IN_CART = () => {
  return {
    type: MICROCURRENT_IN_CART,
    payload: {
      name: "Microcurrent",
      price: 15,
      duration: 10
    }
  };
};

export default ACTION_MICROCURRENT_IN_CART;
