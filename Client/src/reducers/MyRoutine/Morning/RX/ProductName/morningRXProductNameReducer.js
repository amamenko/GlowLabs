const MORNING_RX_PRODUCT_NAME = "MORNING_RX_PRODUCT_NAME";
const RESET_ALL_MORNING_RX_FIELDS = "RESET_ALL_MORNING_RX_FIELDS";

const morningRXProductNameReducer = (
  state = { morning_rx_product_name: "" },
  action
) => {
  switch (action.type) {
    case MORNING_RX_PRODUCT_NAME:
      return {
        ...state,
        morning_rx_product_name: action.morning_rx_product_name,
      };
    case RESET_ALL_MORNING_RX_FIELDS:
      return { ...state, morning_rx_product_name: "" };
    default:
      return { ...state };
  }
};

export default morningRXProductNameReducer;
