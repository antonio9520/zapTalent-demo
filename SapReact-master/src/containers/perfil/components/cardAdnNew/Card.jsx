import React, { useState, useEffect } from "react";
import "./Card.css";
import {
  ArrowForward,
  ArrowBack,
  Visibility,
  Edit,
  AccountTree,
  CloudUpload,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editarAdnAction } from "../../../../redux/actions/adnAction";

const Card = ({ data, setOpenModalEditar, setDataEditar }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
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

  const initEdit = () => {
    setDataEditar(datasort[activeStep]);
    setOpenModalEditar(true);
  };
  const fileChange = (e) => {
    if (e.target.value) {
      setFile(e.target.files[0]);
    }
  };
  const adnURL = file;
  useEffect(() => {
    const subirAdn = () => {
      dispatch(editarAdnAction({ _id: datasort[activeStep]._id, adnURL }));
    };
    if (adnURL) {
      subirAdn();
    }
  }, [file]);
  return (
    <>
      <div className="card-adn-new-perfil">
        <div className="cont-swipeables-new-perfil">
          <div className="header-card-job-new-perfil">
            <Link className="link" to="/sap-adn" style={{ display: "flex" }}>
              <AccountTree className="header-icon-adn-new-perfil" />
              <Tooltip title="Ir a mi ADN-SAP" placement="top">
                <p className="p-mi-adn-perfil">Mi ADN SAP</p>
              </Tooltip>
            </Link>
            <Tooltip title="Editar" placement="top">
              <IconButton
                className="btn-edit-new-perfil-job"
                onClick={initEdit}
              >
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

          {/* <div className="overlay-view-more-adn"></div> */}
        </div>
        <div className="cont-arrow-btns-new-perfil">
          {datasort ? (
            datasort[activeStep].adnURL ? (
              <Tooltip title="Ver archivo">
                <IconButton
                  className={"btn-arrow-perfil-adn"}
                  href={data[activeStep].adnURL}
                  target="_blank"
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <input
                  type="file"
                  id={`raised-button-file${data._id}`}
                  onChange={(e) => fileChange(e)}
                  style={{ display: "none" }}
                  accept="application/pdf, image/png, .jpeg, .jpg, image/gif, .doc, .docx"
                />
                <Tooltip title="Subir archivo">
                  <IconButton className={"btn-arrow-perfil-adn"}>
                    <label
                      htmlFor={`raised-button-file${data._id}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <CloudUpload style={{ color: "#187ce2" }} />
                    </label>
                  </IconButton>
                </Tooltip>
              </>
            )
          ) : null}
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
