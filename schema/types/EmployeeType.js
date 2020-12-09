const graphql = require("graphql");
const NotificationType = require("./NotificationType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    employeeRole: { type: new GraphQLList(GraphQLString) },
    permanentPasswordSet: { type: GraphQLBoolean },
    password: { type: GraphQLString },
    notifications: { type: new GraphQLList(NotificationType) },
    tokenCount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = EmployeeType;
