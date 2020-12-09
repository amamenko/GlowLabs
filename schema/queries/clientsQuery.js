const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");

const { GraphQLList } = graphql;

const clientsQuery = {
  type: new GraphQLList(ClientType),
  async resolve(parent, args) {
    return await Client.find({});
  },
};

module.exports = clientsQuery;
