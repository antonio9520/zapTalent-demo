import React, { useState, useEffect } from "react";
import "./Estudios.css";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { GetApp, ArrowForward, ArrowBack } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEstudiosUserInfoAction } from "../../../../../../redux/actions/actions-emp/infoUserAction";
import Loader from "react-loader-spinner";
import { Tooltip } from "../../../../../../components";

const Estudios = () => {
  const dispatch = useDispatch();
  const estudios = useSelector((state) => state.userInfo.estudios);
  const loading = useSelector((state) => state.userInfo.loadingEst);
  const usuario = useSelector((state) => state.userInfo.usuario);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (estudios.length === 0) {
      dispatch(obtenerEstudiosUserInfoAction(usuario._id));
    }
  }, []);

  return (
    <div className="cont-estudios-home-emp">
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
          {estudios.length === 0 ? (
            <div className="cont-no-info-info-usuario-emp">
              <p>No hay información</p>
            </div>
          ) : (
            <>
              <div className="top-b">
                <SwipeableViews index={activeStep}>
                  {estudios.map((item, index) => (
                    <Card key={index} data={item} />
                  ))}
                </SwipeableViews>
              </div>
              <div className="bottom-b">
                <Tooltip title="Anterior">
                  <IconButton
                    className="btn-info-user-emp"
                    onClick={handleBack}
                    disabled={activeStep === 0 ? true : false}
                    style={{ opacity: activeStep === 0 ? "0.7" : null }}
                  >
                    <ArrowBack />
                  </IconButton>
                </Tooltip>
                {estudios ? (
                  estudios[activeStep].estudioURL ? (
                    <Tooltip title="Descargar documento">
                      <IconButton
                        className="btn-info-user-emp"
                        href={estudios[activeStep].estudioURL}
                        target="_blank"
                      >
                        <GetApp />
                      </IconButton>
                    </Tooltip>
                  ) : null
                ) : null}
                <Tooltip title="Siguiente">
                  <IconButton
                    className="btn-info-user-emp"
                    onClick={handleNext}
                    disabled={activeStep === estudios.length - 1 ? true : false}
                    style={{
                      opacity:
                        activeStep === estudios.length - 1 ? "0.7" : null,
                    }}
                  >
                    <ArrowForward />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Estudios;

const Card = ({ data }) => {
  const {
    areaestudio,
    carrera,
    diainicio,
    diafin,
    escalanotas,
    estado,
    institucion,
    observacion,
    pais,
    promedio,
    tipoestudio,
  } = data;

  const inicio = new Date(diainicio);
  const anoinicio = inicio.getFullYear();
  const termino = new Date(diafin);
  const anotermino = termino.getFullYear();
  console.log(observacion);
  return (
    <div className="card-info-estudios-home-emp">
      <p className="p1">{tipoestudio}</p>

      {carrera.length > 29 ? (
        <Tooltip title={carrera}>
          <p className="p2">{carrera.substring(0, 30) + "..."}</p>
        </Tooltip>
      ) : (
        <p className="p2">{carrera}</p>
      )}

      <p className="p3">{institucion}</p>
      <p className="p4">{areaestudio}</p>
      <p className="p5">
        {anoinicio} - {anotermino}
      </p>
      <div className="cont-etiquetas">
        <div className="etiqueta-1">
          <p>{estado}</p>
        </div>
        <div className="etiqueta-2">
          <p>Certificado</p>
        </div>
      </div>
      {observacion !== "" ? (
        <div className="cont-desc">
          <p>{observacion}</p>
        </div>
      ) : null}

      <div className="promedio-emp-home-est">
        <p>{promedio}</p>
        <p>Promedio</p>
      </div>
    </div>
  );
};
