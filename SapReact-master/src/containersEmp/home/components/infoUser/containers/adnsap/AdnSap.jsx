import React, { useState, useEffect } from "react";
import "./AdnSap.css";
import SwipeableViews from "react-swipeable-views";
import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  withStyles,
} from "@material-ui/core";
import {
  GetApp,
  ArrowForward,
  ArrowBack,
  AddCircleOutline,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { obtenerAdnUserInfoAction } from "../../../../../../redux/actions/actions-emp/infoUserAction";
import { Tooltip } from "../../../../../../components";
import Loader from "react-loader-spinner";

const AccordionCustom = withStyles({
  root: {
    border: "1px solid #4BC1F4",
    boxShadow: "none",
    borderRadius: "2px",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(Accordion);

const AccordionSummaryCustom = withStyles({
  root: {
    backgroundColor: "white",
    borderBottom: "1px solid #4BC1F4",
    marginBottom: -1,
    color: "#7d7f80",
    minHeight: 15,
    fontSize: "12px",

    "&$expanded": {
      minHeight: 15,
    },
    transition: "0.5s all ease-in-out",
  },
  content: {
    margin: "3px 0",
    fontSize: "12px",
    backgroundColor: "transparent",
    display: "flex ",
    alignItems: "center",
    "&$expanded": {
      margin: "3px 0",
      fontSize: "12px",
      backgroundColor: "transparent",
    },
  },
  expanded: {
    backgroundColor: "#4BC1F4",
    color: "white",
  },
})(AccordionSummary);

const AccordionDetailsCustom = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    fontSize: "12px",
    color: "#7d7f80",
  },
}))(AccordionDetails);

const AdnSap = () => {
  const dispatch = useDispatch();
  const adns = useSelector((state) => state.userInfo.adns);
  const loading = useSelector((state) => state.userInfo.loadingAdn);
  const usuario = useSelector((state) => state.userInfo.usuario);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (adns.length === 0) {
      dispatch(obtenerAdnUserInfoAction(usuario._id));
    }
  }, []);
  return (
    <div className="cont-adnsap-home-emp">
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
          {adns.length === 0 ? (
            <div className="cont-no-info-info-usuario-emp">
              <p>No hay información</p>
            </div>
          ) : (
            <>
              <div className="top-b">
                <SwipeableViews index={activeStep}>
                  {adns.map((item, index) => (
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
                {adns ? (
                  adns[activeStep].adnURL ? (
                    <Tooltip title="Descargar documento">
                      <IconButton
                        className="btn-info-user-emp"
                        href={adns[activeStep].adnURL}
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
                    disabled={activeStep === adns.length - 1 ? true : false}
                    style={{
                      opacity: activeStep === adns.length - 1 ? "0.7" : null,
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

export default AdnSap;

const Card = ({ data }) => {
  const { desc, name, idcert, submodulos } = data;
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="card-info-adnsap-home-emp">
      <div className="left-b">
        <p className="p1">Mi ADN SAP</p>
        <Tooltip title={desc}>
          <p className="p2">{name}</p>
        </Tooltip>
        <p className="p3">{idcert}</p>
      </div>
      <div className="right-b">
        {submodulos.map((item, index) => (
          <AccordionCustom
            key={index}
            square
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummaryCustom
              aria-controls={"panel1d-content"}
              id="panel1d-header"
            >
              <AddCircleOutline className="icon-acordion-adn-home-emp" />
              <p>
                {item.name} - {item.desc}
              </p>
            </AccordionSummaryCustom>
            <AccordionDetailsCustom>
              <p>{item.obs ? item.obs : "No hay observaciones"}</p>
            </AccordionDetailsCustom>
          </AccordionCustom>
        ))}
      </div>
    </div>
  );
};
