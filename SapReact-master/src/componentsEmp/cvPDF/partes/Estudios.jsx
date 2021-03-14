import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import image1 from "../../../resources/ZAPTalent-PDF-Header.png";

const Estudios = ({ data }) => {
  return (
    <View style={styles.contEstudios}>
      <View style={styles.contEstudiosTop}>
        <Text style={styles.title}>Estudios</Text>
      </View>
      <View style={styles.contEstudiosBottom}>
        {data[0] &&
          data.map((item, index) => <Estudio key={index} data={item} />)}
      </View>
    </View>
  );
};

export default Estudios;

const Estudio = ({ data }) => {
  console.log(data);
  const {
    carrera,
    tipoestudio,
    institucion,
    areaestudio,
    diainicio,
    diafin,
    estado,
    estudioURL,
    observacion,
  } = data;

  const inicio = new Date(diainicio);
  const termino = new Date(diafin);

  return (
    <View style={styles.contEstudio} wrap={false}>
      <Text style={styles.p1}>{tipoestudio}</Text>
      <Text style={styles.p2}>{carrera}</Text>
      <Text style={styles.p3}>{institucion}</Text>
      <Text style={styles.p4}>{areaestudio}</Text>
      <Text style={styles.p5}>
        {inicio.getFullYear() + "-" + termino.getFullYear()}
      </Text>
      <View style={styles.contEtiquetas}>
        <View style={styles.etiqueta1}>
          <Text>{estado}</Text>
        </View>
        {estudioURL ? (
          <View style={styles.etiqueta2}>
            <Text>Certificado</Text>
          </View>
        ) : null}
      </View>

      {observacion ? (
        <View style={styles.contObs}>
          <Text style={styles.obs}>{observacion}</Text>
        </View>
      ) : null}
      {estudioURL ? <Text style={styles.link}>{estudioURL}</Text> : null}
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
  },
  userLogo: {
    width: "50px",
    height: "50px",
    borderRadius: 50,
    marginLeft: 40,
  },
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
  link: { fontSize: 5, color: "#6C6A8D", marginTop: 4, marginLeft: 2 },
  contEstudio: {
    width: "50%",
    // backgroundColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingRight: 10,
    paddingTop: 20,
  },
  p1: {
    fontSize: 8,
    color: "#6C6A8D",
    fontWeight: 600,
  },
  p2: {
    fontSize: 12,
    color: "#2462D5",
    marginTop: 5,
  },
  p3: {
    fontSize: 8,
    color: "#6C6A8D",
    marginTop: 5,
  },
  p4: {
    fontSize: 7,
    color: "#6C6A8D",
    marginTop: 3,
  },
  p5: {
    fontSize: 7,
    color: "#6C6A8D",
    marginTop: 3,
  },
  contEtiquetas: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
  },
  etiqueta1: {
    backgroundColor: "#37CBBA",
    fontSize: 8,
    fontWeight: 600,
    color: "white",
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  etiqueta2: {
    backgroundColor: "#1E72DE",
    fontSize: 8,
    fontWeight: 600,
    color: "white",
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  contObs: {
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  obs: {
    fontSize: 8,
    color: "#6C6A8D",
    fontStyle: "italic",
  },
});
