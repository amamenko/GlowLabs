const MICROCURRENT_NOT_IN_CART = "MICROCURRENT_NOT_IN_CART";

const ACTION_MICROCURRENT_NOT_IN_CART = () => {
  return {
    type: MICROCURRENT_NOT_IN_CART,
    payload: {
      name: "Microcurrent"
    }
  };
};

export default ACTION_MICROCURRENT_NOT_IN_CART;
