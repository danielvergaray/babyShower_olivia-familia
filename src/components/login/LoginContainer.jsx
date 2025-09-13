import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import Login from "./Login";

const LoginContainer = () => {
  const [loginAllowed, setLoginAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleLogin = async (userCredentials) => {
    setIsLoading(true);

    const db = getFirestore();
    const credentialsFirebase = collection(db, "credenciales");

    try {
      const querySnapshot = await getDocs(query(credentialsFirebase));

      if (!querySnapshot.empty) {
        const existingData = querySnapshot.docs[0].data();
        if (
          existingData.username === userCredentials.username &&
          existingData.password === userCredentials.password
        ) {
          setTimeout(() => {
            setIsLoading(false);
            setLoginAllowed(true);
            navigate("/administrador");
          }, 1000);
        } else {
          setIsLoading(false);
          setLoginAllowed(false);
          setWrongPasswordAlert(true);
        }
      }
    } catch (error) {
      console.error("Error al validar credenciales: ", error);
    } finally {
      /* setLoading(false); */
    }
  };
  const saveUserName = (user) => {
    setUserCredentials((prev) => ({ ...prev, username: user }));
  };
  const saveUserPass = (pass) => {
    /* const claveANumero = parseInt(pass); */
    setUserCredentials((prev) => ({ ...prev, password: pass }));
  };

  return (
    <Login
      isLoading={isLoading}
      loginAllowed={loginAllowed}
      handleLogin={handleLogin}
      wrongPasswordAlert={wrongPasswordAlert}
      saveUserName={saveUserName}
      saveUserPass={saveUserPass}
      userCredentials={userCredentials}
      isButtonDisabled={isButtonDisabled}
      setWrongPasswordAlert={setWrongPasswordAlert}
      setIsButtonDisabled={setIsButtonDisabled}
    />
  );
};

export default LoginContainer;
