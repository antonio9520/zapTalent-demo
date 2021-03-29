import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

import image1 from "../../../resources/iconPDF/ZAPTalent-Icono-PDF-8.png";
import iconEmail from "../../../resources/iconPDF/ZAPTalent-Icono-PDF-5.png";
import iconPhone from "../../../resources/iconPDF/ZAPTalent-Icono-PDF-6.png";
import iconUser from "../../../resources/iconPDF/ZAPTalent-Icono-PDF-7.png";

const Trabajos = ({ data }) => {
  return (
    <View style={styles.contEstudios} break>
      <View style={styles.contEstudiosTop}>
        <Text style={styles.title}>Trabajos</Text>
      </View>
      <View style={styles.contEstudiosBottom}>
        {data[0] &&
          data.map((item, index) => <Trabajo key={index} data={item} />)}
      </View>
    </View>
  );
};

export default Trabajos;

const Trabajo = ({ data }) => {
  const {
    inidate,
    findate,
    nomempresa,
    actempresa,
    cargo,
    areapuesto,
    subarea,
    pais,
    personacargo,
    manejopresupuesto,
    expzap,
    refnombre,
    email,
    refphone,
    refrelacion,
    reflogros,
  } = data;

  const inicio = new Date(inidate).getFullYear();
  const termino = new Date(findate).getFullYear();
  const now = new Date().getFullYear();

  let fechaTermino;
  if (termino < now) {
    fechaTermino = termino;
  } else {
    fechaTermino = "Actualidad";
  }

  let referencia = false;
  if (refnombre || email || refphone || refrelacion) {
    referencia = true;
  }

  return (
    <View style={styles.contTrabajo} wrap={false}>
      <Text style={styles.p1}>{nomempresa}</Text>
      <Text style={styles.p2}>{cargo}</Text>
      <Text style={styles.p3}>{actempresa}</Text>
      <View style={styles.item1}>
        <Image style={styles.image1} src={image1} />
        <Text style={styles.p4}>{areapuesto}</Text>
      </View>
      <View style={styles.item2}>
        <Image style={styles.image1} src={image1} />
        <Text style={styles.p4}>{subarea}</Text>
      </View>
      <Text style={styles.p5}>{inicio + "-" + fechaTermino}</Text>
      {referencia && <Text style={styles.p6}>Referencia</Text>}
      {refnombre !== null && refnombre !== "" && (
        <View style={styles.contRef}>
          <Image style={styles.image1} src={iconUser} />
          <Text style={styles.pRef}>{refnombre}</Text>
        </View>
      )}
      {refrelacion !== null && refrelacion !== "" && (
        <View style={styles.contRef}>
          <Image style={styles.image1} src={iconUser} />
          <Text style={styles.pRef}>{refrelacion}</Text>
        </View>
      )}
      {email && (
        <View style={styles.contRef}>
          <Image style={styles.image1} src={iconEmail} />
          <Text style={styles.pRef}>{email}</Text>
        </View>
      )}
      {refphone !== "" && (
        <View style={styles.contRef}>
          <Image style={styles.image1} src={iconPhone} />
          <Text style={styles.pRef}>{refphone}</Text>
        </View>
      )}
      {personacargo && (
        <View>
          <Text style={styles.p8}>Personas a cargo</Text>
          <Text style={styles.p7}>{personacargo}</Text>
        </View>
      )}
      {manejopresupuesto && (
        <View>
          <Text style={styles.p8}>Manejo de presupuesto anual</Text>
          <Text style={styles.p7}>{numberFormat(manejopresupuesto)}</Text>
        </View>
      )}
      {reflogros && (
        <View>
          <Text style={styles.p8}>Logros</Text>
          <Text style={styles.p7}>{reflogros}</Text>
        </View>
      )}
      {expzap && (
        <View>
          <Text style={styles.p8}>Experiencia SAP</Text>
          <Text style={styles.p7}>{expzap}</Text>
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  contEstudios: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 80,
    fontFamily: "Roboto",
    backgroundColor: "#FAFAFA",
    paddingVertical: 20,
    marginTop: -20,
  },
  contEstudiosTop: {},
  title: {
    color: "#187ce2",
    fontWeight: 600,
    fontSize: 14,
  },
  contEstudiosBottom: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  /**ESTUDIO */
  contTrabajo: {
    width: "50%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: 20,
  },
  p1: { fontSize: 12, color: "#2462D5", marginTop: 5 },
  p2: { fontSize: 8, color: "#8F8E97", marginTop: 5 },
  p3: { fontSize: 8, color: "#8F8E97", marginTop: 2, marginBottom: 5 },
  p4: { fontSize: 7, color: "#8F8E97", marginLeft: 5 },
  p5: { fontSize: 7, color: "#8F8E97", marginTop: 5, marginBottom: 5 },
  item1: { display: "flex", flexDirection: "row", alignItems: "center" },
  item2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  image1: { width: 10, height: 10 },
  p6: { fontSize: 8, color: "#56A6DC", marginTop: 5 },
  contRef: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pRef: {
    fontSize: 7,
    color: "#357ABE",
    marginLeft: 5,
  },
  p7: {
    fontSize: 7,
    color: "#8F8E97",
    marginTop: 5,
    paddingRight: 10,
  },
  p8: { fontSize: 8, color: "#56A6DC", marginTop: 5 },
});

const numberFormat = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
