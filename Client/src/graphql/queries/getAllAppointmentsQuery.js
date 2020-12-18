import { gql } from "apollo-boost";

const getAllAppointmentsQuery = gql`
  {
    all_appointments {
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

export default getAllAppointmentsQuery;
