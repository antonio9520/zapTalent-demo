import React, { useEffect, useState } from "react";
import "./Card.css";
import {
  ArrowForward,
  ArrowBack,
  Visibility,
  Edit,
  AccountTree,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";

const Card = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const datasort = data.sort(function (a, b) {
    a = new Date(a.findate);
    b = new Date(b.findate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="card-adn-new-perfil">
        <div className="cont-swipeables-new-perfil">
          <div className="header-card-job-new-perfil">
            <AccountTree className="header-icon-adn-new-perfil" />
            <p className="p-mi-adn-perfil">Mi ADN SAP</p>
            <Tooltip title="Editar">
              <IconButton className="btn-edit-new-perfil-job">
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
          {/* <div className="sub-swipeables-new-perfil"> */}
          <SwipeableViews index={activeStep}>
            {datasort.map((item, index) => (
              <Adn key={index} data={item} />
            ))}
          </SwipeableViews>
          {/* </div> */}
          {/* <div className="overlay-view-more-adn"></div> */}
        </div>
        <div className="cont-arrow-btns-new-perfil">
          <IconButton className={"btn-arrow-perfil-adn"}>
            <Visibility />
          </IconButton>
          <div>
            <IconButton
              disabled={activeStep === 0}
              style={{ marginRight: "10px" }}
              className={
                activeStep === 0
                  ? "btn-arrow-perfil-inact-adn"
                  : "btn-arrow-perfil-adn"
              }
              onClick={() => handleBack()}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              disabled={activeStep === data.length - 1}
              className={
                activeStep === data.length - 1
                  ? "btn-arrow-perfil-inact-adn"
                  : "btn-arrow-perfil-adn"
              }
              onClick={() => handleNext()}
            >
              <ArrowForward />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

const Adn = ({ data }) => {
  const [_switch, setSwitch] = useState(false);
  // console.log(data);
  return (
    <div className="sub-swipeables-new-perfil">
      <div className="name-modulo-adn-new-perfil">
        <p>{data.name}</p>
      </div>
      {data.idcert ? (
        <p className="p-1-adn-new-perfil">ID: {data.idcert}</p>
      ) : null}
      {data.obs ? (
        <>
          <p className="p-2-adn-new-perfil">Observación</p>
          <p className="p-3-adn-new-perfil">{data.obs}</p>
        </>
      ) : null}

      {data.submodulos.map((item, index) => (
        <Submodulo key={index} data={item} />
      ))}
    </div>
  );
};

const Submodulo = ({ data }) => {
  return (
    <div className="cont-adn-submod-perfil-new">
      <div className="top-adn-submod">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="name-adn-submod">
            <p
              className={data.name.length > 6 ? "name-submod-large" : null}
              style={{ color: "white" }}
            >
              {data.name}
            </p>
          </div>
        </div>
        <div>
          <Tooltip title={data.desc}>
            {/* <p className="p-4-adn-new-perfil">
              {data.desc.length > 23
                ? data.desc.substring(0, 23) + "..."
                : data.desc}
            </p> */}
            <p className="p-4-adn-new-perfil">{data.desc}</p>
          </Tooltip>
          <div className="nivel-adn-new-perfil">
            <p style={{ color: "white" }}>{data.nivel}</p>
          </div>
        </div>
      </div>
      <div>
        {data.obs ? (
          <>
            <p className="p-5-adn-new-perfil">Observación</p>
            <p className="p-6-adn-new-perfil">{data.obs}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
