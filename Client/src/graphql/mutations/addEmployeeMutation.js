import { gql } from "apollo-boost";

const addEmployeeMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $employeeRole: [String]
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      employeeRole: $employeeRole
    ) {
      firstName
      lastName
      email
      phoneNumber
      employeeRole
    }
  }
`;

export default addEmployeeMutation;
