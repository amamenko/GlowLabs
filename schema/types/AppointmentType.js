const graphql = require("graphql");
const AddOnType = require("./AddOnType");
const ClientType = require("./ClientType");
const TreatmentType = require("./TreatmentType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const AppointmentType = new GraphQLObjectType({
  name: "AppointmentType",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    morningOrEvening: { type: GraphQLString },
    endTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    price: { type: GraphQLInt },
    esthetician: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    bookedWithCardSquareID: { type: GraphQLString },
    client: { type: ClientType },
    treatments: { type: new GraphQLList(TreatmentType) },
    addOns: { type: new GraphQLList(AddOnType) },
    notes: { type: GraphQLString },
    confirmed: { type: GraphQLBoolean },
  }),
});

module.exports = AppointmentType;
