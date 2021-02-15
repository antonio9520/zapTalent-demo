import React, { useState, useEffect } from "react";
import "./CardEstudio.css";
import iconEstudio from "../../../../resources/images/SAPEstu/icon-univerity.svg";
import { IconButton } from "@material-ui/core";
import {
  Edit,
  Close,
  VisibilityOutlined,
  CloudUploadOutlined,
} from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { useDispatch } from "react-redux";
import { editarEstudioAction } from "../../../../redux/actions/estudioAction";

const CardEstudio = (props) => {
  const {
    data,
    setIdEliminar,
    setOpenModalEliminar,
    setDataEditar,
    setOpenModalEditar,
    dataEstudioUser,
    setDataEstudioUser,
  } = props;
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const initDelete = () => {
    let carreras =  dataEstudioUser.filter((item) =>
    item.carrera === data.carrera ? null : item
  );
    setDataEstudioUser(carreras);
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
  const estudioURL = file;
  useEffect(() => {
    const subirAdn = () => {
      dispatch(
        editarEstudioAction({
          _id: data._id,
          estudioURL,
        })
      );
    };
    if (estudioURL) {
      subirAdn();
    }
  }, [file]);
  return (
    <div className="cont-card-estudio">
      <div className="cont-img-card-estudio">
        <img src={iconEstudio} alt="icon-estudio" />
      </div>
      <p className="p1-card-estudio">{data.tipoestudio}</p>
      <Tooltip title={data.carrera}>
        <p className="p2-card-estudio">
          {data.carrera.length > 40
            ? data.carrera.substring(0, 37) + "..."
            : data.carrera}
        </p>
      </Tooltip>
      <p className="p3-card-estudio">{data.institucion}</p>
      <p className="p4-card-estudio">{data.areaestudio}</p>
      <p className="p5-card-estudio">
        {data.diainicio.substring(0, 4)} - {data.diafin.substring(0, 4)}
      </p>
      <div className="cont-box-card-estudio">
        <div className="box-top-estudio">
          <div className="sub-box-estudio-1">
            <p style={{ color: "white" }}>{data.estado}</p>
          </div>
          {/* {data.estado === "Titulado" || data.estado === "Egresado" ? (
            <div className="sub-box-estudio-2">
              <p>Certificado</p>
            </div>
          ) : null} */}
        </div>
        <div className="box-bottom-estudio">
          <div className="sub-box-estudio-3">
            <p style={{ color: "white" }}>Promedio: {data.promedio}</p>
          </div>
        </div>
      </div>
      <div className="cont-obs-card-estudio">
        <p>{data.observacion}</p>
      </div>
      <div className="cont-btns-card-est-b2">
        {data ? (
          data.estudioURL ? (
            <Tooltip title="Ver archivo">
              <IconButton
                size="small"
                className="btns-card-cert "
                href={data.estudioURL}
                target="_blank"
              >
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
          ) : (
            // <IconButton size="small" className="btns-card-adn one">
            //   <CloudUpload />
            // </IconButton>
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

        <div className="cont-icon-btns-estudio">
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
    </div>
  );
};

export default CardEstudio;
