import React, { useState, useEffect } from "react";
import "./CardPerfil.css";
import {
  Settings,
  Publish,
  Edit,
  Person,
  Email,
  PhoneAndroid,
  LocationOn,
  Flag,
  Fingerprint,
  People,
  MonetizationOn,
  Description,
  CloudUpload,
} from "@material-ui/icons";
import { IconButton, Button } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import imgUser from "../../../../resources/ZAPTalent-Icon-Empty.svg";
import { useSelector, useDispatch } from "react-redux";
import { subirImagenAction } from "../../../../redux/actions/authAction";
import Footer from "./footer/Footer";
import NumberFormat from "react-number-format";

const CardPerfil = ({
  openModalRRSS,
  setOpenModalRRSS,
  setOpenModal,
  setActive,
  setActiveStep,
  habilidades,
  setOpenModalHab,
  empresas,
  porcentaje,
}) => {
  const dispatch = useDispatch();
  let usuario; 
  const usuarioA = useSelector((state) => state.auth.usuario);
  const usuarioB = useSelector((state) => state.userInfo.usuario);
  if (empresas) {
    usuario = usuarioB;
  } else {
    usuario = usuarioA;
  }
  const [active2, setActive2] = useState(true);
  let profesion;
  if (usuario) {
    profesion = usuario.profesion ? usuario.profesion.name : null;
  }
  const [image, setImage] = useState({
    preimage: usuario ? usuario.imageURL : null,
    name: "",
  });
  const [file, setFile] = useState(null);

  const fileChange = (e) => {
    if (e.target.value) {
      setImage({
        preimage: URL.createObjectURL(e.target.files[0]),
        name: e.target.value,
      });
      setFile(e.target.files[0]);
    }
  };
  const imageURL = file;

  useEffect(() => {
    const subirImage = () => {
      dispatch(
        subirImagenAction({ _id: usuario._id, imageURL, type: "image" })
      );
    };
    if (imageURL) {
      subirImage();
    }
  }, [file]);

  useEffect(() => {
    setImage({ preimage: usuario ? usuario.imageURL : null, name: "" });
  }, [usuario]);
  return (
    <div className="new-card-perfil">
      <div className="item-1">
        <div>
          <Settings className="icon-header-perfil-new" />{" "}
          <p>Perfil completado en {porcentaje}%</p>
        </div>
      </div>
      <div className="item-2">
        <div>
          {image.preimage ? (
            <div className="cont-img-perfil-perfil-new">
              <img
                className="user-img-perfil-perfil-new"
                alt="user-img"
                src={image.preimage}
              ></img>
            </div>
          ) : (
            <div className="cont-img-perfil-perfil-new">
              <img
                src={imgUser}
                className="user-img-perfil-new"
                alt="user-imge"
              />
            </div>
          )}

          {!empresas ? (
            <>
              <input
                type="file"
                id="raised-button-file"
                onChange={(e) => fileChange(e)}
                style={{ display: "none" }}
                accept="image/*"
              />
              <Tooltip title="Subir foto de perfil">
                <IconButton className="btn-upload-image-perfil-new">
                  <label
                    htmlFor="raised-button-file"
                    className="label-btn-add-photo"
                  >
                    <div
                      style={{
                        width: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#187ce2",
                        borderRadius: "50%",
                      }}
                    >
                      <Publish
                        style={{
                          color: "#fff",
                          width: "40px",
                        }}
                      />
                    </div>
                  </label>
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </div>
        <p className="p1">
          {usuario ? usuario.nombres + " " + usuario.apellidos : "Indefinido"}
        </p>
        <p className="p2">{profesion}</p>
        <div
          className={`consultor-perfil-new ${
            usuario
              ? usuario.consultor === "Training"
                ? "training"
                : usuario.consultor === "Junior"
                ? "junior"
                : usuario.consultor === "Semi Senior"
                ? "semiSenior"
                : usuario.consultor === "Senior"
                ? "senior"
                : null
              : null
          }`}
        >
          <p>Consultor {usuario ? usuario.consultor : null}</p>
        </div>
        <div className="btn-perfil-new">
          <Button
            className={active2 ? "btn-active" : "btn-inactive"}
            onClick={() => setActive2(true)}
          >
            <p>Datos personales</p>
          </Button>
          <Button
            className={!active2 ? "btn-active" : "btn-inactive"}
            onClick={() => setActive2(false)}
          >
            <p>Habilidades</p>
          </Button>
        </div>
      </div>
      <div className="item-3">
        {active2 ? (
          <>
            <DatosPersonales usuario={usuario} />
            {!empresas ? (
              <Tooltip title="Editar perfil">
                <IconButton
                  className="btn-edit-perfil-new"
                  onClick={() => setOpenModal(true)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            ) : null}
          </>
        ) : (
          <Habilidades
            habilidades={habilidades}
            setOpenModalHab={setOpenModalHab}
          />
        )}
      </div>
      {active2 ? (
        <div className="item-4">
          {usuario ? (
            usuario.cvURL ? (
              <Tooltip title="Ver CV.">
                <IconButton
                  className="btn-cv-perfil-new"
                  href={usuario.cvURL}
                  target="_blank"
                >
                  <Description className="icon-cv-perfil-new" />
                </IconButton>
              </Tooltip>
            ) : !empresas ? (
              <Tooltip title="Subir CV.">
                <IconButton
                  className="btn-cv-perfil-new"
                  onClick={() => {
                    setActive("five");
                    setActiveStep(4);
                    setOpenModal(true);
                  }}
                >
                  <CloudUpload className="icon-cv-perfil-new" />
                </IconButton>
              </Tooltip>
            ) : null
          ) : null}
        </div>
      ) : !empresas ? (
        <div className="item-4-b">
          <div className="item-2-b">
            <IconButton
              onClick={() => setOpenModalHab(true)}
              className="btn-habilidades-new-perfil"
            >
              <Edit />
            </IconButton>
          </div>
        </div>
      ) : null}

      <div className="item-5">
        <div className="rrss-perfil-new">
          <Footer
            openModalRRSS={openModalRRSS}
            setOpenModalRRSS={setOpenModalRRSS}
            empresas={empresas}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;

const DatosPersonales = ({ usuario }) => {
  return (
    <>
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <Person className="icon-perfil-new" />
          </div>
        </div>
        <div className="sub-item-pefil-left-2">
          <div className="sub-item-pefil-right-top">
            <p className="p1-perfil-b">Nombre</p>
          </div>
          <div className="sub-item-pefil-right-bottom">
            <p className="p2-perfil-b">
              {usuario
                ? usuario.nombres + " " + usuario.apellidos
                : "Indefinido"}
            </p>
          </div>
        </div>
      </div>
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <Fingerprint className="icon-perfil-new" />
          </div>
        </div>
        {usuario ? (
          usuario.passport !== "" ? (
            <div className="sub-item-pefil-left-2">
              <div className="sub-item-pefil-right-top">
                <p className="p1-perfil-b">Pasaporte</p>
              </div>
              <div className="sub-item-pefil-right-bottom">
                <p className="p2-perfil-b">
                  {usuario ? usuario.passport : "Indefinido"}
                </p>
              </div>
            </div>
          ) : (
            <div className="sub-item-pefil-left-2">
              <div className="sub-item-pefil-right-top">
                <p className="p1-perfil-b">Rut</p>
              </div>
              <div className="sub-item-pefil-right-bottom">
                <p className="p2-perfil-b">
                  {usuario ? usuario.rut : "Indefinido"}
                </p>
              </div>
            </div>
          )
        ) : null}
      </div>
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <Email className="icon-perfil-new" />
          </div>
        </div>
        <div className="sub-item-pefil-left-2">
          <div className="sub-item-pefil-right-top">
            <p className="p1-perfil-b">Email</p>
          </div>
          <div className="sub-item-pefil-right-bottom">
            <p className="p2-perfil-b">
              {usuario ? usuario.email : "Indefinido"}
            </p>
          </div>
        </div>
      </div>
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <PhoneAndroid className="icon-perfil-new" />
          </div>
        </div>
        <div className="sub-item-pefil-left-2">
          <div className="sub-item-pefil-right-top">
            <p className="p1-perfil-b">Número móvil</p>
          </div>
          <div className="sub-item-pefil-right-bottom">
            <p className="p2-perfil-b">
              {usuario ? usuario.phone : "Indefinido"}
            </p>
          </div>
        </div>
      </div>
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <People className="icon-perfil-new" />
          </div>
        </div>
        <div className="sub-item-pefil-left-2">
          <div className="sub-item-pefil-right-top">
            <p className="p1-perfil-b">Estado civil</p>
          </div>
          <div className="sub-item-pefil-right-bottom">
            <p className="p2-perfil-b">
              {usuario ? usuario.ecivil : "Indefinido"}
            </p>
          </div>
        </div>
      </div>
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <Flag className="icon-perfil-new" />
          </div>
        </div>
        <div className="sub-item-pefil-left-2">
          <div className="sub-item-pefil-right-top">
            <p className="p1-perfil-b">Nacionalidad</p>
          </div>
          <div className="sub-item-pefil-right-bottom">
            <p className="p2-perfil-b">
              {usuario ? usuario.nacion : "Indefinido"}
            </p>
          </div>
        </div>
      </div>
      {usuario ? (
        usuario.pretencion ? (
          <div className="item-card-perfil-b">
            <div className="sub-item-pefil-left">
              <div className="cont-img-perfil-new">
                <MonetizationOn className="icon-perfil-new" />
              </div>
            </div>
            <div className="sub-item-pefil-left-2">
              <div className="sub-item-pefil-right-top">
                <p className="p1-perfil-b">Pretensión de renta</p>
              </div>
              <div className="sub-item-pefil-right-bottom">
                <p className="p2-perfil-b">
                  {usuario ? (
                    <>
                      {"$ "}
                      <NumberFormat
                        value={usuario.pretencion}
                        displayType={"text"}
                        thousandSeparator={true}
                        // prefix={"$"}
                      />{" "}
                    </>
                  ) : (
                    "Indefinido"
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
      <div className="item-card-perfil-b">
        <div className="sub-item-pefil-left">
          <div className="cont-img-perfil-new">
            <LocationOn className="icon-perfil-new" />
          </div>
        </div>
        <div className="sub-item-pefil-left-2">
          <div className="sub-item-pefil-right-top">
            <p className="p1-perfil-b">Dirección</p>
          </div>
          <div className="sub-item-pefil-right-bottom">
            <p className="p2-perfil-b">
              {usuario
                ? usuario.direccion +
                  ", " +
                  usuario.comuna +
                  ", " +
                  usuario.region
                : "Indefinido"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Habilidades = ({ habilidades }) => {
  return (
    <div className="cont-habilidades-perfil-new">
      <div className="item-1-b">
        {habilidades
          ? habilidades.map((item, index) => (
              <div className="habilidad">
                <p>{item.name}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
