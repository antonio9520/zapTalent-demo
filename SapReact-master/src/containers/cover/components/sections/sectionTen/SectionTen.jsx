import React from "react";
import "./SectionTen.css";
import logo from "../../../../../resources/cover/ZAPTalent-Logotipo-Blanco.svg";
import { ArrowForwardIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import LinkM from "@material-ui/core/Link";

const SectionTen = () => {
  return (
    <div className="cont-section-ten" id="section-ten">
      <div className="sub-section-ten">
        <div className="top-section-ten">
          <div className="item-section-ten">
            <img src={logo} alt="zap-talent" />
            <p className="p1-section-ten" style={{ color: "white" }}>
              Zaptalent® es una plataforma creado por SCL Consultores que es una
              empresa con más de 20 años de experiencia en las áreas TI y con
              más de 15 años en SAP, con proyectos realizados en Chile y en el
              extranjero cumpliendo diferentes Roles.
            </p>
            <p className="p1-section-ten" style={{ color: "white" }}>
              Barros Borgoño # 110 - Of 1033 Providencia, Santiago de Chile.
            </p>
            <p className="p1-section-ten" style={{ color: "white" }}>
              Teléfono: +562 2 5678 8000
            </p>
            <p className="p1-section-ten" style={{ color: "white" }}>
              Contacto: contacto@zaptalent.cl
            </p>
          </div>
          <div className="item-section-ten">
            <h6>Menú</h6>
            <ul>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Quienes Somos</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Misión</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Visión</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Mapa</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Registrate</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-section-ten">
            <h6 style={{ color: "white" }}>Servicios</h6>
            <ul>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Asesoría</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Planes</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Trabaja con Nosotros</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>FAQ</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p style={{ color: "white" }}>Soporte</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-section-ten">
            <h6>Nuestras News</h6>
            <p className="p2-section-ten" style={{ color: "white" }}>
              Manténte informado sobre ZAPTalent y todo el mundo SAP de Chile y
              el mundo.
            </p>
            <div className="cont-sus-section-ten">
              <input className="input-section-ten" type="email" name="mail" />
              <ListItem button className="btn-sus-section-ten">
                <p style={{ color: "white" }}>Suscribete</p>
              </ListItem>
            </div>
          </div>
        </div>
      </div>
      <div className="line-section-ten"></div>
      <div className="sub-section-ten">
        <div className="bottom-section-ten">
          <p style={{ color: "white" }}>
            Todos los derechos reservados. ZAPTalent&copy; 2020 Santiago de
            Chile.
          </p>
          <p style={{ color: "white" }}>
            Diseñado y Desarrolado con &#10084; por
            <LinkM
              href="https://agenciamerken.com/"
              target="_blank"
              // color="inherit"
            >
              {" "}
              Agencia Merkén SpA 2020{" "}
            </LinkM>
            Santiago de Chile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionTen;
