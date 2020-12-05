const EVENING_RX_PRODUCT_USE_NOTES = "EVENING_RX_PRODUCT_USE_NOTES";
const RESET_ALL_EVENING_RX_FIELDS = "RESET_ALL_EVENING_RX_FIELDS";

const eveningRXProductUseNotesReducer = (
  state = { evening_rx_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case EVENING_RX_PRODUCT_USE_NOTES:
      return {
        ...state,
        evening_rx_product_use_notes: action.evening_rx_product_use_notes,
      };
    case RESET_ALL_EVENING_RX_FIELDS:
      return { ...state, evening_rx_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default eveningRXProductUseNotesReducer;
