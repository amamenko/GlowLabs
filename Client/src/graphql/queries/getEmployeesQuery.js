import { gql } from "apollo-boost";

const getEmployeesQuery = gql`
  {
    employees {
      firstName
      lastName
      email
      phoneNumber
      _id
      password
      permanentPasswordSet
      employeeRole
      profilePicture
    }
  }
`;

export default getEmployeesQuery;
