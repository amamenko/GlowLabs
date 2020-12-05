const SALT_CAVE_IN_CART = "SALT_CAVE_IN_CART";

const ACTION_SALT_CAVE_IN_CART = (selectedDuration) => {
  return {
    type: SALT_CAVE_IN_CART,
    payload: {
      name: "Salt Cave",
      price: selectedDuration,
      duration: selectedDuration,
    },
  };
};

export default ACTION_SALT_CAVE_IN_CART;
