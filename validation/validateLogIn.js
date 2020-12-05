module.exports.validateLogIn = (email, password) => {
  const errors = {};

  // Email Validation
  if (email.trim() === "") {
    errors.email = "Email field must not be empty.";
  }

  // Password Validation
  if (password.trim() === "") {
    errors.password = "Password field must not be empty.";
  }
};
