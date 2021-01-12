import React from "react";
import "./CardA.css";
import classNames from "classnames";
import iconcard from "../../resources/images/SPAimages/icon-card-cv-saptalent.svg";

const CardA = (props) => {
  const { degradado, white, titulo, image } = props;
  const cardClasses = classNames({
    "cont-card-a": true,
    "card-a-degradado": degradado,
    "card-a-white": white,
  });
  const tituloStyle = classNames({
    "titulo-card-a-d": degradado,
    "titulo-card-a-w": white,
  });
  const descStyle = classNames({
    "desc-card-a-d": degradado,
    "desc-card-a-w": white,
  });
  const graphStyle = classNames({
    "graph-card-a": degradado,
    "graph-card-a-green": white,
  });
  return (
    <div className={cardClasses}>
      <div
        style={{
          display: "flex",
          // backgroundColor: "red",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            // backgroundColor: "pink",
            flex: 1,
            paddingLeft: "20%",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <p className={tituloStyle}>{titulo}</p>
        </div>
        <div
          style={{
            display: "flex",
            // backgroundColor: "cyan",
            flex: 1.5,
            paddingLeft: "20%",
            alignItems: "flex-start",
          }}
        >
          <p className={descStyle}>0</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          //  backgroundColor: "green",
          flex: 1,
          padding: "10px",
        }}
      >
        {image ? (
          <div className="cont-img-card-a">
            <img src={iconcard} alt="icono" />
          </div>
        ) : (
          <div className={graphStyle}>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardA;
