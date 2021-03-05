import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const Adns = ({ data }) => {
  return (
    <View style={styles.contEstudios} >
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
  const { name, idcert, submodulos, obs } = data;
  const backColor = setPatronNumber(num);
  return (
    <View style={!backColor ? styles.contAdn : styles.contAdn2}>
      <Text style={styles.p1}>{name}</Text>
      {idcert !== "" ? (
        <Text style={styles.p2}>{idcert}</Text>
      ) : (
        <View style={styles.plantilla}></View>
      )}
      {obs && <Text style={styles.p4}>{obs}</Text>}
      {submodulos.map((item, index) => (
        <Submodulo key={index} data={item} />
      ))}
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
    marginTop: 20,
  },
  /**ADN */
  contAdn: { width: "50%", paddingHorizontal: 5, paddingVertical: 5 },
  contAdn2: {
    backgroundColor: "#ECF7FE",
    width: "50%",
    paddingHorizontal: 5,
    paddingVertical: 5,
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
  submodulo: {},
  p4: { color: "#8F8E97", fontSize: 7, marginTop: 5 },
  p5: { fontSize: 8, color: "white" },
});

const setPatronNumber = (num) => {
  if (num === 0) return false;
  if (num === 1) return true;
  if (num === 2) return true;
  if (num === 3) return false;
  if (num === 4) return false;
  if (num === 5) return true;
  if (num === 6) return true;
  if (num === 7) return false;
  if (num === 8) return false;
  if (num === 9) return true;
  if (num === 10) return true;
  if (num === 11) return false;
  if (num === 12) return false;
  if (num === 13) return true;
  if (num === 14) return true;
  if (num === 15) return false;
  if (num === 16) return false;
  if (num === 17) return true;
  if (num === 18) return true;
  if (num === 19) return false;
  if (num === 20) return false;
  if (num === 21) return true;
  if (num === 22) return true;
  if (num === 23) return false;
  if (num === 24) return false;
  if (num === 25) return true;
  if (num === 26) return true;
  if (num === 27) return false;
  if (num === 28) return false;
  if (num === 29) return true;
  if (num === 30) return true;
  return true;
};
