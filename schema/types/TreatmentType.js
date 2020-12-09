const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const TreatmentType = new GraphQLObjectType({
  name: "Treatment",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

module.exports = TreatmentType;
