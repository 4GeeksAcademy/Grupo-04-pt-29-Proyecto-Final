import React, { useEffect, useState } from "react";
import "../../styles/serviciosPopulares.css"
import { Link } from "react-router-dom";



const Serviciospopulares = () => {
    const [providers, setProviders] = useState([])
    console.log("se imprime providers", providers)



    useEffect(() => {

        fetch(`${process.env.BACKEND_URL}/api/provider`)
            .then(response => response.json())
            .then(data => {
                console.log("url para revision",process.env.BACKEND_URL)
                console.log("data", data)
                setProviders(data.data)
            })
            .catch(error => {
                console.error("Error al traer lista de  providers:", error);
            })
    }, [])

    return (
        <div className="container mt-5 mb-5">
            <div className="content-header text-center">
                <h3>Servicios Populares</h3>
            </div>
            <div className="mb-4 linea" style={{ "width": "50px", "height": "5px", "background": "#508DF7" }}></div>
            <div className="div-center text-center">
                <div className="row row-content m-auto">
                    {providers.map((value, index) => {
                        return (
                            <div className="col contenedor-card ">
                                <div key={index} className="card mb-5" style={{ "width": "15rem" }}>
                                {value.services.map((image,index)=>{
                                return <img src={image.url_image} className="img-fluid card-img-top image-cover" alt="..."/>
                                })}
                                    <div className="color-card card-body text-center">
                                        <h5 className="h5-descripcion card-title text-center font-weight-bold">{value.profession}</h5>
                                        {value.services.map((service, index)=>{
                                       return <h2 className="valor-card card-title text-center ">${service.price}</h2>
                                    })}
                                        <Link to={`/singleprovider/${value.id}`}>
                                        <button className="btn-minfo btn">Más Información</button>
                                        </Link>
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