const PHONE_NUMBER = "PHONE_NUMBER";

const ACTION_PHONE_NUMBER = phone_number => {
  return {
    type: PHONE_NUMBER,
    phone_number
  };
};

export default ACTION_PHONE_NUMBER;
