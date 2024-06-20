import React from "react";
import '../../styles/suscribete.css'
import rigoImageUrl from "../../img/rigo-baby.jpg";

import fondoImageUrl from "../../img/banner.jpg";

const Suscribete = () => {
    return (
        <>

            <section className="suscribete">
                <div className="content-img">
                    <img className="img-suscribete" src={fondoImageUrl} />
                    <div className="suscribete-overlay"></div>
                    <div className="container-text">
                        <h1>Suscríbete</h1>
                        <p>recibe las nuevas actualizaciones, ofertas y <br /> tips para mejorar tu experiencia</p>
                        <button type="button" class="btn-suscribete btn-primary">Tu Email</button>
                    </div>
                </div>
            </section>


        </>

    )
}

export default Suscribete;