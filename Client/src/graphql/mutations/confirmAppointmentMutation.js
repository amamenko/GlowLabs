import { gql } from "apollo-boost";

const confirmAppointmentMutation = gql`
  mutation($_id: ID) {
    confirmAppointment(_id: $_id) {
      createdAt
      esthetician
      date
      startTime
      morningOrEvening
      endTime
      duration
      price
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

export default confirmAppointmentMutation;
