import React, { useEffect, useState } from "react";
import { getData } from "./api";
import DataDisplay from "./components/DataDisplay";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faStar, faBook, faRightFromBracket, faGrip} from '@fortawesome/free-solid-svg-icons'; // Example solid icons
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; // Example brand icon



function SignInForm({ onSuccess, switchToSignIn, hideOverlay }) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [bolError, setBolError] = useState(false);

  const handleOnSubmit = async (evt) => {
  evt.preventDefault();

  const { email, password } = state;

  try {
    const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log('This is my data '+ data);

    if (!response.ok) {
      setError(data.error);
      setBolError(true);
      setSuccess(false);
      // alert(data.error || "Login failed");
      return;
    }

    setUsername(data.user.username);
    setBolError(false);
    setSuccess(true);
    setState({ email: "", password: "" });
    if (hideOverlay) hideOverlay();

  } catch (error) {
    console.error("Login error:", error);
    setError(error);
    setBolError(true);
    // alert("Error connecting to the server");
  }
};

  const handleGoBack = () => {
    setSuccess(false);
    // if (switchToSignIn) switchToSignIn(); // switch back to login
    if (hideOverlay) hideOverlay(false);  // restore overlay
  };


  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Iniciar sesión</h1>
        {/* <div className="social-container">
            <FontAwesomeIcon icon={faBook}/>
        </div> */}
        <input
          type="email"
          placeholder="Correo"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contrasena"
          value={state.password}
          onChange={handleChange}
        />
        <div className={`${bolError ? "display-error" : "not-display-error"}`}>
          {error}
        </div>
        <a href="#">Olvidaste tu contraseña?</a>
        <button>Iniciar sesión</button>
      </form>

      {/* Success Panel */}
      <div className={`success-login-message ${success ? "active" : ""}`}>
        <h1>¡Bienvenid@ {username}!</h1>
        <p>Haz iniciado sesion exitosamente!</p>
        {/* <button onClick={() => setSuccess(false)} hideOverlay={() => setHideOverlay(true)} >Volver</button> */}
        <div style={{width:"100%"}}>
          <button style={{display: "inline-block", width: "212px", marginRight: "10px"}} className="success-login-message-logout-button" onClick={handleGoBack}> <FontAwesomeIcon icon={faRightFromBracket}/> Salir</button>
          <button style={{display: "inline-block", width: "212px"}} className="success-login-message-dashboard-button">Dashboard <FontAwesomeIcon icon={faGrip}/> </button>
        </div>

      </div>
    </div>
  );
}

export default SignInForm;
