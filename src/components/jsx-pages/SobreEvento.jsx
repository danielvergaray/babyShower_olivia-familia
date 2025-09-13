import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import Carousel from "react-bootstrap/Carousel";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

const SobreEvento = () => {
  const { informacion, animacionEntrada, duracionAnimacion1 } =
    useContext(InfoContext);

  const { seccionSobreEvento, seccionHome } = informacion;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <section className="sobreEvento-carruselVersion">
      <div
        className="titulo-imagen"
        data-aos={animacionEntrada}
        data-aos-duration={duracionAnimacion1}
      >
        <img src={seccionSobreEvento.tituloImagen} alt="titulo" />
      </div>

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        interval={null}
        data-bs-theme="dark"
      >
        <Carousel.Item>
          <div
            className="sobreEvento-subtitulo"
            data-aos={animacionEntrada}
            data-aos-duration={duracionAnimacion1}
          >
            <p className="subtitulos-textos">{seccionSobreEvento.subtitulo}</p>
          </div>

          <div
            className="sobreEvento-fecha-hora"
            data-aos={animacionEntrada}
            data-aos-duration={duracionAnimacion1}
            data-aos-offset="200"
          >
            <div className="sobreEvento-fecha">
              <p>{seccionSobreEvento.dia}</p>
              <p className="otros-textos">{seccionSobreEvento.mes}</p>
            </div>
            <div className="sobreEvento-icono">
              <img src={seccionHome.iconoMuffin} alt="" />
            </div>
            <div className="sobreEvento-hora">
              <p>{seccionSobreEvento.hora}</p>
              <p className="otros-textos">{seccionSobreEvento.rango}</p>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="sobreEvento-subtitulo">
            <p className="subtitulos-textos">{seccionSobreEvento.subtitulo2}</p>
          </div>
          <div className="sobreEvento-lugar-ubicacion">
            <img src={seccionHome.iconDonut} alt="icono-donut" />
            <div>
              <p className="cuerpo-textos">{seccionSobreEvento.direccion}</p>
              <p className="cuerpo-textos">{seccionSobreEvento.distrito}</p>
            </div>
            <img src={seccionHome.iconoPan} alt="icono-pan" />
          </div>
          <div
            className="sobreEvento-btn"
            data-aos={animacionEntrada}
            data-aos-duration={duracionAnimacion1}
          >
            <Link target="_blank" to={seccionSobreEvento.linkMaps}>
              <button>{seccionSobreEvento.boton}</button>
            </Link>
          </div>
        </Carousel.Item>
      </Carousel>

      <div className="sobreEvento-flechas">
        <CiCircleChevLeft
          onClick={() => (index === 0 ? setIndex(1) : setIndex(0))}
        />

        <CiCircleChevRight
          onClick={() => (index === 0 ? setIndex(1) : setIndex(0))}
        />
      </div>
    </section>
  );
};

export default SobreEvento;
