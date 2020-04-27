const EXFOLIATOR_PRODUCT_LINK = "EXFOLIATOR_PRODUCT_LINK";
const RESET_ALL_EXFOLIATOR_FIELDS = "RESET_ALL_EXFOLIATOR_FIELDS";

const exfoliatorProductLinkReducer = (
  state = { exfoliator_product_link: "" },
  action
) => {
  switch (action.type) {
    case EXFOLIATOR_PRODUCT_LINK:
      return {
        ...state,
        exfoliator_product_link: action.exfoliator_product_link,
      };
    case RESET_ALL_EXFOLIATOR_FIELDS:
      return { ...state, exfoliator_product_link: "" };
    default:
      return { ...state };
  }
};

export default exfoliatorProductLinkReducer;
