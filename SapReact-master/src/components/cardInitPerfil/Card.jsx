import React from "react";
import "./Card.css";
import { Button } from "@material-ui/core";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Card = ({
  title,
  desc,
  txtBtn,
  type,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  imgFive,
  colorOne,
  colorTwo,
  link,
}) => {
  const cardClasses = classNames({
    "cont-card-new-perfil": true,
    "backgound-img-card-one": imgOne && type === "typeMasc",
    "backgound-img-card-two": imgTwo && type === "typeMasc",
    "backgound-img-card-three": imgThree && type === "typeMasc",
    "backgound-img-card-four": imgFour && type === "typeMasc",
    "backgound-img-card-five": imgFive && type === "typeMasc",
  });
  const tituloStyle = classNames({
    "title-card-new-perfil": true,
    "title-type-one-cards-perfil": colorOne,
    "title-type-two-cards-perfil": colorTwo,
  });
  const descStyle = classNames({
    "desc-card-new-perfil": true,
    "desc-type-one-cards-perfil": colorOne,
    "desc-type-two-cards-perfil": colorTwo,
  });
  const btnStyle = classNames({
    "btn-card-new-perfil": true,
    "btn-type-one-cards-perfil": colorOne,
    "btn-type-two-cards-perfil": colorTwo,
  });
  return (
    <div className={cardClasses}>
      <h1 className={tituloStyle}>{title}</h1>
      <p className={descStyle}>{desc}</p>
      <Link className="link" to={link}>
        <Button className={btnStyle}>
          <p>{txtBtn}</p>
        </Button>
      </Link>
    </div>
  );
};

export default Card;
