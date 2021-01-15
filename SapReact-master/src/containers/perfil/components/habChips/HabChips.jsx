import React, { useState, useEffect } from "react";
import "./HabChips.css";
import {
  Chip,
  makeStyles, 
  InputAdornment,
  IconButton,
  ListItem,
} from "@material-ui/core";
import { CustomInput, Tooltip } from "../../../../components";
import {  Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { editarUsuarioAction } from "../../../../redux/actions/authAction";
import shortid from "shortid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    color: "#187ce2",
    border: "1.5px solid #187ce2",
  },
}));

const HabChips = ({ setOpenModalHab }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);

  const [chipData, setChipData] = useState(usuario ? usuario.habilidades : []);
  const [text, setText] = useState("");
  const [_id] = useState(usuario ? usuario._id : null);
  const [showbtn, setShowBtn] = useState(false);


  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const addChip = () => {
    if (text.trim() === "") {
      console.log("Campo vacio");
      return;
    }
    let key = shortid.generate();
    setChipData([...chipData, { key, name: text }]);
    setText("");
  };

  const _keyDown = (e) => {
    if (e.key === "Enter") {
      addChip();
    }
  };

  const saveHabilidades = () => {
   
    dispatch(editarUsuarioAction({ _id, habilidades: chipData }));
    setOpenModalHab(false);
  };

  useEffect(() => {
    if (text.trim() === "") {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [text]);

  return (
    <div className="cont-hab-chips">
      <Tooltip title="Cerrar" placement="top">
        <IconButton
          className="icon-btn-close-chips"
          onClick={() => setOpenModalHab(false)}
        >
          <Close />
        </IconButton>
      </Tooltip>
      <p className="title-hab-chips">Ingresa tus habilidades y conocimientos</p>
      <div className="cont-chips-hab">
        {chipData.map((data) => {
          return (
            <div key={data.key}>
              <Chip
                // icon={icon}
                color="primary"
                variant="outlined"
                label={data.name}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            </div>
          );
        })}
      </div>

      <CustomInput
        label="Ingresa una nueva habilidad"
        value={text}
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={_keyDown}
        endAdornment={
          showbtn ? (
            <InputAdornment position="end">
              {/* <Tooltip title="Añadir" placement="top"> */}
                <ListItem
                  button
                  className="icon-btn-input-adr-hab"
                  onClick={addChip}
                >
                  <p>Añadir</p>
                </ListItem>
              {/* </Tooltip> */}
            </InputAdornment>
          ) : null
        }
      />
      <div className="cont-btn-hab-chips">
        <ListItem
          button
          className="btn-chips-hab"
          onClick={() => setOpenModalHab(false)}
        >
          <p>Cancelar</p>
        </ListItem>
        <ListItem button className="btn-chips-hab" onClick={saveHabilidades}>
          <p>Guardar</p>
        </ListItem>
      </div>
    </div>
  );
};

export default HabChips;
