import React, { forwardRef } from "react";

const InfoUser = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h1>InfoUser</h1>
    </div>
  );
});

export default InfoUser;
