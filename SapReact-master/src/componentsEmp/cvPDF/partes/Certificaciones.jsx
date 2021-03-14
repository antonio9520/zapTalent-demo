import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const Certificaciones = ({ data }) => {
  return (
    <View style={styles.contEstudios} break>
      <View style={styles.contEstudiosTop}>
        <Text style={styles.title}>Certificaciones</Text>
      </View>
      <View style={styles.contEstudiosBottom}>
        {data[0] &&
          data.map((item, index) => <Certificacion key={index} data={item} />)}
      </View>
    </View>
  );
};

export default Certificaciones;

const Certificacion = ({ data }) => {
  console.log(data);
  const {
    certificacion,
    fecha,
    estado,
    obs,
    universidad,
    certificadoURL,
  } = data;
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const fechaCert = new Date(fecha);
  return (
    <View style={styles.contCert} wrap={false}>
      <Text style={styles.p1}>{certificacion}</Text>
      <Text style={styles.p2}>{universidad}</Text>
      <Text style={styles.p3}>
        {MESES[fechaCert.getMonth()]}, {fechaCert.getFullYear()}
      </Text>
      {obs && <Text style={styles.p4}>{obs}</Text>}
      <View style={styles.contEstado}>
        <View style={styles.estado}>
          <Text style={styles.p5}>{estado}</Text>
        </View>
      </View>
      {certificadoURL ? (
        <Text style={styles.link}>{certificadoURL}</Text>
      ) : null}
    </View>
  );
};

export const styles = StyleSheet.create({
  contEstudios: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 80,
    fontFamily: "Roboto",
    paddingBottom: 20,
    backgroundColor: "#FAFAFA",
  },
  link: { fontSize: 5, color: "#6C6A8D", marginTop: 2, marginLeft: 2 },

  contEstudiosTop: {},
  title: {
    color: "#187ce2",
    fontWeight: 600,
    fontSize: 14,
    marginTop: 20,
  },
  contEstudiosBottom: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  /**ESTUDIO */
  contCert: {
    width: "50%",
    paddingRight: 20,
    marginTop: 20,
  },
  p1: { color: "#2462D5", fontSize: 12 },
  p2: { color: "#2462D5", fontSize: 10, marginTop: 5 },
  p3: { color: "#4793F4", fontSize: 10, marginTop: 2 },
  p4: { color: "#8F8E97", fontSize: 7, marginTop: 5 },
  p5: { fontSize: 8, color: "white" },
  estado: {
    backgroundColor: "#4BACEF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  contEstado: { marginTop: 5, display: "flex", flexDirection: "row" },
});
