const DERMAROLLING_IN_CART = "DERMAROLLING_IN_CART";

const ACTION_DERMAROLLING_IN_CART = () => {
  return {
    type: DERMAROLLING_IN_CART,
    payload: {
      name: "Dermarolling",
      price: 15,
      duration: 10
    }
  };
};

export default ACTION_DERMAROLLING_IN_CART;
