import React, { useState, useEffect } from "react";
import "./CardJob.css";
import icontrabajo from "../../../../resources/images/SapMitrabajos/icon-enterprise.svg";
import {
  BusinessCenter,
  Edit,
  Person,
  Email,
  PhoneAndroid,
  AccountCircle,
  Close,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import NumberFormat from "react-number-format";

const CardJob = (props) => {
  const {
    data,
    setOpenModalEliminar,
    setIdEliminar,
    setOpenModalEditar, 
    setDataEditar,
  } = props;
  const [_switch, setSwitch] = useState(false);
  const initDelete = () => {
    setIdEliminar(data._id);
    setOpenModalEliminar(true);
  };
  const comenzarEditar = () => {
    setDataEditar(data);
    setOpenModalEditar(true);
  };

  let ano = new Date().getFullYear();
  let fechaTermino = data.findate.substring(0, 4);

  useEffect(() => {
    if (fechaTermino > ano.toString()) {
      setSwitch(true);
    }
  }, []);
  return (
    <div
      className={"cont-card-job-b"}
      style={{
        background: _switch
          ? "linear-gradient(90deg,rgba(21, 134, 234, 1) 0%, rgba(46, 74, 199, 1) 100%"
          : null,
      }}
    > 
      <div className="cont-img-card-job-b">
        <img src={icontrabajo} alt="icon-trabajo" />
      </div>
      <div className="sub-right-job-b">
        <p className="p2-job-b" style={{ color: _switch ? "white" : null }}>
          {data.nomempresa}
        </p>
        <p className="p3-job-b" style={{ color: _switch ? "white" : null }}>
          {data.cargo}
        </p>
        <p className="p4-job-b" style={{ color: _switch ? "white" : null }}>
          {data.actempresa}
        </p>
        <div className="sub-right-job-b2">
          <div className="sub-right-job-b1">
            <BusinessCenter
              className="icon-suitcase"
              style={{ color: _switch ? "white" : null }}
            />
            {data.areapuesto.length > 15 ? (
              <Tooltip title={data.areapuesto}>
                <div className="anima-div-job">
                  <p style={{ color: _switch ? "white" : null }}>
                    {data.areapuesto}
                  </p>
                </div>
              </Tooltip>
            ) : (
              <p
                className="short-text-job"
                style={{ color: _switch ? "white" : null }}
              >
                {data.areapuesto}
              </p>
            )}
          </div>
          <div className="sub-right-job-b1-2">
            <BusinessCenter
              className="icon-suitcase"
              style={{ color: _switch ? "white" : null }}
            />
            {data.subarea.length > 15 ? (
              <Tooltip title={data.subarea}>
                <div className="anima-div-job">
                  <p style={{ color: _switch ? "white" : null }}>
                    {data.subarea}
                  </p>
                </div>
              </Tooltip>
            ) : (
              <p
                className="short-text-job"
                style={{ color: _switch ? "white" : null }}
              >
                {data.subarea}
              </p>
            )}
          </div>
        </div>
        <p className="p1-job-b" style={{ color: _switch ? "white" : null }}>
          {data.inidate.substring(0, 4)} -{" "}
          {_switch ? "Actualidad" : data.findate.substring(0, 4)}
        </p>
        <p className="p5-job-b" style={{ color: _switch ? "white" : null }}>
          {data.pais}
        </p>
      </div>
      <div className="sub-right-job-b-2">
        <div className="cont-pc-pa">
          {data.personacargo ? (
            <div className="item-1-job-b">
              <p
                className="p6-job-b"
                style={{ color: _switch ? "white" : null }}
              >
                Personas a Cargo
              </p>
              <div style={{ backgroundColor: _switch ? "#187ce2" : null }}>
                <p
                  className="p7-job-b"
                  style={{ color: _switch ? "white" : null }}
                >
                  <NumberFormat
                    value={data.personacargo}
                    displayType={"text"}
                    thousandSeparator={true}
                    // prefix={"$"}
                  />
                </p>
              </div>
            </div>
          ) : null}
          {data.manejopresupuesto ? (
            <div className="item-2-job-b">
              <p
                className="p6-job-b"
                style={{ color: _switch ? "white" : null }}
              >
                Manejo de presupuesto Anual
              </p>
              <div style={{ backgroundColor: _switch ? "#187ce2" : null }}>
                <p
                  className="p7-job-b"
                  style={{ color: _switch ? "white" : null }}
                >
                  <NumberFormat
                    value={data.manejopresupuesto}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </p>
              </div>
            </div>
          ) : null}
        </div>
        {data.reflogros ? (
          <div className="item-1-job-b margin-top-job">
            <p className="p6-job-b" style={{ color: _switch ? "white" : null }}>
              Logros
            </p>
            <div style={{ backgroundColor: _switch ? "#187ce2" : null }}>
              <p
                className="p7-job-b2"
                style={{ color: _switch ? "white" : null }}
              >
                {data.reflogros}
              </p>
            </div>
          </div>
        ) : null}
        {data.expzap ? (
          <div className="item-1-job-b margin-top-job">
            <p className="p6-job-b" style={{ color: _switch ? "white" : null }}>
              Experiencia ZAP
            </p>
            <div style={{ backgroundColor: _switch ? "#187ce2" : null }}>
              <p
                className="p7-job-b2"
                style={{ color: _switch ? "white" : null }}
              >
                {data.expzap}
              </p>
            </div>
          </div>
        ) : null}
        {data.refnombre || data.email || data.refphone || data.refrelacion ? (
          <div className="item-1-job-b-2">
            <p className="p6-job-b" style={{ color: _switch ? "white" : null }}>
              Referencia
            </p>
            {data.refnombre ? (
              <div>
                <Person
                  className="icon-ref-card-job"
                  style={{ color: _switch ? "white" : null }}
                />
                <p
                  className="p8-job-b"
                  style={{ color: _switch ? "white" : null }}
                >
                  {data.refnombre}
                </p>
              </div>
            ) : null}
            {data.email ? (
              <div>
                <Email
                  className="icon-ref-card-job"
                  style={{
                    color: _switch ? "white" : null,
                    // marginBottom: "-10px!important",
                  }}
                />
                <p
                  className="p8-job-b"
                  style={{ color: _switch ? "white" : null }}
                >
                  {data.email}
                </p>
              </div>
            ) : null}
            {data.refphone ? (
              <div>
                <PhoneAndroid
                  className="icon-ref-card-job"
                  style={{ color: _switch ? "white" : null }}
                />
                <p
                  className="p8-job-b"
                  style={{ color: _switch ? "white" : null }}
                >
                  {data.refphone}
                </p>
              </div>
            ) : null}
            {data.refrelacion ? (
              <div>
                <AccountCircle
                  className="icon-ref-card-job"
                  style={{ color: _switch ? "white" : null }}
                />
                <p
                  className="p8-job-b"
                  style={{ color: _switch ? "white" : null }}
                >
                  {data.refrelacion}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="cont-icon-btns-job-b">
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            className="icon-btn-job-b"
            onClick={() => initDelete()}
          >
            <Close />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            size="small"
            className="icon-btn-job-b2"
            onClick={() => comenzarEditar()}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
  
      {_switch ? (
        <div className="etiqueta-nuevo" style={{ backgroundColor: "white" }}>
          <p style={{ color: "#187ce2" }}>Trabajo Actual</p>
        </div>
      ) : null}
    </div>
  );
};

export default CardJob;
