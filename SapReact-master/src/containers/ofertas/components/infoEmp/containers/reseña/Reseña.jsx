import React from "react";
import "../styles.css";

const Reseña = ({ data }) => {
  return (
    <div className="reseña-info-emp">
      <p>{data ? data : null}</p>
    </div>
  );
};

export default Reseña;
