import { gql } from "apollo-boost";

const deleteClientMutation = gql`
  mutation($_id: ID) {
    deleteClient(_id: $_id) {
      _id
    }
  }
`;

export default deleteClientMutation;
