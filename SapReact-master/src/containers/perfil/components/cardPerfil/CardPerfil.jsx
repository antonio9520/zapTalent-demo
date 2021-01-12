import React, { useState, useEffect } from "react";
import "./CardPerfil.css";
import imgUser from "../../../../resources/images/SAPTalent/icon-new-user.svg";
import { IconButton } from "@material-ui/core";
import {
  Edit,
  Person,
  Email,
  PhoneAndroid,
  LocationOn,
  Flag,
  Fingerprint,
  People,
  AddAPhoto,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { subirImagenAction } from "../../../../redux/actions/authAction";
import { Tooltip } from "../../../../components";
import Footer from "./footer/Footer";

const CardPerfil = (props) => {
  const dispatch = useDispatch();
  const {
    setOpenModal,
    setOpenModalRRSS,
    openModalRRSS,
    setActive,
    setActiveStep,
  } = props;
  const usuario = useSelector((state) => state.auth.usuario);

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
    <div className="cont-card-perfil-b">
      <div className="left-card-perfil-b">
        <div className="overlay-card-perfil-b"></div>
        <Tooltip title="Editar Perfil">
          <IconButton
            className="icon-btn-edit-pefil"
            onClick={() => setOpenModal(true)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      <div className="center-card-perfil-b">
        <div className="item-card-perfil-b-1">
          {image.preimage ? (
            <div className="cont-img-perfil-b-file">
              <img
                className="user-img-perfil-b-file"
                alt="user-img"
                src={image.preimage}
              ></img>
            </div>
          ) : (
            <img src={imgUser} className="user-img-perfil-b" alt="user-imge" />
          )}
          <input
            type="file"
            id="raised-button-file"
            onChange={(e) => fileChange(e)}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Tooltip title="Subir foto de perfil">
            <IconButton className="icn-btn-add-photo">
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
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <AddAPhoto
                    style={{
                      color: "#4bc1f4",
                      width: "20px",
                    }}
                  />
                </div>
              </label>
            </IconButton>
          </Tooltip>
        </div>
        <div className="item-card-perfil-b">
          <div className="sub-item-pefil-left">
            <div className="cont-img-perfil-b">
              <Person className="icon-perfil-b" />
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
            <div className="cont-img-perfil-b">
              <Fingerprint className="icon-perfil-b" />
            </div>
          </div>
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
        </div>
        <div className="item-card-perfil-b">
          <div className="sub-item-pefil-left">
            <div className="cont-img-perfil-b">
              <Email className="icon-perfil-b" />
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
            <div className="cont-img-perfil-b">
              <PhoneAndroid className="icon-perfil-b" />
            </div>
          </div>
          <div className="sub-item-pefil-left-2">
            <div className="sub-item-pefil-right-top">
              <p className="p1-perfil-b">Numero móvil</p>
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
            <div className="cont-img-perfil-b">
              <People className="icon-perfil-b" />
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
            <div className="cont-img-perfil-b">
              <Flag className="icon-perfil-b" />
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
        <div className="item-card-perfil-b">
          <div className="sub-item-pefil-left">
            <div className="cont-img-perfil-b">
              <LocationOn className="icon-perfil-b" />
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
      </div>
      <div className="bottom-card-perfil-b">
        <div className="div-bottom-perfil-b">
          <Footer
            setOpenModalRRSS={setOpenModalRRSS}
            openModalRRSS={openModalRRSS}
            setActive={setActive}
            setOpenModal={setOpenModal}
            setActiveStep={setActiveStep}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;
