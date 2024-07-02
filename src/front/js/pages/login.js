import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "../../styles/login.css";


const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciar = async (e) => {
    e.preventDefault();
    if (email == "" && password=="") {
      //alert("Hay campos vacios ");
      Swal.fire({
        title: 'Error!',
        text: 'hay campos vacios',
        icon: 'error',
        confirmButtonText: 'Cool'
      })     
    } 
    else {
      const result = await actions.login(email, password);
      if(result){


        if(store.user.role == "Client"){
          navigate("/productspage");
        }
        if(store.user.role == "Provider"){
          navigate("/productspage");
        }
        //navigate("/productspage");
      }
    }
  };

  return (
    <div className="container Login p-4 d-flex justify-content-center">
      <div>
      <div className=" shadow px-5 py-4 rounded" style={{width: "450px"}}>
      <h1 className="title-login"> Iniciar Sesión </h1>
      <p className="p-login">Inicia sesión con tus datos válidos.</p>

      <div className="card border border-0 "> 
      <div className=" row p-1  ">
          <div className="col ">
            <label htmlFor="exampleInputEmail1" className="form-label title-label-login">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control border-label-login"
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
        </div>
        <div className="row p-1">
          <div className="col">
            <label htmlFor="exampleInputPassword1" className="form-label title-label-login">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control border-label-login"
              id="exampleInputPassword1"
            />
          </div>
        </div>
      </div>
      <br/>
      <div className="d-flex justify-content-end pb-2">
      <button className="d-flex justify-content-center title-label" style={{border: "none", backgroundColor: "#ffffff", color: "#508CF6"}}>¿Olvidaste la contraseña?</button>
      </div>
      <div className="d-flex justify-content-center">
        <button  className="button-style-signup p-2 title-label" style={{width: "100%"}} onClick={(e) => iniciar(e)}>
          Iniciar Sesión
        </button>
      </div>
      <div className="d-flex justify-content-center pt-4">
            <div className="">
          <p className="d-flex justify-content-center title-label">¿No tienes una cuenta?</p> 
          <div className="d-flex justify-content-center">
            <Link to={"/signup"}>
          <button className="d-flex justify-content-center title-label" style={{border: "none", backgroundColor: "#ffffff", color: "#508CF6"}}>Crear una Cuenta</button>
          </Link>
          </div>
          </div>
          </div>
      </div>
      
      </div>
      <div className="d-flex align-items-center "><div className="image-style-login"></div></div>
    </div>
  );
};
export default Login;