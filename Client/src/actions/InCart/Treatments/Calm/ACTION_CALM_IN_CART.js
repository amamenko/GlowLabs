const CALM_IN_CART = "CALM_IN_CART";

const ACTION_CALM_IN_CART = () => {
  return {
    type: CALM_IN_CART,
    payload: {
      name: "Calm",
      price: 105,
      duration: 50,
    },
  };
};

export default ACTION_CALM_IN_CART;
