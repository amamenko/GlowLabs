const EVENING_RX_PRODUCT_FREQUENCY = "EVENING_RX_PRODUCT_FREQUENCY";
const RESET_ALL_EVENING_RX_FIELDS = "RESET_ALL_EVENING_RX_FIELDS";

const eveningRXProductFrequencyReducer = (
  state = { evening_rx_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EVENING_RX_PRODUCT_FREQUENCY:
      return {
        ...state,
        evening_rx_product_frequency: action.evening_rx_product_frequency,
      };
    case RESET_ALL_EVENING_RX_FIELDS:
      return { ...state, evening_rx_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default eveningRXProductFrequencyReducer;
