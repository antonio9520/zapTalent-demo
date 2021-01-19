import React from "react";
import "./Filtros.css";
import { Drawer, Button, makeStyles, MenuItem } from "@material-ui/core";
import { CustomSelect } from "../../../../components";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Filtros = ({ open, setOpen }) => {
  const classes = useStyles();
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="cont-filtros-ofertas-laborales">
        <div className="item-1">
          <p>Filtros</p>
        </div>
        <div className="item-2">
          <p>ADN-SAP</p>
          <CustomSelect placeholder="Selecciona" size="small">
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="item-2">
          <p>Años de experiencia SAP</p>
          <CustomSelect placeholder="Selecciona" size="small">
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="item-2">
          <p>Industria</p>
          <CustomSelect placeholder="Selecciona" size="small">
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="item-2">
          <p>Renta</p>
          <div className="item-doble-filtros-of">
            <CustomSelect placeholder="Mínimo" size="small">
              <MenuItem className="custom-menu-item" value="Training">
                Training
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Junior">
                Junior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Semi Senior">
                Semi Senior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Senior">
                Senior
              </MenuItem>
            </CustomSelect>
            <CustomSelect placeholder="Máximo" size="small">
              <MenuItem className="custom-menu-item" value="Training">
                Training
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Junior">
                Junior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Semi Senior">
                Semi Senior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Senior">
                Senior
              </MenuItem>
            </CustomSelect>
          </div>
        </div>
        <div className="item-2">
          <p>Fecha Publicación</p>
          <CustomSelect placeholder="Selecciona" size="small">
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="item-2">
          <p>Tipo Contrato</p>
          <CustomSelect placeholder="Selecciona" size="small">
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="item-2">
          <p>Cargo</p>
          <CustomSelect placeholder="Selecciona" size="small">
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="item-2">
          <p>Geografico</p>
          <div className="item-doble-filtros-of">
            <CustomSelect placeholder="Comuna" size="small">
              <MenuItem className="custom-menu-item" value="Training">
                Training
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Junior">
                Junior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Semi Senior">
                Semi Senior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Senior">
                Senior
              </MenuItem>
            </CustomSelect>
            <CustomSelect placeholder="Regón" size="small">
              <MenuItem className="custom-menu-item" value="Training">
                Training
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Junior">
                Junior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Semi Senior">
                Semi Senior
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Senior">
                Senior
              </MenuItem>
            </CustomSelect>
          </div>
        </div>
        <div className="item-2">
          <p>Tipo Jornada</p>
        </div>
        <div className="item-11">
          <Button>
            <p>Limpiar</p>
          </Button>
          <Button>
            <p>Filtrar</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Filtros;
