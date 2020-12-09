const graphql = require("graphql");
const AppointmentInput = require("../types/inputs/AppointmentInput");
const Appointment = require("../../models/appointment");

const { GraphQLID } = graphql;

const confirmAppointmentMutation = {
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
};

module.exports = confirmAppointmentMutation;
