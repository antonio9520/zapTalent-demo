import React, { useState, useEffect } from "react";
import "./Card.css";
import {
  ArrowForward,
  ArrowBack,
  Business,
  Visibility,
  Edit,
  CloudUpload,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import { useDispatch } from "react-redux";
import { editarCertAction } from "../../../../redux/actions/certificadoAction";
import { Link } from "react-router-dom";

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

  const certificadoURL = file;
  useEffect(() => {
    const subirAdn = () => {
      dispatch(
        editarCertAction({ _id: datasort[activeStep]._id, certificadoURL })
      );
    };
    if (certificadoURL) {
      subirAdn();
    }
  }, [file]);
  return (
    <div className="card-job-new-perfil">
      <div className="cont-swipeables-new-perfil">
        <div className="header-card-job-new-perfil">
          <Link
            className="link"
            to="/certificaciones"
            style={{ display: "flex" }}
          >
            <Business className="header-icon-cert-new-perfil" />
            <Tooltip title="Ir a mis Certificaciones." placement="top">
              <p className="p-mis-cert-perfil">Mis Certificados</p>
            </Tooltip>
          </Link>
          <Tooltip title="Editar" placement="top">
            <IconButton className="btn-edit-new-perfil-job" onClick={initEdit}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        {/* <div className="sub-swipeables-new-perfil"> */}
        <SwipeableViews index={activeStep}>
          {datasort.map((item, index) => (
            <Certificado key={index} data={item} />
          ))}
        </SwipeableViews>
        {/* </div> */}
        <div className="overlay-view-more"></div>
      </div>
      <div className="cont-arrow-btns-new-perfil">
        {datasort ? (
          datasort[activeStep].certificadoURL ? (
            <Tooltip title="Ver archivo">
              <IconButton
                className={"btn-arrow-perfil-job"}
                href={data[activeStep].certificadoURL}
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
                <IconButton className={"btn-arrow-perfil-job"}>
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
                    <CloudUpload />
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
                ? "btn-arrow-perfil-inact-job"
                : "btn-arrow-perfil-job"
            }
            onClick={() => handleBack()}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            disabled={activeStep === data.length - 1}
            className={
              activeStep === data.length - 1
                ? "btn-arrow-perfil-inact-job"
                : "btn-arrow-perfil-job"
            }
            onClick={() => handleNext()}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Card;

const Certificado = ({ data }) => {
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const f = new Date(data.fecha);

  return (
    <div className="sub-swipeables-new-perfil">
      <div className="cont-card-job-perfil">
        <p className="p2-cert-b-perfil">{data.certificacion}</p>
        <p className="p3-job-b-perfil">{data.universidad}</p>
        <p className="p4-cert-perfil-new-perfil">
          {data
            ? MESES[f.getMonth()] + ", " + data.fecha.substring(0, 4)
            : null}
        </p>
        <div className="estado-cert-perfil-new">
          <p>{data.estado}</p>
        </div>
        <div>
          <p className="p-obs-cert-perfil-new">{data.obs}</p>
        </div>
        {/* <p className="p-obs-cert-perfil-new">{data.obs}</p> */}
      </div>
    </div>
  );
};
