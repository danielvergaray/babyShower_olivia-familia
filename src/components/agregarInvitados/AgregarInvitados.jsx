import React from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AgregarInvitados = () => {
  const generarId = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
  };

  const invitados = [
    {
      nombre: "aimikomori",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["maritzaarzubiaga", "akiokomori"],
      invitadosConfirmados: [],
    },
    {
      nombre: "akiokomori",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "alexanderhuertas",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "carollopez",
      respuesta: "",
      id: generarId(),
    },

    {
      nombre: "lizflores",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "natalysilva",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "nathaliemendieta",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "priscilacarazas",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["enriquelarosa", "cesarcarazas", "patriciaelorreaga"],
      invitadosConfirmados: [],
    },
    {
      nombre: "cesarcarazas",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["patriciaelorreaga"],
      invitadosConfirmados: [],
    },
    {
      nombre: "patriciaelorreaga",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["cesarcarazas"],
      invitadosConfirmados: [],
    },
    {
      nombre: "enriquelarosa",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["priscilacarazas"],
      invitadosConfirmados: [],
    },
    {
      nombre: "abrilcarazas",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["josearias", "cesarcarazas", "patriciaelorreaga"],
      invitadosConfirmados: [],
    },
    {
      nombre: "josearias",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["abrilcarazas"],
      invitadosConfirmados: [],
    },
    {
      nombre: "rosacarcamo",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "ruthmerino",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "alonsogarridolecca",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "mariaferoullon",
        "lunagarridolecca",
        "noahgarridolecca",
        "liamgarridolecca",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "mariaferoullon",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "lunagarridolecca",
        "alonsogarridolecca",
        "noahgarridolecca",
        "liamgarridolecca",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "lunagarridolecca",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "mariaferoullon",
        "alonsogarridolecca",
        "noahgarridolecca",
        "liamgarridolecca",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "noahgarridolecca",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "liamgarridolecca",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "claudiacardenas",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "danielvillaverde",
        "sebastianvillaverde",
        "aitanavillaverde",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "danielvillaverde",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "claudiacardenas",
        "sebastianvillaverde",
        "aitanavillaverde",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "sebastianvillaverde",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "claudiacardenas",
        "danielvillaverde",
        "aitanavillaverde",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "aitanavillaverde",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "maritzaarzubiaga",
      respuesta: "",
      id: generarId(),
    },

    {
      nombre: "ofeliaarzubiaga",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "luisvergaray",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: [
        "enriquevergaray",
        "monicaescobar",
        "wendyterry",
        "madisonvergaray",
      ],
      invitadosConfirmados: [],
    },
    {
      nombre: "monicavergaray",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["enriquevergaray", "monicaescobar"],
      invitadosConfirmados: [],
    },
    {
      nombre: "enriquevergaray",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["monicaescobar"],
      invitadosConfirmados: [],
    },
    {
      nombre: "monicaescobar",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["enriquevergaray"],
      invitadosConfirmados: [],
    },
    {
      nombre: "madisonvergaray",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "wendyterry",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["luisvergaray", "madisonvergaray"],
      invitadosConfirmados: [],
    },
    {
      nombre: "aurysthelapalma",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["josemarino", "auramarinamarino"],
      invitadosConfirmados: [],
    },

    {
      nombre: "hilaryespinoza",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "josemarino",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["aurysthelapalma", "auramarinamarino"],
      invitadosConfirmados: [],
    },
    {
      nombre: "auramarinamarino",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["aurysthelapalma", "josemarino"],
      invitadosConfirmados: [],
    },

    {
      nombre: "fabricioenriquez",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["claudiazapata"],
      invitadosConfirmados: [],
    },
    {
      nombre: "claudiazapata",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["fabricioenriquez"],
      invitadosConfirmados: [],
    },
    {
      nombre: "santiagobalvin",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "pamelatorres",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["renzoortega", "fernandaortega"],
      invitadosConfirmados: [],
    },
    {
      nombre: "renzoortega",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["pamelatorres", "fernandaortega"],
      invitadosConfirmados: [],
    },
    {
      nombre: "fernandaortega",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "diegosanz",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "alonsovigo",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "jemimajange",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["isaacjange"],
      invitadosConfirmados: [],
    },
    {
      nombre: "isaacjange",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["jemimajange"],
      invitadosConfirmados: [],
    },
    {
      nombre: "heathersuzuki",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["kenzisuzuki", "camilasuzuki", "loghansuzuki"],
      invitadosConfirmados: [],
    },
    {
      nombre: "kenzisuzuki",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["heathersuzuki", "camilasuzuki", "loghansuzuki"],
      invitadosConfirmados: [],
    },
    {
      nombre: "camilasuzuki",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "loghansuzuki",
      respuesta: "",
      id: generarId(),
    },
    {
      nombre: "paolareano",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["haroldreano"],
      invitadosConfirmados: [],
    },
    {
      nombre: "haroldreano",
      respuesta: "",
      id: generarId(),
      posiblesInvitados: ["paolareano"],
      invitadosConfirmados: [],
    },
  ];

  const addDataToFirebase = () => {
    /* const db = getFirestore(); */

    const collectionRef = collection(db, "invitados");

    for (let item of invitados) {
      addDoc(collectionRef, item)
        .then((res) => console.log(res.id))
        .catch((err) => console.log(err));
    }

    /* ASI SE HA CREADO LOS PRODUCTOS EN LA BASE DE DATOS */
  };
  return <button onClick={addDataToFirebase}>agregar productos</button>;
};

export default AgregarInvitados;
