import React from "react";
import "./Pagination.css";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      backgroundColor: " #fff",
      color: "#187ce2",
    },
    "& .Mui-selected": {
      color: "#fff",
      backgroundColor: " #187ce2",
      boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    },
  },
}));

const Paginacion = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="paginacion-avisos">
      <div className="left-paginacion-avisos">
        <p>5 Avisos</p>
      </div>
      <div className="right-paginacion-avisos">
        <div >
          <Pagination
            classes={{ ul: classes.ul }}
            count={4}
            page={page}
            onChange={handleChange}
          />
          {/* <Pagination
            count={4}
            page={page}
            onChange={handleChange}
            color="primary"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Paginacion;
