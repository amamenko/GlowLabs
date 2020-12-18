import { gql } from "apollo-boost";

const updateAdminPasswordMutation = gql`
  mutation($password: String) {
    updateAdminPassword(password: $password) {
      _id
      permanentPasswordSet
      firstName
      lastName
      email
      phoneNumber
      password
    }
  }
`;

export default updateAdminPasswordMutation;
