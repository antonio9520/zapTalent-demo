import React from "react";
import { SearchBar } from "../";
import "./HeaderHome.css";

const HeaderHome = () => {
  return (
    <div className="cont-header-home-b">
      <div className="cont-left-header-home">
        <p style={{ color: "#187ce2", margin: "0" }}>Home</p>
      </div>
      <div className="cont-right-header-home">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderHome;
