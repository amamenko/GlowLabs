const EVENING_TONER_PRODUCT_LINK = "EVENING_TONER_PRODUCT_LINK";
const RESET_ALL_EVENING_TONER_FIELDS = "RESET_ALL_EVENING_TONER_FIELDS";

const eveningTonerProductLinkReducer = (
  state = { evening_toner_product_link: "" },
  action
) => {
  switch (action.type) {
    case EVENING_TONER_PRODUCT_LINK:
      return {
        ...state,
        evening_toner_product_link: action.evening_toner_product_link,
      };
    case RESET_ALL_EVENING_TONER_FIELDS:
      return { ...state, evening_toner_product_link: "" };
    default:
      return { ...state };
  }
};

export default eveningTonerProductLinkReducer;
