import { gql } from "apollo-boost";

const getClientQuery = gql`
  query(
    $_id: ID
    $squareCustomerId: String
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $createdAt: String
  ) {
    client(
      _id: $_id
      squareCustomerId: $squareCustomerId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      createdAt: $createdAt
    ) {
      _id
      squareCustomerId
      unsavedSquareCardIDs
      firstName
      lastName
      email
      phoneNumber
      createdAt
      profilePicture
      password
      consentForm {
        date
        surgeryLast3Months
        surgeryLast3MonthsNotes
        anyHealthProblems
        anyHealthProblemsNotes
        listAnyMedications
        chemPeelsLastMonth
        waxingOnFaceLast5Days
        accutaneOrPrescription
        accutaneOrPrescriptionNotes
        anyProductsContainingSalicyclicAcid
        anyProductsContainingGlycolicAcid
        anyProductsContainingLacticAcid
        anyProductsContainingExfoliatingScrubs
        anyProductsContainingVitaminA
        fillersOrBotox
        fillersOrBotoxNotes
        listKnownAllergies
        skinFlakyOrItch
        everDiagnosedWithRosacea
        pregnantOrNursing
        ultimateSkinCareGoals
        anythingElseWeShouldKnow
        consentFormSignature
        createdAt
      }
      myRoutine {
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
  }
`;

export default getClientQuery;
