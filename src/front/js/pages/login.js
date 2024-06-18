import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

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
        navigate("/profile");
      }
    }
  };

  return (
    <div className="Login p-4">
      <div className="container p-5">
      <h1> Iniciar Session </h1>
      <div className="card"> 
      <div className=" row p-1">
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div
              id="emailHelp"
              className="form-text"
              style={{ color: "black" }}
            >
              no compartiremos tu email con nadie mas
            </div>
          </div>
        </div>
        <div className="row p-1">
          <div className="col">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
      </div>
      <br/>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-success" onClick={(e) => iniciar(e)}>
          Iniciar
        </button>
      </div>
      </div>
      
    </div>
  );
};
export default Login;