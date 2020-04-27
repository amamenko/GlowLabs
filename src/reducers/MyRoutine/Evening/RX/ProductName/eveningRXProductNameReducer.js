const EVENING_RX_PRODUCT_NAME = "EVENING_RX_PRODUCT_NAME";
const RESET_ALL_EVENING_RX_FIELDS = "RESET_ALL_EVENING_RX_FIELDS";

const eveningRXProductNameReducer = (
  state = { evening_rx_product_name: "" },
  action
) => {
  switch (action.type) {
    case EVENING_RX_PRODUCT_NAME:
      return {
        ...state,
        evening_rx_product_name: action.evening_rx_product_name,
      };
    case RESET_ALL_EVENING_RX_FIELDS:
      return { ...state, evening_rx_product_name: "" };
    default:
      return { ...state };
  }
};

export default eveningRXProductNameReducer;
