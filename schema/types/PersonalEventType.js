const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
} = graphql;

const PersonalEventType = new GraphQLObjectType({
  name: "PersonalEventType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    title: { type: GraphQLString },
    staff: { type: GraphQLString },
    notes: { type: GraphQLString },
    allDay: { type: GraphQLBoolean },
    blockTime: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = PersonalEventType;
