import React from "react";
import { ListItem } from "@material-ui/core";
import {
  AccountCircle,
  Lock,
  Room,
  PhoneIphone,
  Description,

} from "@material-ui/icons";
import { Tooltip } from "../../../../../components";

const Menu = ({ active, setActive, setActiveStep, loading }) => {
  const handleClick = (item) => {
    setActiveStep(item.step);
    setActive(item.name);
  };
  return (
    <>
      <Tooltip title="Editar perfil" placement="top">
        <ListItem
          disabled={loading}
          button
          className={
            active === "one"
              ? "item-menu-edit-perfil-active"
              : "item-menu-edit-perfil"
          }
          onClick={() => handleClick({ name: "one", step: 0 })}
        >
          <AccountCircle
            className={
              active === "one"
                ? "icon-item-menu-ed-per-active"
                : "icon-item-menu-ed-per"
            }
          />
        </ListItem>
      </Tooltip>
      <Tooltip title="Cambiar contraseña" placement="top">
        <ListItem
          button
          disabled={loading}
          className={
            active === "two"
              ? "item-menu-edit-perfil-active"
              : "item-menu-edit-perfil"
          }
          onClick={() => handleClick({ name: "two", step: 1 })}
        >
          <Lock
            className={
              active === "two"
                ? "icon-item-menu-ed-per-active"
                : "icon-item-menu-ed-per"
            }
          />
        </ListItem>
      </Tooltip>
      <Tooltip title="Editar dirección" placement="top">
        <ListItem
          button
          disabled={loading}
          className={
            active === "three"
              ? "item-menu-edit-perfil-active"
              : "item-menu-edit-perfil"
          }
          onClick={() => handleClick({ name: "three", step: 2 })}
        >
          <Room
            className={
              active === "three"
                ? "icon-item-menu-ed-per-active"
                : "icon-item-menu-ed-per"
            }
          />
        </ListItem>
      </Tooltip>
      <Tooltip title="Editar teléfono y fecha de nacimiento" placement="top">
        <ListItem
          button
          disabled={loading}
          className={
            active === "four"
              ? "item-menu-edit-perfil-active"
              : "item-menu-edit-perfil"
          }
          onClick={() => handleClick({ name: "four", step: 3 })}
        >
          <PhoneIphone
            className={
              active === "four"
                ? "icon-item-menu-ed-per-active"
                : "icon-item-menu-ed-per"
            }
           
          />
         
        
        </ListItem>
      </Tooltip>
      <Tooltip title="Subir CV." placement="top">
        <ListItem
          button
          disabled={loading}
          className={
            active === "five"
              ? "item-menu-edit-perfil-active"
              : "item-menu-edit-perfil"
          }
          onClick={() => handleClick({ name: "five", step: 4 })}
        >
          <Description
            className={
              active === "five"
                ? "icon-item-menu-ed-per-active"
                : "icon-item-menu-ed-per"
            }
          />
        </ListItem>
      </Tooltip>
    </>
  );
};

export default Menu;
