const DERMAPLANE_NOT_IN_CART = "DERMAPLANE_NOT_IN_CART";

const ACTION_DERMAPLANE_NOT_IN_CART = () => {
  return {
    type: DERMAPLANE_NOT_IN_CART,
    payload: {
      name: "Dermaplaning"
    }
  };
};

export default ACTION_DERMAPLANE_NOT_IN_CART;
