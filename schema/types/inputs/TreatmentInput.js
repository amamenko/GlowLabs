const graphql = require("graphql");

const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} = graphql;

const TreatmentInput = new GraphQLInputObjectType({
  name: "TreatmentInput",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

module.exports = TreatmentInput;
