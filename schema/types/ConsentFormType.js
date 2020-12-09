const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const ConsentFormType = new GraphQLObjectType({
  name: "ConsentFormType",
  fields: () => ({
    date: { type: GraphQLString },
    surgeryLast3Months: { type: GraphQLBoolean },
    surgeryLast3MonthsNotes: { type: GraphQLString },
    anyHealthProblems: { type: GraphQLBoolean },
    anyHealthProblemsNotes: { type: GraphQLString },
    listAnyMedications: { type: GraphQLString },
    chemPeelsLastMonth: { type: GraphQLBoolean },
    waxingOnFaceLast5Days: { type: GraphQLBoolean },
    accutaneOrPrescription: { type: GraphQLBoolean },
    accutaneOrPrescriptionNotes: { type: GraphQLString },
    anyProductsContainingSalicyclicAcid: { type: GraphQLBoolean },
    anyProductsContainingGlycolicAcid: { type: GraphQLBoolean },
    anyProductsContainingLacticAcid: { type: GraphQLBoolean },
    anyProductsContainingExfoliatingScrubs: { type: GraphQLBoolean },
    anyProductsContainingVitaminA: { type: GraphQLBoolean },
    fillersOrBotox: { type: GraphQLBoolean },
    fillersOrBotoxNotes: { type: GraphQLString },
    listKnownAllergies: { type: GraphQLString },
    skinFlakyOrItch: { type: GraphQLBoolean },
    everDiagnosedWithRosacea: { type: GraphQLBoolean },
    pregnantOrNursing: { type: GraphQLBoolean },
    ultimateSkinCareGoals: { type: GraphQLString },
    anythingElseWeShouldKnow: { type: GraphQLString },
    consentFormSignature: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = ConsentFormType;
