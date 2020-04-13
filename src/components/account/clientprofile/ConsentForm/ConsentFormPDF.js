import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font
} from "@react-pdf/renderer";
import GlowLabsCroppedLogo from "../../../../../src/images/GlowLabsCroppedLogo.jpg";

// Consent Form PDF
const ConsentFormPDF = () => {
  // Styles for Consent Form PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff"
    },
    text: {
      fontFamily: "Montserrat"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  return (
    <Document onRender={() => console.log("Wow")}>
      <Page size="A4" style={styles.page}>
        <View
          style={styles.section}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "20vh"
          }}
        >
          <Image
            src={GlowLabsCroppedLogo}
            style={{
              width: "50%",
              textAlign: "center"
            }}
          />
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "2vh"
            }}
          >
            Consent Form
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ConsentFormPDF;
