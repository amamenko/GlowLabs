const GLOW_NOT_IN_CART = "GLOW_NOT_IN_CART";

const ACTION_GLOW_NOT_IN_CART = () => {
  return {
    type: GLOW_NOT_IN_CART,
    payload: {
      name: "Glow"
    }
  };
};

export default ACTION_GLOW_NOT_IN_CART;
