import { gql } from "apollo-boost";

const getEmployeeQuery = gql`
  query(
    $_id: ID
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    employee(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
      employeeRole
      permanentPasswordSet
      password
      tokenCount
      createdAt
      profilePicture
      notifications {
        _id
        new
        type
        date
        time
        allDay
        associatedClientFirstName
        associatedClientLastName
        originalAssociatedStaffFirstName
        originalAssociatedStaffLastName
        newAssociatedStaffFirstName
        newAssociatedStaffLastName
        createdByFirstName
        createdByLastName
        createdAt
      }
    }
  }
`;

export default getEmployeeQuery;
