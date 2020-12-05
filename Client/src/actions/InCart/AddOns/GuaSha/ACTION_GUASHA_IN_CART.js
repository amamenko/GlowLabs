const GUASHA_IN_CART = "GUASHA_IN_CART";

const ACTION_GUASHA_IN_CART = () => {
  return {
    type: GUASHA_IN_CART,
    payload: {
      name: "GuaSha",
      price: 30,
      duration: 10
    }
  };
};

export default ACTION_GUASHA_IN_CART;
