import React from "react";
import "../../styles/uneteSection.css";
import { Link } from "react-router-dom";

const UneteSection = () => {
    return (
        <div className="body-image-unete"> 
        <div className=" py-5 d-flex justify-content-center align-items-center text-center" style={{height: "400px"}}>
            <div>
            <div className="row title-unete ">Únete a Nosotros Para Vender Su Servicio <br></br>y Hacer Crecer Su Experiencia</div>
            <Link to={"/signup"}>
            <button className="button-style-unete mt-4 ">Regístrate</button>
            </Link>
            </div>
        </div>
        </div>
    )
}

export default UneteSection;