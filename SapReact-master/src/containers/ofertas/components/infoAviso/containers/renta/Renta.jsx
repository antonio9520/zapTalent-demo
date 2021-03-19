import React from "react";
import "../styles.css";
import { LocalAtm, CardGiftcard } from "@material-ui/icons";
import NumberFormat from "react-number-format";

const Renta = ({ data }) => {
  const { renta, beneficios } = data;
  return (
    <div className="renta-ben-infoAviso-of">
      <div className="item-1">
        <div className="sub-item-1">
          <Item
            title="Renta ofrecida"
            value={
              renta === 0 ? (
                "A convenir"
              ) : (
                <NumberFormat
                  value={renta}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$ "}
                />
              )
            }
            icon={<LocalAtm />}
          />
        </div>
        {beneficios ? (
          <div className="sub-item-1">
            <Item
              title="Beneficios"
              value={beneficios.length}
              icon={<CardGiftcard />}
            />
          </div>
        ) : null}
      </div>
      <div className="item-2">
        {beneficios
          ? beneficios.map((item, index) => (
              <Beneficio key={index} data={item.beneficio} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Renta;

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

const Beneficio = ({ data }) => {
  return (
    <div className="beneficio-infoAviso-of">
      <p>{data}</p>
    </div>
  );
};
