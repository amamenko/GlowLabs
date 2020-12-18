import { gql } from "apollo-boost";

const getAppointmentQuery = gql`
  query getAppointmentQuery(
    $date: String
    $startTime: String
    $morningOrEvening: String
    $endTime: String
    $duration: Int
    $price: Int
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $bookedWithCardSquareID: String
  ) {
    appointment(
      date: $date
      startTime: $startTime
      morningOrEvening: $morningOrEvening
      endTime: $endTime
      duration: $duration
      price: $price
      bookedWithCardSquareID: $bookedWithCardSquareID
      client: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
      }
    ) {
      date
      startTime
      morningOrEvening
      endTime
      duration
      price
      treatments {
        name
        duration
        price
      }
      addOns {
        name
        duration
        price
      }
      client {
        firstName
        lastName
        email
        phoneNumber
      }
      bookedWithCardSquareID
      notes
      confirmed
    }
  }
`;

export default getAppointmentQuery;
