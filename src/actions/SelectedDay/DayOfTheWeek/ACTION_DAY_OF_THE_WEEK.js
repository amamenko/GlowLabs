const DAY_OF_THE_WEEK = "DAY_OF_THE_WEEK";

const ACTION_DAY_OF_THE_WEEK = day => {
  return {
    type: DAY_OF_THE_WEEK,
    day
  };
};

export default ACTION_DAY_OF_THE_WEEK;
