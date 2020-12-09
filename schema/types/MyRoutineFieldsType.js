const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const MyRoutineFieldsType = new GraphQLObjectType({
  name: "MyRoutineFieldsType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    frequency: { type: GraphQLString },
    useNotes: { type: GraphQLString },
    link: { type: GraphQLString },
  }),
});

module.exports = MyRoutineFieldsType;
