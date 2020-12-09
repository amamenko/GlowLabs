const graphql = require("graphql");

const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} = graphql;

const AddOnInput = new GraphQLInputObjectType({
  name: "AddOnInput",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

module.exports = AddOnInput;
