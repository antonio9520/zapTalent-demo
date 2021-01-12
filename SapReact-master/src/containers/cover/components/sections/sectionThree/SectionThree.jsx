import React from "react";
import "./SectionThree.css";
import { ListItem } from "@material-ui/core";

const SectionThree = () => {
  return (
    <div className="cont-section-three" id="section-three">
      <div className="overlay-section-three"></div>
      <div className="sub-section-three">
        <h1>Porqué elegirnos</h1>
        {/* <h1>simply dummy</h1> */}
        <p>
          Porque somos un equipo de profesionales con ampla experiencia que
          sumado a nuestras plataforma tecnológica ZAPTalente nos permite elegir
          los mejores candidatos que cumplan con los conocimientos y las
          habilidades requeridas por nuestros clientes.
        </p>
        <p>
          Nuestro servicio se basa sobre altos éstandares de calidad en el
          reclutamiento y selección de manera segura y confidencial que nos
          permite construir una relación de largo plazo con nuestros clientes y
          postulantes
        </p>
        <p>
          Entregamos servicios de reclutamiento, selección, head hunting y
          outsourcing enfocados a entregar la mejor solución que nos permita
          satisfacer las distintas necesidades que tengan nuestros clientes.
        </p>
        <ListItem button className="btn-start-section-three">
          <p>COMIENZA AHORA</p>
        </ListItem>
      </div>
    </div>
  );
};

export default SectionThree;
