import { gql } from "apollo-boost";

const getOwnAppointmentsQuery = gql`
  query($_id: ID, $email: String) {
    own_appointments(_id: $_id, email: $email) {
      id
      date
      startTime
      morningOrEvening
      endTime
      duration
      price
      esthetician
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
        squareCustomerId
        unsavedSquareCardIDs
        firstName
        lastName
        email
        phoneNumber
      }
      bookedWithCardSquareID
      notes
      confirmed
    }
  }
`;

export default getOwnAppointmentsQuery;
