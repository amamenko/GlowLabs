const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const AuthType = new GraphQLObjectType({
  name: "AuthType",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  }),
});

module.exports = AuthType;
