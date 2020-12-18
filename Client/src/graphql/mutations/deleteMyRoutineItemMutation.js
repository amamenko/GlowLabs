import { gql } from "apollo-boost";

const deleteMyRoutineItemMutation = gql`
  mutation(
    $morningCleanserID: ID
    $morningTonerID: ID
    $morningSerumID: ID
    $morningMoisturizerID: ID
    $morningSPFID: ID
    $morningRXID: ID
    $morningEyeCreamID: ID
    $eveningOilCleanserID: ID
    $eveningCleanserID: ID
    $eveningExfoliatorID: ID
    $eveningTreatmentMaskID: ID
    $eveningTonerID: ID
    $eveningSerumID: ID
    $eveningMoisturizerID: ID
    $eveningNightMaskID: ID
    $eveningOilID: ID
    $eveningSpotTreatmentID: ID
    $eveningRXID: ID
    $eveningEyeCreamID: ID
  ) {
    deleteMyRoutineItem(
      morningCleanserID: $morningCleanserID
      morningTonerID: $morningTonerID
      morningSerumID: $morningSerumID
      morningMoisturizerID: $morningMoisturizerID
      morningSPFID: $morningSPFID
      morningRXID: $morningRXID
      morningEyeCreamID: $morningEyeCreamID
      eveningOilCleanserID: $eveningOilCleanserID
      eveningCleanserID: $eveningCleanserID
      eveningExfoliatorID: $eveningExfoliatorID
      eveningTreatmentMaskID: $eveningTreatmentMaskID
      eveningTonerID: $eveningTonerID
      eveningSerumID: $eveningSerumID
      eveningMoisturizerID: $eveningMoisturizerID
      eveningNightMaskID: $eveningNightMaskID
      eveningOilID: $eveningOilID
      eveningSpotTreatmentID: $eveningSpotTreatmentID
      eveningRXID: $eveningRXID
      eveningEyeCreamID: $eveningEyeCreamID
    ) {
      morningCleanser {
        _id
        name
        frequency
        useNotes
        link
      }
      morningToner {
        _id
        name
        frequency
        useNotes
        link
      }
      morningSerum {
        _id
        name
        frequency
        useNotes
        link
      }
      morningMoisturizer {
        _id
        name
        frequency
        useNotes
        link
      }
      morningSPF {
        _id
        name
        frequency
        useNotes
        link
      }
      morningRX {
        _id
        name
        frequency
        useNotes
        link
      }
      morningEyeCream {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningOilCleanser {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningCleanser {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningExfoliator {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningTreatmentMask {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningToner {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningSerum {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningMoisturizer {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningNightMask {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningOil {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningSpotTreatment {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningRX {
        _id
        name
        frequency
        useNotes
        link
      }
      eveningEyeCream {
        _id
        name
        frequency
        useNotes
        link
      }
    }
  }
`;

export default deleteMyRoutineItemMutation;
