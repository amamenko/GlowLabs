const CHEM_PEEL_NOT_IN_CART = "CHEM_PEEL_NOT_IN_CART";

const ACTION_CHEM_PEEL_NOT_IN_CART = () => {
  return {
    type: CHEM_PEEL_NOT_IN_CART,
    payload: {
      name: "ChemicalPeel"
    }
  };
};

export default ACTION_CHEM_PEEL_NOT_IN_CART;
