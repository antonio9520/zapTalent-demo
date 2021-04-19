import React, { useState } from "react";
import "./Layout.css";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Menu from "./menuResponsivo/Menu";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { hiddenAlertAction } from "../../redux/actions/actions-emp/authAction";
import { useDispatch, useSelector } from "react-redux";
import image from "../../resources/images/SAPTalent/Logotipo-SAPTalent-blanco.svg";

const Layout = (props) => {
  const dispatch = useDispatch();
  const _alert = useSelector((state) => state.authEmp.alert);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    dispatch(hiddenAlertAction());
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Menu />
        <Sidebar open={open} />
        <Header open={open} setOpen={setOpen} />
        <div className={open ? "contenedor-main-mini" : "contenedor-main"}>
          <main>{props.children}</main>
          <Snackbar
            open={_alert.show}
            onClose={handleClose}
            autoHideDuration={5000}
          >
            <Alert severity={_alert.type}>{_alert.msg}</Alert>
          </Snackbar>
        </div>

        {/* <div className="splash-screen-responsivo-emp">
          <img src={image} alt="logo" />
          <p>Pagina responsiva en construcción</p>
          <p>Utilice un dispositivo de mayor resolución</p>
        </div> */}
      </div>
    </>
  );
};

export default Layout;
