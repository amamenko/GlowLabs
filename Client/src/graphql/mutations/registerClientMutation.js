import { gql } from "apollo-boost";

const registerClientMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      confirmPassword: $confirmPassword
    ) {
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export default registerClientMutation;
