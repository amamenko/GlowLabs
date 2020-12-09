const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const { UserInputError } = require("apollo-server");

const { GraphQLID } = graphql;

const deleteClientMutation = {
  type: ClientType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      await Client.findByIdAndDelete({
        _id: args._id,
      });

      return {
        _id: args._id,
      };
    }
  },
};

module.exports = deleteClientMutation;
