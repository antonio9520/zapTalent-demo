import React, { useState } from "react";
import "./Layout.css";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Menu from "./menuResponsivo/Menu";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { hiddenAlertAction } from "../../redux/actions/trabajoAction";
import { useDispatch, useSelector } from "react-redux";

const Layout = (props) => {
  const dispatch = useDispatch();
  const _alert = useSelector((state) => state.trabajo.alert);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    dispatch(hiddenAlertAction());
  };

  return (
    <>
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
    </>
  );
};

export default Layout;
