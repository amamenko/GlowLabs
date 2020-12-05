const MORNING_RX_PRODUCT_LINK = "MORNING_RX_PRODUCT_LINK";
const RESET_ALL_MORNING_RX_FIELDS = "RESET_ALL_MORNING_RX_FIELDS";

const morningRXProductLinkReducer = (
  state = { morning_rx_product_link: "" },
  action
) => {
  switch (action.type) {
    case MORNING_RX_PRODUCT_LINK:
      return {
        ...state,
        morning_rx_product_link: action.morning_rx_product_link,
      };
    case RESET_ALL_MORNING_RX_FIELDS:
      return { ...state, morning_rx_product_link: "" };
    default:
      return { ...state };
  }
};

export default morningRXProductLinkReducer;
