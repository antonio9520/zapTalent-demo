import React, { useState } from "react";
import "./Footer.css";
import { IconButton, Divider } from "@material-ui/core";
import {
  Description,
  Instagram,
  Facebook,
  LinkedIn,
  Twitter,
  CloudUpload,
} from "@material-ui/icons";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "../../../../../components";
import { it } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: "#4bacef",
    width: "48px",
    height: "48px",
    boxShadow: "5px 10px 40px rgba(0, 0, 0, 0.2) !important",
    "&:hover": {
      backgroundColor: "#4bacef",
    },
  },
}));

const Footer = ({
  setOpenModalRRSS,
  openModalRRSS,
  setActive,
  setOpenModal,
  setActiveStep,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const usuario = useSelector((state) => state.auth.usuario);

  const handleClose = () => {
    setOpen(false);
  };
  const handleModal = ({ type, action, url }) => {
    setOpenModalRRSS({ open: true, type: type, action: action, url: url });
    setFixed(true);
  };

  const handleOpen = () => {
    console.log("handleOpen");
    if (!fixed) {
      setOpen(true);
    }
    setFixed(false);
  };

  let actions = [
    {
      icon: <Instagram className="icon-speed-dial-perfil" />,
      name: "Instagram",
      type: "inactive",
    },
    {
      icon: <Facebook className="icon-speed-dial-perfil" />,
      name: "Facebook",
      type: "inactive",
    },
    {
      icon: <Twitter className="icon-speed-dial-perfil" />,
      name: "Twitter",
      type: "inactive",
    },
    {
      icon: <LinkedIn className="icon-speed-dial-perfil" />,
      name: "LinkedIn",
      type: "inactive",
      url: null,
    },
  ];
  const setActions = () => {
    if (usuario) {
      if (usuario.rrss) {
        actions.map((item) => {
          usuario.rrss.map((i) => {
            if (item.name === i.name) {
              // actions = actions.filter((item) => item.name !== i.name);
              item.type = "active";
              item.url = i.url;
            }
          });
        });
      }
    }
  };
  setActions();
  console.log(actions);
  return (
    <div className="cont-footer-card-perfil">
      <div
        className={
          open ? "cont-btns-rrss-perfil-open" : "cont-btns-rrss-perfil-close"
        }
      >
        {usuario
          ? usuario.rrss
            ? usuario.rrss.map((item, index) => (
                <RedSocial key={index} type={item.name} url={item.url} />
              ))
            : null
          : null}
      </div>
      <div
        style={{
          position: "relative",
          // backgroundColor: "red",
          width: "72px",
          height: "50px",
        }}
      >
        <Tooltip title="Administrar redes sociales">
          <SpeedDial
            ariaLabel="SpeedDial example"
            //   hidden={hidden}
            className="speed-dial-footer-perfil"
            icon={<SpeedDialIcon />}
            onClose={() => handleClose()}
            onOpen={() => handleOpen()}
            open={open}
            direction="left"
            classes={classes}
            FabProps={{ className: classes.fab }}
          >
            {actions.map((action) =>
              action.type === "inactive" ? (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => {
                    handleClose();
                    handleModal({
                      type: action.name,
                      action: "add",
                      url: null,
                    });
                  }}
                  className="speed-dial-action"
                  //   classes={classes}
                  // TooltipClasses={classes}
                  tooltipPlacement="top"
                />
              ) : (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => {
                    handleClose();
                    handleModal({
                      type: action.name,
                      action: "put-delete",
                      url: action.url,
                    });
                  }}
                  className="speed-dial-action-active"
                  //   classes={classes}
                  // TooltipClasses={classes}
                  tooltipPlacement="top"
                />
              )
            )}
          </SpeedDial>
        </Tooltip>
      </div>
      <Divider orientation="vertical" flexItem />
      <div
        style={{
          width: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {usuario ? (
          usuario.cvURL ? (
            <Tooltip title="Ver CV.">
              <IconButton
                className="btn-cv-footer-card-perfil"
                href={usuario.cvURL}
                target="_blank"
              >
                <Description />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Subir CV.">
              <IconButton
                className="btn-cv-footer-card-perfil"
                onClick={() => {
                  setActive("five");
                  setActiveStep(4);
                  setOpenModal(true);
                }}
              >
                <CloudUpload />
              </IconButton>
            </Tooltip>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Footer;

const RedSocial = ({ type, url }) => {
  return (
    <Tooltip title={`Abrir ${type}`}>
      <IconButton className="btn-red-social-perfil" href={url} target="_blank">
        {type === "Instagram" ? (
          <Instagram className="icon-red-social-rrss-perfil" />
        ) : type === "Facebook" ? (
          <Facebook className="icon-red-social-rrss-perfil" />
        ) : type === "LinkedIn" ? (
          <LinkedIn className="icon-red-social-rrss-perfil" />
        ) : type === "Twitter" ? (
          <Twitter className="icon-red-social-rrss-perfil" />
        ) : null}
      </IconButton>
    </Tooltip>
  );
};
