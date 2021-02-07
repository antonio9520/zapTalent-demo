import React, { forwardRef, useState, useEffect } from "react";
import "./InfoUser.css";
import { withStyles, Tabs, Tab, IconButton } from "@material-ui/core";
import userimage from "../../../../resources/images/la-roca.jpg";
import {
  AdnSap,
  Certificados,
  DatosPersonales,
  Estudios,
  Trabajos,
} from "./containers";
import { Close } from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import { obtenerUserInfoAction } from "../../../../redux/actions/actions-emp/infoUserAction";

const AntTabs = withStyles({
  root: {
    marginTop: "8px",
  },
  indicator: {
    backgroundColor: "#197EE6",
    height: "4px",
    top: "35px",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 50,
    minHeight: 30,
    padding: "5px",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "12px",
    fontFamily: ["Roboto"].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const InfoUser = forwardRef((props, ref) => {
  const { data } = props;
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userInfo.usuario);
  const loading = useSelector((state) => state.userInfo.loading);

  const { setOpenModal } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(obtenerUserInfoAction(data));
  }, []);
  console.log(usuario);
  return (
    <div ref={ref} className="info-user-home-emp">
      {loading ? (
        <p>Cargando</p>
      ) : (
        <>
          <div className="cont-btn-close-info-user-emp">
            <Tooltip title="Cerrar" placement="top">
              <IconButton
                className="btn-close-info-user-emp"
                onClick={() => setOpenModal(false)}
              >
                <Close style={{ width: "15px" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="top">
            <div>
              <img src={usuario.imageURL} alt="userimage" />
            </div>
            <div className="cont-p">
              <p className="p1">
                {usuario.nombres} {usuario.apellidos}
              </p>
              <p className="p2">
                {usuario.profesion ? usuario.profesion.name : null}
              </p>
              <div className="exp-adn">
                <p>Experiencia {usuario.anosZap} años</p>
              </div>
              <p className="p3">
                {usuario.titulo} #
                {usuario.id_post ? (
                  <span style={{ textTransform: "uppercase" }}>
                    {usuario.id_post.slice(18)}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="bottom">
            <div className="tab-menu-emp-user">
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Datos personales" />
                <AntTab style={{ marginLeft: "20px" }} label="Estudios" />
                <AntTab style={{ marginLeft: "20px" }} label="Trabajos" />
                <AntTab style={{ marginLeft: "20px" }} label="Certificados" />
                <AntTab style={{ marginLeft: "20px" }} label="ADN SAP" />
              </AntTabs>
            </div>

            {value === 0 ? (
              <DatosPersonales data={usuario} />
            ) : value === 1 ? (
              <Estudios />
            ) : value === 2 ? (
              <Trabajos />
            ) : value === 3 ? (
              <Certificados />
            ) : value === 4 ? (
              <AdnSap />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
});

export default InfoUser;
