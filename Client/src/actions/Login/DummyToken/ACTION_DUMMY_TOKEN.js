const DUMMY_TOKEN = "DUMMY_TOKEN";

const ACTION_DUMMY_TOKEN = dummy_token => {
  return {
    type: DUMMY_TOKEN,
    dummy_token
  };
};

export default ACTION_DUMMY_TOKEN;
