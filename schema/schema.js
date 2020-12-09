const graphql = require("graphql");
const Mutation = require("./Mutation");
const RootQuery = require("./RootQuery");

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
