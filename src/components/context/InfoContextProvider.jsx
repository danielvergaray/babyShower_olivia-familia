import React, { useEffect, useState } from "react";
import InfoContext from "./InfoContext";
import tituloSeccionSobreEvento from "../../assets/imagenes/titulos/sub-sobreelevento.png";
import tituloSeccionRegalos from "../../assets/imagenes/titulos/sub-listaderegalos.png";
import tituloImagenPortada from "../../assets/imagenes/titulos/Titulo.png";
import cabeceraImagen from "../../assets/imagenes/Cabecera.png";
import cabeceraImagenMobile from "../../assets/imagenes/Cabeceramobile.png";
import imagen1 from "../../assets/imagenes/carousel/imagenCarousel_01.jpeg";
import imagen2 from "../../assets/imagenes/carousel/imagenCarousel_02.jpg";
import imagen3 from "../../assets/imagenes/carousel/imagenCarousel_03.jpeg";
import imagen4 from "../../assets/imagenes/carousel/imagenCarousel_04.jpg";
import imagen5 from "../../assets/imagenes/carousel/imagenCarousel_05.jpeg";
import imagen6 from "../../assets/imagenes/carousel/imagenCarousel_06.jpg";
import imagen7 from "../../assets/imagenes/carousel/imagenCarousel_07.jpeg";
import imagen8 from "../../assets/imagenes/carousel/imagenCarousel_08.jpg";
import imagen9 from "../../assets/imagenes/carousel/imagenCarousel_09.jpg";
import imagen10 from "../../assets/imagenes/carousel/imagenCarousel_10.jpg";
import iconoCroissant from "../../assets/imagenes/iconos/croissant.png";
import iconoCupcake from "../../assets/imagenes/iconos/cupcake.png";
import iconoCupcakePan from "../../assets/imagenes/iconos/cupcakeypan.png";
import iconDonut from "../../assets/imagenes/iconos/donut.png";
import iconoHornoPanes from "../../assets/imagenes/iconos/hornoypanes.png";
import iconoMuffin from "../../assets/imagenes/iconos/muffin.png";
import iconoPan from "../../assets/imagenes/iconos/pan.png";

import {
  getFirestore,
  collection,
  query,
  updateDoc,
  getDocs,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
import "aos/dist/aos.css";

const InfoContextProvider = ({ children }) => {
  const informacion = {
    seccionHome: {
      imagenCabecera: cabeceraImagen,
      imagenCabeceraMobile: cabeceraImagenMobile,
      tituloImagenPortada: tituloImagenPortada,
      fecha: "20 de septiembre",
      nombre: "Olivia",
      iconoCroissant: iconoCroissant,
      iconoCupcake: iconoCupcake,
      iconoCupcakePan: iconoCupcakePan,
      iconDonut: iconDonut,
      iconoHornoPanes: iconoHornoPanes,
      iconoMuffin: iconoMuffin,
      iconoPan: iconoPan,
    },

    seccionContador: {
      titulo: "hay un pancito en el horno y ya casi es hora de conocerlo",
      subtitulo: "ven a celebrar juntos su llegada",
      diaEvento: 20,
      mesEvento: "septiembre",
      anioEvento: 2025,
    },

    seccionSobreEvento: {
      tituloImagen: tituloSeccionSobreEvento,
      subtitulo: "fecha y hora",
      dia: "20",
      linkMaps: "https://maps.app.goo.gl/LnBxDDANCwqTtfiX6",
      mes: "de septiembre",
      hora: "4.00",
      rango: "de la tarde",
      subtitulo2: "lugar",
      direccion: "Adam Smith 220",
      distrito: "Surquillo",
      boton: "ver mapa",
    },

    seccionCarousel: {
      tituloImagen: null,
      titulo:
        "A fuego lento se hornea la mejor etapa de nuestras vidas. Olivia va creciendo y se va haciendo espacio en nuestro hogar",
      carouselImagenes: [
        {
          imagenCarousel: imagen1,
        },
        {
          imagenCarousel: imagen2,
        },
        {
          imagenCarousel: imagen3,
        },
        {
          imagenCarousel: imagen4,
        },
        {
          imagenCarousel: imagen5,
        },
        {
          imagenCarousel: imagen6,
        },
        {
          imagenCarousel: imagen7,
        },
        {
          imagenCarousel: imagen8,
        },
        {
          imagenCarousel: imagen9,
        },
        {
          imagenCarousel: imagen10,
        },
      ],
    },

    seccionRegalos: {
      tituloImagen: tituloSeccionRegalos,
      titulo:
        "Tu presencia es el mejor regalo, pero si deseas llevar un detallito para Olivia, hemos preparado esta lista con opciones",
      boton: "ver lista de regalos",
    },

    seccionForm: {
      titulo:
        "Un momento especial que queremos compartir con quienes queremos.",
      subtitulo: "Si puedes venir, confirmanos tu asistencia",
      boton: "enviar",
    },

    seccionFooter: {
      tituloImagen: null,
    },
  };

  /* ANIMACIONES */

  const animacionEntrada = "fade-in";
  const duracionAnimacion1 = "3000";

  /* FORMULARIO */

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    respuesta: "",
    mensaje: "",
    id: "",
    regaloEscogido: "",
    posiblesInvitados: [],
    invitadosConfirmados: [],
  });

  const getUserData = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const getUserDataName = (event) => {
    const { name, value } = event.target;
    // Eliminar números, caracteres especiales y acentos utilizando una expresión regular
    const sanitizedValue = value
      .replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setUserData({ ...userData, [name]: sanitizedValue });
  };

  const [tipoPopUpFormulario, setIipoPopUpFormulario] = useState("");

  const handleEnviarFormulario = async (
    event,
    respuestaAsistencia,
    userGuests
  ) => {
    event.preventDefault();
    setLoading(true);

    const db = getFirestore();
    const nombreMinusculas = userData.nombre.toLowerCase().split(" ").join("");
    const invitadosFirebase = collection(db, "invitados");

    try {
      const querySnapshot = await getDocs(
        query(invitadosFirebase, where("nombre", "==", nombreMinusculas))
      );

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();

        if (existingData.respuesta) {
          setIipoPopUpFormulario("usuarioYaRegistrado");
        } else {
          if (respuestaAsistencia === "Si") {
            await updateDoc(docRef, {
              respuesta: respuestaAsistencia,
              invitadosConfirmados: userGuests,
            });
            await actualizarRespuestaDeinvitadosDelUsuario(userGuests);
            setIipoPopUpFormulario("confirmacionPositiva");
          } else {
            setIipoPopUpFormulario("confirmacionNegativa");
            await updateDoc(docRef, {
              respuesta: respuestaAsistencia,
            });
          }
        }
      }

      // Limpiar campos
      setUserData({
        nombre: "",
        respuesta: "",
        mensaje: "",
        regaloEscogido: "",
        posiblesInvitados: [],
        invitadosConfirmados: [],
      });
    } catch (error) {
      console.error("Error al enviar datos a Firebase: ", error);
    } finally {
      setLoading(false);
    }
  };

  const verificarInvitados = async (guestNameTyped) => {
    const db = getFirestore();
    const nombreMinusculasUsuario = userData.nombre
      .toLowerCase()
      .split(" ")
      .join("");
    const nombreMinusculasInvitado = guestNameTyped
      .toLowerCase()
      .split(" ")
      .join("");

    const invitadosFirebase = collection(db, "invitados");
    const buscarUsuario = query(
      invitadosFirebase,
      where("nombre", "==", nombreMinusculasUsuario)
    );
    const querySnapshot = await getDocs(buscarUsuario);

    if (!querySnapshot.empty) {
      const existingData = querySnapshot.docs[0].data();
      if (existingData.posiblesInvitados.includes(nombreMinusculasInvitado)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const actualizarRespuestaDeinvitadosDelUsuario = async (userGuests) => {
    const db = getFirestore();
    for (const invitado of userGuests) {
      const nombreMinusculas = invitado.toLowerCase().split(" ").join("");

      const invitadosFirebase = collection(db, "invitados");
      const buscarUsuario = query(
        invitadosFirebase,
        where("nombre", "==", nombreMinusculas)
      );
      const querySnapshot = await getDocs(buscarUsuario);

      if (!querySnapshot.empty) {
        for (const cadaDocumento of querySnapshot.docs) {
          const invitadoRef = doc(db, "invitados", cadaDocumento.id);
          await updateDoc(invitadoRef, {
            respuesta: "Si",
          });
        }
      }
    }
  };

  /* Esta parte se usa para que se verifique el nombre del usuario letra a letra */

  const [usuarioAprobado, setUsuarioAprobado] = useState(false);
  const [userTypedObject, setUserTypedObject] = useState({});

  useEffect(() => {
    const db = getFirestore();

    const nombreMinusculas = userData.nombre.toLowerCase().split(" ").join("");

    const invitadosFirebase = collection(db, "invitados");
    const buscarInvitado = query(
      invitadosFirebase,
      where("nombre", "==", nombreMinusculas)
    );
    getDocs(buscarInvitado)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref; //accede al primer documento devuelto en la consulta y devuelve una referencia del documento.
          const existingData = querySnapshot.docs[0].data(); //evuelve los datos del documento en forma de objeto
          setUsuarioAprobado(true);
          setUserTypedObject(existingData);
        } else {
          setUsuarioAprobado(false);
          setUserTypedObject({});
        }
      })

      .then(() => {
        // Limpiar los campos después de enviar
        /*  setUserData({
        nombre: "",
        respuesta: "",
        mensaje: "",
      }); */
      })
      .catch((error) => {
        console.error("Error al enviar datos a Firebase: ", error);
      })
      .finally(() => {
        /* setLoading(false); */
      });
  }, [userData.nombre]);

  /* Seccion del Administrador */

  const deleteInvitadoInfo = (idSelected) => {
    const db = getFirestore();
    const invitadosFirebase = collection(db, "invitados");
    const buscarInvitado = query(
      invitadosFirebase,
      where("id", "==", idSelected)
    );
    getDocs(buscarInvitado).then((querySnapshot) => {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      if (existingData.respuesta || existingData.mensaje) {
        return updateDoc(docRef, {
          respuesta: "",
        });
      }
    });
  };

  const deleteRegaloInfo = (idSelected) => {
    const db = getFirestore();
    const invitadosFirebase = collection(db, "lista-regalos");
    const buscarRegalo = query(
      invitadosFirebase,
      where("id", "==", idSelected)
    );
    getDocs(buscarRegalo).then((querySnapshot) => {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      if (existingData.disponible === "no") {
        return updateDoc(docRef, {
          disponible: "si",
          comprador: "",
          dedicatoria: "",
        });
      }
    });
  };

  /* PARTE DEL ADMINISTRADOR */

  const [invitadosAdministrador, setInvitadosAdministrador] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const invitadosRef = collection(db, "invitados");

    const unsubscribe = onSnapshot(invitadosRef, (querySnapshot) => {
      const listaActualizada = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvitadosAdministrador(listaActualizada);
    });

    // 👇 Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const [listaRegalosAdministrador, setListaRegalosAdministrador] = useState(
    []
  );
  useEffect(() => {
    const db = getFirestore();
    const invitadosRef = collection(db, "lista-regalos");

    const unsubscribe = onSnapshot(invitadosRef, (querySnapshot) => {
      const listaActualizada = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListaRegalosAdministrador(listaActualizada);
    });

    // 👇 Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const scrollToTop = () => {
    // Realiza el desplazamiento suave
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const values = {
    informacion,
    loading,
    getUserData,
    getUserDataName,
    setUserData,
    userData,
    handleEnviarFormulario,
    animacionEntrada,
    duracionAnimacion1,
    invitadosAdministrador,
    deleteInvitadoInfo,
    deleteRegaloInfo,
    setInvitadosAdministrador,
    usuarioAprobado,
    verificarInvitados,
    tipoPopUpFormulario,
    setIipoPopUpFormulario,
    actualizarRespuestaDeinvitadosDelUsuario,
    iconoMuffin,
    setUserTypedObject,
    userTypedObject,
    listaRegalosAdministrador,
    setListaRegalosAdministrador,
  };

  return (
    <InfoContext.Provider value={values}> {children} </InfoContext.Provider>
  );
};

export default InfoContextProvider;
