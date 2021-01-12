import React from "react";
import "./CardB.css";
import classNames from "classnames";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";

const CardB = (props) => {
  const { type, titulo, desc } = props;
  const cardClasses = classNames({
    "cont-card-b": true,
  });
  const overlay = classNames({
    "typeA1-cardb": type === "typeA1",
    "typeA2-cardb": type === "typeA2",
    "typeB1-cardb": type === "typeB1",
    "typeB2-cardb": type === "typeB2",
  });
  const title = classNames({
    "titleA1-cardb": type === "typeA1" || type === "typeB1",
    "titleA2-cardb": type === "typeA2" || type === "typeB2",
  });
  const descStyle = classNames({
    "descA1-cardb": type === "typeA1" || type === "typeB1",
    "descA2-cardb": type === "typeA2" || type === "typeB2",
  });
  return (
    <div className={cardClasses}>
      <div className={overlay}></div>
      <div
        style={{
          // backgroundColor: "red",
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <p className={title}>{titulo}</p>
      </div>
      <div
        style={{
          // backgroundColor: "blue",
          flex: 0.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className={descStyle}>{desc}</p>
      </div>
      <div
        style={{
          // backgroundColor: "green",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Link {...props} className="link">
          <ListItem button className="btn-comenzar-cardb">
            <p>Comenzar</p>
          </ListItem>
        </Link>
      </div>
    </div>
  );
};

export default CardB;
