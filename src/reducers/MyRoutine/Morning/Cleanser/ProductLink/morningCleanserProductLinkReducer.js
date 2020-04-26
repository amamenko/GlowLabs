const MORNING_CLEANSER_PRODUCT_LINK = "MORNING_CLEANSER_PRODUCT_LINK";
const RESET_ALL_MORNING_CLEANSER_FIELDS = "RESET_ALL_MORNING_CLEANSER_FIELDS";

const morningCleanserProductLinkReducer = (
  state = { morning_cleanser_product_link: "" },
  action
) => {
  switch (action.type) {
    case MORNING_CLEANSER_PRODUCT_LINK:
      return {
        ...state,
        morning_cleanser_product_link: action.morning_cleanser_product_link,
      };
    case RESET_ALL_MORNING_CLEANSER_FIELDS:
      return { ...state, morning_cleanser_product_link: "" };
    default:
      return { ...state };
  }
};

export default morningCleanserProductLinkReducer;
