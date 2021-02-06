import React, { useState } from "react";
import "./Estudios.css";
import SwipeableViews from "react-swipeable-views";

const Estudios = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div style={{ backgroundColor: "green", width: "100%", height: "100%" }}>
      <SwipeableViews index={activeStep}>
        {/* {arrayModulos.map((item, index) => (
          <div key={index} className="cont-SwipeableViews">
            {item.map((item, index) => (
              <ItemModulo
                key={index}
                item={item}
                arrayModules={arrayModules}
                setArrayModules={setArrayModules}
              />
            ))}
          </div>
        ))} */}
        <p>p</p>
      </SwipeableViews>
    </div>
  );
};

export default Estudios;
