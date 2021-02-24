import React from "react";
import "../styles.css";
import { LocationOn } from "@material-ui/icons";

const Direccion = ({ data }) => {
  return (
    <div className="cont-direccion-info-emp">
      <div className="sub-cont-direccion-info-emp">
        {data
          ? data.map((item, index) => (
              <DireccionItem key={index} num={index + 1} data={item} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Direccion;

const DireccionItem = ({ num, data }) => {
  return (
    <div className="direccion-item">
      <div className="direccion-item-top">
        <div className="direccion-item-top-left">
          <Item
            title={`Dirección ${num}`}
            icon={<LocationOn />}
            value={data.direccion}
          />
        </div>
        <div className="direccion-item-top-right">
          <Item
            title={`Comuna ${num}`}
            icon={<LocationOn />}
            value={data.comuna}
          />
        </div>
      </div>
      <div className="direccion-item-bottom">
        <Item
          title={`Región ${num}`}
          icon={<LocationOn />}
          value={data.region}
        />
      </div>
    </div>
  );
};

const Item = ({ title, value, icon }) => {
  return (
    <div className="item-datos-pers-emp-home">
      <div className="left-dp">
        <div>{icon}</div>
      </div>
      <div className="right-dp">
        <div className="top-dp">
          <p>{title}</p>
        </div>
        <div className="bottom-dp">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};
