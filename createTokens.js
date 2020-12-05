const jwt = require("jsonwebtoken");

const createTokens = client => {
  const refreshToken = jwt.sign(
    {
      id: client._id,
      email: client.email,
      phoneNumber: client.phoneNumber,
      firstName: client.firstName,
      lastName: client.lastName,
      tokenCount: client.tokenCount
    },
    process.env.JWT_SECRET_KEY_REFRESH,
    { expiresIn: "7d" }
  );

  const accessToken = jwt.sign(
    {
      id: client._id,
      email: client.email,
      phoneNumber: client.phoneNumber,
      firstName: client.firstName,
      lastName: client.lastName
    },
    process.env.JWT_SECRET_KEY_ACCESS,
    { expiresIn: "15min" }
  );

  return { accessToken, refreshToken };
};

module.exports = createTokens;
