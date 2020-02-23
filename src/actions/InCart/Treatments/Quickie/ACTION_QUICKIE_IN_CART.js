const QUICKIE_IN_CART = "QUICKIE_IN_CART";

const ACTION_QUICKIE_IN_CART = () => {
  return {
    type: QUICKIE_IN_CART,
    payload: {
      name: "Quickie",
      price: 50,
      duration: 30
    }
  };
};

export default ACTION_QUICKIE_IN_CART;
