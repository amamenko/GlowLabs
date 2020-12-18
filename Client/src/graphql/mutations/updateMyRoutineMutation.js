import { gql } from "apollo-boost";

gql`
  input MyRoutineFieldsInputType {
    name: String
    frequency: String
    useNotes: String
    link: String
  }
`;

const updateMyRoutineMutation = gql`
  mutation(
    $morningCleanser: [MyRoutineFieldsInputType]
    $morningToner: [MyRoutineFieldsInputType]
    $morningSerum: [MyRoutineFieldsInputType]
    $morningMoisturizer: [MyRoutineFieldsInputType]
    $morningSPF: [MyRoutineFieldsInputType]
    $morningRX: [MyRoutineFieldsInputType]
    $morningEyeCream: [MyRoutineFieldsInputType]
    $eveningOilCleanser: [MyRoutineFieldsInputType]
    $eveningCleanser: [MyRoutineFieldsInputType]
    $eveningExfoliator: [MyRoutineFieldsInputType]
    $eveningTreatmentMask: [MyRoutineFieldsInputType]
    $eveningToner: [MyRoutineFieldsInputType]
    $eveningSerum: [MyRoutineFieldsInputType]
    $eveningMoisturizer: [MyRoutineFieldsInputType]
    $eveningNightMask: [MyRoutineFieldsInputType]
    $eveningOil: [MyRoutineFieldsInputType]
    $eveningSpotTreatment: [MyRoutineFieldsInputType]
    $eveningRX: [MyRoutineFieldsInputType]
    $eveningEyeCream: [MyRoutineFieldsInputType]
  ) {
    updateMyRoutine(
      morningCleanser: $morningCleanser
      morningToner: $morningToner
      morningSerum: $morningSerum
      morningMoisturizer: $morningMoisturizer
      morningSPF: $morningSPF
      morningRX: $morningRX
      morningEyeCream: $morningEyeCream
      eveningOilCleanser: $eveningOilCleanser
      eveningCleanser: $eveningCleanser
      eveningExfoliator: $eveningExfoliator
      eveningTreatmentMask: $eveningTreatmentMask
      eveningToner: $eveningToner
      eveningSerum: $eveningSerum
      eveningMoisturizer: $eveningMoisturizer
      eveningNightMask: $eveningNightMask
      eveningOil: $eveningOil
      eveningSpotTreatment: $eveningSpotTreatment
      eveningRX: $eveningRX
      eveningEyeCream: $eveningEyeCream
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

export default updateMyRoutineMutation;
