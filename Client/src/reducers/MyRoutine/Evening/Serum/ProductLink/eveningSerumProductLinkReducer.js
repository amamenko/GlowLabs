const EVENING_SERUM_PRODUCT_LINK = "EVENING_SERUM_PRODUCT_LINK";
const RESET_ALL_EVENING_SERUM_FIELDS = "RESET_ALL_EVENING_SERUM_FIELDS";

const eveningSerumProductLinkReducer = (
  state = { evening_serum_product_link: "" },
  action
) => {
  switch (action.type) {
    case EVENING_SERUM_PRODUCT_LINK:
      return {
        ...state,
        evening_serum_product_link: action.evening_serum_product_link,
      };
    case RESET_ALL_EVENING_SERUM_FIELDS:
      return { ...state, evening_serum_product_link: "" };
    default:
      return { ...state };
  }
};

export default eveningSerumProductLinkReducer;
