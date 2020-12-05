const EVENING_CLEANSER_PRODUCT_LINK = "EVENING_CLEANSER_PRODUCT_LINK";
const RESET_ALL_EVENING_CLEANSER_FIELDS = "RESET_ALL_EVENING_CLEANSER_FIELDS";

const eveningCleanserProductLinkReducer = (
  state = { evening_cleanser_product_link: "" },
  action
) => {
  switch (action.type) {
    case EVENING_CLEANSER_PRODUCT_LINK:
      return {
        ...state,
        evening_cleanser_product_link: action.evening_cleanser_product_link,
      };
    case RESET_ALL_EVENING_CLEANSER_FIELDS:
      return { ...state, evening_cleanser_product_link: "" };
    default:
      return { ...state };
  }
};

export default eveningCleanserProductLinkReducer;
