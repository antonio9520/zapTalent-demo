import React from "react";
import "./SearchBar.css";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
const SearchBar = () => {
  return (
    <div className="cont-search-bar">
      <input type="text" placeholder="Buscar..." />
      <IconButton>
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchBar;
