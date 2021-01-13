const graphql = require("graphql");
const mongoose = require("mongoose");
const ConsentFormType = require("../types/ConsentFormType");
const Client = require("../../models/client");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLString, GraphQLBoolean, GraphQLNonNull } = graphql;

// Hide usernames and passwords
require("dotenv").config();

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const updateConsentFormMutation = {
  type: ConsentFormType,
  args: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    surgeryLast3Months: { type: new GraphQLNonNull(GraphQLBoolean) },
    surgeryLast3MonthsNotes: { type: GraphQLString },
    anyHealthProblems: { type: new GraphQLNonNull(GraphQLBoolean) },
    anyHealthProblemsNotes: { type: GraphQLString },
    listAnyMedications: { type: GraphQLString },
    chemPeelsLastMonth: { type: new GraphQLNonNull(GraphQLBoolean) },
    waxingOnFaceLast5Days: { type: new GraphQLNonNull(GraphQLBoolean) },
    accutaneOrPrescription: { type: new GraphQLNonNull(GraphQLBoolean) },
    accutaneOrPrescriptionNotes: { type: GraphQLString },
    anyProductsContainingSalicyclicAcid: { type: GraphQLBoolean },
    anyProductsContainingGlycolicAcid: { type: GraphQLBoolean },
    anyProductsContainingLacticAcid: { type: GraphQLBoolean },
    anyProductsContainingExfoliatingScrubs: { type: GraphQLBoolean },
    anyProductsContainingVitaminA: { type: GraphQLBoolean },
    fillersOrBotox: { type: new GraphQLNonNull(GraphQLBoolean) },
    fillersOrBotoxNotes: { type: GraphQLString },
    listKnownAllergies: { type: GraphQLString },
    skinFlakyOrItch: { type: GraphQLBoolean },
    everDiagnosedWithRosacea: { type: GraphQLBoolean },
    pregnantOrNursing: { type: GraphQLBoolean },
    ultimateSkinCareGoals: { type: GraphQLString },
    anythingElseWeShouldKnow: { type: GraphQLString },
    consentFormSignature: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, context) {
    let token;

    if (context.isAuth) {
      token = context.cookies["access-token"];
    } else {
      token = context.cookies["guest-consent-form-access-token"];
    }

    const client = await Client.findOne({
      _id: jwt.decode(token).id.toString(),
    });

    if (!client) {
      throw new UserInputError("No client found.", {
        errors: {
          email: "No client found.",
        },
      });
    } else {
      client.consentForm.date = args.date;
      client.consentForm.surgeryLast3Months = args.surgeryLast3Months;
      client.consentForm.surgeryLast3MonthsNotes = args.surgeryLast3MonthsNotes;
      client.consentForm.anyHealthProblems = args.anyHealthProblems;
      client.consentForm.anyHealthProblemsNotes = args.anyHealthProblemsNotes;
      client.consentForm.listAnyMedications = args.listAnyMedications;
      client.consentForm.chemPeelsLastMonth = args.chemPeelsLastMonth;
      client.consentForm.waxingOnFaceLast5Days = args.waxingOnFaceLast5Days;
      client.consentForm.accutaneOrPrescription = args.accutaneOrPrescription;
      client.consentForm.accutaneOrPrescriptionNotes =
        args.accutaneOrPrescriptionNotes;
      client.consentForm.anyProductsContainingSalicyclicAcid =
        args.anyProductsContainingSalicyclicAcid;
      client.consentForm.anyProductsContainingGlycolicAcid =
        args.anyProductsContainingGlycolicAcid;
      client.consentForm.anyProductsContainingLacticAcid =
        args.anyProductsContainingLacticAcid;
      client.consentForm.anyProductsContainingExfoliatingScrubs =
        args.anyProductsContainingExfoliatingScrubs;
      client.consentForm.anyProductsContainingVitaminA =
        args.anyProductsContainingVitaminA;
      client.consentForm.fillersOrBotox = args.fillersOrBotox;
      client.consentForm.fillersOrBotoxNotes = args.fillersOrBotoxNotes;
      client.consentForm.listKnownAllergies = args.listKnownAllergies;
      client.consentForm.skinFlakyOrItch = args.skinFlakyOrItch;
      client.consentForm.everDiagnosedWithRosacea =
        args.everDiagnosedWithRosacea;
      client.consentForm.pregnantOrNursing = args.pregnantOrNursing;
      client.consentForm.ultimateSkinCareGoals = args.ultimateSkinCareGoals;
      client.consentForm.anythingElseWeShouldKnow =
        args.anythingElseWeShouldKnow;
      client.consentForm.consentFormSignature = args.consentFormSignature;
      client.consentForm.createdAt = new Date().toISOString();

      const res = await client.save();

      if (!context.isAuth) {
        context.res.clearCookie("guest-consent-form-access-token", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_CLIENT_ROOT
              : "localhost",
        });
      }

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "updateConsentForm",
        associatedClientFirstName: client.firstName,
        associatedClientLastName: client.lastName,
        createdByFirstName: client.firstName,
        createdByLastName: client.lastName,
        createdAt: Date.now(),
      });

      const updateNotifications = (staff) =>
        createNotificationFunction(newNotification, staff);

      let employeeRes = "";

      (
        await Employee.find({
          employeeRole: "Admin",
        })
      ).forEach(async (currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        employeeRes = await currentEmployee.save();
      });

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: employeeRes,
      });

      return {
        ...res,
        _id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        consentForm: client.consentForm,
      };
    }
  },
};

module.exports = updateConsentFormMutation;
