import React from "react";
import "./Filtro.css";
import { CustomSelect, Button, OutInput } from "../../../../components";
import { MenuItem } from "@material-ui/core";
import { HighlightOff, FilterList } from "@material-ui/icons";

const Filtro = ({ value }) => {
  return (
    <div className="cont-filtro-eco-sap-emp">
      <div className="title-filtros-eco-sap">
        <h1>Filtros</h1>
      </div>
      {value === 1 ? (
        <div className="item">
          <p>Anuncio</p>
          <CustomSelect size="small" placeholder="Selecciona un anuncio">
            <MenuItem>item</MenuItem>
          </CustomSelect>
        </div>
      ) : null}

      <div className="item">
        <p>Adn-SAP</p>
        <CustomSelect size="small" placeholder="Selecciona">
          <MenuItem>item</MenuItem>
        </CustomSelect>
      </div>
      <div className="item">
        <p>Años de experiencia SAP</p>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "5px" }}>
            <OutInput
              label="Año mínimo"
              // helpertext={nombresmsg}
              // funcOnChange={setAnosExpMin}
              // defaultValue={nombres}
              // value={anosExpMin}
              name="anosExp"
              size="small"
              type="number"
              // error={errornombre}
              // funcionError={setErrorNombre}
            />
          </div>
          <div style={{ flex: 1, paddingLeft: "5px" }}>
            <OutInput
              label="Año maximo"
              // helpertext={nombresmsg}
              // funcOnChange={setAnosExpMin}
              // defaultValue={nombres}
              // value={anosExpMin}
              name="anosExp"
              size="small"
              type="number"
              // error={errornombre}
              // funcionError={setErrorNombre}
            />
          </div>
        </div>
      </div>
      <div className="item">
        <p>Industria</p>
        <CustomSelect size="small" placeholder="Selecciona">
          <MenuItem>item</MenuItem>
        </CustomSelect>
      </div>
      <div className="item">
        <p>Categoria profesional</p>
        <CustomSelect size="small" placeholder="Selecciona">
          <MenuItem>item</MenuItem>
        </CustomSelect>
      </div>
      <div className="item">
        <p>Género</p>
        <CustomSelect size="small" placeholder="Selecciona">
          <MenuItem>item</MenuItem>
        </CustomSelect>
      </div>
      <div className="item">
        <p>Departamento</p>
        <CustomSelect size="small" placeholder="Selecciona">
          <MenuItem>item</MenuItem>
        </CustomSelect>
      </div>
      <div className="item">
        <p>Geografico</p>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "5px" }}>
            <CustomSelect size="small" placeholder="Región">
              <MenuItem>item</MenuItem>
            </CustomSelect>
          </div>
          <div style={{ flex: 1, paddingLeft: "5px" }}>
            <CustomSelect size="small" placeholder="Comuna">
              <MenuItem>item</MenuItem>
            </CustomSelect>
          </div>
        </div>
      </div>
      <div className="item">
        <p>Tipo Jornada</p>
        <CustomSelect size="small" placeholder="Selecciona">
          <MenuItem>item</MenuItem>
        </CustomSelect>
      </div>
      <div className="item-bottom">
        <Button
          variant="contained"
          color="secondary"
          // onClick={limpiarFiltros}
          endIcon={<HighlightOff style={{ color: "white" }} />}
        >
          <p style={{ margin: 0, color: "white" }}>Limpiar</p>
        </Button>
        <Button
          variant="contained"
          color="primary"
          // onClick={filtrar}
          endIcon={<FilterList />}
        >
          <p style={{ margin: 0 }}>Filtrar</p>
        </Button>
      </div>
    </div>
  );
};

export default Filtro;
