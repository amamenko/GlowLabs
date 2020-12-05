const MICRODERMABRASION_NOT_IN_CART = "MICRODERMABRASION_NOT_IN_CART";

const ACTION_MICRODERMABRASION_NOT_IN_CART = () => {
  return {
    type: MICRODERMABRASION_NOT_IN_CART,
    payload: {
      name: "Microdermabrasion"
    }
  };
};

export default ACTION_MICRODERMABRASION_NOT_IN_CART;
