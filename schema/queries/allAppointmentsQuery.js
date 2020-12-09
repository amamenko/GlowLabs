const graphql = require("graphql");
const AppointmentType = require("../types/AppointmentType");
const Appointment = require("../../models/appointment");

const { GraphQLList } = graphql;

const allAppointmentsQuery = {
  type: new GraphQLList(AppointmentType),
  async resolve(parent, args) {
    return await Appointment.find({});
  },
};

module.exports = allAppointmentsQuery;
