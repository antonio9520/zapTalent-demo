import React from "react";
import "./SearchBar.css";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
const SearchBar = ({ onClick, onChange,onKeyDown }) => {
  return (
    <div className="cont-search-bar">
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <IconButton onClick={onClick}>
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchBar;
