const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { GraphQLString } = graphql;

const updateClientInformationMutation = {
  type: ClientType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const temporaryFacebookAccessToken =
      context.cookies["temporary-facebook-access-token"];
    const accessToken = context.cookies["access-token"];

    let matchedClient;
    let client;
    let filter;

    if (!context.isAuth) {
      throw new UserInputError("User is not authenticated.");
    } else {
      if (temporaryFacebookAccessToken) {
        client = await Client.findOne({
          _id: jwt.decode(temporaryFacebookAccessToken).id.toString(),
        });
        filter = {
          _id: jwt.decode(temporaryFacebookAccessToken).id.toString(),
        };
      } else {
        if (accessToken) {
          client = await Client.findOne({
            _id: jwt.decode(accessToken).id.toString(),
          });
          filter = {
            _id: jwt.decode(accessToken).id.toString(),
          };
        }
      }

      const update = {
        firstName: args.firstName ? args.firstName : client.firstName,
        lastName: args.lastName ? args.lastName : client.lastName,
        email: args.email ? args.email : client.email,
        password: args.password ? args.password : client.password,
        phoneNumber: args.phoneNumber ? args.phoneNumber : client.phoneNumber,
      };

      matchedClient = await Client.findOneAndUpdate(filter, update, {
        new: true,
      });

      const res = matchedClient.save();

      return {
        ...res,
        id: matchedClient._id,
        firstName: matchedClient.firstName,
        lastName: matchedClient.lastName,
        email: matchedClient.email,
        phoneNumber: matchedClient.phoneNumber,
        password: matchedClient.password,
      };
    }
  },
};

module.exports = updateClientInformationMutation;
