import React, { useState } from "react";
import "./Filtros.css";
import { Drawer, makeStyles, MenuItem } from "@material-ui/core";
import { filtrarOferLaboralesAction } from "../../../../redux/actions/ofertasLaboralesAction";
import {
  CustomSelect,
  CustomSelectC,
  Button,
  OutInput,
} from "../../../../components";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Filtros = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tipoConsultor, setTipoConsultor] = useState(null);
  const [anosExp, setAnosExp] = useState(null);
  const [industria, setIndustria] = useState(null);
  const [renta, setRenta] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [tipoContrato, setTipoContrato] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [region, setRegion] = useState(null);
  const [tipoJornada, setTipoJornada] = useState(null);

  const query = {};

  const filtrar = () => {
    if (tipoConsultor) {
      query.tipoConsultor = tipoConsultor;
    }
    dispatch(filtrarOferLaboralesAction(query));
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="cont-filtros-ofertas-laborales">
        <div className="item-1">
          <p>Filtros</p>
        </div>
        <div className="item-2">
          <p>ADN-SAP</p>
          <CustomSelect
            placeholder="Selecciona"
            size="small"
            onChange={setTipoConsultor}
            value={tipoConsultor}
            // error={errorconsultor}
            // helpertext="Seleccione un tipo de consultor"
            // funcionError={setErrorConsultor}
            name="consultor"
          >
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
          <OutInput
            // label="Nombres"
            // helpertext={nombresmsg}
            // funcOnChange={setNombres}
            // defaultValue={nombres}
            name="names"
            size="small"
            type="number"
            // error={errornombre}
            // funcionError={setErrorNombre}
          />
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
            <OutInput
              label="Mínimo"
              // helpertext={nombresmsg}
              // funcOnChange={setNombres}
              // defaultValue={nombres}
              name="names"
              size="small"
              type="number"
              // error={errornombre}
              // funcionError={setErrorNombre}
            />
            <OutInput
              label="Maximo"
              // helpertext={nombresmsg}
              // funcOnChange={setNombres}
              // defaultValue={nombres}
              name="names"
              size="small"
              type="number"
              // error={errornombre}
              // funcionError={setErrorNombre}
            />
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
          <Button variant="contained" color="primary">
            <p style={{ margin: 0 }}>Limpiar</p>
          </Button>
          <Button variant="contained" color="primary" onClick={filtrar}>
            <p style={{ margin: 0 }}>Filtrar</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Filtros;
