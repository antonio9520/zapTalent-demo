import React, { forwardRef, useState, useEffect } from "react";
import "./InfoEmp.css";
import { withStyles, Tabs, Tab, IconButton } from "@material-ui/core";
import userimage from "../../../../resources/images/SAPTalent/icon-new-user.svg";
import Reseña from "./containers/reseña/Reseña";
import Direccion from "./containers/direccion/Direccion";
import Contacto from "./containers/contacto/Contacto";
import { Close } from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import clienteAxios from "../../../../config/axios";
import Loader from "react-loader-spinner";

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
    minWidth: 100,
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

const InfoEmp = forwardRef((props, ref) => {
  const { closeModal, idEmp } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState(0);
  const [data, setData] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (idEmp) {
      obtenerDatos();
    }
  }, [idEmp]);

  const obtenerDatos = async () => {
    setLoading(true);
    try {
      const result = await clienteAxios.get(`/api/usuarioEmpresa/${idEmp}`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div ref={ref} className="info-user-of-emp">
      {loading ? (
        <div className="loader-info-user-emp">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          <div className="top">
            <div>
              {/* {usuario.imageURL ? (
                <img src={usuario.imageURL} alt="userimage" />
              ) : (
                <img
                  style={{ width: "120px", height: "120px" }}
                  src={userimage}
                  alt="userimage"
                />
              )} */}
              <img
                style={{ width: "120px", height: "120px" }}
                src={userimage}
                alt="userimage"
              />
            </div>
            <div className="cont-p">
              <p className="p1">{data.razonSocial ? data.razonSocial : null}</p>
              <p className="p2">{data.giro ? data.giro : null}</p>
              {/* <div className="exp-adn">
                <p>Experiencia {usuario.anosZap} años</p>
              </div> */}
              <p className="p3">{data.rut ? data.rut : null}</p>
            </div>
            <Tooltip title="Cerrar" placement="top">
              <IconButton
                className="btn-close-info-of-emp"
                onClick={() => closeModal()}
              >
                <Close style={{ width: "15px" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="bottom">
            <div className="tab-menu-emp-user">
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Reseña" />
                <AntTab style={{ marginLeft: "20px" }} label="Dirección" />
                <AntTab style={{ marginLeft: "20px" }} label="Contacto" />
              </AntTabs>
            </div>

            {value === 0 ? (
              <Reseña data={data.resena} />
            ) : value === 1 ? (
              <Direccion data={data.direcciones} />
            ) : value === 2 ? (
              <Contacto data={data.telefono} />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
});

export default InfoEmp;
