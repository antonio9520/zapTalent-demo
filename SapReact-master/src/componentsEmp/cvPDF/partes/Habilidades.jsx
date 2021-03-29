import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

const Habilidades = ({ data }) => {
  return (
    <View style={styles.contEstudios} break>
      <View style={styles.contEstudiosTop}>
        <Text style={styles.title}>Habilidades</Text>
      </View>
      <View style={styles.contEstudiosBottom}>
        {data[0] &&
          data.map((item, index) => (
            <Item key={index} num={index} data={item} />
          ))}
      </View>
    </View>
  );
};

export default Habilidades;

const Item = ({ data, num }) => {
  console.log(data);
  const { name } = data;
  const color = setPatronNumber(num);

  const colores = ["#4EC0EF", "#3276BB", "#3C58A8"];

  return (
    <View
      style={{
        backgroundColor: colores[color],
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
      }}
      wrap={false}
    >
      <Text style={styles.p1}>{name}</Text>
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
  /**HABILIDAD*/
  p1: {
    fontSize: 8,
    color: "white",
  },
});

const setPatronNumber = (num) => {
  if (num === 0) return 0;
  if (num === 1) return 1;
  if (num === 2) return 2;
  if (num === 3) return 0;
  if (num === 4) return 1;
  if (num === 5) return 2;
  if (num === 6) return 0;
  if (num === 7) return 1;
  if (num === 8) return 2;
  if (num === 9) return 0;
  if (num === 10) return 1;
  if (num === 11) return 2;
  if (num === 12) return 0;
  if (num === 13) return 1;
  if (num === 14) return 2;
  if (num === 15) return 0;
  if (num === 16) return 1;
  if (num === 17) return 2;
  if (num === 18) return 0;
  if (num === 19) return 1;
  if (num === 20) return 2;
  if (num === 21) return 0;
  if (num === 22) return 1;
  if (num === 23) return 2;
  if (num === 24) return 0;
  if (num === 25) return 1;
  if (num === 26) return 2;
  if (num === 27) return 0;
  if (num === 28) return 1;
  if (num === 29) return 2;
  if (num === 30) return 0;
  return 0;
};
