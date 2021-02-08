import React, { useState, useEffect } from "react";
import "./Trabajos.css";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import {
  ArrowForward,
  ArrowBack,
  BusinessCenterOutlined,
  Mail,
  PhoneAndroid,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { obtenertrabajosUserInfoAction } from "../../../../../../redux/actions/actions-emp/infoUserAction";
import NumberFormat from "react-number-format";
import Loader from "react-loader-spinner";
import { Tooltip } from "../../../../../../components";

const Trabajos = () => {
  const dispatch = useDispatch();
  const trabajos = useSelector((state) => state.userInfo.trabajos);
  const loading = useSelector((state) => state.userInfo.loadingTrab);
  const usuario = useSelector((state) => state.userInfo.usuario);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    if (trabajos.length === 0) {
      dispatch(obtenertrabajosUserInfoAction(usuario._id));
    }
  }, []);

  return (
    <div className="cont-trabajos-home-emp">
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
          {trabajos.length === 0 ? (
            <div className="cont-no-info-info-usuario-emp">
              <p>No hay información</p>
            </div>
          ) : (
            <>
              <div className="top-b">
                <SwipeableViews index={activeStep}>
                  {trabajos.map((item, index) => (
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

                <IconButton
                  className="btn-info-user-emp"
                  onClick={handleNext}
                  disabled={activeStep === trabajos.length - 1 ? true : false}
                  style={{
                    opacity: activeStep === trabajos.length - 1 ? "0.7" : null,
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

export default Trabajos;

const Card = ({ data }) => {
  const {
    inidate,
    findate,
    nomempresa,
    actempresa,
    cargo,
    areapuesto,
    subarea,
    personacargo,
    manejopresupuesto,
    refnombre,
    email,
    refphone,
    refrelacion,
    reflogros,
  } = data;
  const inicio = new Date(inidate).getFullYear();
  const termino = new Date(findate).getFullYear();
  const now = new Date().getFullYear();

  let fechaTermino;
  if (termino < now) {
    fechaTermino = termino;
  } else {
    fechaTermino = "Actualidad";
  }
  return (
    <div className="card-info-trabajos-home-emp">
      <div className="left-b">
        <p className="p1">
          {inicio} - {fechaTermino}
        </p>
        <p className="p2">{nomempresa}</p>
        <p className="p3">{cargo}</p>
        <p className="p5">{actempresa}</p>

        <div className="datos-icon-left">
          <BusinessCenterOutlined className="icon-card-trab-home-emp" />
          <p>{areapuesto}</p>
        </div>
        <div className="datos-icon-right">
          <BusinessCenterOutlined className="icon-card-trab-home-emp" />
          <p>{subarea}</p>
        </div>
        {email || refphone ? <p className="p6">Referencia</p> : null}
        {email ? (
          <div className="cont-datos-ref">
            <Mail className="icon-card-trab-home-emp" />
            <p>{email}</p>
          </div>
        ) : null}
        {refphone ? (
          <div className="cont-datos-ref">
            <PhoneAndroid className="icon-card-trab-home-emp" />
            <p>{refphone}</p>
          </div>
        ) : null}
      </div>
      <div className="right-b">
        {personacargo ? (
          <div>
            <p className="p1">Personas a Cargo</p>
            <p className="p4">{personacargo}</p>
          </div>
        ) : null}
        {manejopresupuesto ? (
          <div>
            <p className="p2">Manejo de presupuesto Anual</p>
            <p className="p5">
              $
              <NumberFormat
                value={manejopresupuesto}
                displayType={"text"}
                thousandSeparator={true}
                // prefix={"$"}
              />
            </p>
          </div>
        ) : null}
        {reflogros ? (
          <div>
            <p className="p3">Logros</p>
            <p className="p6">{reflogros}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
