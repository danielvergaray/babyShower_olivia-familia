import React, { useContext } from "react";
import InfoContext from "../context/InfoContext";
import CuentaRegresiva from "../contador/CuentaRegresiva";

const SeccionContador = () => {
  const { informacion, animacionEntrada, duracionAnimacion1 } =
    useContext(InfoContext);

  const { seccionContador, seccionHome } = informacion;
  return (
    <>
      <div
        className="contador-titulo"
        data-aos={animacionEntrada}
        data-aos-duration={duracionAnimacion1}
      >
        <img src={seccionHome.iconoCroissant} alt="icono-croissant" />
        <p className="cuerpo-textos">{seccionContador.titulo}</p>
        <img src={seccionHome.iconoCupcake} alt="icono-cupcake" />
      </div>
      <div
        className="contador-subtitulo"
        data-aos={animacionEntrada}
        data-aos-duration={duracionAnimacion1}
        data-aos-offset="200"
      >
        <img src={seccionHome.iconDonut} alt="icono-donut" />
        <p className="cuerpo-textos">{seccionContador.subtitulo}</p>
        <img src={seccionHome.iconoPan} alt="icono-pan" />
      </div>

      <div className="home-cuentaRegresiva">
        <CuentaRegresiva />
      </div>
    </>
  );
};

export default SeccionContador;
