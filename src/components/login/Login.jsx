import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ToastifyComponent from "../toastify/ToastifyComponent";
import { toast } from "react-toastify";
import AdministradorContainer from "../administrador/AdministradorContainer";

const Login = ({
  handleLogin,
  loginAllowed,
  isLoading,
  wrongPasswordAlert,
  saveUserName,
  saveUserPass,
  userCredentials,
  isButtonDisabled,
  setIsButtonDisabled,
  setWrongPasswordAlert,
}) => {
  useEffect(() => {
    if (
      userCredentials.username !== null &&
      userCredentials.password !== null
    ) {
      setIsButtonDisabled(false);
    }
  }, [userCredentials]);
  console.log(userCredentials);
  useEffect(() => {
    if (wrongPasswordAlert) {
      toast("Usuario o contraseña incorrectos");
    }
    setWrongPasswordAlert(false);
  }, [wrongPasswordAlert]);
  return (
    <>
      <ToastifyComponent />
      {!isLoading && !loginAllowed ? (
        <section className="seccion-login">
          <div className="login-contenido">
            <p>Ingresa tus datos</p>
            <form action="">
              <label htmlFor="username"></label>
              <input
                name="username"
                onChange={(e) => saveUserName(e.target.value)}
                type="text"
                placeholder="Usuario"
              />
              <label htmlFor="password"></label>
              <input
                name="password"
                onChange={(e) => saveUserPass(e.target.value)}
                type="password"
                placeholder="Contraseña"
              />
            </form>
            {/*  {wrongPasswordAlert && <p>Usuario o contraseña incorrectos</p>} */}
            <div className="login-btn">
              <button
                disabled={isButtonDisabled}
                className={isButtonDisabled ? "btn-desactivado" : ""}
                onClick={() => handleLogin(userCredentials)}
              >
                Ingresar
              </button>
              <Link to="/">
                <button>Regresar</button>
              </Link>
            </div>
          </div>
        </section>
      ) : isLoading && !loginAllowed ? (
        <div className="seccion-login">
          <div className="login-contenido">
            <Spinner />
          </div>
        </div>
      ) : !isLoading && loginAllowed ? (
        <AdministradorContainer />
      ) : null}
    </>
  );
};

export default Login;
