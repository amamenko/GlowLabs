const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLID } = graphql;

const clientQuery = {
  type: ClientType,
  args: {
    _id: { type: GraphQLID },
    squareCustomerId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const client = await Client.findOne(args);

    if (client === null) {
      throw new UserInputError("No client found.");
    } else {
      return client;
    }
  },
};

module.exports = clientQuery;
