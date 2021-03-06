import React, { useState, useEffect } from "react";
import "./Card.css";
import { IconButton } from "@material-ui/core";
import {
  Edit,
  CloudUploadOutlined,
  VisibilityOutlined,
  Close,
} from "@material-ui/icons";
import logocert from "../../../../resources/images/icon-menu-miscertificaciones.svg";
import { useDispatch } from "react-redux";
import { editarCertAction } from "../../../../redux/actions/certificadoAction";
import { Tooltip } from "../../../../components";

const Card = (props) => {
  const {
    data,
    setOpenModalEliminar,
    setIdEliminar,
    setOpenModalEditar,
    setDataEditar,
  } = props;
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
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
  const now = new Date();
  const year = now.getFullYear();
  const f = new Date(data.fecha);
  const initDelete = () => {
    setIdEliminar(data._id);
    setOpenModalEliminar(true);
  };
  const comenzarEditar = () => {
    setDataEditar(data);
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
      dispatch(editarCertAction({ _id: data._id, certificadoURL }));
    };
    if (certificadoURL) {
      subirAdn();
    }
  }, [file]);

  return (
    <div className="cont-card-cert">
      <div className="cont-img-cert">
        <img src={logocert} alt="logo-cert" />
      </div>
      <Tooltip title={data.certificacion} placement="top">
        <p className="p1-cert">
          {data.certificacion.length > 45
            ? data.certificacion.substring(0, 45) + "..."
            : data.certificacion}
        </p>
      </Tooltip>
      <p className="p2-cert">{data.universidad}</p>
      <p className="p3-cert">
        {data ? MESES[f.getMonth()] + ", " + data.fecha.substring(0, 4) : null}
      </p>
      <div className="cont-estado-cert">
        <p style={{ color: "white" }}>{data.estado}</p>
      </div>
      <p className="p4-cert">{data.obs}</p>
      <div className="cont-btns-card-cert-b2">
        {data ? (
          data.certificadoURL ? (
            <Tooltip title="Ver archivo">
              <IconButton
                size="small"
                className="btns-card-cert "
                href={data.certificadoURL}
                target="_blank"
              >
                <VisibilityOutlined />
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
                <IconButton size="small" className="btns-card-cert ">
                  <label
                    htmlFor={`raised-button-file${data._id}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <CloudUploadOutlined />
                  </label>
                </IconButton>
              </Tooltip>
            </>
          )
        ) : null}

        <div className="cont-icon-btns-cert-b">
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
      </div>
      {data.fecha.substring(0, 4) === year.toString() ? (
        <div className="etiqueta-nuevo">
          <p style={{ color: "white" }}>Nuevo</p>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
