const graphql = require("graphql");
const PersonalEventType = require("../types/PersonalEventType");
const PersonalEvent = require("../../models/personalevent");
const { UserInputError } = require("apollo-server");

const { GraphQLID } = graphql;

const deletePersonalEventMutation = {
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
};

module.exports = deletePersonalEventMutation;
