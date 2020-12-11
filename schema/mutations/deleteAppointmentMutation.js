const graphql = require("graphql");
const jwt = require("jsonwebtoken");
const Appointment = require("../../models/appointment");
const AppointmentInput = require("../types/inputs/AppointmentInput");
const { UserInputError } = require("apollo-server");

const { GraphQLID } = graphql;

const deleteAppointmentMutation = {
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
};

module.exports = deleteAppointmentMutation;
