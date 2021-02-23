import React from "react";
import "./CardPerfil.css";
import userlogo from "../../../../resources/images/SAPTalent/icon-new-user.svg";
import {
  ListItem,
  LinearProgress,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "60%",
    position: "absolute",
    bottom: 20,
    left: 0,
  },
});
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 8,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1D72DE",
  },
}))(LinearProgress);
const CardPerfil = (props) => {
  const classes = useStyles();
  const { nombre, titulo, subtitle, textBtn, to, imageURL, porcentaje } = props;
  console.log(porcentaje);
  return (
    <>
      <div className="container-perfilhome">
        <div className="overlay-perfil-home"></div>
        <div className="cont-img-card-perfil-home">
          {imageURL ? (
            <img
              style={{
                borderRadius: "50%",
                height: "120px",
                width: "120px",
                marginTop: "30px",
                marginBottom: "30px",
              }}
              src={imageURL}
              alt="user-logo"
            />
          ) : (
            <img src={userlogo} alt="user-logo" />
          )}
        </div>
        <div className="cont-center-card-home">
          <p style={{ color: "white" }}>Bienvenido {nombre}!</p>
          <p style={{ color: "white" }}>
            {porcentaje === 100 ? "Tu perfil esta completado al 100%" : titulo}
          </p>
          <p style={{ color: "white" }}>{porcentaje === 100 ? "" : subtitle}</p>
          <div className={classes.root}>
            <BorderLinearProgress variant="determinate" value={porcentaje} />
          </div>
        </div>
        <div className="cont-btn-complete-perfil-home">
          <Link to={to} className="link">
            <ListItem button className="btn-comenzar-perfil-home">
              <p>{porcentaje === 100 ? "Ir a mi perfil" : textBtn}</p>
            </ListItem>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardPerfil;
