const graphql = require("graphql");
const PersonalEventType = require("../types/PersonalEventType");
const PersonalEvent = require("../../models/personalevent");

const { GraphQLList } = graphql;

const allPersonalEventsQuery = {
  type: new GraphQLList(PersonalEventType),
  async resolve(parent, args) {
    return await PersonalEvent.find({});
  },
};

module.exports = allPersonalEventsQuery;
