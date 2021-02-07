import React, { useState } from "react";
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
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const data = ["", "", "", "", ""];
  return (
    <div className="cont-adnsap-home-emp">
      <div className="top-b">
        <SwipeableViews index={activeStep}>
          {data.map((item, index) => (
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
          disabled={activeStep === data.length - 1 ? true : false}
          style={{ opacity: activeStep === data.length - 1 ? "0.7" : null }}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default AdnSap;

const Card = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="card-info-adnsap-home-emp">
      <div className="left-b">
        <p className="p1">Mi ADN SAP</p>
        <p className="p2">MM</p>
        <p className="p3">K-15425444</p>
      </div>
      <div className="right-b">
        <AccordionCustom
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummaryCustom
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <AddCircleOutline className="icon-acordion-adn-home-emp" />
            <p>MR - Planificacion de Necesidades de Materiales</p>
          </AccordionSummaryCustom>
          <AccordionDetailsCustom>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetailsCustom>
        </AccordionCustom>
        <AccordionCustom
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummaryCustom
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <AddCircleOutline className="icon-acordion-adn-home-emp" />
            <p>PUR Gestión de Compras</p>
          </AccordionSummaryCustom>
          <AccordionDetailsCustom>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetailsCustom>
        </AccordionCustom>
        <AccordionCustom
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummaryCustom
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <AddCircleOutline className="icon-acordion-adn-home-emp" />
            <p>IM Gestión de Inventario</p>
          </AccordionSummaryCustom>
          <AccordionDetailsCustom>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </p>
          </AccordionDetailsCustom>
        </AccordionCustom>
      </div>
    </div>
  );
};
