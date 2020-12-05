const SALT_CAVE_NOT_IN_CART = "SALT_CAVE_NOT_IN_CART";

const ACTION_SALT_CAVE_NOT_IN_CART = () => {
  return {
    type: SALT_CAVE_NOT_IN_CART,
    payload: {
      name: "Salt Cave",
    },
  };
};

export default ACTION_SALT_CAVE_NOT_IN_CART;
