import React from "react";
import '../../styles/suscribete.css'
import rigoImageUrl from "../../img/rigo-baby.jpg";

import fondoImageUrl from "../../img/banner.jpg";

const Suscribete = () => {
    return (
        <>

            <section className="suscribete">
                <div className="fondo-gradiente">
                        <div className="container d-flex flex-column align-items-center pt-5" style={{ "height": "400px" }}>
                            <h1 className="h1-suscribete mt-5">Suscríbete</h1>
                            <div className="row title-parrafo">recibe las nuevas actualizaciones, ofertas y <br /> tips para mejorar tu experiencia</div>
                            <button className="button-style mt-4">Tu Email</button>
                        </div>
                </div>
            </section >


        </>

    )
}

export default Suscribete;