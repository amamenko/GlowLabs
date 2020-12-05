const EMAIL = "EMAIL";

const ACTION_EMAIL = email => {
  return {
    type: EMAIL,
    email
  };
};

export default ACTION_EMAIL;
