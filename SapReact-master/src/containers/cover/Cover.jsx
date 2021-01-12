import React from "react";
import "./Cover.css";
import {
  Menu,
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
  SectionFive,
  SectionSix,
  SectionSeven,
  SectionEight,
  SectionNine,
  SectionTen,
} from "./components";

const Cover = () => {
  return (
    <div className="cont-cover">
      <Menu />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
      <SectionNine />
      <SectionTen />
    </div>
  );
};

export default Cover;
