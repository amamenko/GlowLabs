import { gql } from "apollo-boost";

const resetNotificationsMutation = gql`
  mutation {
    resetNotifications {
      firstName
      lastName
      email
      phoneNumber
      employeeRole
      notifications {
        new
        type
        date
        time
        allDay
        associatedClientFirstName
        associatedClientLastName
        newAssociatedStaffFirstName
        newAssociatedStaffLastName
        originalAssociatedStaffFirstName
        originalAssociatedStaffLastName
        createdByFirstName
        createdByLastName
        createdAt
      }
    }
  }
`;

export default resetNotificationsMutation;
