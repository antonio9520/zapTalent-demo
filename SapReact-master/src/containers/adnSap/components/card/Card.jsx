import React, { useEffect, useState } from "react";
import "./Card.css";
import { IconButton } from "@material-ui/core";
import {
  CloudUploadOutlined,
  Edit,
  VisibilityOutlined,
  Close,
} from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { useDispatch } from "react-redux";
import { editarAdnAction } from "../../../../redux/actions/adnAction";

const Card = ({
  data,
  setSwitch,
  setOpenModalEliminar,
  setIdEliminar,
  setOpenModalEditar,
  setDataEditar,
  setDataAdnUser,
  dataAdnUser,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const [file, setFile] = useState(null);

  const fileChange = (e) => {
    if (e.target.value) {
      setFile(e.target.files[0]);
    }
  };
  const adnURL = file;
  // console.log("%cData Modulos:", "color: green; font-size: 18px", dataAdnUser);
  const initDelete = () => {
    let modulos = dataAdnUser.modulos.filter((item) =>
      item === data.name ? null : item
    );
    let submodulos = [];
    data.submodulos.map((item) => {
      submodulos = dataAdnUser.submodulos.filter((i) =>
        i === item.name ? null : item
      );
    });

    setDataAdnUser({ modulos, submodulos });
    setIdEliminar(data._id);
    setOpenModalEliminar(true);
  };
  const comenzarEditar = () => {
    setSwitch(true);
    setDataEditar(data);
    setOpenModalEditar(true);
  };
  useEffect(() => {
    const subirAdn = () => {
      dispatch(editarAdnAction({ _id: data._id, adnURL }));
    };
    if (adnURL) {
      subirAdn();
    }
  }, [file]);

  return (
    <>
      {/* {loading ? (
        <Spinner />
      ) : ( */}
      <div className="cont-card-adn">
        <div className="cont-mod-adn">
          <p
            className={data.name.length > 6 ? "name-submod-large" : null}
            style={{ color: "white" }}
          >
            {data.name}
          </p>
        </div>
        <p className="p1-card-adn-desc">{data.desc}</p>
        {data.idcert ? <p className="p1-card-adn">ID: {data.idcert}</p> : null}

        {data.obs ? (
          <>
            <p className="p4-card-adn">Observación</p>
            <p className="p5-card-adn">{data.obs}</p>
          </>
        ) : null}
        <div className="cont-cards-mod-submod">
          {data.submodulos
            ? data.submodulos.map((item, index) => (
                <SubModulos data={item} key={index} />
              ))
            : null}
        </div>
        <div className="cont-btns-card-adn">
          {data ? (
            data.adnURL ? (
              <Tooltip title="Ver documento">
                <IconButton
                  size="small"
                  className="btns-card-adn one"
                  href={data.adnURL}
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
                  <IconButton
                    size="small"
                    className="one"
                    style={{
                      boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.2)",
                      padding: "0",
                    }}
                  >
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

          <div>
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
                className="icon-btn-job-b"
                style={{ marginLeft: "10px" }}
                onClick={() => comenzarEditar()}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

const SubModulos = ({ data }) => {
  return (
    <div className="cont-adn-submod">
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
            <p className="p1-adn-submodulo">
              {data.desc.length > 75
                ? data.desc.substring(0, 75) + "..."
                : data.desc}
            </p>
          </Tooltip>
          <div className="cont-nivel-adn-submodulo">
            <p style={{ color: "white" }}>{data.nivel}</p>
          </div>
        </div>
      </div>
      <div>
        {data.obs ? (
          <>
            <p className="p2-adn-submodulo">Observación</p>
            <p className="p3-adn-submodulo">{data.obs}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
