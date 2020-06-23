const BACIAL_IN_CART = "BACIAL_IN_CART";

const ACTION_BACIAL_IN_CART = () => {
  return {
    type: BACIAL_IN_CART,
    payload: {
      name: "Bacial",
      price: 120,
      duration: 50,
    },
  };
};

export default ACTION_BACIAL_IN_CART;
