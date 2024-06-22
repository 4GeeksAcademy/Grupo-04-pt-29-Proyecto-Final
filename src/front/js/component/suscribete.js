import React from "react";
import '../../styles/suscribete.css'
import rigoImageUrl from "../../img/rigo-baby.jpg";

import fondoImageUrl from "../../img/banner.jpg";

const Suscribete = () => {
    return (
        <>

            <section className="suscribete">
                <div className="fondo-gradiente d-flex mt-auto mp-auto">
                    <div className="container d-flex flex-column align-items-center">
                        <div className="m-auto text-center">
                            <h1 className="h1-suscribete">Suscríbete</h1>
                            <div className="title-parrafo">recibe las nuevas actualizaciones, ofertas y <br /> tips para mejorar tu experiencia</div>
                            <button className="button-style mt-4">Tu Email</button>
                        </div>

                    </div>
                </div>
            </section >


        </>

    )
}

export default Suscribete;