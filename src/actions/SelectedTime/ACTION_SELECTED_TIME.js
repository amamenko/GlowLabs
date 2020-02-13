const SELECTED_TIME = "SELECTED_TIME";

const ACTION_SELECTED_TIME = time => {
  return {
    type: SELECTED_TIME,
    time
  };
};

export default ACTION_SELECTED_TIME;
