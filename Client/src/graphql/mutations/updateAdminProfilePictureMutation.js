import { gql } from "apollo-boost";

const updateAdminProfilePictureMutation = gql`
  mutation($id: ID, $profilePicture: String) {
    updateAdminProfilePicture(id: $id, profilePicture: $profilePicture) {
      _id
      firstName
      lastName
      email
      phoneNumber
      profilePicture
    }
  }
`;

export default updateAdminProfilePictureMutation;
