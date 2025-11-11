import React, { useEffect, useState } from "react";
import { getData } from "./api";
import DataDisplay from "./components/DataDisplay";

import "/workspaces/frontend_book_recommendation_pt1/src/style.css";
import SignInForm from "/workspaces/frontend_book_recommendation_pt1/src/SignIn";
// /workspaces/frontend_book_recommendation_pt1/src/SignIn.js
import SignUpForm from "/workspaces/frontend_book_recommendation_pt1/src/SignUp";
///workspaces/frontend_book_recommendation_pt1/src/SignUp.js


// /workspaces/frontend_book_recommendation_pt1/components/DataDisplay.js
//workspaces/frontend_book_recommendation_pt1/src/components/DataDisplay.js

function App() {
  const [type, setType] = useState("signIn"); // controls which panel is visible
  const [success, setSuccess] = useState(false); // success screen toggle
  const [hideOverlay, setHideOverlay] = useState(false); // hides overlay when registering

  // Switch between sign-in and sign-up panels
  const handleOnClick = (text) => {
    if (text !== type) setType(text);
  };

  // Called when user successfully registers
  const handleSignUpSuccess = () => {
    setSuccess(true);
  };

  // Return to sign-in after success
  const handleGoBack = () => {
    setSuccess(false);
    setType("signIn");
    setHideOverlay(false);
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      {success ? (
        // ✅ Success Fullscreen Message
        <div className="success-fullscreen">
          <h1>¡Registro exitoso!</h1>
          <p>Ahora puedes iniciar sesión con tu cuenta.</p>
          <button onClick={handleGoBack}>Volver</button>
        </div>
      ) : (
        // ✅ Main Sign In / Sign Up Container
        <div className={containerClass} id="container">
          <SignUpForm
            onSuccess={handleSignUpSuccess}
            switchToSignIn={() => setType("signIn")}
            hideOverlay={(value = true) => setHideOverlay(value)}
          />
          <SignInForm hideOverlay={(value = true) => setHideOverlay(value)} />

          {/* ✅ Overlay section */}
          {/* overlay-container-none */}
          <div className={`overlay-container ${hideOverlay ? "overlay-container-none" : ""}`}>
            <div className={`overlay ${hideOverlay ? "overlay-none" : ""}`}>
              <div className="overlay-panel overlay-left">
                <h1>Hola de nuevo!</h1>
                <p>
                  Introduce tus datos personales para iniciar sesión
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Iniciar sesión
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Bienvenido!</h1>
                <p>
                  Introduce tus datos personales para crear una cuenta con
                  nosotros
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Inscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;