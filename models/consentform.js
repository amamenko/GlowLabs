const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentDate = new Date().toISOString();

const ConsentFormSchema = new Schema({
  date: String,
  surgeryLast3Months: Boolean,
  surgeryLast3MonthsNotes: { type: String, default: "" },
  anyHealthProblems: Boolean,
  anyHealthProblemsNotes: { type: String, default: "" },
  listAnyMedications: String,
  chemPeelsLastMonth: Boolean,
  waxingOnFaceLast5Days: Boolean,
  accutaneOrPrescription: Boolean,
  accutaneOrPrescriptionNotes: String,
  anyProductsContainingSalicyclicAcid: { type: Boolean, default: false },
  anyProductsContainingGlycolicAcid: { type: Boolean, default: false },
  anyProductsContainingLacticAcid: { type: Boolean, default: false },
  anyProductsContainingExfoliatingScrubs: { type: Boolean, default: false },
  anyProductsContainingVitaminA: { type: Boolean, default: false },
  fillersOrBotox: Boolean,
  fillersOrBotoxNotes: { type: String, default: "" },
  listKnownAllergies: { type: String, default: "" },
  skinFlakyOrItch: { type: Boolean, default: false },
  everDiagnosedWithRosacea: { type: Boolean, default: false },
  pregnantOrNursing: { type: Boolean, default: false },
  ultimateSkinCareGoals: { type: String, default: "" },
  anythingElseWeShouldKnow: { type: String, default: "" },
  consentFormSignature: String,
  createdAt: { type: Date, default: currentDate },
});

module.exports = mongoose.model("ConsentForm", ConsentFormSchema);
