import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import image from "../../../resources/empresas/ZAPTalent-Empresa-Logotipo-1.png";
import image2 from "../../../resources/ZAPTalent-Logotipo-horizontal-Blanco.png";

const Footer = () => {
  return (
    <View style={styles.contFooter}>
      <Image style={styles.image2} src={image2} />
      <View style={styles.contP}>
        <Text style={styles.p1}>
          &copy; ZAPTalent 2020 - Todos los derechos reservados
        </Text>
        <Text style={styles.p1}>
          Barros Borgoño #110 - Of 1003 Providencia, Santiago
        </Text>
        <Text style={styles.p1}>Teléfono +562 323 6789</Text>
        <Text style={styles.p2}>https://info.zaptalent.cl/</Text>
      </View>
    </View>
  );
};

export default Footer;

export const styles = StyleSheet.create({
  contFooter: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 80,
    fontFamily: "Roboto",
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#187CE2",
    alignItems: "center",
  },

  /**FOOTER */
  logo: { width: 45, height: 45, marginTop: 15 },
  contP: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 15,
  },
  p1: {
    fontSize: 8,
    color: "white",
    // textAlign: "right",
  },
  p2: {
    fontSize: 7,
    color: "white",
    // textAlign: "right",
    fontWeight: 600,
  },
  image2: {
    width: 110,
    height: 35,
    marginTop: 20,
  },
});
