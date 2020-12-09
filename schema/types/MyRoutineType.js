const graphql = require("graphql");
const MyRoutineFieldsType = require("./MyRoutineFieldsType");

const { GraphQLObjectType, GraphQLList } = graphql;

const MyRoutineType = new GraphQLObjectType({
  name: "MyRoutineType",
  fields: () => ({
    morningCleanser: { type: new GraphQLList(MyRoutineFieldsType) },
    morningToner: { type: new GraphQLList(MyRoutineFieldsType) },
    morningSerum: { type: new GraphQLList(MyRoutineFieldsType) },
    morningMoisturizer: { type: new GraphQLList(MyRoutineFieldsType) },
    morningSPF: { type: new GraphQLList(MyRoutineFieldsType) },
    morningRX: { type: new GraphQLList(MyRoutineFieldsType) },
    morningEyeCream: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningOilCleanser: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningCleanser: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningExfoliator: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningTreatmentMask: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningToner: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningSerum: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningMoisturizer: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningNightMask: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningOil: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningSpotTreatment: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningRX: { type: new GraphQLList(MyRoutineFieldsType) },
    eveningEyeCream: { type: new GraphQLList(MyRoutineFieldsType) },
  }),
});

module.exports = MyRoutineType;
