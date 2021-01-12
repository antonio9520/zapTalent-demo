import React from "react";
import "./SectionFour.css";
import image from "../../../../../resources/cover/ZAPTalent-Section-About-2.png";
import icon1 from "../../../../../resources/cover/ZAPTalent-Icono-1.svg";
import icon2 from "../../../../../resources/cover/ZAPTalent-Icono-2.svg";
import icon3 from "../../../../../resources/cover/ZAPTalent-Icono-3.svg";
import icon4 from "../../../../../resources/cover/ZAPTalent-Icono-4.svg";
import icon5 from "../../../../../resources/cover/ZAPTalent-Icono-5.svg";
import icon6 from "../../../../../resources/cover/ZAPTalent-Icono-6.svg";
import plataforma from "../../../../../resources/cover/ZAPTalent-Plataforma.png";

const SectionFour = () => {
  return (
    <div className="cont-section-four" id="section-four">
      <div className="sub-section-four">
        <div className="cont-image-section-four">
          <img className="image-section-four" src={image} alt="zap-talent" />
        </div>
        <div className="left-section-four">
          <div className="first-item-section-four">
            <h2>Nuestros Servicios Acceso a nuestra Plataforma ZAPTAlent</h2>
            <p>
              Podrás tener acceso a nuestra plataforma para poder publicar tus
              avisos de empleos en donde podrán revisar los candidatos idóneos
              para el cargo publicado o bien acceder a un plan en donde tendrás
              a disposición toda nuestra base de datos papara buscar el perfil
              deseado. Mostrar Planes
            </p>
          </div>
          <div className="item-section-four">
            <img className="img-section-four" src={icon1} alt="factory" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="item-section-four">
            <img className="img-section-four" src={icon2} alt="factory" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="item-section-four">
            <img className="img-section-four" src={icon3} alt="factory" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="right-section-four">
          <div className="item-section-four">
            <img className="img-section-four" src={icon4} alt="factory" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="item-section-four">
            <img className="img-section-four" src={icon5} alt="factory" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="item-section-four">
            <img className="img-section-four" src={icon6} alt="factory" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <img
            className="image-plat-section-four"
            src={plataforma}
            alt="zap-talent"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
