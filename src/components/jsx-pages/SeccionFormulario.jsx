import React, { useContext, useEffect, useState } from "react";
import InfoContext from "../context/InfoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUpCreator from "../modal/PopUpCreator";
import Dropdown from "react-bootstrap/Dropdown";
import ToastifyComponent from "../toastify/ToastifyComponent";
import { toast } from "react-toastify";
import { BsChevronDown } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SeccionFormulario = () => {
  const {
    informacion,
    setUserTypedObject,
    getUserDataName,
    handleEnviarFormulario,
    userData,
    tipoPopUpFormulario,
    verificarInvitados,
    animacionEntrada,
    duracionAnimacion1,
    usuarioAprobado,
  } = useContext(InfoContext);

  const { seccionForm } = informacion;

  const [isButtonsDisabled, setIsButtonDisabled] = useState(true);

  const [showInputInvitado, setShowInputInvitado] = useState(false);

  const [dropdownOptionSelected, setDropdownOptionSelected] = useState(
    "Confirma tu asistencia"
  );

  const [userGuests, setUserGuests] = useState([]);
  const [guestNameTyped, setGuestNameTyped] = useState("");
  const [guestNameSanitized, setGuestNameSanitized] = useState("");

  const handleUserGuest = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = value
      .replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    setGuestNameSanitized(sanitizedValue);
    setGuestNameTyped(value.toLowerCase());
  };

  const handleAddGuest = async () => {
    if (userGuests.length < 3) {
      const invitadoVerificado = await verificarInvitados(guestNameSanitized);

      if (invitadoVerificado) {
        const busquedaInvitadoEnArray = userGuests.includes(guestNameTyped);
        if (!busquedaInvitadoEnArray) {
          setUserGuests((prev) => [...prev, guestNameTyped]);

          setGuestNameTyped("");
        } else {
          toast("Ya has agregado a esta persona");
        }
      } else {
        toast("No puedes agregar a esta persona");
      }
    } else {
      toast("Cantidad maxima de invitados alcanzada");
    }
  };

  const deleteUserGuest = (guest) => {
    const nuevoArray = userGuests.filter(
      (guestToDelete) => guestToDelete !== guest
    );
    setUserGuests(nuevoArray);
  };
  useEffect(() => {
    if (
      usuarioAprobado &&
      dropdownOptionSelected !== "Confirma tu asistencia"
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [usuarioAprobado, dropdownOptionSelected]);

  useEffect(() => {
    if (!usuarioAprobado) {
      setDropdownOptionSelected("Confirma tu asistencia");
    }
  }, [usuarioAprobado]);

  return (
    <>
      <ToastifyComponent />

      {tipoPopUpFormulario && (
        <PopUpCreator tipoModal={tipoPopUpFormulario} show={true} />
      )}

      <div className="seccion-formulario-userContainer">
        <div className="seccion-formulario-titulo">
          <p
            className="cuerpo-textos"
            data-aos={animacionEntrada}
            data-aos-duration={duracionAnimacion1}
          >
            {seccionForm.titulo}
          </p>
          <p
            className="cuerpo-textos"
            data-aos={animacionEntrada}
            data-aos-duration={duracionAnimacion1}
            data-aos-offset="200"
          >
            {seccionForm.subtitulo}
          </p>
        </div>

        <div className="seccion-formulario-usuario">
          <form action="">
            <label htmlFor="nombre"></label>
            <input
              type="text"
              name="nombre"
              pattern="^[a-zA-Z ]*$" // Acepta solo letras (mayúsculas y minúsculas) y espacios
              title="Solo se permiten letras (mayúsculas y minúsculas) y espacios"
              placeholder="NOMBRE Y APELLIDO"
              value={userData.nombre}
              onChange={getUserDataName}
              required
            />
            <p className="formulario-icono">
              {!usuarioAprobado && userData.nombre.length > 0 ? (
                <IoIosCloseCircle className="formulario-icono-x" />
              ) : usuarioAprobado && userData.nombre.length > 0 ? (
                <IoIosCheckmarkCircle />
              ) : null}
            </p>
          </form>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <p>{dropdownOptionSelected}</p>
              <p>
                <BsChevronDown />
              </p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDropdownOptionSelected("Si")}>
                Si
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setDropdownOptionSelected("No");
                  setUserGuests([]);
                }}
              >
                No
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {dropdownOptionSelected === "Si" && usuarioAprobado && (
            <div className="formulario-usuario-linkInvitados">
              <p
                className="otros-textos"
                onClick={() => {
                  {
                    setShowInputInvitado(!showInputInvitado);
                  }
                  setGuestNameTyped("");
                }}
              >
                ¿Deseas agregar a alguien mas?
              </p>
            </div>
          )}

          {dropdownOptionSelected === "Si" &&
            usuarioAprobado &&
            showInputInvitado && (
              <div className="seccion-formulario-invitados">
                <div className="seccion-formulario-invitadosInput">
                  <form action="">
                    <label htmlFor="nombre"></label>
                    <input
                      type="text"
                      name="nombre"
                      pattern="^[a-zA-Z ]*$" // Acepta solo letras (mayúsculas y minúsculas) y espacios
                      title="Solo se permiten letras (mayúsculas y minúsculas) y espacios"
                      placeholder="NOMBRE Y APELLIDO"
                      onChange={handleUserGuest}
                      value={guestNameTyped}
                      required
                    />
                  </form>
                  <div onClick={handleAddGuest} className="icono-agregar">
                    <IoIosAddCircle />
                  </div>
                </div>
                {userGuests.length > 0 && (
                  <div className="seccion-formulario-invitadosAgregados">
                    {userGuests.map((guest, index) => (
                      <div key={index}>
                        <p>{guest}</p>
                        <p onClick={() => deleteUserGuest(guest)}>
                          <FaMinusCircle />
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          <div className="seccion-formulario-btn">
            <button
              disabled={isButtonsDisabled}
              className={isButtonsDisabled ? "disabledButton" : ""}
              onClick={(event) => {
                handleEnviarFormulario(
                  event,
                  dropdownOptionSelected,
                  userGuests
                );

                // Reiniciar valores después de enviar
                setDropdownOptionSelected("Confirma tu asistencia");
                setUserGuests([]);
                setShowInputInvitado(false);
                setUserTypedObject({});
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeccionFormulario;
