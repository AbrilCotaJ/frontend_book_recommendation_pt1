import React, { useEffect, useState } from "react";
import { getData } from "./api";
import DataDisplay from "./components/DataDisplay";

// function SignUpForm() {
//   const [state, setState] = React.useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const handleChange = evt => {
//     const value = evt.target.value;
//     setState({
//       ...state,
//       [evt.target.name]: value
//     });
//   };

//   const handleOnSubmit = evt => {
//     evt.preventDefault();

//     const { name, email, password } = state;
//     alert(
//       `You are sign up with name: ${name} email: ${email} and password: ${password}`
//     );

//     for (const key in state) {
//       setState({
//         ...state,
//         [key]: ""
//       });
//     }
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Crea cuenta</h1>
//         <input
//           type="text"
//           name="name"
//           value={state.name}
//           onChange={handleChange}
//           placeholder="Nombre"
//         />
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="correo"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Contrasena"
//         />
//         <button>Crear</button>
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;

function SignUpForm({ onSuccess, switchToSignIn, hideOverlay }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [bolError, setBolError] = useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;

    const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";
    const response = await fetch(`${API_URL}/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email":email, "password":password, "username":name}),
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
    // Reset form and trigger UI transitions
    setSuccess(true);
    setBolError(false);
    setState({ name: "", email: "", password: "" });

    // Hide overlay when creating an account
    if (hideOverlay) hideOverlay();
  };

    const handleGoBack = () => {
    setSuccess(false);
    if (switchToSignIn) switchToSignIn(); // switch back to login
    if (hideOverlay) hideOverlay(false);  // restore overlay
  };

  return (
    <div className="form-container sign-up-container" style={{ position: "relative", height:"483px" }}>
      {/* Sign Up Form */}
      <form onSubmit={handleOnSubmit} style={{ zIndex: success ? 1 : 5 }}>
        <h1>Crear cuenta</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Usuario"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Correo"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Contrasena"
        />
        <div style={{paddingBottom: "10px"}} className={`${bolError ? "display-error" : "not-display-error"}`}>
          {error}
        </div>
        <button>Crear</button>
      </form>

      {/* Success Panel */}
      <div className={`success-message ${success ? "active" : ""}`}>
        <h1>¡Registro exitoso!</h1>
        <p>Ahora puedes iniciar sesión con tu cuenta.</p>
        {/* <button onClick={() => setSuccess(false)} hideOverlay={() => setHideOverlay(true)} >Volver</button> */}
        <button onClick={handleGoBack}>Volver</button>
      </div>
    </div>
  );
}

export default SignUpForm;