import React, { forwardRef } from "react";
import "./Five.css";
import logoemail from "../../../../../../resources/images/ZAPTalent-RevisatuCorreo.png";
import logo from "../../.././../../../resources/empresas/ZAPTalent-Empresa-Logotipo-1.png";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 150,
    height: 40,
  },
});
const Five = forwardRef(({ closeModal }, ref) => {
  const classes = useStyles();
  return (
    <div className="five-add-emp-admin" ref={ref}>
      <div>
        <img src={logo} alt="logo" className="logo-login-re" />
      </div>
      <div>
        <img src={logoemail} alt="logo" className="logo-login-re-email" />
      </div>
      <div>
        <p>¡Felicitaciones!</p>
        <p>Se han creado los usuarios exitosamente.</p>
        <p>Hemos enviado correos de activación a cada</p>
        <p>uno de ellos.</p>
      </div>
      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        onClick={closeModal}
      >
        Entendido
      </Button>
    </div>
  );
});

export default Five;
