import React, { useEffect, useState } from "react";
import "./Ofertas.css";
import { Card, Header, Filtros } from "./components";
import { obtenerOferLaboralesAction } from "../../redux/actions/ofertasLaboralesAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";


const Ofertas = () => {
  const dispatch = useDispatch();
  const ofertasLaborales = useSelector(
    (state) => state.ofertasLaborales.ofertasLaborales
  );
  const loading = useSelector((state) => state.ofertasLaborales.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(obtenerOferLaboralesAction()); 
  }, []);

  return (
    <>
      <div className="ofertas-laborales">
        <div className="cont-header-of-laborales">
          <Header setOpen={setOpen} />
        </div>

        <div className="cont-card-of-laborales">
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
                visible={loading}
                //  timeout={3000} //3 secs
              />
            </div>
          ) : (
            ofertasLaborales.map((item, index) => (
              <Card data={item} key={index} />
            ))
          )}
        </div>
        <Filtros open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Ofertas;
