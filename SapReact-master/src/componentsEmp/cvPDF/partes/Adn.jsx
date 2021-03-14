import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const Adns = ({ data }) => {
  return (
    <View style={styles.contEstudios} break>
      <View style={styles.contEstudiosTop}>
        <Text style={styles.title}>ADN SAP</Text>
      </View>
      <View style={styles.contEstudiosBottom}>
        {data[0] &&
          data.map((item, index) => (
            <Adn key={index} num={index} data={item} />
          ))}
      </View>
    </View>
  );
};

export default Adns;

const Adn = ({ data, num }) => {
  const { name, idcert, submodulos, obs, adnURL } = data;
  const backColor = setPatronNumber(num);
  return (
    <View style={!backColor ? styles.contAdn : styles.contAdn2} wrap={false}>
      <Text style={styles.p1}>{name}</Text>
      {idcert !== "" ? (
        <Text style={styles.p2}>{idcert}</Text>
      ) : (
        <View style={styles.plantilla}></View>
      )}
      {obs && obs !== "" && <Text style={styles.p4}>{obs}</Text>}
      {adnURL ? <Text style={styles.link}>{adnURL}</Text> : null}
      <View style={styles.contSubmodulo}>
        {submodulos.map((item, index) => (
          <Submodulo key={index} data={item} />
        ))}
      </View>
    </View>
  );
};

const Submodulo = ({ data }) => {
  const { name, desc, obs, nivel } = data;
  console.log(obs);
  return (
    <View style={styles.submodulo} wrap={false}>
      <Text style={styles.p3}>{name + " - " + desc}</Text>
      {obs ? <Text style={styles.p4}>{obs}</Text> : null}
      <View style={styles.contNivel}>
        <View style={styles.nivel}>
          <Text style={styles.p5}>{nivel}</Text>
        </View>
      </View>
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
    marginTop: -20,
  },
  link: { fontSize: 5, color: "#6C6A8D", marginTop: 4, marginLeft: 2 },

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
    marginTop: 20,
  },
  /**ADN */
  contAdn: { width: "100%", paddingHorizontal: 10, paddingVertical: 10 },
  contAdn2: {
    backgroundColor: "#ECF7FE",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  p1: { fontWeight: 600, color: "#2462D5", fontSize: 12 },
  p2: { color: "#8F8E97", fontSize: 10, marginTop: 5 },
  p3: { fontWeight: 600, color: "#8F8E97", fontSize: 10, marginTop: 5 },
  plantilla: {},
  contNivel: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
  },
  nivel: {
    backgroundColor: "#4BACEF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  contSubmodulo: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  submodulo: { width: "50%", paddingTop: 10, paddingRight: 10 },
  p4: { color: "#8F8E97", fontSize: 7, marginTop: 5 },
  p5: { fontSize: 8, color: "white" },
});

const setPatronNumber = (num) => {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
};
