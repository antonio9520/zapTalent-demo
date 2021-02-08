import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="card-avisos-empty">
      <p className="p1">Listado de todos tus avisos</p>
      <p className="p2">Aquí se mostrará el total de avisos que haz creado</p>
      <Link to="/empresas/avisos" className="link">
        <div>
          <p>Comenzar</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
