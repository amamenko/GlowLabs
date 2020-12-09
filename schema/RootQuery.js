const graphql = require("graphql");
const appointmentQuery = require("./queries/appointmentQuery");
const clientQuery = require("./queries/clientQuery");
const employeeQuery = require("./queries/employeeQuery");
const loginQuery = require("./queries/loginQuery");
const adminLoginQuery = require("./queries/adminLoginQuery");
const allPersonalEventsQuery = require("./queries/allPersonalEventsQuery");
const allAppointmentsQuery = require("./queries/allAppointmentsQuery");
const ownAppointmentsQuery = require("./queries/ownAppointmentsQuery");
const ownPastAppointmentsQuery = require("./queries/ownPastAppointmentsQuery");
const clientsQuery = require("./queries/clientsQuery");
const employeesQuery = require("./queries/employeesQuery");

const { GraphQLObjectType } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    appointment: appointmentQuery,
    client: clientQuery,
    employee: employeeQuery,
    login: loginQuery,
    adminLogin: adminLoginQuery,
    all_personal_events: allPersonalEventsQuery,
    all_appointments: allAppointmentsQuery,
    own_appointments: ownAppointmentsQuery,
    own_past_appointments: ownPastAppointmentsQuery,
    clients: clientsQuery,
    employees: employeesQuery,
  },
});

module.exports = RootQuery;
