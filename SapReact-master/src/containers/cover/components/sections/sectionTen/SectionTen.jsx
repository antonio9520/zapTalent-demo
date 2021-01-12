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
            <p className="p1-section-ten">
              Zaptalent® es una plataforma creado por SCL Consultores que es una
              empresa con más de 20 años de experiencia en las áreas TI y con
              más de 15 años en SAP, con proyectos realizados en Chile y en el
              extranjero cumpliendo diferentes Roles.
            </p>
            <p className="p1-section-ten">
              Barros Borgoño # 110 - Of 1033 Providencia, Santiago de Chile.
            </p>
            <p className="p1-section-ten">Teléfono: +562 2 5678 8000</p>
            <p className="p1-section-ten">Contacto: contacto@zaptalent.cl</p>
          </div>
          <div className="item-section-ten">
            <h6>Menú</h6>
            <ul>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Quienes Somos</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Misión</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Visión</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Mapa</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Registrate</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-section-ten">
            <h6>Servicios</h6>
            <ul>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Asesoría</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Planes</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Trabaja con Nosotros</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>FAQ</p>
                </Link>
              </li>
              <li>
                <ArrowForwardIos className="icon-section-ten" />
                <Link className="link">
                  <p>Soporte</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-section-ten">
            <h6>Nuestras News</h6>
            <p className="p2-section-ten">
              Manténte informado sobre ZAPTalent y todo el mundo SAP de Chile y
              el mundo.
            </p>
            <div className="cont-sus-section-ten">
              <input className="input-section-ten" type="email" name="mail" />
              <ListItem button className="btn-sus-section-ten">
                <p>Suscribete</p>
              </ListItem>
            </div>
          </div>
        </div>
      </div>
      <div className="line-section-ten"></div>
      <div className="sub-section-ten">
        <div className="bottom-section-ten">
          <p>
            Todos los derechos reservados. ZAPTalent&copy; 2020 Santiago de
            Chile.
          </p>
          <p>
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
