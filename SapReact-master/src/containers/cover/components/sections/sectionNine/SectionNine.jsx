import React from "react";
import "./SectionNine.css";
import { ListItem } from "@material-ui/core";
import icon1 from "../../../../../resources/cover/ZAPTalent-Icono-7.svg";
import icon2 from "../../../../../resources/cover/ZAPTalent-Icono-8.svg";
import icon3 from "../../../../../resources/cover/ZAPTalent-Icono-9.svg";

const SectionNine = () => {
  return (
    <div className="cont-section-nine" id="section-nine">
      <div className="sub-section-nine">
        <div className="left-section-nine">
          <h1>Contáctanos</h1>
          <form>
            <input className="input-section-nine" placeholder="Nombre*" />
            <input className="input-section-nine" placeholder="Email*" />
            <input className="input-section-nine" placeholder="N° Telefóno*" />
            <input className="input-section-nine" placeholder="Dirección*" />
            <textarea
              className="textArea-section-nine"
              placeholder="Mensaje*"
              rows="5"
              name="message"
            ></textarea>
            <ListItem button className="btn-left-section-nine">
              <p style={{color: "white"}}>Enviar</p>
            </ListItem>
          </form>
        </div>
        <div className="right-section-nine">
          <div className="sub-right-section-nine">
            <h1>Alguna Duda?</h1>
            <h1>Estamos para ti</h1>
            <p className="p1-section-nine">
              Tenemos un equipo de profesionales dispuesto a resolver todas tus
              dudas. Escríbenos y se parte del portal de profesionales SAP más
              grande de Chile.
            </p>
            <div className="cont-item-section-nine">
              <div>
                <img src={icon1} alt="ingenieros" />
                <p>Ingenieros</p>
              </div>
              <div>
                <img src={icon2} alt="developers" />
                <p>Developers</p>
              </div>
              <div>
                <img src={icon3} alt="operadores" />
                <p>Operadores</p>
              </div>
            </div>
            <ListItem button className="btn-left-section-nine">
              <p style={{color: "white"}}>Comenzar</p>
            </ListItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionNine;
