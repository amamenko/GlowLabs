const graphql = require("graphql");
const mongoose = require("mongoose");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const { UserInputError } = require("apollo-server");
const {
  validateRegistration,
} = require("../../validation/validateRegistration");
const createTokens = require("../../createTokens");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Hide usernames and passwords
require("dotenv").config();

const { GraphQLString, GraphQLNonNull } = graphql;

const registerClientMutation = {
  type: ClientType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, context) {
    const clientEmailMatch = await Client.findOne({
      email: args.email,
    });

    if (
      clientEmailMatch &&
      (clientEmailMatch.password || clientEmailMatch.tokenCount > 0)
    ) {
      throw new UserInputError("This email has already been registered.", {
        errors: {
          email: "This email has already been registered.",
        },
      });
    }

    const clientPhoneMatch = await Client.findOne({
      phoneNumber: args.phoneNumber,
    });

    if (
      clientPhoneMatch &&
      (clientPhoneMatch.password || clientPhoneMatch.tokenCount > 0)
    ) {
      throw new UserInputError(
        "This phone number has already been registered.",
        {
          errors: {
            phoneNumber: "This phone number has already been registered.",
          },
        }
      );
    }

    const { validRegistration, errors } = validateRegistration(
      args.email,
      args.phoneNumber,
      args.password,
      args.confirmPassword
    );

    if (!validRegistration) {
      throw new UserInputError("Registration error.", { errors });
    }

    let client = new Client({
      _id: new mongoose.Types.ObjectId(),
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      // Password is hashed
      password: await bcrypt
        .hash(args.password, 12)
        .then((hash) => (args.password = hash))
        .catch((err) => {
          throw err;
        }),
    });

    const res = await client.save();

    const generateDummyToken = (res) => {
      const token = jwt.sign(
        {
          id: res._id,
          auth: true,
        },
        process.env.JWT_SECRET_KEY_DUMMY,
        { expiresIn: "7d" }
      );
      return token;
    };

    const dummyToken = generateDummyToken(res);
    context.res.cookie("dummy-token", dummyToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });

    const { accessToken, refreshToken } = createTokens(client);

    context.res.cookie("access-token", accessToken, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });

    context.res.cookie("refresh-token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PRODUCTION_CLIENT_ROOT
          : "localhost",
    });

    return {
      ...res,
      id: client._id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      password: client.password,
      createdAt: client.createdAt,
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenCount: client.tokenCount,
    };
  },
};

module.exports = registerClientMutation;
