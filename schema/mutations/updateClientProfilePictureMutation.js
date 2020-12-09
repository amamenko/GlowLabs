const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLID } = graphql;

const updateClientProfilePictureMutation = {
  type: ClientType,
  args: {
    id: { type: GraphQLID },
    profilePicture: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const client = await Client.findOneAndUpdate(
        {
          _id: args.id,
        },
        { profilePicture: args.profilePicture },
        {
          new: true,
        }
      );

      const res = await client.save();

      return {
        ...res,
        _id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        profilePicture: client.profilePicture,
      };
    }
  },
};
module.exports = updateClientProfilePictureMutation;
