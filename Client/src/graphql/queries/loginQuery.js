import { gql } from "apollo-boost";

const loginQuery = gql`
  query($email: String, $password: String) {
    login(email: $email, password: $password) {
      _id
      accessToken
      refreshToken
    }
  }
`;

export default loginQuery;
