const LED_IN_CART = "LED_IN_CART";

const ACTION_LED_IN_CART = () => {
  return {
    type: LED_IN_CART,
    payload: {
      name: "LED",
      price: 15,
      duration: 10
    }
  };
};

export default ACTION_LED_IN_CART;
