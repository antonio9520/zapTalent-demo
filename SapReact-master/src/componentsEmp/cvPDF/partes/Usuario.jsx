import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import image1 from "../../../resources/ZAPTalent-PDF-Header.png";
import userlogo from "../../../resources/ZAPTalent-Icon.png";
import image2 from "../../../resources/ZAPTalent-Logotipo-horizontal-Blanco.png";
import icon1 from "../../../resources/iconPDF/ZAPTalent-Icono-PDF-1.png";

const Usuario = ({ data }) => {
  const {
    rut,
    email,
    phone,
    ecivil,
    nacion,
    direccion,
    region,
    comuna,
    consultor,
    anosExp,
    anosZap,
  } = data;
  return (
    <View style={styles.contUserTopPdf}>
      <Image style={styles.image1} src={image1} />
      <View style={styles.contentUserTop}>
        {data.imageURL ? (
          <View style={styles.contImagen1}>
            <Image style={styles.userLogo2} src={data.imageURL} />
          </View>
        ) : (
          <Image style={styles.userLogo} src={userlogo} />
        )}

        <View style={styles.contTextTop}>
          <Text style={styles.font}>{data.nombres + " " + data.apellidos}</Text>
          {data.profesion ? (
            <Text style={styles.font2}>{data.profesion.name}</Text>
          ) : null}
        </View>
        <Image style={styles.image2} src={image2} />
      </View>
      <View style={styles.contItems}>
        <Item value={rut} title="Rut" />
        <Item value={email} title="Email" />
        <Item value={phone} title="Numero Movil" />
        <Item value={ecivil} title="Estado Civil" />
        <Item value={nacion} title="Nacionalidad" />
        <Item
          value={direccion + ", " + comuna + ", " + region}
          title="Dirección"
        />
        <Item value={consultor} title="Consultor" />
        <Item value={anosExp} title="Años Exp. Laboral" />
        <Item value={anosZap} title="Años Exp. SAP" />
      </View>
    </View>
  );
};

export default Usuario;

const Item = ({ title, value }) => {
  return (
    <View style={styles.contItem}>
      <View style={styles.contIcon}>
        <Image style={styles.iconItem} src={icon1} />
      </View>
      <View>
        <View>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <View>
          <Text style={styles.textValue}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  font: {
    fontFamily: "Roboto",
    fontWeight: 600,
    color: "white",
    fontSize: 14,
  },
  font2: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 12,
    // fontWeight: 600,
  },
  contTextTop: {
    marginLeft: -40,
  },
  contUserTopPdf: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
    height: "250px",
  },
  image1: {
    position: "absolute",
    width: "100%",
    height: "100px",
    backgroundSize: "cover",
  },
  image2: {
    width: 90,
    height: 25,
    marginRight: 40,
  },
  contImagen1: {
    width: "55px",
    height: "55px",
    borderRadius: 50,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
  },
  userLogo: {
    width: "50px",
    height: "50px",
    borderRadius: 50,
    marginLeft: 40,
  },
  userLogo2: {
    width: "50px",
    height: "50px",
    borderRadius: 50,
  },
  contentUserTop: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    height: "100px",
    justifyContent: "space-around",
    alignItems: "center",
  },

  //ITEM DETALLE USUARIO
  contItems: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    // backgroundColor: "red",
    maxHeight: 150,
    paddingTop: 10,
    paddingLeft: 30,
  },
  contIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconItem: {
    width: 20,
    height: 20,
    // maxHeight: 20,
  },
  contItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 50,
    height: 30,
    maxHeight: 30,
    maxWidth: 100,
  },

  textTitle: {
    fontSize: 8,
    marginLeft: 5,
    marginTop: 5,
    color: "#2A1B4D",
  },

  textValue: { fontSize: 6, color: "#43C0F6", marginLeft: 5, marginTop: 2 },
});
