const EVENING_TONER_PRODUCT_FREQUENCY = "EVENING_TONER_PRODUCT_FREQUENCY";
const RESET_ALL_EVENING_TONER_FIELDS = "RESET_ALL_EVENING_TONER_FIELDS";

const eveningTonerProductFrequencyReducer = (
  state = { evening_toner_product_frequency: "" },
  action
) => {
  switch (action.type) {
    case EVENING_TONER_PRODUCT_FREQUENCY:
      return {
        ...state,
        evening_toner_product_frequency: action.evening_toner_product_frequency,
      };
    case RESET_ALL_EVENING_TONER_FIELDS:
      return { ...state, evening_toner_product_frequency: "" };
    default:
      return { ...state };
  }
};

export default eveningTonerProductFrequencyReducer;
