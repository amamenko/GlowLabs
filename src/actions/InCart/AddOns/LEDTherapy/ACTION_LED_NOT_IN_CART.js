const LED_NOT_IN_CART = "LED_NOT_IN_CART";

const ACTION_LED_NOT_IN_CART = () => {
  return {
    type: LED_NOT_IN_CART,
    payload: {
      name: "LED"
    }
  };
};

export default ACTION_LED_NOT_IN_CART;
