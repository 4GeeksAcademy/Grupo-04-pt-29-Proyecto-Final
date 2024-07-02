import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/listaServicios.css";

export const ListaServicios = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getProviders()
    }, [])


    console.log(store.listProviders);

    const e = store.listProviders && store.listProviders.flatMap((provider, index) => {

        return provider.services.map((service, serviceIndex) => {
            return <div key={`${index}+ ${serviceIndex}`} className="card mb-3 tarjeta-listaServ" style={{ maxWidth: "810px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded-start foto-listaServ" src={provider.url_image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title titulo-listaServ">Servicio de {service.category}</h5>
                                <p className="precio-listaServ">
                                    <i className="fa-solid fa-dollar-sign icono-listaServ">
                                    </i>{service.price}</p>
                            </div>
                            <h6 className="card-title nombre-listaServ">{provider.name} {provider.last_name}</h6>
                            <p className="card-text textoTarjeta-listaServ">{service.description}</p>
                            <div className="d-flex justify-content-between mt-5">
                                <p className="card-text textoIconos-listaServ"><small className="text-body-secondary"> <i className="fa-solid fa-location-dot icono-listaServ"></i>{provider.location}</small></p>
                                <p className="card-text mx-2 textoIconos-listaServ"><small className="text-body-secondary">
                                    Valoración
                                    {[...Array(provider.valoration)].map((e, i) => {
                                        return <i key={i} className="fa-regular fa-star icono-listaServ" />
                                    })}
                                </small></p>
                                <p className="card-text ml-auto textoIconos-listaServ favorito-listaServ"><small className="text-body-secondary"> Guardar <i className="fa-regular fa-heart corazon-listaServ"></i></small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    })
    return e
}

