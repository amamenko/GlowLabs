import { gql } from "apollo-boost";

const deletePersonalEventMutation = gql`
  mutation($_id: ID) {
    deletePersonalEvent(_id: $_id) {
      _id
    }
  }
`;

export default deletePersonalEventMutation;
