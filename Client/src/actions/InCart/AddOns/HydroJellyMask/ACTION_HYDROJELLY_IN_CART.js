const HYDROJELLY_IN_CART = "HYDROJELLY_IN_CART";

const ACTION_HYDROJELLY_IN_CART = () => {
  return {
    type: HYDROJELLY_IN_CART,
    payload: {
      name: "HydroJelly",
      price: 15,
      duration: 10
    }
  };
};

export default ACTION_HYDROJELLY_IN_CART;
