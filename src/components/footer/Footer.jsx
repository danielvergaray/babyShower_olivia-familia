import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InfoContext from "../context/InfoContext";

const Footer = () => {
  const { informacion } = useContext(InfoContext);

  const { seccionFooter } = informacion;
  return (
    <>
      <div className="link">
        <Link target="_blank" to="https://studio-code-eta.vercel.app/">
          <p>DESIGNED BY studioCode</p>
        </Link>
      </div>
      <div className="link link-admin">
        <Link to="/login">
          <p>¿Eres administrador?</p>
        </Link>
      </div>
    </>
  );
};

export default Footer;
