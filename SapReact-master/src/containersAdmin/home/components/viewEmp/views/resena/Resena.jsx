import React from "react";
import "./Resena.css";

const Resena = ({ data }) => {
  const { resena } = data;
  return (
    <div className="resena-view-emp-admin">
      <textarea readOnly>{resena}</textarea>
    </div>
  );
};

export default Resena;
