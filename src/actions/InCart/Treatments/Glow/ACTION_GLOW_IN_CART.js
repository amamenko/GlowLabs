const GLOW_IN_CART = "GLOW_IN_CART";

const ACTION_GLOW_IN_CART = () => {
  return {
    type: GLOW_IN_CART,
    payload: {
      name: "Glow",
      price: 70
    }
  };
};

export default ACTION_GLOW_IN_CART;
