const MORNING_RX_PRODUCT_FREQUENCY = "MORNING_RX_PRODUCT_FREQUENCY";
const RESET_ALL_MORNING_RX_FIELDS = "RESET_ALL_MORNING_RX_FIELDS";

const morningRXProductFrequencyReducer = (
  state = { morning_rx_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case MORNING_RX_PRODUCT_FREQUENCY:
      return {
        ...state,
        morning_rx_product_frequency: action.morning_rx_product_frequency,
      };
    case RESET_ALL_MORNING_RX_FIELDS:
      return { ...state, morning_rx_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default morningRXProductFrequencyReducer;
