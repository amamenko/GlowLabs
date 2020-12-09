const graphql = require("graphql");
const MyRoutineFieldsInputType = require("../types/inputs/MyRoutineFieldsInputType");
const MyRoutineType = require("../types/MyRoutineType");
const Client = require("../../models/client");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { GraphQLList } = graphql;

const updateMyRoutineMutation = {
  type: MyRoutineType,
  args: {
    morningCleanser: { type: new GraphQLList(MyRoutineFieldsInputType) },
    morningToner: { type: new GraphQLList(MyRoutineFieldsInputType) },
    morningSerum: { type: new GraphQLList(MyRoutineFieldsInputType) },
    morningMoisturizer: { type: new GraphQLList(MyRoutineFieldsInputType) },
    morningSPF: { type: new GraphQLList(MyRoutineFieldsInputType) },
    morningRX: { type: new GraphQLList(MyRoutineFieldsInputType) },
    morningEyeCream: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningOilCleanser: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningCleanser: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningExfoliator: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningTreatmentMask: {
      type: new GraphQLList(MyRoutineFieldsInputType),
    },
    eveningToner: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningSerum: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningMoisturizer: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningNightMask: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningOil: { type: new GraphQLList(MyRoutineFieldsInputType) },
    eveningSpotTreatment: {
      type: new GraphQLList(MyRoutineFieldsInputType),
    },
    eveningRX: {
      type: new GraphQLList(MyRoutineFieldsInputType),
    },
    eveningEyeCream: { type: new GraphQLList(MyRoutineFieldsInputType) },
  },
  async resolve(parent, args, context) {
    if (context.isAuth) {
      const token = context.cookies["access-token"];
      const client = await Client.findOne({
        _id: jwt.decode(token).id.toString(),
      });

      if (!client) {
        throw new UserInputError("No registered client found.", {
          errors: {
            email: "No registered client found.",
          },
        });
      } else {
        if (args.morningCleanser) {
          client.myRoutine.morningCleanser.push({
            name: args.morningCleanser[0].name,
            frequency: args.morningCleanser[0].frequency,
            useNotes: args.morningCleanser[0].useNotes,
            link: args.morningCleanser[0].link,
          });
        } else if (args.morningToner) {
          client.myRoutine.morningToner.push({
            name: args.morningToner[0].name,
            frequency: args.morningToner[0].frequency,
            useNotes: args.morningToner[0].useNotes,
            link: args.morningToner[0].link,
          });
        } else if (args.morningSerum) {
          client.myRoutine.morningSerum.push({
            name: args.morningSerum[0].name,
            frequency: args.morningSerum[0].frequency,
            useNotes: args.morningSerum[0].useNotes,
            link: args.morningSerum[0].link,
          });
        } else if (args.morningMoisturizer) {
          client.myRoutine.morningMoisturizer.push({
            name: args.morningMoisturizer[0].name,
            frequency: args.morningMoisturizer[0].frequency,
            useNotes: args.morningMoisturizer[0].useNotes,
            link: args.morningMoisturizer[0].link,
          });
        } else if (args.morningSPF) {
          client.myRoutine.morningSPF.push({
            name: args.morningSPF[0].name,
            frequency: args.morningSPF[0].frequency,
            useNotes: args.morningSPF[0].useNotes,
            link: args.morningSPF[0].link,
          });
        } else if (args.morningRX) {
          client.myRoutine.morningRX.push({
            name: args.morningRX[0].name,
            frequency: args.morningRX[0].frequency,
            useNotes: args.morningRX[0].useNotes,
            link: args.morningRX[0].link,
          });
        } else if (args.morningEyeCream) {
          client.myRoutine.morningEyeCream.push({
            name: args.morningEyeCream[0].name,
            frequency: args.morningEyeCream[0].frequency,
            useNotes: args.morningEyeCream[0].useNotes,
            link: args.morningEyeCream[0].link,
          });
        } else if (args.eveningCleanser) {
          client.myRoutine.eveningSPF.push({
            name: args.eveningCleanser[0].name,
            frequency: args.eveningCleanser[0].frequency,
            useNotes: args.eveningCleanser[0].useNotes,
            link: args.eveningCleanser[0].link,
          });
        } else if (args.eveningOilCleanser) {
          client.myRoutine.eveningOilCleanser.push({
            name: args.eveningOilCleanser[0].name,
            frequency: args.eveningOilCleanser[0].frequency,
            useNotes: args.eveningOilCleanser[0].useNotes,
            link: args.eveningOilCleanser[0].link,
          });
        } else if (args.eveningExfoliator) {
          client.myRoutine.eveningExfoliator.push({
            name: args.eveningExfoliator[0].name,
            frequency: args.eveningExfoliator[0].frequency,
            useNotes: args.eveningExfoliator[0].useNotes,
            link: args.eveningExfoliator[0].link,
          });
        } else if (args.eveningTreatmentMask) {
          client.myRoutine.eveningTreatmentMask.push({
            name: args.eveningTreatmentMask[0].name,
            frequency: args.eveningTreatmentMask[0].frequency,
            useNotes: args.eveningTreatmentMask[0].useNotes,
            link: args.eveningTreatmentMask[0].link,
          });
        } else if (args.eveningToner) {
          client.myRoutine.eveningToner.push({
            name: args.eveningToner[0].name,
            frequency: args.eveningToner[0].frequency,
            useNotes: args.eveningToner[0].useNotes,
            link: args.eveningToner[0].link,
          });
        } else if (args.eveningSerum) {
          client.myRoutine.eveningSerum.push({
            name: args.morningToner[0].name,
            frequency: args.eveningSerum[0].frequency,
            useNotes: args.eveningSerum[0].useNotes,
            link: args.eveningSerum[0].link,
          });
        } else if (args.eveningMoisturizer) {
          client.myRoutine.eveningMoisturizer.push({
            name: args.eveningMoisturizer[0].name,
            frequency: args.eveningMoisturizer[0].frequency,
            useNotes: args.eveningMoisturizer[0].useNotes,
            link: args.eveningMoisturizer[0].link,
          });
        } else if (args.eveningNightMask) {
          client.myRoutine.eveningNightMask.push({
            name: args.eveningNightMask[0].name,
            frequency: args.eveningNightMask[0].frequency,
            useNotes: args.eveningNightMask[0].useNotes,
            link: args.eveningNightMask[0].link,
          });
        } else if (args.eveningOil) {
          client.myRoutine.eveningOil.push({
            name: args.eveningOil[0].name,
            frequency: args.eveningOil[0].frequency,
            useNotes: args.eveningOil[0].useNotes,
            link: args.eveningOil[0].link,
          });
        } else if (args.eveningSpotTreatment) {
          client.myRoutine.eveningSpotTreatment.push({
            name: args.eveningSpotTreatment[0].name,
            frequency: args.eveningSpotTreatment[0].frequency,
            useNotes: args.eveningSpotTreatment[0].useNotes,
            link: args.eveningSpotTreatment[0].link,
          });
        } else if (args.eveningRX) {
          client.myRoutine.eveningRX.push({
            name: args.eveningRX[0].name,
            frequency: args.eveningRX[0].frequency,
            useNotes: args.eveningRX[0].useNotes,
            link: args.eveningRX[0].link,
          });
        } else if (args.eveningEyeCream) {
          client.myRoutine.eveningEyeCream.push({
            name: args.eveningEyeCream[0].name,
            frequency: args.eveningEyeCream[0].frequency,
            useNotes: args.eveningEyeCream[0].useNotes,
            link: args.eveningEyeCream[0].link,
          });
        }

        const res = client.save();

        return {
          ...res,
          _id: client._id,
          morningCleanser: client.myRoutine.morningCleanser,
          morningToner: client.myRoutine.morningToner,
          morningSerum: client.myRoutine.morningSerum,
          morningMoisturizer: client.myRoutine.morningMoisturizer,
          morningSPF: client.myRoutine.morningSPF,
          morningRX: client.myRoutine.morningRX,
          morningEyeCream: client.myRoutine.morningEyeCream,
          eveningOilCleanser: client.myRoutine.eveningOilCleanser,
          eveningCleanser: client.myRoutine.eveningCleanser,
          eveningExfoliator: client.myRoutine.eveningExfoliator,
          eveningTreatmentMask: client.myRoutine.eveningTreatmentMask,
          eveningToner: client.myRoutine.eveningToner,
          eveningSerum: client.myRoutine.eveningSerum,
          eveningMoisturizer: client.myRoutine.eveningMoisturizer,
          eveningNightMask: client.myRoutine.eveningNightMask,
          eveningOil: client.myRoutine.eveningOil,
          eveningSpotTreatment: client.myRoutine.eveningSpotTreatment,
          eveningRX: client.myRoutine.eveningRX,
          eveningEyeCream: client.myRoutine.eveningEyeCream,
        };
      }
    } else {
      throw new UserInputError("User is not authenticated.");
    }
  },
};

module.exports = updateMyRoutineMutation;
