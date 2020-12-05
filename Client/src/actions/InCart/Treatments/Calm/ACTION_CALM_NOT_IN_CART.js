const CALM_NOT_IN_CART = "CALM_NOT_IN_CART";

const ACTION_CALM_NOT_IN_CART = () => {
  return {
    type: CALM_NOT_IN_CART,
    payload: {
      name: "Calm"
    }
  };
};

export default ACTION_CALM_NOT_IN_CART;
