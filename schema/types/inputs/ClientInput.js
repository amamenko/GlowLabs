const graphql = require("graphql");

const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} = graphql;

const ClientInput = new GraphQLInputObjectType({
  name: "ClientInput",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    squareCustomerId: { type: GraphQLString },
    unsavedSquareCardIDs: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    password: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    tokenCount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = ClientInput;
