import React from "react";
import '../../styles/suscribete.css'
import rigoImageUrl from "../../img/rigo-baby.jpg";

import fondoImageUrl from "../../img/banner.jpg";

const Suscribete = () => {
    return (
        <>

        <section className="suscribete d-flex justify-content-between">
            <div>

                <div className="container-text  bg-danger">
                    <h1>Suscribete</h1>
                    <p>recibe las nuevas actualizaciones, ofertas y <br/> tips para mejorar tu experiencia</p>
                    <button type="button" class="btn btn-primary">Primary</button>
                </div>
            </div>
        </section>
        
         <img className="img-suscribete" src={fondoImageUrl} />
         <div className="suscribete-overlay">hola</div>
        </>

    )
}

export default Suscribete;