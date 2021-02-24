import React from "react";
import "../styles.css";
import { PhoneAndroid } from "@material-ui/icons";
const Contacto = ({ data }) => {
  return (
    <div className="cont-contacto-info-emp">
      <div className="sub-cont-contacto-info-emp">
        {data
          ? data.map((item, index) => (
              <Item
                title={`Teléfono ${index + 1}`}
                icon={<PhoneAndroid />}
                value={item.numero}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Contacto;

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
