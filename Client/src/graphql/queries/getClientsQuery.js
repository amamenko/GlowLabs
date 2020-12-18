import { gql } from "apollo-boost";

const getClientsQuery = gql`
  {
    clients {
      squareCustomerId
      unsavedSquareCardIDs
      firstName
      lastName
      email
      phoneNumber
      profilePicture
      tokenCount
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
      _id
      password
    }
  }
`;

export default getClientsQuery;
