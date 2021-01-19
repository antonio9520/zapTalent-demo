import React, { useState } from "react";
import "./CardAdn.css";
import SwipeableViews from "react-swipeable-views";
import {
  IconButton,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  withStyles,
  ListItem,
} from "@material-ui/core";
import { ArrowForward, ArrowBack, Edit, ExpandMore } from "@material-ui/icons";

const CardAdn = ({ data, setOpenModalEditar, setDataEditar, setSwitch }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="cont-adn-perfil">
      <SwipeableViews index={activeStep}>
        {data.map((item, index) => (
          <Modulo
            key={index}
            data={item}
            setOpenModalEditar={setOpenModalEditar}
            setDataEditar={setDataEditar}
            setSwitch={setSwitch}
          />
        ))}
      </SwipeableViews>
      <div className="cont-arrow-btns-perfil">
        <IconButton
          disabled={activeStep === 0}
          className={
            activeStep === 0 ? "btn-arrow-perfil-inact" : "btn-arrow-perfil"
          }
          onClick={() => handleBack()}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          disabled={activeStep === data.length - 1}
          className={
            activeStep === data.length - 1
              ? "btn-arrow-perfil-inact"
              : "btn-arrow-perfil"
          }
          onClick={() => handleNext()}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default CardAdn;

const Modulo = ({ data, setOpenModalEditar, setDataEditar, setSwitch }) => {
  const Accordion = withStyles({
    root: {
      //   border: "1px solid #4bc1f4",
      backgroundColor: "transparent",
      borderTopRightRadius: "5px",
      borderTopLeftRadius: "5px",
      boxShadow: "none",
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
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "transparent",
      borderBottom: "1px solid #4bc1f4",
      borderTop: "1px solid #4bc1f4",
      marginBottom: -1,
      paddingBottom: 0,
      //   padding: "0",
      //   borderRadius: "5px",
      // height: 40,
      minHeight: 40,
      "&$expanded": {
        minHeight: 40,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const [expanded, setExpanded] = useState("panel0");
  const handleChange = (panel) => (event, newExpanded) => {
    // console.log(newExpanded);
    setExpanded(newExpanded ? panel : false);
  };
  const openNewTab = () => {
    window.open(data.adnURL, "_blank");
  };

  const initEdit = () => {
    setSwitch(true);
    setOpenModalEditar(true);
    setDataEditar(data);
  };
  return (
    <>
      <div className="cont-modulo-perfil">
        <IconButton className="btn-edit-modulo-perfil" onClick={initEdit}>
          <Edit />
        </IconButton>
        <p className="p1-mod-perfil" style={{ color: "white" }}>
          Mi ADN ZAP
        </p>
        <p className="p2-mod-perfil" style={{ color: "white" }}>
          {data.name}
        </p>
        {data.idcert ? (
          <p className="p3-mod-perfil" style={{ color: "white" }}>
            ID: {data.idcert}
          </p>
        ) : null}

        <div
          style={{
            border: "1px solid #4bc1f4",
            borderRadius: "5px",
            // backgroundColor: "red",
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          {data.submodulos.map((item, index) => (
            <Accordion
              square
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMore className="icon-expand-perfil" />}
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
                className={
                  expanded === "panel" + index ? "acordion-active" : null
                }
              >
                <p className="p4-mod-perfil" style={{ color: "white" }}>
                  {item.name} - {item.desc}
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="cont-summ-mod-perfil">
                  <p className="p5-mod-perfil" style={{ color: "white" }}>
                    {item.obs}
                  </p>
                  <div className="nivel-submod-perfil-b">
                    <p className="p6-mod-perfil" style={{ color: "white" }}>
                      {item.nivel}
                    </p>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        {data.adnURL ? (
          <ListItem button className="btn-ver-cert-perfil" onClick={openNewTab}>
            <p>Ver certificado</p>
          </ListItem>
        ) : null}
      </div>
    </>
  );
};
