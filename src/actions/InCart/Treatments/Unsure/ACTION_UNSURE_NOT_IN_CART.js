const UNSURE_NOT_IN_CART = "UNSURE_NOT_IN_CART";

const ACTION_UNSURE_NOT_IN_CART = () => {
  return {
    type: UNSURE_NOT_IN_CART,
    payload: {
      name: "Not Sure",
    },
  };
};

export default ACTION_UNSURE_NOT_IN_CART;
