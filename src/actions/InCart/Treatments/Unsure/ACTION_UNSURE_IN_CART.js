const UNSURE_IN_CART = "UNSURE_IN_CART";

const ACTION_UNSURE_IN_CART = () => {
  return {
    type: UNSURE_IN_CART,
    payload: {
      name: "Unsure",
      price: 70,
      duration: 50,
    },
  };
};

export default ACTION_UNSURE_IN_CART;
