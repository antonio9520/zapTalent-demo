import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import * as React from "react";
import font from "../../resources/fonts/Roboto/Roboto-Bold.ttf";
import font2 from "../../resources/fonts/Roboto/Roboto-Regular.ttf";
import font3 from "../../resources/fonts/Roboto/Roboto-Italic.ttf";
import {
  Usuario,
  Estudios,
  Trabajos,
  Adns,
  Certificaciones,
  Habilidades,
  Footer,
} from "./partes";

Font.register({
  family: "Roboto",
  fonts: [
    { src: font2 },
    { src: font, fontWeight: 600 },
    { src: font3, fontStyle: "italic" },
  ],
});

const TestDocument = ({ data }) => {
  console.log(data);
  if (data.usuario) {
    return (
      <Document>
        <Page
          size="A4"
          autoHeight
          style={{ position: "relative", paddingTop: 20 }}
        >
          <Usuario data={data.usuario} />
          {data.estudios[0] && <Estudios data={data.estudios} />}
          {data.trabajos[0] && <Trabajos data={data.trabajos} />}
          {data.adns[0] && <Adns data={data.adns} />}
          {data.certificados[0] && <Certificaciones data={data.certificados} />}
          {data.usuario.habilidades[0] && (
            <Habilidades data={data.usuario.habilidades} />
          )}
          <Footer />
        </Page>
      </Document>
    );
  } else
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>Este PDF no pudo ser generado</Text>
          </View>
        </Page>
      </Document>
    );
};

export default TestDocument;

export const styles = StyleSheet.create({});
