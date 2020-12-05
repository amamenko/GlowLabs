const BEARD_NOT_IN_CART = "BEARD_NOT_IN_CART";

const ACTION_BEARD_NOT_IN_CART = () => {
  return {
    type: BEARD_NOT_IN_CART,
    payload: {
      name: "Beard"
    }
  };
};

export default ACTION_BEARD_NOT_IN_CART;
