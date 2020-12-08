const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Appointment = require("../models/appointment");
const Client = require("../models/client");
const Employee = require("../models/employee");
const PersonalEvent = require("../models/personalevent");
const Notification = require("../models/notification");

const createTokens = require("../createTokens");
const createAdminTokens = require("../createAdminTokens");
const { validateRegistration } = require("../validation/validateRegistration");
const { UserInputError } = require("apollo-server");
const moment = require("moment");
const generator = require("generate-password");
const {
  ICalendar,
  YahooCalendar,
  GoogleCalendar,
  OutlookCalendar,
} = require("datebook");
const mjmlUtils = require("mjml-utils");
const nodemailer = require("nodemailer");

// Used to normalize phone numbers for use by Twilio
const phone = require("phone");

// Hide usernames and passwords
require("dotenv").config();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
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

const ClientInput = new GraphQLInputObjectType({
  name: "ClientInput",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    squareCustomerId: { type: GraphQLString },
    unsavedSquareCardIDs: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    password: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    tokenCount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

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

const ConsentFormType = new GraphQLObjectType({
  name: "ConsentFormType",
  fields: () => ({
    date: { type: GraphQLString },
    surgeryLast3Months: { type: GraphQLBoolean },
    surgeryLast3MonthsNotes: { type: GraphQLString },
    anyHealthProblems: { type: GraphQLBoolean },
    anyHealthProblemsNotes: { type: GraphQLString },
    listAnyMedications: { type: GraphQLString },
    chemPeelsLastMonth: { type: GraphQLBoolean },
    waxingOnFaceLast5Days: { type: GraphQLBoolean },
    accutaneOrPrescription: { type: GraphQLBoolean },
    accutaneOrPrescriptionNotes: { type: GraphQLString },
    anyProductsContainingSalicyclicAcid: { type: GraphQLBoolean },
    anyProductsContainingGlycolicAcid: { type: GraphQLBoolean },
    anyProductsContainingLacticAcid: { type: GraphQLBoolean },
    anyProductsContainingExfoliatingScrubs: { type: GraphQLBoolean },
    anyProductsContainingVitaminA: { type: GraphQLBoolean },
    fillersOrBotox: { type: GraphQLBoolean },
    fillersOrBotoxNotes: { type: GraphQLString },
    listKnownAllergies: { type: GraphQLString },
    skinFlakyOrItch: { type: GraphQLBoolean },
    everDiagnosedWithRosacea: { type: GraphQLBoolean },
    pregnantOrNursing: { type: GraphQLBoolean },
    ultimateSkinCareGoals: { type: GraphQLString },
    anythingElseWeShouldKnow: { type: GraphQLString },
    consentFormSignature: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

const MyRoutineFieldsInputType = new GraphQLInputObjectType({
  name: "MyRoutineFieldsInputType",
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

const AuthType = new GraphQLObjectType({
  name: "AuthType",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  }),
});

const TreatmentType = new GraphQLObjectType({
  name: "Treatment",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

const TreatmentInput = new GraphQLInputObjectType({
  name: "TreatmentInput",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

const AddOnType = new GraphQLObjectType({
  name: "AddOn",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

const AddOnInput = new GraphQLInputObjectType({
  name: "AddOnInput",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  }),
});

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

const AppointmentInput = new GraphQLObjectType({
  name: "AppointmentInput",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    appointment: {
      type: AppointmentType,
      args: {
        _id: { type: GraphQLString },
        date: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        duration: { type: GraphQLInt },
        price: { type: GraphQLInt },
        client: { type: ClientInput },
        bookedWithCardSquareID: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const appointment = await Appointment.findOne(args);

        if (!appointment) {
          throw new UserInputError("No appointment found.");
        }

        return {
          _id: appointment._id,
          date: appointment.date,
          startTime: appointment.startTime,
          morningOrEvening: appointment.morningOrEvening,
          endTime: appointment.endTime,
          duration: appointment.duration,
          price: appointment.price,
          client: appointment.client,
          treatments: appointment.treatments,
          addOns: appointment.addOns,
          bookedWithCardSquareID: appointment.bookedWithCardSquareID,
          notes: appointment.notes,
          confirmed: appointment.confirmed,
          createdAt: appointment.createdAt,
        };
      },
    },
    client: {
      type: ClientType,
      args: {
        _id: { type: GraphQLID },
        squareCustomerId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        createdAt: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const client = await Client.findOne(args);

        if (client === null) {
          throw new UserInputError("No client found.");
        } else {
          return client;
        }
      },
    },
    employee: {
      type: EmployeeType,
      args: {
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const employee = await Employee.findOne(args);

        if (employee === null) {
          throw new UserInputError("No employee found.");
        } else {
          return employee;
        }
      },
    },
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const client = await Client.findOne({ email: args.email });

        if (!client) {
          throw new UserInputError(
            "There is no registered client associated with that email."
          );
        }

        const passwordsAreIdentical = await bcrypt
          .compare(args.password, client.password)
          .catch((err) => {
            throw err;
          });

        if (!passwordsAreIdentical) {
          throw new UserInputError("Incorrect password.");
        }

        const generateDummyToken = (client) => {
          const token = jwt.sign(
            {
              id: client._id,
              auth: true,
            },
            process.env.JWT_SECRET_KEY_DUMMY,
            { expiresIn: "7d" }
          );
          return token;
        };

        const dummyToken = generateDummyToken(client);
        context.res.cookie("dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        const { accessToken, refreshToken } = createTokens(client);

        context.res.cookie("access-token", accessToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
        });

        context.res.cookie("refresh-token", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        return {
          _id: client._id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      },
    },
    adminLogin: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const employee = await Employee.findOne({ email: args.email });

        if (!employee) {
          throw new UserInputError(
            "There is no registered employee associated with that email."
          );
        } else {
          if (!employee.permanentPasswordSet) {
            // Entered password is identical to temporary password
            if (args.password === employee.password) {
              context.res.clearCookie("dummy-token");
              context.res.clearCookie("access-token");
              context.res.clearCookie("refresh-token");
              context.res.clearCookie("temporary-facebook-dummy-token");

              const generateAdminDummyToken = (employee) => {
                const token = jwt.sign(
                  {
                    id: employee._id,
                    employeeRole: employee.employeeRole,
                    auth: true,
                  },
                  process.env.JWT_SECRET_KEY_DUMMY,
                  { expiresIn: "15m" }
                );
                return token;
              };

              const generateAdminAccessToken = (employee) => {
                const token = jwt.sign(
                  {
                    id: employee._id,
                    employeeRole: employee.employeeRole,
                    email: employee.email,
                    phoneNumber: employee.phoneNumber,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    tokenCount: employee.tokenCount,
                  },
                  process.env.JWT_SECRET_KEY_ACCESS,
                  { expiresIn: "15m" }
                );
                return token;
              };

              const accessToken = generateAdminAccessToken(employee);
              const dummyToken = generateAdminDummyToken(employee);

              context.res.cookie("temporary-admin-access-token", accessToken, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true,
              });

              context.res.cookie("temporary-admin-dummy-token", dummyToken, {
                maxAge: 1000 * 60 * 15,
                httpOnly: false,
              });
            } else {
              throw new UserInputError("Incorrect password.");
            }
          } else {
            const passwordsAreIdentical = await bcrypt
              .compare(args.password, employee.password)
              .catch((err) => {
                throw err;
              });

            if (!passwordsAreIdentical) {
              throw new UserInputError("Incorrect password.");
            }

            const generateAdminDummyToken = (employee) => {
              const token = jwt.sign(
                {
                  id: employee._id,
                  employeeRole: employee.employeeRole,
                  auth: true,
                },
                process.env.JWT_SECRET_KEY_DUMMY,
                { expiresIn: "7d" }
              );
              return token;
            };

            const dummyToken = generateAdminDummyToken(employee);
            context.res.cookie("admin-dummy-token", dummyToken, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });

            const { accessToken, refreshToken } = createAdminTokens(employee);

            context.res.cookie("admin-access-token", accessToken, {
              maxAge: 1000 * 60 * 15,
              httpOnly: true,
            });

            context.res.cookie("admin-refresh-token", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              httpOnly: true,
            });

            context.res.clearCookie("dummy-token");
            context.res.clearCookie("access-token");
            context.res.clearCookie("refresh-token");
            context.res.clearCookie("temporary-facebook-dummy-token");

            return {
              _id: employee._id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
          }
        }
      },
    },
    all_personal_events: {
      type: new GraphQLList(PersonalEventType),
      async resolve(parent, args) {
        return await PersonalEvent.find({});
      },
    },
    all_appointments: {
      type: new GraphQLList(AppointmentType),
      async resolve(parent, args) {
        return await Appointment.find({});
      },
    },
    own_appointments: {
      type: new GraphQLList(AppointmentType),
      args: {
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const token = context.cookies["access-token"];

        if (!context.isAuth && !context.adminAuth) {
          throw new UserInputError("User is not authenticated.");
        }

        const allApps = await Appointment.find({});

        const filteredArr = allApps
          .filter((item) =>
            token
              ? item.client._id
                ? item.client._id.toString() === jwt.decode(token).id.toString()
                  ? item.client._id.toString() ===
                    jwt.decode(token).id.toString()
                  : item.client.email === jwt.decode(token).email.toString()
                  ? item.client.email === jwt.decode(token).email.toString()
                  : null
                : item.client.email === jwt.decode(token).email.toString()
                ? item.client.email === jwt.decode(token).email.toString()
                : null
              : item.client._id
              ? item.client._id.toString() === args._id
                ? item.client._id.toString() === args._id
                : item.client.email === args.email
                ? item.client.email === args.email
                : null
              : item.client.email
              ? item.client.email === args.email
                ? item.client.email === args.email
                : null
              : null
          )
          .filter(
            (item) =>
              moment(
                moment(item.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(item.date, "LL").format("LLLL").split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  item.startTime +
                  " " +
                  (Number(item.startTime.split(":")[0]) >= 12 ||
                  Number(item.startTime.split(":")[0]) < 9
                    ? "PM"
                    : "AM"),
                "LLLL"
              ).format() >= moment().format()
          )
          .sort((a, b) => {
            return (
              moment(
                moment(a.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(a.date, "LL").format("LLLL").split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  a.startTime +
                  " " +
                  (Number(a.startTime.split(":")[0]) >= 12 ||
                  Number(a.startTime.split(":")[0]) < 9
                    ? "PM"
                    : "AM"),
                "LLLL"
              ).utc() -
              moment(
                moment(b.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(b.date, "LL").format("LLLL").split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  b.startTime +
                  " " +
                  (Number(b.startTime.split(":")[0]) >= 12 ||
                  Number(b.startTime.split(":")[0]) < 9
                    ? "PM"
                    : "AM"),
                "LLLL"
              ).utc()
            );
          });

        return filteredArr;
      },
    },
    own_past_appointments: {
      type: new GraphQLList(AppointmentType),
      args: {
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const token = context.cookies["access-token"];

        if (!context.isAuth && !context.adminAuth) {
          throw new UserInputError("User is not authenticated.");
        }

        const allApps = await Appointment.find({});

        const filteredArr = allApps
          .filter((item) =>
            token
              ? item.client._id
                ? item.client._id.toString() === jwt.decode(token).id.toString()
                  ? item.client._id.toString() ===
                    jwt.decode(token).id.toString()
                  : item.client.email === jwt.decode(token).email.toString()
                  ? item.client.email === jwt.decode(token).email.toString()
                  : null
                : item.client.email === jwt.decode(token).email.toString()
                ? item.client.email === jwt.decode(token).email.toString()
                : null
              : item.client._id
              ? item.client._id.toString() === args._id
                ? item.client._id.toString() === args._id
                : item.client.email === args.email
                ? item.client.email === args.email
                : null
              : item.client.email
              ? item.client.email === args.email
                ? item.client.email === args.email
                : null
              : null
          )
          .filter(
            (item) =>
              moment(
                moment(item.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(item.date, "LL").format("LLLL").split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  item.startTime +
                  " " +
                  (Number(item.startTime.split(":")[0]) >= 12 ||
                  Number(item.startTime.split(":")[0]) < 9
                    ? "PM"
                    : "AM"),
                "LLLL"
              ).format() < moment().format()
          )
          .sort((a, b) => {
            return (
              moment(
                moment(b.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(b.date, "LL").format("LLLL").split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  b.startTime +
                  " " +
                  (Number(b.startTime.split(":")[0]) >= 12 ||
                  Number(b.startTime.split(":")[0]) < 9
                    ? "PM"
                    : "AM"),
                "LLLL"
              ).utc() -
              moment(
                moment(a.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(a.date, "LL").format("LLLL").split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  a.startTime +
                  " " +
                  (Number(a.startTime.split(":")[0]) >= 12 ||
                  Number(a.startTime.split(":")[0]) < 9
                    ? "PM"
                    : "AM"),
                "LLLL"
              ).utc()
            );
          });

        return filteredArr;
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      async resolve(parent, args) {
        return await Client.find({});
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      async resolve(parent, args) {
        return await Employee.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAppointment: {
      type: AppointmentType,
      args: {
        date: { type: new GraphQLNonNull(GraphQLString) },
        startTime: { type: new GraphQLNonNull(GraphQLString) },
        morningOrEvening: { type: new GraphQLNonNull(GraphQLString) },
        endTime: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLInt) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        client: { type: new GraphQLList(ClientInput) },
        esthetician: { type: new GraphQLNonNull(GraphQLString) },
        treatments: { type: new GraphQLList(TreatmentInput) },
        addOns: { type: new GraphQLList(AddOnInput) },
        bookedWithCardSquareID: { type: GraphQLString },
        notes: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const foundClient = await Client.findOne({
          email: args.client[0].email,
          phoneNumber: args.client[0].phoneNumber,
        });

        let appt_res;

        const createEventObject = (appointment) => {
          const eventObject = {
            title: "Glow Labs Appointment",
            location: "1506 Broadway, Hewlett, NY 11557",
            description: appointment
              ? (appointment.treatments[0].name
                  ? appointment.treatments[0].name === "ChemicalPeel"
                    ? "Chemical Peel"
                    : appointment.treatments[0].name
                  : "") +
                (appointment.treatments[0].name.includes("Salt Cave")
                  ? " Treatment"
                  : " Facial") +
                (appointment.addOns[0]
                  ? appointment.addOns[0].name
                    ? ", " +
                      appointment.addOns
                        .map((x) =>
                          x.name === "ExtraExtractions"
                            ? "Extra Extractions Add On"
                            : x.name + " Add On"
                        )
                        .join(", ")
                    : ""
                  : "")
              : "",
            start: appointment
              ? moment(
                  moment(appointment.date, "LL")
                    .format("LLLL")
                    .split(" ")
                    .slice(
                      0,
                      moment(appointment.date, "LL").format("LLLL").split(" ")
                        .length - 2
                    )
                    .join(" ") +
                    " " +
                    appointment.startTime +
                    " " +
                    appointment.morningOrEvening,
                  "LLLL"
                ).format()
              : "",
            end: appointment
              ? moment(
                  moment(appointment.date, "LL")
                    .format("LLLL")
                    .split(" ")
                    .slice(
                      0,
                      moment(appointment.date, "LL").format("LLLL").split(" ")
                        .length - 2
                    )
                    .join(" ") +
                    " " +
                    appointment.startTime +
                    " " +
                    appointment.morningOrEvening,
                  "LLLL"
                )
                  .add(appointment.duration, "minutes")
                  .format()
              : "",
          };

          return eventObject;
        };

        const twilioTextingFunction = (clientObject, appointmentObject) => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const client = require("twilio")(accountSid, authToken);

          // Format phone number for Twilio texting purposes
          const clientPhoneNumber = phone(clientObject.phoneNumber);

          client.messages
            .create({
              body:
                "Hi, " +
                clientObject.firstName[0].toUpperCase() +
                clientObject.firstName.slice(1).toLowerCase() +
                "! Your Glow Labs appointment has been scheduled for " +
                appointmentObject.startTime +
                " " +
                appointmentObject.morningOrEvening +
                " on " +
                moment(appointmentObject.date, "MMMM D, YYYY").format(
                  "dddd, MMMM Do, YYYY"
                ) +
                " at 1506 Broadway, Hewlett, NY 11557. Reply Y to confirm.\n\nIf you need to cancel or reschedule your appointment, please call us at (516) 442-8122 or visit https://is.gd/glowlabs. We look forward to seeing you soon!",
              from: process.env.GLOW_LABS_TEXT_NUMBER,
              to: process.env.TWILIO_TEST_TEXT_NUMBER,
              // clientPhoneNumber[0]
            })
            .then((message) => console.log(message.sid))
            .catch((err) => console.log(err));
        };

        const auth = context.isAuth;
        const token = context.cookies["access-token"];

        const adminToken = context.cookies["admin-access-token"];

        let transporter = nodemailer.createTransport({
          host: "smtp.mail.yahoo.com",
          service: "yahoo",
          secure: false,
          auth: {
            user: process.env.GLOW_LABS_EMAIL,
            pass: process.env.GLOW_LABS_EMAIL_APP_PASSWORD,
          },
          debug: false,
          logger: true,
        });

        let appointment = new Appointment({
          _id: new mongoose.Types.ObjectId(),
          date: args.date,
          startTime: args.startTime,
          morningOrEvening: args.morningOrEvening,
          endTime: args.endTime,
          duration: args.duration,
          price: args.price,
          esthetician: args.esthetician,
          bookedWithCardSquareID: args.bookedWithCardSquareID,
          createdAt: args.createdAt,
          client: foundClient
            ? auth !== undefined && !adminToken
              ? {
                  _id: jwt.decode(token).id,
                  firstName: jwt.decode(token).firstName,
                  lastName: jwt.decode(token).lastName,
                  email: jwt.decode(token).email,
                  phoneNumber: jwt.decode(token).phoneNumber,
                }
              : {
                  _id: await Client.findOne({
                    email: args.client[0].email,
                  })._id,
                  firstName: args.client[0].firstName,
                  lastName: args.client[0].lastName,
                  email: args.client[0].email,
                  phoneNumber: args.client[0].phoneNumber,
                }
            : {
                _id: new mongoose.Types.ObjectId(),
                firstName: args.client[0].firstName,
                lastName: args.client[0].lastName,
                email: args.client[0].email,
                phoneNumber: args.client[0].phoneNumber,
              },
          treatments: args.treatments,
          addOns: args.addOns === [] ? null : args.addOns,
          notes: args.notes === "" ? null : args.notes,
          confirmed: false,
        });

        let client;

        if (!foundClient) {
          client = new Client({
            _id: new mongoose.Types.ObjectId(),
            firstName: args.client[0].firstName,
            lastName: args.client[0].lastName,
            email: args.client[0].email,
            phoneNumber: args.client[0].phoneNumber,
            squareCustomerId: args.client[0].squareCustomerId,
            unsavedSquareCardIDs: [args.client[0].unsavedSquareCardIDs],
          });

          const emailTaken = await Client.findOne({
            email: args.client[0].email,
          });
          const phoneNumberTaken = await Client.findOne({
            phoneNumber: args.client[0].phoneNumber,
          });

          if (!emailTaken || !phoneNumberTaken) {
            appt_res = await appointment.save();
            const client_res = await client.save();

            const iCalEvent = new ICalendar(createEventObject(appt_res));
            const yahooCalendarEvent = new YahooCalendar(
              createEventObject(appt_res)
            );
            const googleCalendarEvent = new GoogleCalendar(
              createEventObject(appt_res)
            );
            const outlookCalendarEvent = new OutlookCalendar(
              createEventObject(appt_res)
            );

            mjmlUtils
              .inject(`./emails/BookedAppointment.html`, {
                firstName:
                  client_res.firstName[0].toUpperCase() +
                  client_res.firstName.slice(1).toLowerCase(),
                date: appt_res.date,
                day: moment(appt_res.date, "LL").format("dddd"),
                startTime: appt_res.startTime + " " + appt_res.morningOrEvening,
                treatment: appt_res.treatments[0].name.includes("Salt Cave")
                  ? "Salt Cave"
                  : appt_res.treatments[0].name === "ChemicalPeel"
                  ? "Chemical Peel with " + appt_res.esthetician
                  : appt_res.treatments[0].name +
                    " Facial with " +
                    appt_res.esthetician,
                eventCalendarLink: client_res.email
                  .toLowerCase()
                  .includes("yahoo.com")
                  ? yahooCalendarEvent.render()
                  : client_res.email.toLowerCase().includes("gmail.com")
                  ? googleCalendarEvent.render()
                  : client_res.email.toLowerCase().includes("hotmail.com") ||
                    client_res.email.toLowerCase().includes("outlook.com")
                  ? outlookCalendarEvent.render()
                  : iCalEvent.render(),
                consentFormLink:
                  "http://localhost:4000/" + client_res._id + "/consentform",
              })
              .then(async (finalTemplate) => {
                await transporter.sendMail({
                  from: process.env.GLOW_LABS_EMAIL,
                  to: client_res.email,
                  subject: "Your Glow Labs Appointment",
                  html: finalTemplate,
                });
              });

            // Sends appointment confirmation text from Twilio
            twilioTextingFunction(client_res, appt_res);

            const generateGuestConsentFormAccessToken = (client_res) => {
              const token = jwt.sign(
                {
                  id: client_res._id,
                  auth: true,
                },
                process.env.JWT_SECRET_KEY_ACCESS,
                { expiresIn: "7d" }
              );
              return token;
            };

            const guestConsentFormAccessToken = generateGuestConsentFormAccessToken(
              client_res
            );

            if (!adminToken) {
              // Set Guest Consent Form Cookie
              context.res.cookie(
                "guest-consent-form-access-token",
                guestConsentFormAccessToken,
                {
                  maxAge: 1000 * 60 * 60 * 24 * 7,
                }
              );
            }

            return {
              ...appt_res,
              ...client_res,
              createdAt: appt_res.createdAt,
              client: {
                createdAt: client_res.createdAt,
                firstName: client_res.firstName,
                lastName: client_res.lastName,
                email: client_res.email,
                phoneNumber: client_res.phoneNumber,
                consentForm: client_res.consentForm,
                squareCustomerId: client_res.squareCustomerId,
              },
              date: appt_res.date,
              startTime: appt_res.startTime,
              morningOrEvening: appt_res.morningOrEvening,
              endTime: appt_res.endTime,
              duration: appt_res.duration,
              price: appt_res.price,
              treatments: appt_res.treatments,
              addOns: appt_res.addOns,
              bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
              notes: appt_res.notes,
              confirmed: appt_res.confirmed,
            };
          }
          appt_res = await appointment.save();

          const iCalEvent = new ICalendar(createEventObject(appt_res));
          const yahooCalendarEvent = new YahooCalendar(
            createEventObject(appt_res)
          );
          const googleCalendarEvent = new GoogleCalendar(
            createEventObject(appt_res)
          );
          const outlookCalendarEvent = new OutlookCalendar(
            createEventObject(appt_res)
          );

          mjmlUtils
            .inject(`./emails/BookedAppointment.html`, {
              firstName:
                args.client[0].firstName[0].toUpperCase() +
                args.client[0].firstName.slice(1).toLowerCase(),
              date: appt_res.date,
              day: moment(appt_res.date, "LL").format("dddd"),
              startTime: appt_res.startTime + " " + appt_res.morningOrEvening,
              treatment: appt_res.treatments[0].name.includes("Salt Cave")
                ? "Salt Cave"
                : appt_res.treatments[0].name === "ChemicalPeel"
                ? "Chemical Peel with " + appt_res.esthetician
                : appt_res.treatments[0].name +
                  " Facial with " +
                  appt_res.esthetician,
              eventCalendarLink: args.client[0].email
                .toLowerCase()
                .includes("yahoo.com")
                ? yahooCalendarEvent.render()
                : args.client[0].email.toLowerCase().includes("gmail.com")
                ? googleCalendarEvent.render()
                : args.client[0].email.toLowerCase().includes("hotmail.com") ||
                  args.client[0].email.toLowerCase().includes("outlook.com")
                ? outlookCalendarEvent.render()
                : iCalEvent.render(),
              consentFormLink:
                "http://localhost:4000/" + client_res._id + "/consentform",
            })
            .then(async (finalTemplate) => {
              await transporter.sendMail({
                from: process.env.GLOW_LABS_EMAIL,
                to: args.client[0].email,
                subject: "Your Glow Labs Appointment",
                html: finalTemplate,
              });
            });

          // Sends appointment confirmation text from Twilio
          twilioTextingFunction(args.client[0], appt_res);

          client = await Client.findOne({
            email: args.client[0].email,
          });

          const generateGuestConsentFormAccessToken = (client) => {
            const token = jwt.sign(
              {
                id: client._id,
                auth: true,
              },
              process.env.JWT_SECRET_KEY_ACCESS,
              { expiresIn: "7d" }
            );
            return token;
          };

          const guestConsentFormAccessToken = generateGuestConsentFormAccessToken(
            client
          );

          if (!adminToken) {
            // Set Guest Consent Form Cookie
            context.res.cookie(
              "guest-consent-form-access-token",
              guestConsentFormAccessToken,
              {
                maxAge: 1000 * 60 * 60 * 24 * 7,
              }
            );
          }

          return {
            ...appt_res,
            ...client,
            createdAt: appt_res.createdAt,
            client: {
              createdAt: client.createdAt,
              firstName: client.firstName,
              lastName: client.lastName,
              email: client.email,
              phoneNumber: client.phoneNumber,
              consentForm: client.consentForm,
            },
            esthetician: appt_res.esthetician,
            date: appt_res.date,
            startTime: appt_res.startTime,
            morningOrEvening: appt_res.morningOrEvening,
            endTime: appt_res.endTime,
            duration: appt_res.duration,
            price: appt_res.price,
            treatments: appt_res.treatments,
            addOns: appt_res.addOns,
            bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
            notes: appt_res.notes,
            confirmed: appt_res.confirmed,
          };
        }
        appt_res = await appointment.save();

        console.log("THIS ONE");

        const iCalEvent = new ICalendar(createEventObject(appt_res));
        const yahooCalendarEvent = new YahooCalendar(
          createEventObject(appt_res)
        );
        const googleCalendarEvent = new GoogleCalendar(
          createEventObject(appt_res)
        );
        const outlookCalendarEvent = new OutlookCalendar(
          createEventObject(appt_res)
        );

        mjmlUtils
          .inject(`./emails/BookedAppointment.html`, {
            firstName:
              args.client[0].firstName[0].toUpperCase() +
              args.client[0].firstName.slice(1).toLowerCase(),
            date: appt_res.date,
            day: moment(appt_res.date, "LL").format("dddd"),
            startTime: appt_res.startTime + " " + appt_res.morningOrEvening,
            treatment: appt_res.treatments[0].name.includes("Salt Cave")
              ? "Salt Cave"
              : appt_res.treatments[0].name === "ChemicalPeel"
              ? "Chemical Peel with " + appt_res.esthetician
              : appt_res.treatments[0].name +
                " Facial with " +
                appt_res.esthetician,
            eventCalendarLink: args.client[0].email
              .toLowerCase()
              .includes("yahoo.com")
              ? yahooCalendarEvent.render()
              : args.client[0].email.toLowerCase().includes("gmail.com")
              ? googleCalendarEvent.render()
              : args.client[0].email.toLowerCase().includes("hotmail.com") ||
                args.client[0].email.toLowerCase().includes("outlook.com")
              ? outlookCalendarEvent.render()
              : iCalEvent.render(),
            consentFormLink:
              "http://localhost:4000/" + foundClient._id + "/consentform",
          })
          .then(async (finalTemplate) => {
            await transporter.sendMail({
              from: process.env.GLOW_LABS_EMAIL,
              to: args.client[0].email,
              subject: "Your Glow Labs Appointment",
              html: finalTemplate,
            });
          });

        // Sends appointment confirmation text from Twilio
        twilioTextingFunction(args.client[0], appt_res);

        client = await Client.findOne({
          email: args.client[0].email,
        });

        if (auth === undefined) {
          const generateGuestConsentFormAccessToken = (client) => {
            const token = jwt.sign(
              {
                id: client._id,
                auth: true,
              },
              process.env.JWT_SECRET_KEY_ACCESS,
              { expiresIn: "7d" }
            );
            return token;
          };

          const guestConsentFormAccessToken = generateGuestConsentFormAccessToken(
            client
          );

          if (!adminToken) {
            // Set Guest Consent Form Cookie
            context.res.cookie(
              "guest-consent-form-access-token",
              guestConsentFormAccessToken,
              {
                maxAge: 1000 * 60 * 60 * 24 * 7,
              }
            );
          }
        }

        return {
          ...appt_res,
          ...client,
          createdAt: appt_res.createdAt,
          esthetician: appt_res.esthetician,
          client: {
            createdAt: client.createdAt,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            consentForm: client.consentForm,
          },
          date: appt_res.date,
          startTime: appt_res.startTime,
          morningOrEvening: appt_res.morningOrEvening,
          endTime: appt_res.endTime,
          duration: appt_res.duration,
          price: appt_res.price,
          treatments: appt_res.treatments,
          addOns: appt_res.addOns,
          bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
          notes: appt_res.notes,
          confirmed: appt_res.confirmed,
        };
      },
    },
    confirmAppointment: {
      type: AppointmentInput,
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        let filter = {
          _id: args._id,
        };

        const update = {
          confirmed: true,
        };

        const appointment = await Appointment.findOneAndUpdate(filter, update, {
          new: true,
        });

        const appt_res = appointment.save();

        return {
          ...appt_res,
          createdAt: appt_res.createdAt,
          esthetician: appt_res.esthetician,
          date: appt_res.date,
          startTime: appt_res.startTime,
          morningOrEvening: appt_res.morningOrEvening,
          endTime: appt_res.endTime,
          duration: appt_res.duration,
          price: appt_res.price,
          treatments: appt_res.treatments,
          addOns: appt_res.addOns,
          bookedWithCardSquareID: appt_res.bookedWithCardSquareID,
          notes: appt_res.notes,
          confirmed: appt_res.confirmed,
        };
      },
    },
    addPersonalEvent: {
      type: PersonalEventType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        staff: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        startTime: { type: new GraphQLNonNull(GraphQLString) },
        endTime: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLInt) },
        allDay: { type: GraphQLBoolean },
        blockTime: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let personalEvent = new PersonalEvent({
          _id: new mongoose.Types.ObjectId(),
          title: args.title,
          notes: args.notes,
          staff: args.staff,
          date: args.date,
          startTime: args.startTime,
          endTime: args.endTime,
          duration: args.duration,
          allDay: args.allDay,
          blockTime: args.blockTime,
        });
        return personalEvent.save();
      },
    },
    addClient: {
      type: ClientType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
      },
      resolve(parent, args) {
        let client = new Client({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phoneNumber: args.phoneNumber,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        const adminAccessToken = context.cookies["admin-access-token"];

        if (!adminAccessToken) {
          throw new UserInputError("Admin is not authenticated.");
        } else {
          await Client.findByIdAndDelete({
            _id: args._id,
          });

          return {
            _id: args._id,
          };
        }
      },
    },
    addEmployee: {
      type: EmployeeType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        employeeRole: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args, context) {
        const adminAccessToken = context.cookies["admin-access-token"];

        if (adminAccessToken) {
          // Generate temporary password for new employee
          const password = generator.generate({
            length: 10,
            numbers: true,
            lowercase: true,
            uppercase: true,
            excludeSimilarCharacters: true,
          });

          let transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            service: "yahoo",
            secure: false,
            auth: {
              user: process.env.GLOW_LABS_EMAIL,
              pass: process.env.GLOW_LABS_EMAIL_APP_PASSWORD,
            },
            debug: false,
            logger: true,
          });

          let employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: password,
            phoneNumber: args.phoneNumber,
            employeeRole: args.employeeRole,
          });

          mjmlUtils
            .inject(`./emails/TemporaryPassword.html`, {
              firstName:
                employee.firstName[0].toUpperCase() +
                employee.firstName.slice(1).toLowerCase(),
              temporaryPassword: employee.password,
              adminLoginLink: "http://localhost:3000/admin",
            })
            .then(async (finalTemplate) => {
              await transporter.sendMail({
                from: process.env.GLOW_LABS_EMAIL,
                to: employee.email,
                subject: "Glow Labs Temporary Password",
                html: finalTemplate,
              });
            });

          const newEmployeeRes = await employee.save();

          const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

          const addingEmployee = await Employee.findOne({
            _id: decodedAdminID,
          });

          if (addingEmployee) {
            let filter = {
              _id: decodedAdminID,
            };

            let update;

            let newNotification = new Notification({
              _id: new mongoose.Types.ObjectId(),
              new: true,
              type: "addStaff",
              date: "",
              time: "",
              associatedClientFirstName: "",
              associatedClientLastName: "",
              originalAssociatedStaffFirstName: args.firstName,
              originalAssociatedStaffLastName: args.lastName,
              newAssociatedStaffFirstName: "",
              newAssociatedStaffLastName: "",
              createdByFirstName: addingEmployee.firstName,
              createdByLastName: addingEmployee.lastName,
            });

            if (addingEmployee.notifications.length >= 20) {
              let sortedArr = addingEmployee.notifications.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              );
              sortedArr[0] = newNotification;

              update = {
                notifications: sortedArr,
              };
            } else {
              if (addingEmployee.notifications) {
                addingEmployee.notifications.push(newNotification);
              } else {
                addingEmployee.notifications = [newNotification];
              }

              update = {
                notifications: addingEmployee.notifications,
              };
            }

            const updatedEmployee = await Employee.findOneAndUpdate(
              filter,
              update,
              {
                new: true,
              }
            );

            const updatedEmployeeRes = await updatedEmployee.save();

            return {
              ...newEmployeeRes,
              ...updatedEmployeeRes,
            };
          }
        }
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        const adminAccessToken = context.cookies["admin-access-token"];

        if (!adminAccessToken) {
          throw new UserInputError("Admin is not authenticated.");
        } else {
          await Employee.findByIdAndDelete({
            _id: args._id,
          });

          return {
            _id: args._id,
          };
        }
      },
    },
    updateConsentForm: {
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
          client.consentForm.surgeryLast3MonthsNotes =
            args.surgeryLast3MonthsNotes;
          client.consentForm.anyHealthProblems = args.anyHealthProblems;
          client.consentForm.anyHealthProblemsNotes =
            args.anyHealthProblemsNotes;
          client.consentForm.listAnyMedications = args.listAnyMedications;
          client.consentForm.chemPeelsLastMonth = args.chemPeelsLastMonth;
          client.consentForm.waxingOnFaceLast5Days = args.waxingOnFaceLast5Days;
          client.consentForm.accutaneOrPrescription =
            args.accutaneOrPrescription;
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

          const res = client.save();

          if (!context.isAuth) {
            context.res.clearCookie("guest-consent-form-access-token");
          }

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
    },
    updateMyRoutine: {
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
    },
    updateClientInvalidateTokens: {
      type: ClientType,
      async resolve(parent, args, context) {
        if (!context.isAuth) {
          throw new UserInputError("User is not authenticated.");
        } else {
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
            context.res.cookie(
              "logout",
              { logout: true },
              {
                maxAge: 1000 * 15,
                httpOnly: true,
              }
            );
            client.tokenCount += 1;
            context.res.clearCookie("access-token");
            context.res.clearCookie("refresh-token");
            context.res.clearCookie("dummy-token");
            const res = client.save();

            return {
              ...res,
              id: client._id,
              firstName: client.firstName,
              lastName: client.lastName,
              email: client.email,
              phoneNumber: client.phoneNumber,
              password: client.password,
              createdAt: client.createdAt,
              tokenCount: client.tokenCount,
            };
          }
        }
      },
    },
    updateEmployeeInvalidateTokens: {
      type: EmployeeType,
      async resolve(parent, args, context) {
        const token = context.cookies["admin-access-token"];

        if (!token) {
          throw new UserInputError("User is not authenticated.");
        } else {
          const employee = await Employee.findOne({
            _id: jwt.decode(token).id.toString(),
          });

          if (!employee) {
            throw new UserInputError("No registered employee found.", {
              errors: {
                email: "No registered employee found.",
              },
            });
          } else {
            context.res.cookie(
              "logout",
              { logout: true },
              {
                maxAge: 1000 * 15,
                httpOnly: true,
              }
            );
            employee.tokenCount += 1;
            context.res.clearCookie("admin-access-token");
            context.res.clearCookie("admin-refresh-token");
            context.res.clearCookie("admin-dummy-token");

            const res = employee.save();

            return {
              ...res,
              id: employee._id,
              firstName: employee.firstName,
              lastName: employee.lastName,
              email: employee.email,
              phoneNumber: employee.phoneNumber,
              password: employee.password,
              createdAt: employee.createdAt,
              tokenCount: employee.tokenCount,
            };
          }
        }
      },
    },
    deleteAppointment: {
      type: AppointmentInput,
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        const accessToken = context.cookies["access-token"];
        const adminAccessToken = context.cookies["admin-access-token"];

        if (!context.isAuth && !adminAccessToken) {
          throw new UserInputError("User is not authenticated.");
        } else {
          if (accessToken) {
            const allApps = await Appointment.find({});

            const filteredArr = allApps
              .filter((item) =>
                item.client._id
                  ? item.client._id.toString() ===
                    jwt.decode(accessToken).id.toString()
                  : null
              )
              .filter((item) => (item._id ? item._id === args._id : null));

            if (filteredArr) {
              deletedAppointment = await Appointment.findByIdAndDelete({
                _id: args._id,
              });

              return {
                _id: args._id,
              };
            }
          } else {
            if (adminAccessToken) {
              deletedAppointment = await Appointment.findByIdAndDelete({
                _id: args._id,
              });

              return {
                _id: args._id,
              };
            } else {
              return null;
            }
          }
        }
      },
    },
    deletePersonalEvent: {
      type: PersonalEventType,
      args: {
        _id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        const accessToken = context.cookies["admin-access-token"];

        if (!context.adminAuth) {
          throw new UserInputError("Admin is not authenticated.");
        } else {
          if (accessToken) {
            await PersonalEvent.findByIdAndDelete({
              _id: args._id,
            });

            return {
              _id: args._id,
            };
          }
        }
      },
    },
    deleteMyRoutineItem: {
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
              for (
                let i = 0;
                i < client.myRoutine.morningCleanser.length;
                i++
              ) {
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
              for (
                let i = 0;
                i < client.myRoutine.morningMoisturizer.length;
                i++
              ) {
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
                  client.myRoutine.morningRX[i]._id.toString() ===
                  args.morningRXID
                ) {
                  client.myRoutine.morningRX = client.myRoutine.morningRX.filter(
                    (x) => x._id.toString() !== args.morningRXID
                  );
                }
              }
            } else if (args.morningEyeCreamID) {
              for (
                let i = 0;
                i < client.myRoutine.morningEyeCream.length;
                i++
              ) {
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
              for (
                let i = 0;
                i < client.myRoutine.eveningCleanser.length;
                i++
              ) {
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
              for (
                let i = 0;
                i < client.myRoutine.eveningOilCleanser.length;
                i++
              ) {
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
              for (
                let i = 0;
                i < client.myRoutine.eveningExfoliator.length;
                i++
              ) {
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
              for (
                let i = 0;
                i < client.myRoutine.eveningMoisturizer.length;
                i++
              ) {
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
              for (
                let i = 0;
                i < client.myRoutine.eveningNightMask.length;
                i++
              ) {
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
                  client.myRoutine.eveningRX[i]._id.toString() ===
                  args.eveningRXID
                ) {
                  client.myRoutine.eveningRX = client.myRoutine.eveningRX.filter(
                    (x) => x._id.toString() !== args.eveningRXID
                  );
                }
              }
            } else if (args.eveningEyeCreamID) {
              for (
                let i = 0;
                i < client.myRoutine.eveningEyeCream.length;
                i++
              ) {
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
    },
    updateAdminPassword: {
      type: EmployeeType,
      args: {
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        if (!context.adminAuth) {
          throw new UserInputError("User is not authenticated.");
        } else {
          let token;

          if (context.cookies["temporary-admin-access-token"]) {
            token = context.cookies["temporary-admin-access-token"];
          } else if (context.cookies["admin-access-token"]) {
            token = context.cookies["admin-access-token"];
          }

          let filter = {
            _id: jwt.decode(token).id.toString(),
          };

          const update = {
            permanentPasswordSet: true,
            password: await bcrypt
              .hash(args.password, 12)
              .then((hash) => (args.password = hash))
              .catch((err) => {
                throw err;
              }),
          };

          const employee = await Employee.findOneAndUpdate(filter, update, {
            new: true,
          });

          const res = employee.save();

          return {
            ...res,
            id: employee._id,
            permanentPasswordSet: employee.permanentPasswordSet,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            password: employee.password,
          };
        }
      },
    },
    updateClientProfilePicture: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
        profilePicture: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const adminAccessToken = context.cookies["admin-access-token"];

        if (!adminAccessToken) {
          throw new UserInputError("Admin is not authenticated.");
        } else {
          const client = await Client.findOneAndUpdate(
            {
              _id: args.id,
            },
            { profilePicture: args.profilePicture },
            {
              new: true,
            }
          );

          const res = await client.save();

          return {
            ...res,
            _id: client._id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            profilePicture: client.profilePicture,
          };
        }
      },
    },
    updateAdminProfilePicture: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        profilePicture: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const adminAccessToken = context.cookies["admin-access-token"];

        if (!adminAccessToken) {
          throw new UserInputError("Admin is not authenticated.");
        } else {
          const employee = await Employee.findOneAndUpdate(
            {
              _id: args.id,
            },
            { profilePicture: args.profilePicture },
            {
              new: true,
            }
          );

          const res = await employee.save();

          return {
            ...res,
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            profilePicture: employee.profilePicture,
          };
        }
      },
    },
    updatePersonalEvent: {
      type: PersonalEventType,
      args: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        notes: { type: GraphQLString },
        date: { type: GraphQLString },
        staff: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        duration: { type: GraphQLInt },
        allDay: { type: GraphQLBoolean },
        blockTime: { type: GraphQLBoolean },
      },
      async resolve(parent, args, context) {
        if (!context.adminAuth) {
          throw new UserInputError("Admin is not authenticated.");
        } else {
          const personalEvent = await PersonalEvent.findOne({
            _id: args._id,
          });

          const filter = {
            _id: args._id,
          };

          const update = {
            title: args.title ? args.title : personalEvent.title,
            notes: args.notes ? args.notes : personalEvent.notes,
            date: args.date ? args.date : personalEvent.date,
            staff: args.staff ? args.staff : personalEvent.staff,
            startTime: args.startTime
              ? args.startTime
              : personalEvent.startTime,
            endTime: args.endTime ? args.endTime : personalEvent.endTime,
            duration: args.duration ? args.duration : personalEvent.duration,
            allDay:
              args.allDay !== personalEvent.allDay
                ? args.allDay
                : personalEvent.allDay,
            blockTime:
              args.blockTime !== personalEvent.blockTime
                ? args.blockTime
                : personalEvent.blockTime,
          };

          const updatedPersonalEvent = await PersonalEvent.findOneAndUpdate(
            filter,
            update,
            {
              new: true,
            }
          );

          const res = updatedPersonalEvent.save();

          return {
            ...res,
            _id: updatedPersonalEvent._id,
            title: updatedPersonalEvent.title,
            notes: updatedPersonalEvent.notes,
            date: updatedPersonalEvent.date,
            staff: updatedPersonalEvent.staff,
            startTime: updatedPersonalEvent.startTime,
            endTime: updatedPersonalEvent.endTime,
            duration: updatedPersonalEvent.duration,
            allDay: updatedPersonalEvent.allDay,
            blockTime: updatedPersonalEvent.blockTime,
          };
        }
      },
    },
    updateClientInformation: {
      type: ClientType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const temporaryFacebookAccessToken =
          context.cookies["temporary-facebook-access-token"];
        const accessToken = context.cookies["access-token"];

        let matchedClient;
        let client;
        let filter;

        if (!context.isAuth) {
          throw new UserInputError("User is not authenticated.");
        } else {
          if (temporaryFacebookAccessToken) {
            client = await Client.findOne({
              _id: jwt.decode(temporaryFacebookAccessToken).id.toString(),
            });
            filter = {
              _id: jwt.decode(temporaryFacebookAccessToken).id.toString(),
            };
          } else {
            if (accessToken) {
              client = await Client.findOne({
                _id: jwt.decode(accessToken).id.toString(),
              });
              filter = {
                _id: jwt.decode(accessToken).id.toString(),
              };
            }
          }

          const update = {
            firstName: args.firstName ? args.firstName : client.firstName,
            lastName: args.lastName ? args.lastName : client.lastName,
            email: args.email ? args.email : client.email,
            password: args.password ? args.password : client.password,
            phoneNumber: args.phoneNumber
              ? args.phoneNumber
              : client.phoneNumber,
          };

          matchedClient = await Client.findOneAndUpdate(filter, update, {
            new: true,
          });

          const res = matchedClient.save();

          return {
            ...res,
            id: matchedClient._id,
            firstName: matchedClient.firstName,
            lastName: matchedClient.lastName,
            email: matchedClient.email,
            phoneNumber: matchedClient.phoneNumber,
            password: matchedClient.password,
          };
        }
      },
    },
    updateClientSquareID: {
      type: ClientType,
      args: {
        squareCustomerId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        let matchedClient;
        let filter = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        };

        const update = {
          squareCustomerId: args.squareCustomerId,
        };

        matchedClient = await Client.findOneAndUpdate(filter, update, {
          new: true,
        });

        const res = matchedClient.save();

        return {
          ...res,
          id: matchedClient._id,
          squareCustomerId: matchedClient.squareCustomerId,
          firstName: matchedClient.firstName,
          lastName: matchedClient.lastName,
          email: matchedClient.email,
          phoneNumber: matchedClient.phoneNumber,
          password: matchedClient.password,
        };
      },
    },
    updateUnsavedSquareCardIDs: {
      type: ClientType,
      args: {
        unsavedSquareCardID: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const client = await Client.findOne({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        });

        if (!client) {
          throw new UserInputError("No registered client found.", {
            errors: {
              email: "No registered client found.",
            },
          });
        } else {
          client.unsavedSquareCardIDs.push(args.unsavedSquareCardID);

          const res = client.save();

          return {
            ...res,
            _id: client._id,
            squareCustomerId: client.squareCustomerId,
            unsavedSquareCardIDs: client.unsavedSquareCardIDs,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            password: client.password,
          };
        }
      },
    },
    removeOneUnsavedSquareCardIDs: {
      type: ClientType,
      args: {
        unsavedSquareCardID: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        const client = await Client.findOne({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        });

        if (!client) {
          throw new UserInputError("No registered client found.", {
            errors: {
              email: "No registered client found.",
            },
          });
        } else {
          client.unsavedSquareCardIDs.splice(
            client.unsavedSquareCardIDs.indexOf(args.unsavedSquareCardID),
            1
          );

          const res = client.save();

          return {
            ...res,
            _id: client._id,
            squareCustomerId: client.squareCustomerId,
            unsavedSquareCardIDs: client.unsavedSquareCardIDs,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            password: client.password,
          };
        }
      },
    },
    registerClient: {
      type: ClientType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, context) {
        const clientEmailMatch = await Client.findOne({
          email: args.email,
        });

        if (
          clientEmailMatch &&
          (clientEmailMatch.password || clientEmailMatch.tokenCount > 0)
        ) {
          throw new UserInputError("This email has already been registered.", {
            errors: {
              email: "This email has already been registered.",
            },
          });
        }

        const clientPhoneMatch = await Client.findOne({
          phoneNumber: args.phoneNumber,
        });

        if (
          clientPhoneMatch &&
          (clientPhoneMatch.password || clientPhoneMatch.tokenCount > 0)
        ) {
          throw new UserInputError(
            "This phone number has already been registered.",
            {
              errors: {
                phoneNumber: "This phone number has already been registered.",
              },
            }
          );
        }

        const { validRegistration, errors } = validateRegistration(
          args.email,
          args.phoneNumber,
          args.password,
          args.confirmPassword
        );

        if (!validRegistration) {
          throw new UserInputError("Registration error.", { errors });
        }

        let client = new Client({
          _id: new mongoose.Types.ObjectId(),
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phoneNumber: args.phoneNumber,
          // Password is hashed
          password: await bcrypt
            .hash(args.password, 12)
            .then((hash) => (args.password = hash))
            .catch((err) => {
              throw err;
            }),
        });

        const res = await client.save();

        const generateDummyToken = (res) => {
          const token = jwt.sign(
            {
              id: res._id,
              auth: true,
            },
            process.env.JWT_SECRET_KEY_DUMMY,
            { expiresIn: "7d" }
          );
          return token;
        };

        const dummyToken = generateDummyToken(res);
        context.res.cookie("dummy-token", dummyToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        const { accessToken, refreshToken } = createTokens(client);

        context.res.cookie("access-token", accessToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
        });

        context.res.cookie("refresh-token", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        return {
          ...res,
          id: client._id,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phoneNumber: client.phoneNumber,
          password: client.password,
          createdAt: client.createdAt,
          accessToken: accessToken,
          refreshToken: refreshToken,
          tokenCount: client.tokenCount,
        };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
