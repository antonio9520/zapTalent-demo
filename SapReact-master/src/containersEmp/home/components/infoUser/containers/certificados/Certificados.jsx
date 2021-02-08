import React, { useState, useEffect } from "react";
import "./Certificados.css";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { GetApp, ArrowForward, ArrowBack } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { obtenerCertificadosUserInfoAction } from "../../../../../../redux/actions/actions-emp/infoUserAction";
import Loader from "react-loader-spinner";

const Certificados = () => {
  const dispatch = useDispatch();
  const certificados = useSelector((state) => state.userInfo.certificados);
  const loading = useSelector((state) => state.userInfo.loadingCert);
  const usuario = useSelector((state) => state.userInfo.usuario);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (certificados.length === 0) {
      dispatch(obtenerCertificadosUserInfoAction(usuario._id));
    }
  }, []);
  return (
    <div className="cont-certificados-home-emp">
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            paddingTop: "130px",
            display: "flex",
          }}
        >
          <Loader
            type="Oval"
            color="#00BFFF"
            height={50}
            width={50}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          {certificados.length === 0 ? (
            <div className="cont-no-info-info-usuario-emp">
              <p>No hay información</p>
            </div>
          ) : (
            <>
              <div className="top-b">
                <SwipeableViews index={activeStep}>
                  {certificados.map((item, index) => (
                    <Card key={index} data={item} />
                  ))}
                </SwipeableViews>
              </div>
              <div className="bottom-b">
                <IconButton
                  className="btn-info-user-emp"
                  onClick={handleBack}
                  disabled={activeStep === 0 ? true : false}
                  style={{ opacity: activeStep === 0 ? "0.7" : null }}
                >
                  <ArrowBack />
                </IconButton>
                <IconButton className="btn-info-user-emp">
                  <GetApp />
                </IconButton>
                <IconButton
                  className="btn-info-user-emp"
                  onClick={handleNext}
                  disabled={
                    activeStep === certificados.length - 1 ? true : false
                  }
                  style={{
                    opacity:
                      activeStep === certificados.length - 1 ? "0.7" : null,
                  }}
                >
                  <ArrowForward />
                </IconButton>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Certificados;

const Card = ({ data }) => {
  const { certificacion, universidad, estado, obs, fecha } = data;
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const fechaCert = new Date(fecha);
  return (
    <div className="card-info-certificados-home-emp">
      <div className="header-cert-home-emp">
        <p className="p1">{certificacion}</p>
        <div>
          <p>{estado}</p>
        </div>
      </div>
      <p className="p2">{universidad}</p>
      <p className="p3">
        {MESES[fechaCert.getMonth()]}, {fechaCert.getFullYear()}
      </p>
      <p className="p4">{obs}</p>
    </div>
  );
};
