import React, { useState } from "react";
import "./AdnSap.css";

const AdnSap = ({ data }) => {
  const { adns } = data;
  const [active, setActive] = useState(0);
  return (
    <div className="adn-sap-infoAviso-of">
      <div className="item-1">
        {adns.map((item, index) => (
          <Modulos
            key={index}
            data={item}
            setActive={setActive}
            active={active}
            num={index}
          />
        ))}
      </div>
      <div className="item-2">
        <div className="sub-item-1">
          <div className="modulo-big-infoAviso-of">
            <p
              className={
                adns[active].modulo.length > 6 ? "name-submod-large" : null
              }
            >
              {adns[active].modulo}
            </p>
          </div>
          <p className="p1">{adns[active].desc}</p>
        </div>
        <div className="sub-item-2">
          <div className="cont-submodulos">
            {adns[active].submodulos.map((item, index) => (
              <Submodulos key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdnSap;

const Modulos = ({ data, setActive, active, num }) => {
  const handleClick = () => {
    setActive(num);
  };
  return (
    <div
      className={
        active === num
          ? "cont-modulo-infoAviso-of"
          : "cont-modulo-infoAviso-of-inact"
      }
      onClick={handleClick}
    >
      <p className={data.modulo.length > 6 ? "name-submod-large" : null}>
        {data.modulo}
      </p>
    </div>
  );
};

const Submodulos = ({ data }) => {
  return (
    <div className="cont-submod-infoAviso-of">
      <div className="mod-submod-infoAviso-of">
        <div>
          <p className={data.submodulo.length > 6 ? "name-submod-large" : null}>
            {data.submodulo}
          </p>
        </div>
      </div>
      <div className="desc-nivel-infoAviso-of">
        <p className="p1">
          {data.desc.length > 25
            ? data.desc.substring(0, 25) + "..."
            : data.desc}
        </p>
        <div>
          <p>{data.nivel}</p>
        </div>
      </div>
    </div>
  );
};
