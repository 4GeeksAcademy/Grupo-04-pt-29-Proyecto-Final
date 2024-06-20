import React from "react";
import "../../styles/serviciosPopulares.css"








const Serviciospopulares = () => {
    return (
        <div classNameName="container">
            <div className="card" style={{ "width": "15rem" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx38W42k6ujIXAghZNamkWwcMPEXWZbb8CA&s" className="card-img-top" alt="..." />
                <div className="color-card card-body text-center">
                    <h5 className="h5-descripcion card-title text-center font-weight-bold">Servicio de Limpieza</h5>
                    <h2 className="valor-card card-title text-center ">$15</h2>
                    <a href="#" className="btn-minfo btn">Más Información</a>
                </div>
            </div>
        </div>

    )
}

export default Serviciospopulares;