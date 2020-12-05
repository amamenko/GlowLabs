const CBD_IN_CART = "CBD_IN_CART";

const ACTION_CBD_IN_CART = () => {
  return {
    type: CBD_IN_CART,
    payload: {
      name: "CBD",
      price: 150,
      duration: 60,
    },
  };
};

export default ACTION_CBD_IN_CART;
