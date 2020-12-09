const graphql = require("graphql");
const PersonalEventType = require("../types/PersonalEventType");
const PersonalEvent = require("../../models/personalevent");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt } = graphql;

const updatePersonalEventMutation = {
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
        startTime: args.startTime ? args.startTime : personalEvent.startTime,
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
};

module.exports = updatePersonalEventMutation;
