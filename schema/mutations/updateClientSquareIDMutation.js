const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");

const { GraphQLString } = graphql;

const updateClientSquareIDMutation = {
  type: ClientType,
  args: {
    squareCustomerId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    let matchedClient;
    let filter = {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
    };

    const update = {
      squareCustomerId: args.squareCustomerId,
    };

    matchedClient = await Client.findOneAndUpdate(filter, update, {
      new: true,
    });

    const res = matchedClient.save();

    return {
      ...res,
      id: matchedClient._id,
      squareCustomerId: matchedClient.squareCustomerId,
      firstName: matchedClient.firstName,
      lastName: matchedClient.lastName,
      email: matchedClient.email,
      phoneNumber: matchedClient.phoneNumber,
      password: matchedClient.password,
    };
  },
};

module.exports = updateClientSquareIDMutation;
