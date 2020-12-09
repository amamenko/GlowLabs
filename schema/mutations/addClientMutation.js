const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");

const { GraphQLString, GraphQLNonNull } = graphql;

const addClientMutation = {
  type: ClientType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: GraphQLString },
  },
  resolve(parent, args) {
    let client = new Client({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phoneNumber: args.phoneNumber,
    });
    return client.save();
  },
};

module.exports = addClientMutation;
