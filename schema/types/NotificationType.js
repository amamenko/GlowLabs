const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = graphql;

const NotificationType = new GraphQLObjectType({
  name: "Notification",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    new: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    allDay: { type: GraphQLBoolean },
    associatedClientFirstName: { type: GraphQLString },
    associatedClientLastName: { type: GraphQLString },
    originalAssociatedStaffFirstName: { type: GraphQLString },
    originalAssociatedStaffLastName: { type: GraphQLString },
    newAssociatedStaffFirstName: { type: GraphQLString },
    newAssociatedStaffLastName: { type: GraphQLString },
    createdByFirstName: { type: GraphQLString },
    createdByLastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = NotificationType;
