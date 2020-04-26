const MORNING_TONER_PRODUCT_FREQUENCY = "MORNING_TONER_PRODUCT_FREQUENCY";
const RESET_ALL_MORNING_TONER_FIELDS = "RESET_ALL_MORNING_TONER_FIELDS";

const morningTonerProductFrequencyReducer = (
  state = { morning_toner_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case MORNING_TONER_PRODUCT_FREQUENCY:
      return {
        ...state,
        morning_toner_product_frequency: action.morning_toner_product_frequency,
      };
    case RESET_ALL_MORNING_TONER_FIELDS:
      return { ...state, morning_toner_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default morningTonerProductFrequencyReducer;
