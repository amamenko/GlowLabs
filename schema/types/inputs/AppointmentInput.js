const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID } = graphql;

const AppointmentInput = new GraphQLObjectType({
  name: "AppointmentInput",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
  }),
});

module.exports = AppointmentInput;
