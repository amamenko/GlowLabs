const TOTAL_PRICE = "TOTAL_PRICE";

const ACTION_TOTAL_PRICE = price => {
  return {
    type: TOTAL_PRICE,
    price
  };
};

export default ACTION_TOTAL_PRICE;
