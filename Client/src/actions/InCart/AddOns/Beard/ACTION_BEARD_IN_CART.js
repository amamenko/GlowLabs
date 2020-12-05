const BEARD_IN_CART = "BEARD_IN_CART";

const ACTION_BEARD_IN_CART = () => {
  return {
    type: BEARD_IN_CART,
    payload: {
      name: "Beard",
      price: 30,
      duration: 10
    }
  };
};

export default ACTION_BEARD_IN_CART;
