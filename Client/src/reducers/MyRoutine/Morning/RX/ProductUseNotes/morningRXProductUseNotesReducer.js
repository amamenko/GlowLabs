const MORNING_RX_PRODUCT_USE_NOTES = "MORNING_RX_PRODUCT_USE_NOTES";
const RESET_ALL_MORNING_RX_FIELDS = "RESET_ALL_MORNING_RX_FIELDS";

const morningRXProductUseNotesReducer = (
  state = { morning_rx_product_use_notes: "" },
  action
) => {
  switch (action.type) {
    case MORNING_RX_PRODUCT_USE_NOTES:
      return {
        ...state,
        morning_rx_product_use_notes: action.morning_rx_product_use_notes,
      };
    case RESET_ALL_MORNING_RX_FIELDS:
      return { ...state, morning_rx_product_use_notes: "" };
    default:
      return { ...state };
  }
};

export default morningRXProductUseNotesReducer;
