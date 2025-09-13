import React, { useContext, useEffect, useState, useRef } from "react";
import InfoContext from "../context/InfoContext";
import SobreEvento from "./SobreEvento";
import SeccionRegalos from "./SeccionRegalos";
import SeccionFormulario from "./SeccionFormulario";
import SeccionCarousel from "./SeccionCarousel";
import SeccionContador from "./SeccionContador";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "../footer/Footer";
import { CiCircleChevDown } from "react-icons/ci";

const Home = () => {
  const { informacion } = useContext(InfoContext);
  const { seccionHome } = informacion;

  useEffect(() => {
    Aos.init();
  }, [{ duration: 100 }]);

  return (
    <>
      <section className="hero-section">
        <div className="hero-imagenCabecera-desktop">
          <img src={seccionHome.imagenCabecera} alt="imagen-toldo" />
        </div>
        <div className="hero-imagenCabecera-mobile">
          <img src={seccionHome.imagenCabeceraMobile} alt="imagen-toldo" />
        </div>
        <div className="hero-subtitulo animate__animated animate__fadeIn">
          <p className="cuerpo-textos">Bienvenida {seccionHome.nombre}</p>
        </div>
        <div
          className="hero-titulo
          animate__animated animate__fadeIn
           animate__delay-1s"
        >
          <img
            className="titulo-imagen"
            src={seccionHome.tituloImagenPortada}
            alt="nombre-evento"
          />
        </div>
        <div
          className="hero-fecha
          animate__animated animate__fadeIn
          animate__delay-2s"
        >
          <p className="subtitulos-textos">{seccionHome.fecha}</p>
        </div>
        <div className="hero-flecha">
          <CiCircleChevDown />
        </div>
      </section>

      <section className="seccion-contador">
        <SeccionContador />
      </section>

      <section className="seccion-sobreEvento">
        <SobreEvento />
      </section>

      <section className="seccion-carousel">
        <SeccionCarousel />
      </section>

      <section className="seccion-formulario">
        <SeccionFormulario />
      </section>

      <section className="seccion-regalos">
        <SeccionRegalos />
      </section>

      <section className="seccion-footer">
        <Footer />
      </section>
    </>
  );
};

export default Home;
