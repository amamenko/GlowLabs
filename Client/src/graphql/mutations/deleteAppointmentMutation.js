import { gql } from "apollo-boost";

const deleteAppointmentMutation = gql`
  mutation($_id: ID) {
    deleteAppointment(_id: $_id) {
      _id
    }
  }
`;

export default deleteAppointmentMutation;
