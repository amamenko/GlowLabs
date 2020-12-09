const graphql = require("graphql");
const MyRoutineType = require("../types/MyRoutineType");
const Client = require("../../models/client");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { GraphQLID } = graphql;

const deleteMyRoutineItemMutation = {
  type: MyRoutineType,
  args: {
    morningCleanserID: { type: GraphQLID },
    morningTonerID: { type: GraphQLID },
    morningSerumID: { type: GraphQLID },
    morningMoisturizerID: { type: GraphQLID },
    morningSPFID: { type: GraphQLID },
    morningRXID: { type: GraphQLID },
    morningEyeCreamID: { type: GraphQLID },
    eveningOilCleanserID: { type: GraphQLID },
    eveningCleanserID: { type: GraphQLID },
    eveningExfoliatorID: { type: GraphQLID },
    eveningTreatmentMaskID: { type: GraphQLID },
    eveningTonerID: { type: GraphQLID },
    eveningSerumID: { type: GraphQLID },
    eveningMoisturizerID: { type: GraphQLID },
    eveningNightMaskID: { type: GraphQLID },
    eveningOilID: { type: GraphQLID },
    eveningSpotTreatmentID: { type: GraphQLID },
    eveningRXID: { type: GraphQLID },
    eveningEyeCreamID: { type: GraphQLID },
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
        if (args.morningCleanserID) {
          for (let i = 0; i < client.myRoutine.morningCleanser.length; i++) {
            if (
              client.myRoutine.morningCleanser[i]._id.toString() ===
              args.morningCleanserID
            ) {
              client.myRoutine.morningCleanser = client.myRoutine.morningCleanser.filter(
                (x) => x._id.toString() !== args.morningCleanserID
              );
            }
          }
        } else if (args.morningTonerID) {
          for (let i = 0; i < client.myRoutine.morningToner.length; i++) {
            if (
              client.myRoutine.morningToner[i]._id.toString() ===
              args.morningTonerID
            ) {
              client.myRoutine.morningToner = client.myRoutine.morningToner.filter(
                (x) => x._id.toString() !== args.morningTonerID
              );
            }
          }
        } else if (args.morningSerumID) {
          for (let i = 0; i < client.myRoutine.morningSerum.length; i++) {
            if (
              client.myRoutine.morningSerum[i]._id.toString() ===
              args.morningSerumID
            ) {
              client.myRoutine.morningSerum = client.myRoutine.morningSerum.filter(
                (x) => x._id.toString() !== args.morningSerumID
              );
            }
          }
        } else if (args.morningMoisturizerID) {
          for (let i = 0; i < client.myRoutine.morningMoisturizer.length; i++) {
            if (
              client.myRoutine.morningMoisturizer[i]._id.toString() ===
              args.morningMoisturizerID
            ) {
              client.myRoutine.morningMoisturizer = client.myRoutine.morningMoisturizer.filter(
                (x) => x._id.toString() !== args.morningMoisturizerID
              );
            }
          }
        } else if (args.morningSPFID) {
          for (let i = 0; i < client.myRoutine.morningSPF.length; i++) {
            if (
              client.myRoutine.morningSPF[i]._id.toString() ===
              args.morningSPFID
            ) {
              client.myRoutine.morningSPF = client.myRoutine.morningSPF.filter(
                (x) => x._id.toString() !== args.morningSPFID
              );
            }
          }
        } else if (args.morningRXID) {
          for (let i = 0; i < client.myRoutine.morningRX.length; i++) {
            if (
              client.myRoutine.morningRX[i]._id.toString() === args.morningRXID
            ) {
              client.myRoutine.morningRX = client.myRoutine.morningRX.filter(
                (x) => x._id.toString() !== args.morningRXID
              );
            }
          }
        } else if (args.morningEyeCreamID) {
          for (let i = 0; i < client.myRoutine.morningEyeCream.length; i++) {
            if (
              client.myRoutine.morningEyeCream[i]._id.toString() ===
              args.morningEyeCreamID
            ) {
              client.myRoutine.morningEyeCream = client.myRoutine.morningEyeCream.filter(
                (x) => x._id.toString() !== args.morningEyeCreamID
              );
            }
          }
        } else if (args.eveningCleanserID) {
          for (let i = 0; i < client.myRoutine.eveningCleanser.length; i++) {
            if (
              client.myRoutine.eveningCleanser[i]._id.toString() ===
              args.eveningCleanserID
            ) {
              client.myRoutine.eveningCleanser = client.myRoutine.eveningCleanser.filter(
                (x) => x._id.toString() !== args.eveningCleanserID
              );
            }
          }
        } else if (args.eveningOilCleanserID) {
          for (let i = 0; i < client.myRoutine.eveningOilCleanser.length; i++) {
            if (
              client.myRoutine.eveningOilCleanser[i]._id.toString() ===
              args.eveningOilCleanserID
            ) {
              client.myRoutine.eveningOilCleanser = client.myRoutine.eveningOilCleanser.filter(
                (x) => x._id.toString() !== args.eveningOilCleanserID
              );
            }
          }
        } else if (args.eveningExfoliatorID) {
          for (let i = 0; i < client.myRoutine.eveningExfoliator.length; i++) {
            if (
              client.myRoutine.eveningExfoliator[i]._id.toString() ===
              args.eveningExfoliatorID
            ) {
              client.myRoutine.eveningExfoliator = client.myRoutine.eveningExfoliator.filter(
                (x) => x._id.toString() !== args.eveningExfoliatorID
              );
            }
          }
        } else if (args.eveningTreatmentMaskID) {
          for (
            let i = 0;
            i < client.myRoutine.eveningTreatmentMask.length;
            i++
          ) {
            if (
              client.myRoutine.eveningTreatmentMask[i]._id.toString() ===
              args.eveningTreatmentMaskID
            ) {
              client.myRoutine.eveningTreatmentMask = client.myRoutine.eveningTreatmentMask.filter(
                (x) => x._id.toString() !== args.eveningTreatmentMaskID
              );
            }
          }
        } else if (args.eveningTonerID) {
          for (let i = 0; i < client.myRoutine.eveningToner.length; i++) {
            if (
              client.myRoutine.eveningToner[i]._id.toString() ===
              args.eveningTonerID
            ) {
              client.myRoutine.eveningToner = client.myRoutine.eveningToner.filter(
                (x) => x._id.toString() !== args.eveningTonerID
              );
            }
          }
        } else if (args.eveningSerumID) {
          for (let i = 0; i < client.myRoutine.eveningSerum.length; i++) {
            if (
              client.myRoutine.eveningSerum[i]._id.toString() ===
              args.eveningSerumID
            ) {
              client.myRoutine.eveningSerum = client.myRoutine.eveningSerum.filter(
                (x) => x._id.toString() !== args.eveningSerumID
              );
            }
          }
        } else if (args.eveningMoisturizerID) {
          for (let i = 0; i < client.myRoutine.eveningMoisturizer.length; i++) {
            if (
              client.myRoutine.eveningMoisturizer[i]._id.toString() ===
              args.eveningMoisturizerID
            ) {
              client.myRoutine.eveningMoisturizer = client.myRoutine.eveningMoisturizer.filter(
                (x) => x._id.toString() !== args.eveningMoisturizerID
              );
            }
          }
        } else if (args.eveningNightMaskID) {
          for (let i = 0; i < client.myRoutine.eveningNightMask.length; i++) {
            if (
              client.myRoutine.eveningNightMask[i]._id.toString() ===
              args.eveningNightMaskID
            ) {
              client.myRoutine.eveningNightMask = client.myRoutine.eveningNightMask.filter(
                (x) => x._id.toString() !== args.eveningNightMaskID
              );
            }
          }
        } else if (args.eveningOilID) {
          for (let i = 0; i < client.myRoutine.eveningOil.length; i++) {
            if (
              client.myRoutine.eveningOil[i]._id.toString() ===
              args.eveningOilID
            ) {
              client.myRoutine.eveningOil = client.myRoutine.eveningOil.filter(
                (x) => x._id.toString() !== args.eveningOilID
              );
            }
          }
        } else if (args.eveningSpotTreatmentID) {
          for (
            let i = 0;
            i < client.myRoutine.eveningSpotTreatment.length;
            i++
          ) {
            if (
              client.myRoutine.eveningSpotTreatment[i]._id.toString() ===
              args.eveningSpotTreatmentID
            ) {
              client.myRoutine.eveningSpotTreatment = client.myRoutine.eveningSpotTreatment.filter(
                (x) => x._id.toString() !== args.eveningSpotTreatmentID
              );
            }
          }
        } else if (args.eveningRXID) {
          for (let i = 0; i < client.myRoutine.eveningRX.length; i++) {
            if (
              client.myRoutine.eveningRX[i]._id.toString() === args.eveningRXID
            ) {
              client.myRoutine.eveningRX = client.myRoutine.eveningRX.filter(
                (x) => x._id.toString() !== args.eveningRXID
              );
            }
          }
        } else if (args.eveningEyeCreamID) {
          for (let i = 0; i < client.myRoutine.eveningEyeCream.length; i++) {
            if (
              client.myRoutine.eveningEyeCream[i]._id.toString() ===
              args.eveningEyeCreamID
            ) {
              client.myRoutine.eveningEyeCream = client.myRoutine.eveningEyeCream.filter(
                (x) => x._id.toString() !== args.eveningEyeCreamID
              );
            }
          }
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

module.exports = deleteMyRoutineItemMutation;
