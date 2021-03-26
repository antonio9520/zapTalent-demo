import React from "react";
import "./Telefonos.css";
import { PhoneAndroid } from "@material-ui/icons";

const Telefonos = ({ data }) => {
  const { telefonos } = data;
  return (
    <div className="telefonos-view-emp-admin">
      <div className="row">
        {telefonos
          ? telefonos.map((item, index) => (
              <div className="column">
                <Item
                  title={`Teléfono ${index + 1}`}
                  icon={<PhoneAndroid />}
                  value={item.telefono}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Telefonos;

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
