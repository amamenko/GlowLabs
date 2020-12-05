const jwt = require("jsonwebtoken");

const createAdminTokens = (employee) => {
  const refreshToken = jwt.sign(
    {
      id: employee._id,
      employeeRole: employee.employeeRole,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      tokenCount: employee.tokenCount,
    },
    process.env.JWT_SECRET_KEY_REFRESH,
    { expiresIn: "7d" }
  );

  const accessToken = jwt.sign(
    {
      id: employee._id,
      employeeRole: employee.employeeRole,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
    },
    process.env.JWT_SECRET_KEY_ACCESS,
    { expiresIn: "15min" }
  );

  return { accessToken, refreshToken };
};

module.exports = createAdminTokens;
