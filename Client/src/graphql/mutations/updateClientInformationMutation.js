import { gql } from "apollo-boost";

const updateClientInformationMutation = gql`
  mutation(
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $password: String
  ) {
    updateClientInformation(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
    ) {
      firstName
      lastName
      email
      phoneNumber
      password
    }
  }
`;

export default updateClientInformationMutation;
