const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const AddOnType = new GraphQLObjectType({
  name: "AddOn",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

module.exports = AddOnType;
