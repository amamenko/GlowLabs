import { gql } from "apollo-boost";

gql`
  input AddOnInput {
    addOns: [AddOnType]
  }
`;

gql`
  type AddOnType {
    name: String!
    duration: Int!
    price: Int!
  }
`;

const getClientsQuery = gql`
  {
    clients {
      firstName
      lastName
      email
      phoneNumber
      id
    }
  }
`;

const getAllAppointmentsQuery = gql`
  {
    appointments {
      date
      time
      duration
      price
      treatments {
        name
        duration
        price
      }
      addOns {
        name
        duration
        price
      }
      client {
        id
        firstName
        lastName
        email
        phoneNumber
      }
      notes
    }
  }
`;

const getOwnAppointmentsQuery = gql`
  {
    appointments {
      date
      time
      duration
      price
      treatments {
        name
        duration
        price
      }
      addOns {
        name
        duration
        price
      }
      client {
        id
        firstName
        lastName
        email
        phoneNumber
      }
      notes
    }
  }
`;

const getAppointmentQuery = gql`
  query getAppointmentQuery(
    $date: String
    $time: String
    $duration: Int
    $price: Int
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    appointment(
      date: $date
      time: $time
      duration: $duration
      price: $price
      client: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
      }
    ) {
      date
      time
      duration
      price
      treatments {
        name
        duration
        price
      }
      addOns {
        name
        duration
        price
      }
      client {
        firstName
        lastName
        email
        phoneNumber
      }
      notes
    }
  }
`;

const getClientQuery = gql`
  query(
    $id: ID
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $createdAt: String
  ) {
    appointment(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      createdAt: $createdAt
    ) {
      id
      firstName
      lastName
      email
      phoneNumber
      createdAt
    }
  }
`;

const loginQuery = gql`
  query($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;

const addAppointmentMutation = gql`
  mutation addAppointmentMutation(
    $date: String!
    $time: String!
    $duration: Int!
    $price: Int!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $treatment_name: String!
    $treatment_duration: Int!
    $treatment_price: Int!
    $addOns: [AddOnInput]
    $notes: String
  ) {
    addAppointment(
      date: $date
      time: $time
      duration: $duration
      price: $price
      client: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
      }
      treatments: [
        {
          name: $treatment_name
          duration: $treatment_duration
          price: $treatment_price
        }
      ]
      addOns: $addOns
      notes: $notes
    ) {
      date
      time
      duration
      price
      client {
        firstName
        lastName
        email
        phoneNumber
      }
      treatments {
        name
        price
        duration
      }
      addOns {
        name
        price
        duration
      }
      notes
    }
  }
`;

const addClientMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
  ) {
    addClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

const registerClientMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      confirmPassword: $confirmPassword
    ) {
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export {
  loginQuery,
  getClientsQuery,
  getClientQuery,
  getOwnAppointmentsQuery,
  getAllAppointmentsQuery,
  getAppointmentQuery,
  addAppointmentMutation,
  addClientMutation,
  registerClientMutation
};
