const graphql = require("graphql");
const AuthType = require("../types/AuthType");
const Client = require("../../models/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createTokens = require("../../createTokens");
const { UserInputError } = require("apollo-server");

// Hide usernames and passwords
require("dotenv").config();

const { GraphQLString } = graphql;

const loginQuery = {
  type: AuthType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const client = await Client.findOne({ email: args.email });

    if (!client) {
      throw new UserInputError(
        "There is no registered client associated with that email."
      );
    }

    const passwordsAreIdentical = await bcrypt
      .compare(args.password, client.password)
      .catch((err) => {
        throw err;
      });

    if (!passwordsAreIdentical) {
      throw new UserInputError("Incorrect password.");
    }

    const generateDummyToken = (client) => {
      const token = jwt.sign(
        {
          id: client._id,
          auth: true,
        },
        process.env.JWT_SECRET_KEY_DUMMY,
        { expiresIn: "7d" }
      );
      return token;
    };

    const dummyToken = generateDummyToken(client);
    context.res.cookie("dummy-token", dummyToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    const { accessToken, refreshToken } = createTokens(client);

    context.res.cookie("access-token", accessToken, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    context.res.cookie("refresh-token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    return {
      _id: client._id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
};

module.exports = loginQuery;
