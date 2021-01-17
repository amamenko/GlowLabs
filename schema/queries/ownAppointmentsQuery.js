const graphql = require("graphql");
const AppointmentType = require("../types/AppointmentType");
const Appointment = require("../../models/appointment");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLID, GraphQLList } = graphql;

const ownAppointmentsQuery = {
  type: new GraphQLList(AppointmentType),
  args: {
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const token = context.cookies["access-token"];
    const adminToken = context.cookies["admin-access-token"];

    if (!token && !adminToken) {
      throw new UserInputError("User is not authenticated.");
    }

    const allApps = await Appointment.find({});

    const filteredArr = allApps
      .filter((item) =>
        token
          ? item.client._id
            ? item.client._id.toString() === jwt.decode(token).id.toString()
              ? item.client._id.toString() === jwt.decode(token).id.toString()
              : item.client.email === jwt.decode(token).email.toString()
              ? item.client.email === jwt.decode(token).email.toString()
              : null
            : item.client.email === jwt.decode(token).email.toString()
            ? item.client.email === jwt.decode(token).email.toString()
            : null
          : // No token, search by client ID
          item.client._id
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
};

module.exports = ownAppointmentsQuery;
