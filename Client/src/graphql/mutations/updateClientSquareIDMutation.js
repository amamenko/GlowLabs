import { gql } from "apollo-boost";

const updateClientSquareIDMutation = gql`
  mutation(
    $squareCustomerId: String
    $firstName: String
    $lastName: String
    $email: String
  ) {
    updateClientSquareID(
      squareCustomerId: $squareCustomerId
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      squareCustomerId
      firstName
      lastName
      email
    }
  }
`;

export default updateClientSquareIDMutation;
