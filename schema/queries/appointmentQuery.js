const graphql = require("graphql");
const ClientInput = require("../types/inputs/ClientInput");
const AppointmentType = require("../types/AppointmentType");
const Appointment = require("../../models/appointment");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLInt } = graphql;

const appointmentQuery = {
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
};

module.exports = appointmentQuery;
