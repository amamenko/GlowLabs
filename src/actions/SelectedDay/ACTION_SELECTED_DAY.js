const SELECTED_DAY = "SELECTED_DAY";

const ACTION_SELECTED_DAY = day => {
  return {
    type: SELECTED_DAY,
    day
  };
};

export default ACTION_SELECTED_DAY;
