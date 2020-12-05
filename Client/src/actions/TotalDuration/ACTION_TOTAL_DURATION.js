const TOTAL_DURATION = "TOTAL_DURATION";

const ACTION_TOTAL_DURATION = duration => {
  return {
    type: TOTAL_DURATION,
    duration
  };
};

export default ACTION_TOTAL_DURATION;
