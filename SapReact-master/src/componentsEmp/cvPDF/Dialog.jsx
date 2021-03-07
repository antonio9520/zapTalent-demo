import React, { useState } from "react";
import "./style.css";
import { Close } from "@material-ui/icons";
import { Dialog, Button, makeStyles, IconButton } from "@material-ui/core";
import PdfDocument from "./PdfDocument";
import Document from "./Document";
import clientAxios from "../../config/axios";

const useStyles = makeStyles({
  button: {
    padding: "10px 30px ",
  },
  iconButton: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 35,
    height: 35,
  },
});

const DialogProgress = ({ open, setOpen, idUser, setIdUser }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [data, setData] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const handleClose = () => {
    setRequesting(false);
    setError(false);
    setData(null);
    setIdUser(null);
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      setRequesting(true);

      const respuesta = await clientAxios.get(`/api/usuarios/${idUser}`);
      const respuesta1 = await clientAxios.get(`/api/estudios/${idUser}`);
      const respuesta2 = await clientAxios.get(`/api/trabajos/${idUser}`);
      const respuesta3 = await clientAxios.get(`/api/certificacion/${idUser}`);
      const respuesta4 = await clientAxios.get(`/api/adnsap/${idUser}`);

      if (respuesta.data) {
        setData({
          usuario: respuesta.data,
          estudios: respuesta1.data,
          trabajos: respuesta2.data,
          certificados: respuesta3.data,
          adns: respuesta4.data,
        });
      }

      setRequesting(false);
    } catch (error) {
      setRequesting(false);
      setError(true);
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <div className="dialog-pdfcv-eco-emp">
        <IconButton className={classes.iconButton} onClick={handleClose}>
          <Close />
        </IconButton>
        {!requesting && !data && !error && (
          <div className="item-1">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={fetchData}
            >
              Generar Curriculum Vitae
            </Button>
          </div>
        )}
        {requesting && (
          <div className="item-1">
            <p>Generando curriculum ...</p>
          </div>
        )}
        {data && !requesting && !error && (
          <PdfDocument
            title="CV-PDF"
            handleClose={handleClose}
            document={<Document data={data} />}
          />
        )}
        {!requesting && error && (
          <>
            <div className="item-1-error-pdf-sv">
              <p className="error-pdf-cvusuario">Ha habido un error</p>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={fetchData}
              >
                Intentar nuevamente
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default DialogProgress;
