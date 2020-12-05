const TOTAL_PRICE = "TOTAL_PRICE";
const TOTAL_PRICE_RESET = "TOTAL_PRICE_RESET";

const totalPriceReducer = (state = { totalPrice: "" }, action) => {
  switch (action.type) {
    case TOTAL_PRICE:
      return { ...state, totalPrice: action.price };
    case TOTAL_PRICE_RESET:
      return { ...state, totalPrice: "" };
    default:
      return { ...state };
  }
};

export default totalPriceReducer;
