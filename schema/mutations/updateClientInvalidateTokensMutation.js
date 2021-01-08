const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

// Hide usernames and passwords
require("dotenv").config();

const updateClientsInvalidateTokensMutation = {
  type: ClientType,
  async resolve(parent, args, context) {
    if (!context.isAuth) {
      throw new UserInputError("User is not authenticated.");
    } else {
      const token = context.cookies["access-token"];
      const client = await Client.findOne({
        _id: jwt.decode(token).id.toString(),
      });

      if (!client) {
        throw new UserInputError("No registered client found.", {
          errors: {
            email: "No registered client found.",
          },
        });
      } else {
        context.res.cookie(
          "logout",
          { logout: true },
          {
            maxAge: 1000 * 15,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.PRODUCTION_CLIENT_ROOT
                : "localhost",
          }
        );
        client.tokenCount += 1;
        context.res.clearCookie("access-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("refresh-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        context.res.clearCookie("dummy-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
        const res = client.save();

        return {
          ...res,
          id: client._id,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phoneNumber: client.phoneNumber,
          password: client.password,
          createdAt: client.createdAt,
          tokenCount: client.tokenCount,
        };
      }
    }
  },
};

module.exports = updateClientsInvalidateTokensMutation;
