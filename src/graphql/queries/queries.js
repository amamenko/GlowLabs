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
      _id
      password
    }
  }
`;

const getAllAppointmentsQuery = gql`
  {
    all_appointments {
      date
      startTime
      endTime
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
        _id
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
    own_appointments {
      date
      startTime
      endTime
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
        _id
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
    $startTime: String
    $endTime: String
    $duration: Int
    $price: Int
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    appointment(
      date: $date
      startTime: $startTime
      endTime: $endTime
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
      startTime
      endTime
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
    $_id: ID
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $createdAt: String
  ) {
    client(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      createdAt: $createdAt
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
      createdAt
      password
    }
  }
`;

const loginQuery = gql`
  query($email: String, $password: String) {
    login(email: $email, password: $password) {
      _id
      accessToken
      refreshToken
    }
  }
`;

const addAppointmentMutation = gql`
  mutation addAppointmentMutation(
    $date: String!
    $startTime: String!
    $endTime: String!
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
      startTime: $startTime
      endTime: $endTime
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
      startTime
      endTime
      duration
      price
      createdAt
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

const updateClientInvalidateTokensMutation = gql`
  mutation {
    updateClientInvalidateTokensMutation {
      _id
      firstName
      lastName
      email
      phoneNumber
      password
      createdAt
      tokenCount
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
  updateClientInvalidateTokensMutation,
  registerClientMutation
};
