import { gql } from "apollo-boost";

const addClientMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String
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

export default addClientMutation;
