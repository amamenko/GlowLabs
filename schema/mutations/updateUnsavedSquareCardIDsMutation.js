const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const { UserInputError } = require("apollo-server");

const { GraphQLString } = graphql;

const updateUnsavedSquareCardIDsMutation = {
  type: ClientType,
  args: {
    unsavedSquareCardID: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const client = await Client.findOne({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
    });

    if (!client) {
      throw new UserInputError("No registered client found.", {
        errors: {
          email: "No registered client found.",
        },
      });
    } else {
      client.unsavedSquareCardIDs.push(args.unsavedSquareCardID);

      const res = client.save();

      return {
        ...res,
        _id: client._id,
        squareCustomerId: client.squareCustomerId,
        unsavedSquareCardIDs: client.unsavedSquareCardIDs,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        password: client.password,
      };
    }
  },
};

module.exports = updateUnsavedSquareCardIDsMutation;
