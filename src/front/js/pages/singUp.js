import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/signup.css";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registro = async (e) => {
    e.preventDefault();
    if (name == "" && lastName == "" && email == "" && password == "") {
      alert("Hay campos vacios ");
    } else {
      const result = await actions.register(name, lastName, email, password);
      if (result) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="signup p-4">
      <div className="container">
        <h1>Registro</h1>
        <form>
          <div className="card row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                nombre:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                apellido:
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
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
          <div className="d-flex justify-content-center">
            <button
              onClick={(e) => registro(e)}
              className="btn btn-outline-success"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
