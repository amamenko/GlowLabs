import { gql } from "apollo-boost";

gql`
  type TreatmentType {
    name: String!
    duration: Int!
    price: Int!
  }
`;

gql`
  type AddOnType {
    name: String!
    duration: Int!
    price: Int!
  }
`;

gql`
  input TreatmentInput {
    treatments: [TreatmentType]
  }
`;

gql`
  input AddOnInput {
    addOns: [AddOnType]
  }
`;

const addAppointmentMutation = gql`
  mutation addAppointmentMutation(
    $date: String!
    $startTime: String!
    $morningOrEvening: String!
    $endTime: String!
    $duration: Int!
    $price: Int!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $esthetician: String!
    $squareCustomerId: String
    $unsavedSquareCardIDs: String
    $bookedWithCardSquareID: String
    $treatments: [TreatmentInput]
    $addOns: [AddOnInput]
    $notes: String
  ) {
    addAppointment(
      date: $date
      startTime: $startTime
      morningOrEvening: $morningOrEvening
      endTime: $endTime
      duration: $duration
      price: $price
      esthetician: $esthetician
      client: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
        squareCustomerId: $squareCustomerId
        unsavedSquareCardIDs: $unsavedSquareCardIDs
      }
      treatments: $treatments
      addOns: $addOns
      bookedWithCardSquareID: $bookedWithCardSquareID
      notes: $notes
    ) {
      date
      startTime
      morningOrEvening
      endTime
      duration
      price
      createdAt
      esthetician
      client {
        firstName
        lastName
        email
        phoneNumber
        squareCustomerId
        unsavedSquareCardIDs
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
      bookedWithCardSquareID
      notes
      confirmed
    }
  }
`;

export default addAppointmentMutation;
