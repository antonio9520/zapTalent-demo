import { SHOW_ALERT } from "../types";

export function showAlertAction(msg) {
  console.log("showalert");
  return (dispatch) => {
    dispatch(showAlert(msg));
  };
}

const showAlert = (data) => ({
  type: SHOW_ALERT,
  payload: data,
});
