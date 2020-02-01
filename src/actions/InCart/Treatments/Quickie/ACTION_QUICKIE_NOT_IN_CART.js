const QUICKIE_NOT_IN_CART = "QUICKIE_NOT_IN_CART";

const ACTION_QUICKIE_NOT_IN_CART = () => {
  return {
    type: QUICKIE_NOT_IN_CART,
    payload: {
      name: "Quickie"
    }
  };
};

export default ACTION_QUICKIE_NOT_IN_CART;
