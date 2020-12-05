module.exports.validateRegistration = (
  email,
  phoneNumber,
  password,
  confirmPassword
) => {
  const errors = {};

  // Email Validation
  if (email.trim() === "") {
    errors.email = "Email field must not be empty.";
  } else {
    // Regular Expression for Email Validation - allows only one @ and only one period while not allowing special characters or spaces
    const emailReg = /^[^\s@#!]+@{1}[^\s@.#!]+\.{1}[^\s@.]+$/;
    if (!email.match(emailReg)) {
      errors.email = "Email must be a valid email address.";
    }
  }

  // Phone Number Validation
  if (phoneNumber.trim() === "") {
    errors.phoneNumber = "Phone number field must not be empty.";
  }

  // Password Validation
  if (password.trim() === "") {
    errors.password = "Password field must not be empty.";
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Password fields must match.";
    }
  }

  return {
    errors,
    validRegistration: Object.keys(errors).length < 1
  };
};
