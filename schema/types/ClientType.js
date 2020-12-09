const graphql = require("graphql");
const ConsentFormType = require("./ConsentFormType");
const MyRoutineType = require("./MyRoutineType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ClientType = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    squareCustomerId: { type: GraphQLString },
    unsavedSquareCardIDs: { type: new GraphQLList(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    password: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    tokenCount: { type: GraphQLInt },
    consentForm: { type: ConsentFormType },
    myRoutine: { type: MyRoutineType },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = ClientType;
