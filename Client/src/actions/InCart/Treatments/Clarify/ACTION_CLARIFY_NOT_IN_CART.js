const CLARIFY_NOT_IN_CART = "CLARIFY_NOT_IN_CART";

const ACTION_CLARIFY_NOT_IN_CART = () => {
  return {
    type: CLARIFY_NOT_IN_CART,
    payload: {
      name: "Clarify"
    }
  };
};

export default ACTION_CLARIFY_NOT_IN_CART;
