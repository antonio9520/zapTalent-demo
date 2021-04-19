import React from "react";
import "./CardJob.css";
import NumberFormat from "react-number-format";
import icontrabajo from "../../../../resources/images/SapMitrabajos/icon-enterprise.svg";
import { Tooltip } from "../../../../components";
import { Hidden } from "@material-ui/core";

const CardJob = ({
  data,
  setOpenModal,
  setDataOL,
  setIdEmp,
  setOpenModalAviso,
  setIdAviso,
}) => {
  // console.log(data);
  const verAviso = () => {
    setIdAviso(data._id);
    setIdEmp(data.idusuario);
    setOpenModalAviso(true);
  };
  const fechaInicio = new Date(data.creacion).getTime();
  const fechaFin = new Date().getTime();

  const diff = fechaFin - fechaInicio;
  const dias = Math.round(diff / (1000 * 60 * 60 * 24));

  return (
    <>
      <Hidden xsDown>
        <div className="cont-card-job" onClick={verAviso}>
          <div className="sub-div-cardjob-1">
            <div className="img-card-job">
              {data.logoURL ? (
                <img
                  className="img-job-of-table-home"
                  src={data.logoURL}
                  alt="trabajo"
                />
              ) : (
                <img src={icontrabajo} alt="trabajo" />
              )}
            </div>
          </div>
          <div className="sub-div-cardjob-2">
            {data.titulo.length > 30 ? (
              <Tooltip title={data.titulo} placement="top">
                <p> {data.titulo.substring(0, 30) + "..."}</p>
              </Tooltip>
            ) : (
              <p> {data.titulo}</p>
            )}
            <p>{data.profesion}</p>
          </div>
          {/* <div className="sub-div-cardjob-3">
     
      </div> */}
          <div className="sub-div-cardjob-4">
            <p>Jornada</p>
            <p>{data.jornadaLaboral}</p>
          </div>
          <div className="sub-div-cardjob-5">
            <p>Publicado</p>
            <p>
              Hace {dias} {dias === 1 ? "dia" : "dias"}
            </p>
          </div>
          <div className="sub-div-cardjob-6">
            <p>Ubicación</p>
            <p>{data.region}</p>
          </div>
          <div className="sub-div-cardjob-7">
            <p>Salario</p>
            <p>
              {data.renta === 0 ? (
                " A convenir"
              ) : (
                <NumberFormat
                  value={data.renta}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" $"}
                />
              )}
            </p>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className="cont-card-job-mini" onClick={verAviso}>
          <div>
            <div className="sub-div-cardjob-1">
              <div className="img-card-job">
                {data.logoURL ? (
                  <img
                    className="img-job-of-table-home"
                    src={data.logoURL}
                    alt="trabajo"
                  />
                ) : (
                  <img src={icontrabajo} alt="trabajo" />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="sub-div-cardjob-2">
              {data.titulo.length > 30 ? (
                <Tooltip title={data.titulo} placement="top">
                  <p> {data.titulo.substring(0, 30) + "..."}</p>
                </Tooltip>
              ) : (
                <p> {data.titulo}</p>
              )}
              <p>{data.profesion}</p>
            </div>
            {/* <div className="sub-div-cardjob-3">
     
      </div> */}
            <div className="sub-div-cardjob-4">
              <p>Jornada</p>
              <p>{data.jornadaLaboral}</p>
            </div>
            <div className="sub-div-cardjob-5">
              <p>Publicado</p>
              <p>
                Hace {dias} {dias === 1 ? "dia" : "dias"}
              </p>
            </div>
            <div className="sub-div-cardjob-6">
              <p>Ubicación</p>
              <p>{data.region}</p>
            </div>
            <div className="sub-div-cardjob-7">
              <p>Salario</p>
              <p>
                {data.renta === 0 ? (
                  " A convenir"
                ) : (
                  <NumberFormat
                    value={data.renta}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" $"}
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default CardJob;
