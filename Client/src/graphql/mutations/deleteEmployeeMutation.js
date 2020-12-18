import { gql } from "apollo-boost";

const deleteEmployeeMutation = gql`
  mutation($_id: ID) {
    deleteEmployee(_id: $_id) {
      _id
    }
  }
`;

export default deleteEmployeeMutation;
