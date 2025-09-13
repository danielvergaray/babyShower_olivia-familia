import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InfoContext from "../context/InfoContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";

const PopUpCreator = ({ tipoModal, show, setShow, userSelected }) => {
  const {
    deleteInvitadoInfo,
    setIipoPopUpFormulario,
    iconoMuffin,
    usuarioAprobado,
    deleteRegaloInfo,
  } = useContext(InfoContext);

  const [isButtonListaRegalosDisabled, setIsButtonListaRegalosDisabled] =
    useState(true);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (usuarioAprobado) {
      setIsButtonListaRegalosDisabled(false);
    } else {
      setIsButtonListaRegalosDisabled(true);
    }
  }, [usuarioAprobado]);

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-lg"
      >
        {tipoModal === "administrador-invitados" ? (
          <div className="modal-confirmacionInvitacion">
            <Modal.Header>
              <p>
                <IoCloseCircleOutline onClick={handleClose} />
              </p>
            </Modal.Header>

            <Modal.Body>
              <p>¿Estas seguro que deseas eliminar la informacion de </p>
              <p>{userSelected.nombre}?</p>
            </Modal.Body>
            <Modal.Footer style={{ paddingTop: "10px" }}>
              <button
                onClick={() => {
                  deleteInvitadoInfo(userSelected.id);
                  handleClose();
                }}
                variant="primary"
              >
                Eliminar
              </button>
            </Modal.Footer>
          </div>
        ) : tipoModal === "administrador-regalos" ? (
          <div className="modal-confirmacionInvitacion modal-adminRegalos">
            <Modal.Header>
              <p>
                <IoCloseCircleOutline onClick={handleClose} />
              </p>
            </Modal.Header>

            <Modal.Body>
              <p>
                ¿Estas seguro que deseas eliminar la informacion sobre este
                regalo?
              </p>
              <div className="modal-adminRegalos-container">
                <div className="modal-adminRegalos-imagen">
                  <img src={userSelected.linkImagen} alt="imagen-regalo" />
                </div>
                <div className="modal-adminRegalos-info">
                  <div>
                    <p>Nombre regalo</p>
                    <p>{userSelected.nombre}</p>
                  </div>
                  <span></span>
                  <div>
                    <p>Comprador</p>
                    <p>{userSelected.comprador}</p>
                  </div>
                  <span></span>
                  <div>
                    <p>Dedicatoria</p>
                    <p>{userSelected.dedicatoria}</p>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ paddingTop: "10px" }}>
              <button
                onClick={() => {
                  deleteRegaloInfo(userSelected.id);
                  handleClose();
                }}
                variant="primary"
              >
                Eliminar
              </button>
            </Modal.Footer>
          </div>
        ) : tipoModal === "usuarioYaRegistrado" ? (
          <div className="modal-confirmacionInvitacion">
            <Modal.Header>
              <p>
                <IoCloseCircleOutline
                  onClick={() => setIipoPopUpFormulario("")}
                />
              </p>
            </Modal.Header>
            <Modal.Body>
              <img src={iconoMuffin} alt="icono-muffin" />
              <p>Ya te has registrado</p>
              <p>anteriormente, comunícate</p>
              <p>con el administrador</p>
            </Modal.Body>
            <Modal.Footer>
              <br></br>
            </Modal.Footer>
          </div>
        ) : tipoModal === "confirmacionPositiva" ? (
          <div className="modal-confirmacionInvitacion">
            <Modal.Header>
              <IoCloseCircleOutline
                onClick={() => setIipoPopUpFormulario("")}
              />
            </Modal.Header>
            <Modal.Body>
              <img src={iconoMuffin} alt="icono-muffin" />
              <p>Gracias por confirmar.</p>
              <p>te esperamos</p>
            </Modal.Body>
            <Modal.Footer>
              <Link to="https://baby-shower-olivia-lista-regalos.vercel.app/">
                <button>VER LISTA DE REGALOS</button>
              </Link>
            </Modal.Footer>
          </div>
        ) : tipoModal === "confirmacionNegativa" ? (
          <div className="modal-confirmacionInvitacion">
            <Modal.Header>
              <p>
                <IoCloseCircleOutline
                  onClick={() => setIipoPopUpFormulario("")}
                />
              </p>
            </Modal.Header>
            <Modal.Body>
              <img src={iconoMuffin} alt="icono-muffin" />
              <p style={{ paddingTop: "20px" }}>
                Lamentamos no poder contar contigo
              </p>
            </Modal.Body>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default PopUpCreator;
