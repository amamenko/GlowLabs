const graphql = require("graphql");
const Mutation = require("./Mutation");
const Query = require("./Query");
const Subscription = require("./Subscription");

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  subscription: Subscription,
});
