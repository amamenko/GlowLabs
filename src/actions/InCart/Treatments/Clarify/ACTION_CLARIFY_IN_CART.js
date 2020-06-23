const CLARIFY_IN_CART = "CLARIFY_IN_CART";

const ACTION_CLARIFY_IN_CART = () => {
  return {
    type: CLARIFY_IN_CART,
    payload: {
      name: "Clarify",
      price: 105,
      duration: 50,
    },
  };
};

export default ACTION_CLARIFY_IN_CART;
