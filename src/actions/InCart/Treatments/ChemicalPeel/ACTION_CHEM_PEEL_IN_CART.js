const CHEM_PEEL_IN_CART = "CHEM_PEEL_IN_CART";

const ACTION_CHEM_PEEL_IN_CART = () => {
  return {
    type: CHEM_PEEL_IN_CART,
    payload: {
      name: "ChemicalPeel",
      price: 100
    }
  };
};

export default ACTION_CHEM_PEEL_IN_CART;
