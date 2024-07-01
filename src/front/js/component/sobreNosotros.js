import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sobreNosotros.css";


export const SobreNosotros = () => {
    return (
        <div id="nosotros">
            <div className="contenedor-titulo-aboutUs">
            <div className=" titulo-aboutUs">
                <p className="titulo-seccion-aboutUs"><strong>Sobre la Empresa</strong></p>
            </div>
            </div>
            <div className="container-aboutUs">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 texto-aboutUs">
                        <p>Somos una empresa dedicada a brindar soluciones en el área de servicios de mantenimiento
                            para ti, tu hogar, trabajo y oficina. Contamos con una red de profesionales dispuestos a
                            resolver cualquier problema. Hacemos tu vida más fácil.
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-12 imagen-aboutUs">
                        <img src="https://res.cloudinary.com/dq3mxxidu/image/upload/v1718677324/sobre-nosotros_g256bz.jpg" alt="Imagen descriptiva"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
