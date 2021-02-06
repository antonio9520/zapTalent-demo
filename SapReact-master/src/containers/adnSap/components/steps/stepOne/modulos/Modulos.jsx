import React, { useState, useEffect } from "react";
import "./Modulos.css";
import SwipeableViews from "react-swipeable-views";
import { useSelector } from "react-redux";
import { Tooltip } from "../../../../../../components";

const Modulos = (props) => {
  const { activeStep, modulos, setArrayModules, arrayModules } = props;
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
              item={item}
              arrayModules={arrayModules}
              setArrayModules={setArrayModules}
            />
          ))} 
        </div>
      ))}
    </SwipeableViews>
  );
};

export default Modulos;

const ItemModulo = ({ item, setArrayModules, arrayModules }) => {
  const [active, setActive] = useState(false);
  const usuario = useSelector((state) => state.auth.usuario);
  const handleClick = () => {
    setActive(!active);
    if (active) {
      setArrayModules(arrayModules.filter((i) => i.name !== item.modulo));
    } else {
      setArrayModules([
        ...arrayModules,
        {
          name: item.modulo,
          desc: item.desc,
          idcert: "",
          obs: "",
          submodulos: [],
          iduser: usuario._id,
        },
      ]);
    }
  };
  useEffect(() => {
    arrayModules.map((it) => {
      if (it.name === item.modulo) {
        setActive(true);
      }
    });
  }, []);
  return (
    <Tooltip title={item.desc} aria-label="add">
      <div
        className={
          active ? "sub-cont-SwipeableViews-active" : "sub-cont-SwipeableViews"
        }
        onClick={() => handleClick()}
      >
        <p style={{ color: "white" }}>{item.modulo}</p>
      </div>
    </Tooltip>
  );
};
