import React, { useState, useEffect } from "react";
import "./Forms.css";
import { IconButton, ListItem, InputAdornment } from "@material-ui/core";
import { Edit, Lock, Visibility, VisibilityOff } from "@material-ui/icons";
import { CustomInput, Tooltip } from "../../../../../components";
import { editarUsuarioAction } from "../../../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

const Password = ({ usuario, loading }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState({
    inputOne: false,
    inputTwo: false,
    inputThree: false,
  });
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);
  const [errorThree, setErrorThree] = useState(false);
  const [errormsg, setErrorMsj] = useState("");
  const [_id] = useState(usuario ? usuario._id : null);
  const [editar, setEditar] = useState(true);
  const statusError = useSelector((state) => state.auth.status);
  const handleClickShowPassword = () => {
    setShow({ ...show, inputOne: !show.inputOne });
  };
  const handleClickShowPassword2 = () => {
    setShow({ ...show, inputTwo: !show.inputTwo });
  };
  const handleClickShowPassword3 = () => {
    setShow({ ...show, inputThree: !show.inputThree });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = () => {
    console.log("changepassword");
    if (inputOne.trim() === "") {
      setErrorOne(true);
      setErrorMsj("Todos los campos son obligatorios");
      return;
    }
    if (inputTwo.trim() === "") {
      setErrorTwo(true);
      setErrorMsj("Todos los campos son obligatorios");
      return;
    }
    if (inputTwo.length < 6) {
      setErrorTwo(true);
      setErrorMsj("La contraseña debe ser minimo 6 caracteres");
      return;
    }
    if (inputThree.trim() === "") {
      setErrorThree(true);
      setErrorMsj("Todos los campos son obligatorios");
      return;
    }

    if (inputTwo.trim() !== inputThree.trim()) {
      setErrorThree(true);
      setErrorMsj("Las contraseñas no coinciden");
      return;
    }

    dispatch(
      editarUsuarioAction({ _id, passwordActual: inputOne, password: inputTwo })
    );
    setEditar(true);
  };

  useEffect(() => {
    if (statusError === 470) {
      setErrorOne(true);
      setErrorMsj("Contraseña incorrecta");
    } else if (statusError === 200) {
      setEditar(true);
      setInputOne("");
      setInputTwo("");
      setInputThree("");
    }
  }, [statusError]);

  return (
    <div style={{ position: "relative", height: "420px" }}>
      <div className="top-edit-perfil-2">
        <p>Cambiar contraseña</p>
        <Tooltip title="Editar">
          <IconButton
            disabled={!editar || loading}
            className={
              !editar || loading
                ? "icon-btn-edit-perfil-inact"
                : "icon-btn-edit-perfil"
            }
            onClick={() => setEditar(false)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      <div className="form-edit-perfil">
        <div className="item-edit-perfil-pass">
          <Lock className="icon-form-edit-perfil" />
          <CustomInput
            disabled={editar}
            error={errorOne}
            helpertext={errormsg}
            value={inputOne}
            label="Contraseña actual"
            type={show.inputOne ? "text" : "password"}
            onChange={(e) => {
              setErrorOne(false);
              setInputOne(e.target.value);
            }}
            endAdornment={
              inputOne === "" ? null : (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {show.inputOne ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </div>
        <div className="item-edit-perfil-pass">
          <Lock className="icon-form-edit-perfil" />
          <CustomInput
            disabled={editar}
            error={errorTwo}
            value={inputTwo}
            helpertext={errormsg}
            label="Nueva contraseña"
            type={show.inputTwo ? "text" : "password"}
            onChange={(e) => {
              setErrorTwo(false);
              setInputTwo(e.target.value);
            }}
            endAdornment={
              inputTwo === "" ? null : (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {show.inputTwo ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </div>
        <div className="item-edit-perfil-pass">
          <Lock className="icon-form-edit-perfil" />
          <CustomInput
            disabled={editar}
            error={errorThree}
            helpertext={errormsg}
            value={inputThree}
            label="Confirmar nueva contraseña"
            type={show.inputThree ? "text" : "password"}
            onChange={(e) => {
              setErrorThree(false);
              setInputThree(e.target.value);
            }}
            // endAdornment={
            //   inputThree === "" ? null : (
            //     <InputAdornment position="end">
            //       <IconButton
            //         aria-label="toggle password visibility"
            //         // onClick={handleClickShowPassword3}
            //         onMouseDown={handleMouseDownPassword}
            //       >
            //         {show.inputThree ? <Visibility /> : <VisibilityOff />}
            //       </IconButton>
            //     </InputAdornment>
            //   )
            // }
          />
        </div>
      </div>
      <div className="cont-btn-edit-perfil">
        <ListItem
          button
          disabled={editar}
          className="btn-adnzap-modal"
          onClick={() => {
            setInputOne("");
            setInputTwo("");
            setInputThree("");
            setErrorOne(false);
            setErrorTwo(false);
            setErrorThree(false);
            setEditar(true);
          }}
        >
          <p>Cancelar</p>
        </ListItem>
        <ListItem
          disabled={editar}
          button
          className="btn-adnzap-modal"
          onClick={changePassword}
        >
          <p>Guardar</p>
        </ListItem>
      </div>
    </div>
  );
};

export default Password;
