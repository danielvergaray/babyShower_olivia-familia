import React from "react";
import { Outlet } from "react-router-dom";
import InfoContextProvider from "./components/context/InfoContextProvider";
import AgregarInvitados from "./components/agregarInvitados/AgregarInvitados";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "animate.css";

function App() {
  return (
    <InfoContextProvider>
      <Outlet />
      {/* <AgregarInvitados /> */}
      {/* Para agregar invitados de forma dinámica */}
    </InfoContextProvider>
  );
}

export default App;
