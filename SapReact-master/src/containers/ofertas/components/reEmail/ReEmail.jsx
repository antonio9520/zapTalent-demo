import React, { useState } from "react";
import "./ReEmail.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Button } from "../../../../components";
import clientAxios from "../../../../config/axios";
import Loader from "react-loader-spinner";

const theme = createMuiTheme({
  palette: {
    secondary: { main: "#EC4134", contrastText: "#fff" },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "12px",
      fontWeight: "200",
    },
  },
});

const ReEmail = ({ email }) => {
  const [_switch, setSwitch] = useState("init");
  const [loading, setloading] = useState(false);

  const enviarEmail = async () => {
    // /enviarEmail/activacion
    setloading(true);
    try {
      await clientAxios.put(`/api/usuarios/enviarEmail/activacion`, { email });
      setTimeout(() => {
        setloading(false);
        setSwitch("success");
      }, 1000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setloading(false);
        setSwitch("error");
      }, 1000);
    }
  };
  return (
    <div className="cont-reenviar-email">
      {_switch === "init" ? (
        <>
          <h1>
            Para acceder a ofertas laborales primero debes activar tu cuenta.
          </h1>
          <Button variant="contained" color="primary" onClick={enviarEmail}>
            Reenviar correo
            {loading ? (
              <div
                style={{
                  marginLeft: 10,

                  height: 20,
                }}
              >
                <Loader
                  type="Oval"
                  color="#fff"
                  height={20}
                  width={20}
                  visible={loading}
                  //  timeout={3000} //3 secs
                />
              </div>
            ) : null}
          </Button>
        </>
      ) : _switch === "success" ? (
        <>
          <h1 style={{ marginBottom: "inherit", color: "#00B526" }}>
            Hemos enviado un correo a tu email
          </h1>
          <p style={{ margin: "10px", color: "#187ce2" }}>
            Recuerda revisar tu bandeja de spam.
          </p>

          <Button variant="contained" color="primary" onClick={enviarEmail}>
            Reenviar correo
            {loading ? (
              <div
                style={{
                  marginLeft: 10,

                  height: 20,
                }}
              >
                <Loader
                  type="Oval"
                  color="#fff"
                  height={20}
                  width={20}
                  visible={loading}
                  //  timeout={3000} //3 secs
                />
              </div>
            ) : null}
          </Button>
        </>
      ) : _switch === "error" ? (
        <>
          <h1>Ha ocurrido un error, intentelo nuevamente</h1>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              style={{ color: "white" }}
              color="secondary"
              onClick={enviarEmail}
            >
              Reintentar
              {loading ? (
                <div
                  style={{
                    marginLeft: 10,

                    height: 20,
                  }}
                >
                  <Loader
                    type="Oval"
                    color="#fff"
                    height={20}
                    width={20}
                    visible={loading}
                    //  timeout={3000} //3 secs
                  />
                </div>
              ) : null}
            </Button>
          </ThemeProvider>
        </>
      ) : null}
    </div>
  );
};

export default ReEmail;
