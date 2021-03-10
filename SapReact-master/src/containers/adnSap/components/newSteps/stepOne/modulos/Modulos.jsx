import React, { useState, useEffect } from "react";
import "./Modulos.css";

import SwipeableViews from "react-swipeable-views";
import { useSelector } from "react-redux";
import { Tooltip } from "../../../../../../components";

const Modulos = (props) => {
  const { activeStep, modulos, setDataModulo, dataModulo } = props;
  let arrayModulos = [];
  const longitudPedazos = 3;

  for (let i = 0; i < modulos.length; i += longitudPedazos) {
    let trozo = modulos.slice(i, i + longitudPedazos);
    arrayModulos.push(trozo);
  }

  return (
    <SwipeableViews index={activeStep}>
      {arrayModulos.map((item, index) => (
        <div key={index} className="cont-SwipeableViews">
          {item.map((item, index) => (
            <ItemModulo
              key={index}
              data={item}
              setDataModulo={setDataModulo}
              dataModulo={dataModulo}
            />
          ))}
        </div>
      ))}
    </SwipeableViews>
  );
};

export default Modulos;

const ItemModulo = ({ data, setDataModulo, dataModulo }) => {
  const { desc, modulo } = data;
  const [active, setActive] = useState(false);
  const usuario = useSelector((state) => state.auth.usuario);

  const handleClick = () => {
    setActive(!active);
    if (active) {
      setDataModulo(dataModulo.filter((i) => i.name !== modulo));
    } else {
      setDataModulo([
        ...dataModulo,
        {
          name: modulo,
          desc: desc,
          idcert: "",
          obs: "",
          submodulos: [],
          iduser: usuario._id,
        },
      ]);
      setTimeout(() => {
        funcionScroll();
      }, 200);
    }
  };

  const funcionScroll = () => {
    let contenedor = document.getElementById("step-one-new-modal-adn-center");
    contenedor.scrollTop = "9999";
  };

  useEffect(() => {
    dataModulo.map((it) => {
      if (it.name === modulo) {
        setActive(true);
      }
    });
  }, []);

  return (
    <Tooltip title={desc} placement="top">
      <div
        className={
          active
            ? "sub-cont-SwipeableViews-active-two"
            : "sub-cont-SwipeableViews-two"
        }
        onClick={handleClick}
      >
        <p
          style={{ color: "white" }}
          className={modulo.length > 6 ? "name-submod-large" : null}
        >
          {modulo}
        </p>
      </div>
    </Tooltip>
  );
};
