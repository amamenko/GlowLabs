const EVENING_RX_PRODUCT_LINK = "EVENING_RX_PRODUCT_LINK";
const RESET_ALL_EVENING_RX_FIELDS = "RESET_ALL_EVENING_RX_FIELDS";

const eveningRXProductLinkReducer = (
  state = { evening_rx_product_link: "" },
  action
) => {
  switch (action.type) {
    case EVENING_RX_PRODUCT_LINK:
      return {
        ...state,
        evening_rx_product_link: action.evening_rx_product_link,
      };
    case RESET_ALL_EVENING_RX_FIELDS:
      return { ...state, evening_rx_product_link: "" };
    default:
      return { ...state };
  }
};

export default eveningRXProductLinkReducer;
