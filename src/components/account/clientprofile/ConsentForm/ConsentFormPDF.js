import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import GlowLabsCroppedLogo from "../../../../../src/images/GlowLabsCroppedLogo.jpg";

// Consent Form PDF
const ConsentFormPDF = (props) => {
  // Styles for Consent Form PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      marginLeft: 10,
      marginRight: 10,
    },
    text: {
      fontFamily: "Montserrat",
    },
    section: {
      fontFamily: "Montserrat",
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    contactSection: {
      fontFamily: "Montserrat",
      marginLeft: 15,
      marginTop: -40,
      padding: 10,
      flexGrow: 1,
      lineHeight: 1.5,
      fontWeight: "bold",
    },
    questionSection: {
      fontFamily: "Montserrat",
      lineHeight: 1.5,
      marginLeft: 15,
      marginBottom: 150,
      padding: 10,
      flexGrow: 1,
    },
    consentSection: {
      fontFamily: "Montserrat",
      lineHeight: 1.5,
      marginLeft: 15,
      marginBottom: 200,
      marginTop: -10,
      padding: 10,
      flexGrow: 1,
    },
    individualQuestion: {
      fontFamily: "Montserrat",
      marginTop: 10,
      marginRight: 50,
    },
    consentFormDate: {
      fontFamily: "Montserrat",
      marginTop: 90,
      marginRight: 50,
    },
    singleLineQuestion: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    formValues: {
      fontSize: 9,
      display: "inline-block",
    },
    consentFormParagraph: {
      fontSize: 9,
      display: "inline-block",
    },
    formValuesAnswer: {
      fontSize: 9,
      marginLeft: 5,
      display: "inline-block",
    },
    formValuesSecondary: {
      fontSize: 9,
      marginLeft: 20,
    },
    GlowLabsContact: {
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 7,
      top: 15,
      left: 25,
      right: 55,
      color: "grey",
      opacity: 0.7,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
      opacity: 0.7,
    },
    signatureContainer: {
      position: "absolute",
      width: "25%",
      bottom: 55,
      left: 10,
      borderColor: "grey",
      borderWidth: 1,
    },
    signatureImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.GlowLabsContact} fixed={true}>
          <Text>GlowLaboratories, LLC</Text>
          <Text>&#8226;</Text>
          <Text>1506 Broadway, Hewlett, NY 11557</Text>
          <Text>&#8226;</Text>
          <Text>(516) 442 - 8122</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "20vh",
            marginTop: "2vh",
          }}
          fixed={true}
        >
          <Image
            src={GlowLabsCroppedLogo}
            style={{
              width: "50%",
              textAlign: "center",
            }}
          />
          <Text
            style={{
              fontFamily: "Montserrat",
              textAlign: "center",
              width: "100%",
              marginTop: "2vh",
            }}
          >
            Consent Form
          </Text>
        </View>
        <View style={styles.contactSection} fixed={true}>
          <Text style={styles.formValues}>
            First Name:{" "}
            {props.getClientData ? props.getClientData.client.firstName : null}
          </Text>
          <Text style={styles.formValues}>
            Last Name:{" "}
            {props.getClientData ? props.getClientData.client.lastName : null}
          </Text>
          <Text style={styles.formValues}>
            Email:{" "}
            {props.getClientData ? props.getClientData.client.email : null}
          </Text>
          <Text style={styles.formValues}>
            Date Submitted:{" "}
            {props.getClientData ? props.consentFormLastUpdated : null}
          </Text>
        </View>
        <View style={styles.questionSection}>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Have you had any surgery in the last three months?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.surgeryLast3Months
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <Text style={styles.formValuesSecondary}>
              If yes, please specify:{" "}
              {props.getClientData
                ? props.getClientData.client.consentForm.surgeryLast3MonthsNotes
                  ? props.getClientData.client.consentForm
                      .surgeryLast3MonthsNotes
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Do you have any health problems we should know about?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.anyHealthProblems
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <Text style={styles.formValuesSecondary}>
              If yes, please specify:{" "}
              {props.getClientData
                ? props.getClientData.client.consentForm.anyHealthProblemsNotes
                  ? props.getClientData.client.consentForm
                      .anyHealthProblemsNotes
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.formValues}>
              Please list any medications, vitamins, and/or supplements that you
              take regularly and that may affect your skin.
            </Text>
            <Text style={styles.formValuesSecondary}>
              {props.getClientData
                ? props.getClientData.client.consentForm.listAnyMedications
                  ? props.getClientData.client.consentForm.listAnyMedications
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Have you had any chemical peels, lasers, microdermabrasion, or
                resurfacing treatments in the last month?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.chemPeelsLastMonth
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Have you had waxing on your face in the last five days?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.waxingOnFaceLast5Days
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Do you use Accutane, Renee, Renova, or any other prescription
                skin products?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .accutaneOrPrescription
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <Text style={styles.formValuesSecondary}>
              If yes, please specify:{" "}
              {props.getClientData
                ? props.getClientData.client.consentForm
                    .accutaneOrPrescriptionNotes
                  ? props.getClientData.client.consentForm
                      .accutaneOrPrescriptionNotes
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.formValues}>
              Are you currently using any products that contain the following
              ingredients?
            </Text>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValuesSecondary}>Salicyclic Acid:</Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .anyProductsContainingSalicyclicAcid
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValuesSecondary}>Glycolic Acid:</Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .anyProductsContainingGlycolicAcid
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValuesSecondary}>Lactic Acid:</Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .anyProductsContainingLacticAcid
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValuesSecondary}>
                Exfoliating Scrubs:
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .anyProductsContainingExfoliatingScrubs
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValuesSecondary}>
                Vitamin A (Retinol):
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .anyProductsContainingVitaminA
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Have you been treated with fillers or Botox in the last three
                weeks?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.fillersOrBotox
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
            <Text style={styles.formValuesSecondary}>
              If yes, when?{" "}
              {props.getClientData
                ? props.getClientData.client.consentForm.fillersOrBotoxNotes
                  ? props.getClientData.client.consentForm.fillersOrBotoxNotes
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.formValues}>
              Please list your known allergies, skin condition, or skin
              irritants.
            </Text>
            <Text style={styles.formValuesSecondary}>
              {props.getClientData
                ? props.getClientData.client.consentForm.listKnownAllergies
                  ? props.getClientData.client.consentForm.listKnownAllergies
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Does your skin ever get flaky or itch?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.skinFlakyOrItch
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Have you ever been diagnosed with rosacea?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm
                      .everDiagnosedWithRosacea
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.individualQuestion}>
            <View style={styles.singleLineQuestion}>
              <Text style={styles.formValues}>
                Are you pregnant, nursing, or attempting to become pregnant?
              </Text>
              <Text style={styles.formValuesAnswer}>
                {props.getClientData
                  ? props.getClientData.client.consentForm.pregnantOrNursing
                    ? "Yes"
                    : "No"
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.formValues}>
              What are your ultimate skin care goals?
            </Text>
            <Text style={styles.formValuesSecondary}>
              {props.getClientData
                ? props.getClientData.client.consentForm.ultimateSkinCareGoals
                  ? props.getClientData.client.consentForm.ultimateSkinCareGoals
                  : "__________"
                : null}
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.formValues}>
              Anything else we should know before we get to work on your skin?
            </Text>
            <Text style={styles.formValuesSecondary}>
              {props.getClientData
                ? props.getClientData.client.consentForm
                    .anythingElseWeShouldKnow
                  ? props.getClientData.client.consentForm
                      .anythingElseWeShouldKnow
                  : "__________"
                : null}
            </Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.GlowLabsContact} fixed={true}>
          <Text>GlowLaboratories, LLC</Text>
          <Text>&#8226;</Text>
          <Text>1506 Broadway, Hewlett, NY 11557</Text>
          <Text>&#8226;</Text>
          <Text>(516) 442 - 8122</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "20vh",
            marginTop: "2vh",
          }}
          fixed={true}
        >
          <Image
            src={GlowLabsCroppedLogo}
            style={{
              width: "50%",
              textAlign: "center",
            }}
          />
          <Text
            style={{
              fontFamily: "Montserrat",
              textAlign: "center",
              width: "100%",
              marginTop: "2vh",
            }}
          >
            Consent Form
          </Text>
        </View>
        <View style={styles.contactSection} fixed={true}>
          <Text style={styles.formValues}>
            First Name:{" "}
            {props.getClientData ? props.getClientData.client.firstName : null}
          </Text>
          <Text style={styles.formValues}>
            Last Name:{" "}
            {props.getClientData ? props.getClientData.client.lastName : null}
          </Text>
          <Text style={styles.formValues}>
            Email:{" "}
            {props.getClientData ? props.getClientData.client.email : null}
          </Text>
          <Text style={styles.formValues}>
            Date Submitted:{" "}
            {props.getClientData ? props.consentFormLastUpdated : null}
          </Text>
        </View>
        <View style={styles.consentSection}>
          <View style={styles.individualQuestion}>
            <Text style={styles.consentFormParagraph}>Skin Care Consent</Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.consentFormParagraph}>
              By proceeding to use our products, treatments, services, and
              facilities, you represent to us that you are in good health and
              physical condition to use such products, treatments, service and
              facilities safely, and fully accept the risk associated with doing
              so.
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.consentFormParagraph}>
              You confirm (to the best of your knowledge) that the answers you
              have given are correct and that you have not withheld any
              information that may be relevant to your treatment. You are aware
              that there are often inherent risks associated with skin care
              services and that the service that you are about to receive could
              have unfavorable results including but not limited to allergic
              reaction, irritation, burning, redness, scarring, or soreness.
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.consentFormParagraph}>
              By signing below, you further agree that you will not hold Glow
              Labs, or its affiliates, or any of its employees responsible for
              discomfort, unfavorable outcome, or result, damages, losses,
              injury, illness, or death howsoever caused, arising out of, or in
              connection with the use of the products, treatments, services, and
              facilities at Glow Labs (save in respect of death or personal
              injury arising out of the gross negligence of Glow Labs or its
              employees).
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.consentFormParagraph}>
              All clients of Glow Labs must secure their personal belongings and
              refrain from leaving cash, jewelry, or valuables of any sort on
              Glow Labs' premises. Glow Labs shall not be liable for any damage,
              loss, theft, or disappearance of any property brought to the
              premises.
            </Text>
          </View>
          <View style={styles.individualQuestion}>
            <Text style={styles.consentFormParagraph}>Please sign:</Text>
          </View>
          <View style={styles.signatureContainer}>
            <Image
              style={styles.signatureImage}
              src={
                props.signature
                  ? props.signature
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
              }
            />
          </View>
          <View style={styles.consentFormDate}>
            <Text style={styles.consentFormParagraph}>
              Please fill in today's date:
            </Text>
            <Text style={styles.consentFormParagraph}>
              {props.getClientData
                ? props.getClientData.client.consentForm.date
                  ? props.getClientData.client.consentForm.date
                  : "__________"
                : null}
            </Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default ConsentFormPDF;
