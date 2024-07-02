import React, { useEffect, useState } from "react";
import "../../styles/serviciosPopulares.css"


const Serviciospopulares = () => {
    const [providers, setProviders] = useState([])
    console.log("se imprime providers", providers)



    useEffect(() => {

        fetch(`${process.env.BACKEND_URL}/api/providers`)
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                setProviders(data.data)
            })
            .catch(error => {
                console.error("Error al traer lista de  providers:", error);
            })
    }, [])

    return (
        <div className="container">
            <div className="content-header text-center">
                <h3>Servicios Populares</h3>
            </div>
            <div className="mb-4 linea" style={{ "width": "50px", "height": "5px", "background": "#508DF7" }}></div>
            <div className="div-center text-center">
                <div className="row row-content m-auto">
                    {providers.map((value, index) => {
                        return (
                            <div className="col">
                                <div key={index} className="card mb-5" style={{ "width": "15rem" }}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx38W42k6ujIXAghZNamkWwcMPEXWZbb8CA&s" className="card-img-top" alt="..." />
                                    <div className="color-card card-body text-center">
                                        <h5 className="h5-descripcion card-title text-center font-weight-bold">{value.profession}</h5>
                                        <h2 className="valor-card card-title text-center ">${value.price}</h2>
                                        <a href="#" className="btn-minfo btn">Más Información</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Serviciospopulares;