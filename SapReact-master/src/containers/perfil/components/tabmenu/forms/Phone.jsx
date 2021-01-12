import React, { useState } from "react";
import "./Forms.css";
import {
  IconButton,
  ListItem,
  FormControl,
  FormHelperText,
  Input,
} from "@material-ui/core";
import { Edit, PhoneIphone } from "@material-ui/icons";
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";
import { editarUsuarioAction } from "../../../../../redux/actions/authAction";
import { Tooltip } from "../../../../../components";

const Phone = ({ usuario, loading }) => {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(true);
  const [phone, setPhone] = useState(usuario ? usuario.phone : null);
  const [errorphone, setErrorPhone] = useState(false);
  const [phonemsg, setPhoneMsg] = useState("");
  const [_id] = useState(usuario ? usuario._id : null);

  const savePhone = () => {
    let numberPhone = phone.replace(/\D/g, "");
    if (phone.trim() === "") {
      setErrorPhone(true);
      setPhoneMsg("Ingrese un numero de telefono");
      return;
    } else if (numberPhone.length < 11) {
      setErrorPhone(true);
      setPhoneMsg("Ingrese un numero de telefono valido");
      return;
    }
    dispatch(editarUsuarioAction({ _id, phone }));
    setEditar(true);
  };

  const cancelEdit = () => {
    setPhone(usuario ? usuario.phone : null);
    setEditar(true);
    setErrorPhone(false);
  };
  return (
    <div style={{ position: "relative", height: "420px" }}>
      <div className="top-edit-perfil-2">
        <p>Editar teléfono</p>
        <Tooltip title="Editar">
          <IconButton
            className={
              !editar || loading
                ? "icon-btn-edit-perfil-inact"
                : "icon-btn-edit-perfil"
            }
            onClick={() => setEditar(!editar)}
            disabled={!editar || loading}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      <div className="form-edit-perfil">
        <div className="item-edit-perfil">
          <PhoneIphone className="icon-form-edit-perfil" />

          <FormControl
            fullWidth
            size="small"
            error={errorphone}
            disabled={editar}
          >
            {/* <InputLabel
              // className="input-label-custom-input"
              htmlFor="formatted-text-mask-input"
            >
              Telefono
            </InputLabel> */}
            <Input
              value={phone}
              defaultValue={phone}
              onChange={(e) => {
                setErrorPhone(false);
                setPhone(e.target.value);
              }}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={InputMaskCustom}
            />
            {errorphone ? (
              <FormHelperText className="helper-text-custom-input">
                {phonemsg}
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
      </div>
      <div className="cont-btn-edit-perfil">
        <ListItem
          button
          disabled={editar}
          className="btn-adnzap-modal"
          onClick={cancelEdit}
        >
          <p>Cancelar</p>
        </ListItem>
        <ListItem
          button
          disabled={editar}
          className="btn-adnzap-modal"
          onClick={savePhone}
        >
          <p>Guardar</p>
        </ListItem>
      </div>
    </div>
  );
};

export default Phone;

const InputMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      className="input-mask-phone-perfil"
      mask="+(999) 9999 9999"
      placeholder="+(569) 7890 7890"
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};
