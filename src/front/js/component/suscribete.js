import React from "react";
import '../../styles/suscribete.css'
import rigoImageUrl from "../../img/rigo-baby.jpg";
import fondoImageUrl from "../../img/banner.jpg";
import { Link } from "react-router-dom";

const Suscribete = () => {
    return (
        <>

            <section className="suscribete">
                <div className="fondo-gradiente">
                    <div className="container d-flex flex-column align-items-center pt-5" style={{ "height": "400px" }}>
                        <h3 className="h1-suscribete mt-5">Explora Nuestros Servicios</h3>
                        <p className="title-parrafo">Más que servicios, te ofrecemos un ecosistema de soluciones  personalizadas para ti.</p>
                        <Link to={'/productspage'}>
                            <button className="button-style mt-4">Ver Servicios</button>
                        </Link>
                    </div>
                </div>
            </section >


        </>

    )
}

export default Suscribete;