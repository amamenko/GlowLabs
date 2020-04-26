const MORNING_TONER_PRODUCT_LINK = "MORNING_TONER_PRODUCT_LINK";
const RESET_ALL_MORNING_TONER_FIELDS = "RESET_ALL_MORNING_TONER_FIELDS";

const morningTonerProductLinkReducer = (
  state = { morning_toner_product_link: "" },
  action
) => {
  switch (action.type) {
    case MORNING_TONER_PRODUCT_LINK:
      return {
        ...state,
        morning_toner_product_link: action.morning_toner_product_link,
      };
    case RESET_ALL_MORNING_TONER_FIELDS:
      return { ...state, morning_toner_product_link: "" };
    default:
      return { ...state };
  }
};

export default morningTonerProductLinkReducer;
