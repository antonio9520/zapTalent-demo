import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { hiddenAlertAction } from "../../redux/actions/actions-admin/authAction";
import { useDispatch, useSelector } from "react-redux";

const Layout = (props) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const _alert = useSelector((state) => state.authAdmin.alert);

  const handleClose = () => {
    dispatch(hiddenAlertAction());
  };
  return (
    <div>
      <Sidebar open={open} />
      <Header setOpen={setOpen} open={open} />
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
    </div>
  );
};

export default Layout;
