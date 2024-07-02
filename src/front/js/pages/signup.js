import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (username == "" && email == "" && password == "" &&role == "") {
      //alert("Hay campos vacios ");
      Swal.fire({
        title: 'Error!',
        text: 'hay campos vacios',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

    } else {
      const result = await actions.register(username, email, password, role);
      if (result) {
        navigate("/");
      }
    }
  };

  return (
    <div className="container signup py-5 d-flex justify-content-center">
      <div className=" d-flex shadow px-5 py-4 rounded " style={{width: "450px"}} >
      
        <div className=" col-12 ">
        <h1 className="title-signup">Regístrate</h1>
        <p className="p-signup">Regístrese con sus datos válidos.</p>
        <form className="">
          <div className="card row border border-0">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label title-label">
                Nombre
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control border-label"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label title-label pt-3">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control border-label"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div
                id="emailHelp"
                className="form-text"
                style={{ color: "black" }}
              >
               
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputPassword1" className="form-label title-label pt-3">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control border-label"
                id="exampleInputPassword1"
              />
            </div>
            <div className="col">
            <label htmlFor="exampleInputPassword1" className="form-label title-label pt-3">
                Selecciona tu roll
              </label>
              <select
                className="form-select border-label p-signup py-2"
                aria-label="Default select example"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option className="" selected="">Selecciona... </option>
                <option value="Client">Client</option>
                <option value="Provider">Provider</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-4" >
            <button
              onClick={(e) => register(e)}
              className="button-style-signup p-2 title-label" style={{width: "100%"}}
            >
              Crear Cuenta
            </button>
            
          </div>
        
        </form>
        <div className="d-flex justify-content-center pt-4">
            <div className="">
          <p className="d-flex justify-content-center title-label">¿Ya tienes una cuenta?</p> 
          <div className="d-flex justify-content-center">
            <Link to={"/login"}>
          <button className="d-flex justify-content-center title-label" style={{border: "none", backgroundColor: "#ffffff", color: "#508CF6"}}>Iniciar Sesión</button>
          </Link>
          </div>
          </div>

          </div>
        </div>
       
      </div>
      <div className="d-flex align-items-center "><div className="image-style-signup"></div></div>
    </div>
  );
};
