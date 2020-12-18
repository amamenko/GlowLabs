import { gql } from "apollo-boost";

const updateConsentFormMutation = gql`
  mutation(
    $date: String!
    $surgeryLast3Months: Boolean!
    $surgeryLast3MonthsNotes: String
    $anyHealthProblems: Boolean!
    $anyHealthProblemsNotes: String
    $listAnyMedications: String
    $chemPeelsLastMonth: Boolean!
    $waxingOnFaceLast5Days: Boolean!
    $accutaneOrPrescription: Boolean!
    $accutaneOrPrescriptionNotes: String
    $anyProductsContainingSalicyclicAcid: Boolean
    $anyProductsContainingGlycolicAcid: Boolean
    $anyProductsContainingLacticAcid: Boolean
    $anyProductsContainingExfoliatingScrubs: Boolean
    $anyProductsContainingVitaminA: Boolean
    $fillersOrBotox: Boolean!
    $fillersOrBotoxNotes: String
    $listKnownAllergies: String
    $skinFlakyOrItch: Boolean
    $everDiagnosedWithRosacea: Boolean
    $pregnantOrNursing: Boolean
    $ultimateSkinCareGoals: String
    $anythingElseWeShouldKnow: String
    $consentFormSignature: String!
  ) {
    updateConsentForm(
      date: $date
      surgeryLast3Months: $surgeryLast3Months
      surgeryLast3MonthsNotes: $surgeryLast3MonthsNotes
      anyHealthProblems: $anyHealthProblems
      anyHealthProblemsNotes: $anyHealthProblemsNotes
      listAnyMedications: $listAnyMedications
      chemPeelsLastMonth: $chemPeelsLastMonth
      waxingOnFaceLast5Days: $waxingOnFaceLast5Days
      accutaneOrPrescription: $accutaneOrPrescription
      accutaneOrPrescriptionNotes: $accutaneOrPrescriptionNotes
      anyProductsContainingSalicyclicAcid: $anyProductsContainingSalicyclicAcid
      anyProductsContainingGlycolicAcid: $anyProductsContainingGlycolicAcid
      anyProductsContainingLacticAcid: $anyProductsContainingLacticAcid
      anyProductsContainingExfoliatingScrubs: $anyProductsContainingExfoliatingScrubs
      anyProductsContainingVitaminA: $anyProductsContainingVitaminA
      fillersOrBotox: $fillersOrBotox
      fillersOrBotoxNotes: $fillersOrBotoxNotes
      listKnownAllergies: $listKnownAllergies
      skinFlakyOrItch: $skinFlakyOrItch
      everDiagnosedWithRosacea: $everDiagnosedWithRosacea
      pregnantOrNursing: $pregnantOrNursing
      ultimateSkinCareGoals: $ultimateSkinCareGoals
      anythingElseWeShouldKnow: $anythingElseWeShouldKnow
      consentFormSignature: $consentFormSignature
    ) {
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
    }
  }
`;

export default updateConsentFormMutation;
