import { gql } from "apollo-boost";

const updateEmployeeInvalidateTokensMutation = gql`
  mutation {
    updateEmployeeInvalidateTokens {
      _id
      firstName
      lastName
      email
      phoneNumber
      password
      createdAt
      tokenCount
    }
  }
`;

export default updateEmployeeInvalidateTokensMutation;
