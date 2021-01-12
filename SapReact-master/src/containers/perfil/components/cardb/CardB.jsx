import React from "react";
import "./CardB.css";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import className from "classnames";
import { Link } from "react-router-dom";
const CardB = (props) => {
  const { texto, typeA, typeB, link } = props;
  const cardStyle = className({
    "cont-card-b-perfil": true,
    "type-a-perfil": typeA,
    "type-b-perfil": typeB,
  });

  const textStyle = className({
    "text-card-a-perfil": typeA,
    "text-card-b-perfil": typeB,
  });

  const btnStyle = className({
    "btn-card-a-perfil": typeA,
    "btn-card-b-perfil": typeB,
  });
  return (
    <div className={cardStyle}>
      <div>
        <p className={textStyle}>{texto}</p>
      </div>
      <div>
        {link ? (
          <Link to="/estudios" className="link">
            <IconButton className={btnStyle} {...props}>
              <Edit />
            </IconButton>
          </Link>
        ) : (
          <IconButton className={btnStyle} {...props}>
            <Edit />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default CardB;
