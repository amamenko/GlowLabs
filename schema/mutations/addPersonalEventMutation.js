const graphql = require("graphql");
const mongoose = require("mongoose");
const PersonalEvent = require("../../models/personalevent");
const PersonalEventType = require("../types/PersonalEventType");

const { GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLNonNull } = graphql;

const addPersonalEventMutation = {
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
};

module.exports = addPersonalEventMutation;
