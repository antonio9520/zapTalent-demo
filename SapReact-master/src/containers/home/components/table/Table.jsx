import React from "react";
import "./Table.css";
import { SearchBar, CardJob } from "../";
import { Button } from "../../../../components";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

const Table = ({
  setSkip,
  setOpenModal,
  setDataOL,
  data,
  search,
  setSearch,
  query,
  setQuery,
  setSwitch2,
  _switch2,
  loading,
  setIdEmp,
  setOpenModalAviso,
  setIdAviso,
}) => {
  const history = useHistory();
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const alto = scrollHeight - 150;
    if (offsetHeight + scrollTop > alto) {
      console.log("scroll");
      setSkip(data.length);
    }
  };
  const handleClick = () => {
    query.search = search;
    setSkip(0);
    setQuery(query);
    setSwitch2(!_switch2);
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const irAOfertas = () => {
    history.push("/ofertas-laborales");
  };
  return (
    <div className="cont-table">
      <div className="cont-top-table-home">
        <div className="titulo-table-home">
          <p>Ofertas de empleo que te podrían interesar</p>
        </div>
        <div className="cont-search-table-home">
          <SearchBar
            onChange={setSearch}
            onClick={handleClick}
            onKeyDown={_handleKeyDown}
            value={search}
          />
        </div>
      </div>
      <div className="cont-center-table-home" onScroll={handleScroll}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Loader
              type="Oval"
              color="#00BFFF"
              height={60}
              width={60}
              visible={loading}
              //  timeout={3000} //3 secs
            />
          </div>
        ) : data.length === 0 ? (
          <div className="cont-not-sug-employees">
            <p>No tienes empleos sugeridos</p>
            <Button variant="contained" color="primary" onClick={irAOfertas}>
              Ir a ofertas laborales
            </Button>
          </div>
        ) : (
          data.map((item) => (
            <div key={item._id} className="cont-card-job-table">
              <CardJob
                data={item}
                setOpenModal={setOpenModal}
                setDataOL={setDataOL}
                setOpenModalAviso={setOpenModalAviso}
                setIdEmp={setIdEmp}
                setIdAviso={setIdAviso}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
