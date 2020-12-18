import { gql } from "apollo-boost";

const getOwnPastAppointmentsQuery = gql`
  query($_id: ID, $email: String) {
    own_past_appointments(_id: $_id, email: $email) {
      id
      date
      startTime
      morningOrEvening
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

export default getOwnPastAppointmentsQuery;
