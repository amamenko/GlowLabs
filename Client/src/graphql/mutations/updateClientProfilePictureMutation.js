import { gql } from "apollo-boost";

const updateClientProfilePictureMutation = gql`
  mutation($id: ID, $profilePicture: String) {
    updateClientProfilePicture(id: $id, profilePicture: $profilePicture) {
      _id
      firstName
      lastName
      email
      phoneNumber
      profilePicture
    }
  }
`;

export default updateClientProfilePictureMutation;
