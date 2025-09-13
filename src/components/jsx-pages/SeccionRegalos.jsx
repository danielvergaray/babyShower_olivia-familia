// SeccionRegalos.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InfoContext from "../context/InfoContext";

const SeccionRegalos = () => {
  const { informacion, animacionEntrada, duracionAnimacion1 } =
    useContext(InfoContext);

  const { seccionRegalos, seccionHome } = informacion;

  return (
    <>
      <div
        className="titulo-imagen"
        data-aos={animacionEntrada}
        data-aos-duration={duracionAnimacion1}
      >
        <img src={seccionRegalos.tituloImagen} alt="" />
      </div>

      <div
        className="seccion-regalos-frase"
        data-aos={animacionEntrada}
        data-aos-duration={duracionAnimacion1}
        data-aos-offset="50"
      >
        <div>
          <img src={seccionHome.iconoCroissant} alt="icono-croissant" />
          <img src={seccionHome.iconDonut} alt="icono-donut" />
        </div>
        <p className="cuerpo-textos">{seccionRegalos.titulo}</p>
        <div>
          <img src={seccionHome.iconoCupcake} alt="icono-cupcake" />
          <img src={seccionHome.iconoPan} alt="icono-pan" />
        </div>
      </div>
      <div
        className="seccion-regalos-btn"
        data-aos={animacionEntrada}
        data-aos-duration={duracionAnimacion1}
        data-aos-offset="100"
      >
        <Link
          to="https://baby-shower-olivia-lista-regalos.vercel.app/"
          target="_blank"
        >
          <button>{seccionRegalos.boton}</button>
        </Link>
      </div>
    </>
  );
};

export default SeccionRegalos;
