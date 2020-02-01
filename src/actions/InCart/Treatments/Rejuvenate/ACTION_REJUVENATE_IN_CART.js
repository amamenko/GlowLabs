const REJUVENATE_IN_CART = "REJUVENATE_IN_CART";

const ACTION_REJUVENATE_IN_CART = () => {
  return {
    type: REJUVENATE_IN_CART,
    payload: {
      name: "Rejuvenate",
      price: 80
    }
  };
};

export default ACTION_REJUVENATE_IN_CART;
