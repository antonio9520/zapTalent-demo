import React from "react";
import "./SectionSix.css";
import { ListItem } from "@material-ui/core";
import plataforma from "../../../../../resources/cover/ZAPTalent-Plataforma.png";

const SectionSix = () => {
  return (
    <div className="cont-section-six">
      <div className="sub-section-six">
        <div className="left-section-six">
          <h1>Loren Ipsum is simply dummy</h1>
          <p style={{color: "white"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ListItem button className="btn-comenzar-section-six">
            <p>COMENZAR</p>
          </ListItem>
        </div>
        <div className="right-section-six">
          <img src={plataforma} alt="zap-talent" />
        </div>
      </div> 
    </div>
  );
};

export default SectionSix;
