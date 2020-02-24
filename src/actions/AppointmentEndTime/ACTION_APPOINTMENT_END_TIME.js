const APPOINTMENT_END_TIME = "APPOINTMENT_END_TIME";

const ACTION_APPOINTMENT_END_TIME = end_time => {
  return {
    type: APPOINTMENT_END_TIME,
    end_time
  };
};

export default ACTION_APPOINTMENT_END_TIME;
