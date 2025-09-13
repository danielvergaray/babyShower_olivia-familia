import React, { useContext, useEffect, useState } from "react";
import InfoContext from "../context/InfoContext";
import { AiTwotoneDelete } from "react-icons/ai";
import DropdownComponent from "../dropdown/DropdownComponent";
import PopUpCreator from "../modal/PopUpCreator";
import { Spinner } from "react-bootstrap";

const Administrador = () => {
  const {
    invitadosAdministrador,
    setInvitadosAdministrador,
    listaRegalosAdministrador,
    setListaRegalosAdministrador,
  } = useContext(InfoContext);
  const [show, setShow] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [regaloSelected, setRegaloSelected] = useState({});
  const [invitadosFilterSelected, setInvitadosFilterSelected] =
    useState("Todos");
  const [RegalosFilterSelected, setRegalosFilterSelected] = useState("Todos");
  const [loading, setLoading] = useState(false);
  const [menuSelected, setMenuSelected] = useState("INVITADOS");

  const handleDelete = (data) => {
    setShow(true);

    if (menuSelected === "INVITADOS") {
      setUserSelected({
        id: data.id,
        nombre: data.nombre,
      });
    } else if (menuSelected === "REGALOS") {
      setRegaloSelected(data);
    }
  };

  const dropdownMenu = ["Todos", "Confirmados", "Ausentes", "Alfabetico"];
  const RegalosDropdownMenu = [
    "Todos",
    "Reservados",
    "Disponibles",
    "Alfabetico",
  ];

  /* FILTRADO DE INVITADOS */
  useEffect(
    () => {
      if (invitadosFilterSelected === "Alfabetico") {
        const invitadosOrdenados = [...invitadosAdministrador].sort((a, b) =>
          (a?.nombre || "").localeCompare(b?.nombre || "")
        );

        setInvitadosAdministrador(invitadosOrdenados);
      } else if (invitadosFilterSelected === "Confirmados") {
        const invitadosOrdenados = [...invitadosAdministrador].sort((a, b) =>
          (b?.respuesta || "").localeCompare(a?.respuesta || "")
        );
        setInvitadosAdministrador(invitadosOrdenados);
      } else if (invitadosFilterSelected === "Ausentes") {
        const invitadosOrdenados = [...invitadosAdministrador].sort((b, a) =>
          (a?.respuesta || "").localeCompare(b?.respuesta || "")
        );
        setInvitadosAdministrador(invitadosOrdenados);
      } else {
        const invitadosOrdenados = [...invitadosAdministrador].sort((a, b) =>
          (a?.nombre || "").localeCompare(b?.nombre || "")
        );

        setInvitadosAdministrador(invitadosOrdenados);
      }
    },
    [invitadosFilterSelected],
    [invitadosAdministrador]
  );

  /* Filtrado de regalos */
  useEffect(
    () => {
      if (RegalosFilterSelected === "Alfabetico") {
        const regalosOrdenados = [...listaRegalosAdministrador].sort((a, b) =>
          (a?.nombre || "").localeCompare(b?.nombre || "")
        );

        setListaRegalosAdministrador(regalosOrdenados);
      } else if (RegalosFilterSelected === "Disponibles") {
        const regalosOrdenados = [...listaRegalosAdministrador].sort((a, b) =>
          (b?.disponible || "").localeCompare(a?.disponible || "")
        );
        setListaRegalosAdministrador(regalosOrdenados);
      } else if (RegalosFilterSelected === "Reservados") {
        const regalosOrdenados = [...listaRegalosAdministrador].sort((b, a) =>
          (b?.disponible || "").localeCompare(a?.disponible || "")
        );
        setListaRegalosAdministrador(regalosOrdenados);
      } else {
        const regalosOrdenados = [...listaRegalosAdministrador].sort((a, b) =>
          (a?.nombre || "").localeCompare(b.nombre)
        );
        setListaRegalosAdministrador(regalosOrdenados);
      }
    },
    [RegalosFilterSelected],
    [invitadosAdministrador]
  );
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [menuSelected]);

  return (
    <section className="seccion-administrador">
      {show && (
        <div className="administrador-popup">
          <PopUpCreator
            userSelected={
              menuSelected === "INVITADOS" ? userSelected : regaloSelected
            }
            show={show}
            setShow={setShow}
            tipoModal={
              menuSelected === "INVITADOS"
                ? "administrador-invitados"
                : "administrador-regalos"
            }
          />
        </div>
      )}
      <div className="administrador-menu">
        <div className="administrador-menu-btn">
          <button
            className={menuSelected === "INVITADOS" ? "btn-escogido" : ""}
            onClick={() => {
              setMenuSelected("INVITADOS");
              setInvitadosFilterSelected("Todos");
            }}
          >
            INVITADOS
          </button>
          <button
            className={menuSelected === "REGALOS" ? "btn-escogido" : ""}
            onClick={() => {
              setMenuSelected("REGALOS");
              setRegalosFilterSelected("Todos");
            }}
          >
            REGALOS
          </button>
        </div>

        <div className="administrador-dropdown">
          <DropdownComponent
            filterSelected={
              menuSelected === "INVITADOS"
                ? invitadosFilterSelected
                : RegalosFilterSelected
            }
            setFilterSelected={
              menuSelected === "INVITADOS"
                ? setInvitadosFilterSelected
                : setRegalosFilterSelected
            }
            menuOptions={
              menuSelected === "INVITADOS" ? dropdownMenu : RegalosDropdownMenu
            }
          />
        </div>
      </div>

      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : menuSelected === "INVITADOS" ? (
        <div className="administrador-lista">
          <h1>Lista invitados</h1>

          <div className="administrador-submenu">
            <p>Nombre</p>
            <p>Respuesta</p>
            <p>Eliminar</p>
          </div>
          <span></span>
          {invitadosAdministrador.map((invitado, index) => (
            <>
              <div className="administrador-fila" key={index}>
                <p>{invitado.nombre}</p>
                <p>{invitado.respuesta !== "" ? invitado.respuesta : "-"}</p>

                {invitado.respuesta !== "" ? (
                  <p
                    className="icono-borrar"
                    onClick={() =>
                      handleDelete({
                        id: invitado.id,
                        nombre: invitado.nombre,
                      })
                    }
                  >
                    <AiTwotoneDelete />
                  </p>
                ) : (
                  <p className="icono-borrar apagado">
                    <AiTwotoneDelete />
                  </p>
                )}
              </div>
              <span></span>
            </>
          ))}
        </div>
      ) : (
        <div className="administrador-lista">
          <h1>Lista regalos</h1>
          <div className="administrador-submenu">
            <p></p>
            <p>Nombre</p>
            <p>Estado</p>
            <p>Comprador</p>
            <p>Dedicatoria</p>
            <p>Eliminar</p>
          </div>
          <span></span>
          {listaRegalosAdministrador.map((regalo, index) => (
            <>
              <div className="administrador-fila seccionRegalos" key={index}>
                <div className="seccionRegalos-imagenes">
                  <img src={regalo.linkImagen} alt="imagen-regalo" />
                </div>
                <div className="seccionRegalos-info">
                  <p>{regalo.nombre}</p>
                  <p
                    className={
                      regalo.disponible === "no" ? "regalo-reservado" : ""
                    }
                  >
                    {regalo.disponible === "si" ? "DISPONIBLE" : "RESERVADO"}
                  </p>
                  <p>{regalo.comprador !== "" ? regalo.comprador : "-"}</p>

                  <p>{regalo.dedicatoria !== "" ? regalo.dedicatoria : "-"}</p>
                  {regalo.disponible === "no" ? (
                    <p
                      className="icono-borrar"
                      onClick={() => handleDelete(regalo)}
                    >
                      <AiTwotoneDelete />
                    </p>
                  ) : (
                    <p className="icono-borrar apagado">
                      <AiTwotoneDelete />
                    </p>
                  )}
                </div>
              </div>
              <span></span>
            </>
          ))}
        </div>
      )}
    </section>
  );
};
export default Administrador;
