import React, { forwardRef, useState, useEffect } from "react";
import "./ViewEmp.css";
import { withStyles, Tabs, Tab, IconButton } from "@material-ui/core";
import userimage from "../../../../../resources/images/SAPTalent/icon-new-user.svg";
import { Datos, Direcciones, Perfiles, Resena, Telefonos } from "../views";
import { Close } from "@material-ui/icons";
import { Tooltip } from "../../../../../components";
import { useSelector, useDispatch } from "react-redux";
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

const ViewEmp = forwardRef(({ data, closeModal }, ref) => {
  const { razonSocial, giro, rut, logoURL } = data;
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userInfo.usuario);
  const loading = useSelector((state) => state.userInfo.loading);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div ref={ref} className="info-user-home-emp">
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
              {logoURL ? (
                <img src={logoURL} alt="userimage" />
              ) : (
                <img
                  style={{ width: "120px", height: "120px" }}
                  src={userimage}
                  alt="userimage"
                />
              )}
            </div>
            <div className="cont-p">
              <p className="p1" style={{ marginTop: 10 }}>
                {razonSocial}
              </p>
              <p className="p2">{giro}</p>
              <p className="p2">{rut}</p>
            </div>
            <Tooltip title="Cerrar" placement="top">
              <IconButton
                className="btn-close-info-user-emp"
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
                <AntTab style={{ marginLeft: "20px" }} label="Datos" />
                <AntTab style={{ marginLeft: "20px" }} label="Direcciones" />
                <AntTab style={{ marginLeft: "20px" }} label="Telefonos" />
                <AntTab style={{ marginLeft: "20px" }} label="Perfiles" />
              </AntTabs>
            </div>

            {value === 0 ? (
              <Resena data={data} />
            ) : value === 1 ? (
              <Datos data={data} />
            ) : value === 2 ? (
              <Direcciones data={data} />
            ) : value === 3 ? (
              <Telefonos data={data} />
            ) : value === 4 ? (
              <Perfiles data={data} />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
});

export default ViewEmp;
