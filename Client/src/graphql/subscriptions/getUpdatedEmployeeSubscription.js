import { gql } from "apollo-boost";

const getUpdatedEmployeeSubscription = gql`
  subscription getUpdatedEmployee($_id: ID) {
    getUpdatedEmployee(_id: $_id) {
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

export default getUpdatedEmployeeSubscription;
